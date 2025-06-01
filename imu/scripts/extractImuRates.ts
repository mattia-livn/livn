import fs from 'fs';
import path from 'path';

export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

interface ParsedPdfData {
  cityName: string;
  rates: ImuRateEntry[];
}

class ImuRateExtractor {
  private statementsDir: string;
  private outputDir: string;

  constructor(statementsDir: string, outputDir: string) {
    this.statementsDir = statementsDir;
    this.outputDir = outputDir;
  }

  // Funzione per estrarre il nome del comune dal filename
  private extractCityName(filename: string): string {
    const nameWithoutExtension = filename.replace('.pdf', '');
    const parts = nameWithoutExtension.split('_');
    return parts[0]; // Es: "AbanoTerme" da "AbanoTerme_PD_A001.pdf"
  }

  // Funzione per convertire il nome del comune in formato camelCase
  private toCamelCase(cityName: string): string {
    return cityName.charAt(0).toLowerCase() + cityName.slice(1);
  }

  // Funzione per parsare il contenuto del PDF ed estrarre le aliquote
  private parsePdfContent(content: string, cityName: string): ImuRateEntry[] {
    const rates: ImuRateEntry[] = [];
    const lines = content.split('\n');
    
    // Pattern per individuare le righe con aliquote
    const ratePatterns = [
      {
        pattern: /Abitazione principale.*?A\/1.*?A\/8.*?A\/9/i,
        ratePattern: /(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Main residence in A/1, A/8, A/9",
          details: details.trim(),
          ratePercent: rate,
          categoryTypes: ["A/1", "A/8", "A/9"]
        })
      },
      {
        pattern: /Assimilazione.*?abitazione principale.*?anziani.*?disabili/i,
        ratePattern: /SI|(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Assimilation to main residence for elderly/disabled",
          details: details.trim(),
          ratePercent: rate,
          context: "Art. 1, comma 741, lett. c), n. 6), legge n. 160 del 2019"
        })
      },
      {
        pattern: /Fabbricati rurali.*?strumentale.*?D\/10/i,
        ratePattern: /(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Rural buildings for instrumental use (including D/10)",
          details: details.trim(),
          ratePercent: rate,
          categoryTypes: ["D/10"]
        })
      },
      {
        pattern: /Fabbricati.*?gruppo.*?D.*?esclusa.*?D\/10/i,
        ratePattern: /(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Buildings in group D (except D/10)",
          details: details.trim(),
          ratePercent: rate,
          categoryTypes: ["D"]
        })
      },
      {
        pattern: /Terreni agricoli/i,
        ratePattern: /(\d+[,.]?\d*%)|Esenti/i,
        createEntry: (details: string, rate: number) => ({
          condition: rate === 0 ? "Agricultural land - EXEMPT" : "Agricultural land",
          details: details.trim(),
          ratePercent: rate,
          context: rate === 0 ? "Esenzione" : undefined
        })
      },
      {
        pattern: /Aree fabbricabili/i,
        ratePattern: /(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Buildable land",
          details: details.trim(),
          ratePercent: rate
        })
      },
      {
        pattern: /Altri fabbricati.*?diversi.*?abitazione principale/i,
        ratePattern: /(\d+[,.]?\d*%)/,
        createEntry: (details: string, rate: number) => ({
          condition: "Other buildings (not main residence, not group D)",
          details: details.trim(),
          ratePercent: rate
        })
      }
    ];

    // Parsing del contenuto
    let currentText = '';
    let currentRate = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Identifica le righe che contengono testo delle aliquote
      if (line.includes('Abitazione') || line.includes('Fabbricati') || 
          line.includes('Terreni') || line.includes('Aree') || 
          line.includes('Altri') || line.includes('Assimilazione')) {
        currentText = line;
        
        // Cerca la percentuale nelle righe successive
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          const nextLine = lines[j].trim();
          const rateMatch = nextLine.match(/(\d+[,.]?\d*%)|SI|Esenti/i);
          if (rateMatch) {
            currentRate = rateMatch[0];
            break;
          }
        }
        
        // Prova a matchare con i pattern e creare le entry
        for (const pattern of ratePatterns) {
          if (pattern.pattern.test(currentText)) {
            let ratePercent = 0;
            
            if (currentRate.toLowerCase() === 'si') {
              // Per "SI", usiamo la stessa aliquota dell'abitazione principale
              const mainResidenceRate = rates.find(r => r.categoryTypes?.includes("A/1"));
              ratePercent = mainResidenceRate?.ratePercent || 0.6;
            } else if (currentRate.toLowerCase().includes('esenti')) {
              ratePercent = 0;
            } else {
              const numericMatch = currentRate.match(/(\d+[,.]?\d*)/);
              if (numericMatch) {
                ratePercent = parseFloat(numericMatch[1].replace(',', '.'));
              }
            }
            
            const entry = pattern.createEntry(currentText, ratePercent);
            rates.push(entry);
            break;
          }
        }
      }
    }
    
    return rates;
  }

  // Funzione per generare il contenuto del file TypeScript
  private generateTypeScriptFile(cityName: string, rates: ImuRateEntry[]): string {
    const camelCaseName = this.toCamelCase(cityName);
    const constantName = `imuRates${cityName}2025`;
    
    const ratesString = rates.map(rate => {
      const categoryTypesStr = rate.categoryTypes ? 
        `\n    categoryTypes: ${JSON.stringify(rate.categoryTypes)}` : '';
      const contextStr = rate.context ? 
        `\n    context: ${JSON.stringify(rate.context)}` : '';
      const zoneStr = rate.zone ? 
        `\n    zone: ${JSON.stringify(rate.zone)}` : '';
      
      return `  {
    condition: ${JSON.stringify(rate.condition)},
    details: ${JSON.stringify(rate.details)},
    ratePercent: ${rate.ratePercent}${categoryTypesStr}${contextStr}${zoneStr}
  }`;
    }).join(',\n');

    return `export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const ${constantName}: ImuRateEntry[] = [
${ratesString}
];
`;
  }

  // Funzione principale per processare tutti i PDF
  async processAllPdfs(): Promise<void> {
    try {
      // Crea la cartella di output se non esiste
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // Legge tutti i file PDF nella cartella statements
      const files = fs.readdirSync(this.statementsDir)
        .filter(file => file.endsWith('.pdf'))
        .sort(); // Ordine alfabetico

      console.log(`Trovati ${files.length} file PDF da processare...`);

      for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        const filePath = path.join(this.statementsDir, filename);
        
        console.log(`\n[${i + 1}/${files.length}] Processando: ${filename}`);
        
        try {
          // Legge il contenuto del PDF (come testo)
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Estrae il nome del comune
          const cityName = this.extractCityName(filename);
          
          // Parsa il contenuto ed estrae le aliquote
          const rates = this.parsePdfContent(content, cityName);
          
          if (rates.length === 0) {
            console.log(`⚠️  Nessuna aliquota trovata per ${cityName}`);
            continue;
          }
          
          // Genera il file TypeScript
          const tsContent = this.generateTypeScriptFile(cityName, rates);
          
          // Salva il file
          const outputFilename = `${this.toCamelCase(cityName)}2025.ts`;
          const outputPath = path.join(this.outputDir, outputFilename);
          
          fs.writeFileSync(outputPath, tsContent);
          
          console.log(`✅ Creato ${outputFilename} con ${rates.length} aliquote`);
          
        } catch (error) {
          console.error(`❌ Errore processando ${filename}:`, error);
        }
      }
      
      console.log('\n🎉 Processo completato!');
      
    } catch (error) {
      console.error('❌ Errore generale:', error);
    }
  }

  // Funzione per processare un singolo PDF
  async processSinglePdf(filename: string): Promise<void> {
    const filePath = path.join(this.statementsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File non trovato: ${filename}`);
      return;
    }
    
    console.log(`📄 Processando: ${filename}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cityName = this.extractCityName(filename);
      const rates = this.parsePdfContent(content, cityName);
      
      if (rates.length === 0) {
        console.log(`⚠️  Nessuna aliquota trovata per ${cityName}`);
        return;
      }
      
      const tsContent = this.generateTypeScriptFile(cityName, rates);
      const outputFilename = `${this.toCamelCase(cityName)}2025.ts`;
      const outputPath = path.join(this.outputDir, outputFilename);
      
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, tsContent);
      
      console.log(`✅ Creato ${outputFilename} con ${rates.length} aliquote`);
      
    } catch (error) {
      console.error(`❌ Errore processando ${filename}:`, error);
    }
  }
}

// Funzione di utilizzo
export async function extractAllImuRates(): Promise<void> {
  const statementsDir = path.join(process.cwd(), 'imu', 'data', 'statements');
  const outputDir = path.join(statementsDir, '2025');
  
  const extractor = new ImuRateExtractor(statementsDir, outputDir);
  await extractor.processAllPdfs();
}

export async function extractSingleImuRate(filename: string): Promise<void> {
  const statementsDir = path.join(process.cwd(), 'imu', 'data', 'statements');
  const outputDir = path.join(statementsDir, '2025');
  
  const extractor = new ImuRateExtractor(statementsDir, outputDir);
  await extractor.processSinglePdf(filename);
}

// Se il file viene eseguito direttamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🚀 Avvio estrazione automatica di tutte le aliquote IMU...');
    extractAllImuRates();
  } else {
    console.log(`🎯 Estrazione singola per: ${args[0]}`);
    extractSingleImuRate(args[0]);
  }
} 