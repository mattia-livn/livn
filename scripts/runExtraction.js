const fs = require('fs');
const path = require('path');

class ImuRateExtractor {
  constructor(statementsDir, outputDir) {
    this.statementsDir = statementsDir;
    this.outputDir = outputDir;
  }

  // Funzione per estrarre il nome del comune dal filename
  extractCityName(filename) {
    const nameWithoutExtension = filename.replace('.pdf', '');
    const parts = nameWithoutExtension.split('_');
    return parts[0]; // Es: "AbanoTerme" da "AbanoTerme_PD_A001.pdf"
  }

  // Funzione per convertire il nome del comune in formato camelCase
  toCamelCase(cityName) {
    return cityName.charAt(0).toLowerCase() + cityName.slice(1);
  }

  // Funzione per pulire il testo dai comandi PDF
  cleanPdfText(text) {
    return text
      // Rimuove comandi PDF comuni
      .replace(/\(|\)|\\\(|\\\)|Tj|T\*|ET|BT|\/F\d+|TL|\d+\.\d+ [GTL]|re|B|w|g/g, '')
      // Rimuove coordinate e numeri di posizionamento
      .replace(/\d+\.\d+ \d+\.\d+ \d+\.\d+ [TGM]d/g, '')
      // Rimuove sequenze di numeri con punti
      .replace(/\d+\.\d+\s*/g, ' ')
      // Rimuove backslash escape
      .replace(/\\(.)/g, '$1')
      // Rimuove spazi multipli
      .replace(/\s+/g, ' ')
      // Rimuove caratteri di controllo
      .replace(/[\x00-\x1F\x7F]/g, '')
      .trim();
  }

  // Funzione per parsare il contenuto del PDF ed estrarre le aliquote
  parsePdfContent(content, cityName) {
    const rates = [];
    const lines = content.split('\n');
    
    // Pattern per individuare le righe con aliquote
    const ratePatterns = [
      {
        pattern: /Abitazione principale.*?A\/1.*?A\/8.*?A\/9/i,
        condition: "Main residence in A/1, A/8, A/9",
        categoryTypes: ["A/1", "A/8", "A/9"]
      },
      {
        pattern: /Assimilazione.*?abitazione principale.*?(anziani.*?disabili|disabili.*?anziani)/i,
        condition: "Assimilation to main residence for elderly/disabled",
        context: "Art. 1, comma 741, lett. c), n. 6), legge n. 160 del 2019"
      },
      {
        pattern: /Fabbricati rurali.*?strumentale.*?D\/10/i,
        condition: "Rural buildings for instrumental use (including D/10)",
        categoryTypes: ["D/10"]
      },
      {
        pattern: /Fabbricati.*?gruppo.*?D.*?esclusa.*?D\/10/i,
        condition: "Buildings in group D (except D/10)",
        categoryTypes: ["D"]
      },
      {
        pattern: /Terreni agricoli/i,
        condition: "Agricultural land"
      },
      {
        pattern: /Aree fabbricabili/i,
        condition: "Buildable land"
      },
      {
        pattern: /Altri fabbricati.*?(diversi.*?abitazione principale|non.*?abitazione principale)/i,
        condition: "Other buildings (not main residence, not group D)"
      }
    ];

    // Parsing del contenuto - cerca solo le righe con testo leggibile
    const cleanLines = lines
      .map(line => this.cleanPdfText(line))
      .filter(line => line.length > 5 && !line.match(/^\d+$/)); // Filtra righe troppo corte o solo numeri

    let i = 0;
    while (i < cleanLines.length) {
      const line = cleanLines[i];
      
      // Identifica le righe che contengono testo delle aliquote
      if (line.includes('Abitazione') || line.includes('Fabbricati') || 
          line.includes('Terreni') || line.includes('Aree') || 
          line.includes('Altri') || line.includes('Assimilazione')) {
        
        // Raccoglie il testo completo (potrebbe essere su più righe)
        let fullText = line;
        let j = i + 1;
        
        // Continua a leggere le righe fino a trovare la percentuale o un nuovo elemento
        while (j < cleanLines.length) {
          const nextLine = cleanLines[j];
          
          // Se trova una percentuale, ferma la raccolta del testo
          if (nextLine.match(/(\d+[,.]?\d*%)|SI|Esenti/i)) {
            break;
          }
          
          // Se trova un nuovo elemento, ferma la raccolta
          if (nextLine.includes('Abitazione') || nextLine.includes('Fabbricati') || 
              nextLine.includes('Terreni') || nextLine.includes('Aree') || 
              nextLine.includes('Altri')) {
            break;
          }
          
          // Aggiunge la riga al testo se contiene contenuto utile
          if (nextLine.length > 0 && nextLine.match(/[a-zA-Z]/)) {
            fullText += ' ' + nextLine;
          }
          
          j++;
        }
        
        // Cerca la percentuale
        let rateText = '';
        for (let k = j; k < Math.min(j + 5, cleanLines.length); k++) {
          const rateLine = cleanLines[k];
          const rateMatch = rateLine.match(/(\d+[,.]?\d*%)|SI|Esenti/i);
          if (rateMatch) {
            rateText = rateMatch[0];
            break;
          }
        }
        
        // Prova a matchare con i pattern e creare le entry
        for (const pattern of ratePatterns) {
          if (pattern.pattern.test(fullText)) {
            let ratePercent = 0;
            
            if (rateText.toLowerCase() === 'si') {
              // Per "SI", usiamo la stessa aliquota dell'abitazione principale
              const mainResidenceRate = rates.find(r => r.categoryTypes && r.categoryTypes.includes("A/1"));
              ratePercent = mainResidenceRate ? mainResidenceRate.ratePercent : 0.6;
            } else if (rateText.toLowerCase().includes('esenti')) {
              ratePercent = 0;
            } else {
              const numericMatch = rateText.match(/(\d+[,.]?\d*)/);
              if (numericMatch) {
                ratePercent = parseFloat(numericMatch[1].replace(',', '.'));
              }
            }
            
            const entry = {
              condition: pattern.condition,
              details: this.cleanPdfText(fullText).trim(),
              ratePercent: ratePercent
            };
            
            if (pattern.categoryTypes) {
              entry.categoryTypes = pattern.categoryTypes;
            }
            
            if (pattern.context) {
              entry.context = pattern.context;
            }
            
            // Gestione speciale per terreni agricoli esenti
            if (pattern.condition === "Agricultural land" && ratePercent === 0) {
              entry.condition = "Agricultural land - EXEMPT";
              entry.context = "Esenzione";
            }
            
            // Evita duplicati
            const isDuplicate = rates.some(existingRate => 
              existingRate.condition === entry.condition && 
              existingRate.ratePercent === entry.ratePercent
            );
            
            if (!isDuplicate) {
              rates.push(entry);
            }
            break;
          }
        }
        
        i = j;
      } else {
        i++;
      }
    }
    
    return rates;
  }

  // Funzione per generare il contenuto del file TypeScript
  generateTypeScriptFile(cityName, rates) {
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
  async processAllPdfs() {
    try {
      // Crea la cartella di output se non esiste
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // Legge tutti i file PDF nella cartella statements
      const files = fs.readdirSync(this.statementsDir)
        .filter(file => file.endsWith('.pdf'))
        .sort(); // Ordine alfabetico

      console.log(`🚀 Trovati ${files.length} file PDF da processare...`);

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
          console.error(`❌ Errore processando ${filename}:`, error.message);
        }
      }
      
      console.log('\n🎉 Processo completato!');
      
    } catch (error) {
      console.error('❌ Errore generale:', error);
    }
  }

  // Funzione per processare un singolo PDF
  async processSinglePdf(filename) {
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
      console.error(`❌ Errore processando ${filename}:`, error.message);
    }
  }
}

// Funzione di utilizzo
async function extractAllImuRates() {
  const statementsDir = process.cwd(); // Usa la cartella corrente (statements)
  const outputDir = path.join(statementsDir, '2025');
  
  const extractor = new ImuRateExtractor(statementsDir, outputDir);
  await extractor.processAllPdfs();
}

async function extractSingleImuRate(filename) {
  const statementsDir = process.cwd(); // Usa la cartella corrente (statements)
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

module.exports = { extractAllImuRates, extractSingleImuRate };