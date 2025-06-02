// Carica le variabili d'ambiente dal file .env.local
require('dotenv').config({ path: '../.env.local' });

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

class AIImuRateExtractor {
  constructor(statementsDir, outputDir, apiKey) {
    this.statementsDir = statementsDir;
    this.outputDir = outputDir;
    
    // Configurazione OpenAI
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY
    });
    
    // Configurazione modelli
    this.modelConfig = {
      primary: "gpt-4o",
      fallback: "gpt-4o-mini",
      maxRetries: 2
    };
  }

  // Funzione per estrarre il nome del comune dal filename
  extractCityName(filename) {
    const nameWithoutExtension = filename.replace('.pdf', '');
    const parts = nameWithoutExtension.split('_');
    // Includiamo sia il nome che la provincia per evitare conflitti
    return parts.length >= 2 ? `${parts[0]}_${parts[1]}` : parts[0];
  }

  // Funzione per convertire il nome del comune in formato camelCase
  toCamelCase(cityName) {
    if (cityName.includes('_')) {
      const [city, province] = cityName.split('_');
      return city.charAt(0).toLowerCase() + city.slice(1) + province.toUpperCase();
    }
    return cityName.charAt(0).toLowerCase() + cityName.slice(1);
  }

  // Funzione per pulire il contenuto PDF base
  cleanPdfContent(content) {
    return content
      // Rimuove header/footer PDF
      .replace(/%PDF-.*?endobj/gs, '')
      // Rimuove comandi di rendering
      .replace(/\d+\.\d+ \d+\.\d+ \d+\.\d+ [A-Za-z]+/g, '')
      // Rimuove parentesi e escape
      .replace(/\\\(|\\\)/g, '')
      .replace(/\(|\)/g, '')
      // Rimuove comandi PDF comuni
      .replace(/Tj|T\*|ET|BT|\/F\d+|\d+ TL|re|B/g, ' ')
      // Pulisce spazi multipli
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Prompt per OpenAI
  createExtractionPrompt(cityName, content) {
    return `Sei un esperto fiscalista italiano specializzato nell'analisi di delibere comunali IMU.

DOCUMENTO: Delibera IMU 2025 del comune di ${cityName}

CONTENUTO PDF:
${content}

COMPITO CRITICO:
Devi estrarre OGNI SINGOLA aliquota IMU presente nel documento, specialmente dalla TABELLA DELLE ALIQUOTE che può estendersi su più pagine.

STRUTTURA RICHIESTA - JSON VALIDO:
{
  "rates": [
    {
      "condition": "descrizione precisa in italiano corretto",
      "details": "testo originale esatto dal PDF",
      "ratePercent": numero_decimale,
      "categoryTypes": ["categorie catastali se presenti"],
      "context": "contesto aggiuntivo se presente",
      "zone": "zone specifiche se menzionate"
    }
  ]
}

ISTRUZIONI SPECIFICHE PER ESTRAZIONE COMPLETA:

📋 CERCA NELLE TABELLE:
- Tabella aliquote IMU / Prospetto aliquote
- Righe che iniziano con: "Abitazione", "Fabbricati", "Terreni", "Aree"
- Colonne con percentuali (es: 0,60%, 1,06%, 0,00%)
- Voci come "SI", "Esenti", "0,00"

📝 GESTIONE CONDIZIONI:
- "Abitazione principale" → ratePercent: valore dalla tabella
- "SI" nelle assimilazioni → usa STESSA aliquota abitazione principale  
- "Esenti" o "0,00%" → ratePercent: 0.0
- Fabbricati gruppo D → sempre escludi D/10 se non specificato

✍️ QUALITÀ ITALIANO:
- Scrivi in italiano formale e corretto
- Usa terminologia fiscale precisa
- Evita anglicismi inutili
- Mantieni il testo originale in "details"

🎯 CATEGORIE STANDARD:
- "Abitazione principale": casa di residenza del proprietario
- "Altri fabbricati": immobili diversi da abitazione principale e gruppo D
- "Fabbricati gruppo D": immobili produttivi/commerciali
- "Terreni agricoli": superfici coltivabili
- "Aree fabbricabili": terreni edificabili

📊 CONVERSIONE PERCENTUALI:
- 0,60% → 0.6
- 1,06% → 1.06  
- Esenti/0,00% → 0.0

⚠️ ATTENZIONE CRITICA:
- NON saltare righe della tabella
- Controlla OGNI pagina se il documento è lungo
- Se trovi "continua" o "segue", cerca il resto
- Includi TUTTE le varianti e casistiche

IMPORTANTE: Restituisci SOLO il JSON valido, senza commenti o spiegazioni aggiuntive.`;
  }

  // Funzione per chiamare OpenAI API
  async analyzeWithAI(cityName, content, useGPT4 = false) {
    const model = useGPT4 ? this.modelConfig.fallback : this.modelConfig.primary;
    
    try {
      console.log(`   🤖 Analizzando con ${model}...`);
      
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: "Sei un esperto fiscalista italiano con 20+ anni di esperienza nell'analisi di delibere comunali IMU. Conosci perfettamente la terminologia fiscale italiana e sai estrarre dati da tabelle complesse anche su più pagine. Rispondi SEMPRE con JSON valido e completo, usando italiano formale e corretto. Non omettere mai righe di tabelle."
          },
          {
            role: "user",
            content: this.createExtractionPrompt(cityName, content)
          }
        ],
        temperature: 0, // Massima precisione e consistenza
        max_tokens: 4000
      });

      const jsonResponse = response.choices[0].message.content.trim();
      
      // Prova a parsare il JSON
      try {
        const parsed = JSON.parse(jsonResponse);
        return parsed.rates || [];
      } catch (parseError) {
        console.log(`   ⚠️  Errore parsing JSON da ${model}, tentativo pulizia...`);
        
        // Prova a estrarre e pulire JSON dal testo
        let jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          let cleanJson = jsonMatch[0];
          
          // Fix comuni per JSON malformato - più aggressivo
          cleanJson = cleanJson
            // Fix ratePercent senza virgola
            .replace(/("ratePercent":\s*\d+(?:\.\d+)?)\s*\n\s*("categoryTypes"|"context"|"zone"|"details")/g, '$1,\n    $2')
            .replace(/("ratePercent":\s*\d+(?:\.\d+)?)\s*\n\s*}/g, '$1\n  }')
            // Fix categoryTypes array senza virgola
            .replace(/("categoryTypes":\s*\[[^\]]*\])\s*\n\s*("context"|"zone")/g, '$1,\n    $2')
            .replace(/("categoryTypes":\s*\[[^\]]*\])\s*\n\s*}/g, '$1\n  }')
            // Fix context senza virgola
            .replace(/("context":\s*"[^"]*")\s*\n\s*("zone")/g, '$1,\n    $2')
            .replace(/("context":\s*"[^"]*")\s*\n\s*}/g, '$1\n  }')
            // Fix details senza virgola
            .replace(/("details":\s*"[^"]*")\s*\n\s*("ratePercent"|"categoryTypes"|"context"|"zone")/g, '$1,\n    $2')
            // Fix condition senza virgola
            .replace(/("condition":\s*"[^"]*")\s*\n\s*("details"|"ratePercent"|"categoryTypes"|"context"|"zone")/g, '$1,\n    $2')
            // Fix oggetti separati da virgola
            .replace(/}\s*\n\s*{/g, '},\n  {')
            // Rimuovi virgole doppie
            .replace(/,,/g, ',')
            // Fix specifico per il nostro formato
            .replace(/(\d+(?:\.\d+)?)\s*\n\s*(categoryTypes|context|zone):/g, '$1,\n    $2:')
            .replace(/(\])\s*\n\s*(categoryTypes|context|zone):/g, '$1,\n    $2:')
            .replace(/(\])\s*\n\s*}/g, '$1\n  }');
          
          try {
            const parsed = JSON.parse(cleanJson);
            return parsed.rates || [];
          } catch (cleanError) {
            console.log(`   ⚠️  Pulizia JSON fallita, errore: ${cleanError.message}`);
          }
        }
        
        throw parseError;
      }
      
    } catch (error) {
      console.error(`   ❌ Errore API ${model}:`, error.message);
      throw error;
    }
  }

  // Funzione per processare con fallback intelligente
  async extractRatesWithAI(cityName, content) {
    let rates = [];
    let lastError = null;

    // Pulisce il contenuto base
    const cleanContent = this.cleanPdfContent(content);
    
    // Se il contenuto è troppo lungo, prende solo la parte rilevante
    const relevantContent = this.extractRelevantSection(cleanContent);
    
    try {
      // Primo tentativo con GPT-4o-mini
      rates = await this.analyzeWithAI(cityName, relevantContent, false);
      
      if (rates.length === 0) {
        console.log(`   🔄 Nessuna aliquota trovata con GPT-4o-mini, provo con GPT-4o...`);
        rates = await this.analyzeWithAI(cityName, relevantContent, true);
      }
      
    } catch (error) {
      lastError = error;
      
      // Fallback a GPT-4o se GPT-4o-mini fallisce
      if (!error.message.includes('gpt-4o')) {
        try {
          console.log(`   🔄 Errore con GPT-4o-mini, provo con GPT-4o...`);
          rates = await this.analyzeWithAI(cityName, relevantContent, true);
        } catch (fallbackError) {
          lastError = fallbackError;
        }
      }
    }

    if (rates.length === 0 && lastError) {
      throw new Error(`Fallimento estrazione AI: ${lastError.message}`);
    }

    return rates;
  }

  // Estrae solo la sezione rilevante del PDF per ridurre token
  extractRelevantSection(content) {
    const lines = content.split('\n');
    const relevantLines = [];
    let inRelevantSection = false;
    let foundTable = false;
    
    for (const line of lines) {
      const cleanLine = line.trim();
      
      // Parole chiave per iniziare sezione rilevante
      if (cleanLine.match(/abitazione\s+principale/i) || 
          cleanLine.match(/prospetto.*aliquot/i) ||
          cleanLine.match(/tabella.*aliquot/i) ||
          cleanLine.match(/aliquote.*imu/i) ||
          cleanLine.match(/tipologia.*immobile/i)) {
        inRelevantSection = true;
        foundTable = true;
      }
      
      // Mantieni sezione se contiene elementi di tabella
      if (cleanLine.match(/\d+[,\.]\d+\s*%/) || // Percentuali
          cleanLine.match(/\b(SI|Esenti|0,00)\b/i) || // Valori speciali
          cleanLine.match(/fabbricati.*gruppo\s*d/i) || // Fabbricati gruppo D
          cleanLine.match(/terreni.*agricol/i) || // Terreni agricoli
          cleanLine.match(/aree.*fabbricabil/i) || // Aree fabbricabili
          cleanLine.match(/categoria.*catasal/i) || // Categorie catastali
          cleanLine.match(/[ABC]\/\d+/)) { // Categorie A/1, B/2, C/3, etc.
        inRelevantSection = true;
        foundTable = true;
      }
      
      // Fine sezione solo se chiaramente fuori dalla tabella
      if (cleanLine.match(/elenco.*esenzioni/i) ||
          cleanLine.match(/precisazioni/i) ||
          cleanLine.match(/documento.*generato/i) ||
          cleanLine.match(/deliberazione.*n/i) ||
          cleanLine.match(/visto.*decreti/i)) {
        // Solo se abbiamo già trovato una tabella, altrimenti continua
        if (foundTable) {
          inRelevantSection = false;
        }
      }
      
      // Includi righe rilevanti o che contengono informazioni utili
      if (inRelevantSection || 
          cleanLine.match(/abitazione/i) || 
          cleanLine.match(/fabbricat/i) || 
          cleanLine.match(/terreni/i) || 
          cleanLine.match(/aree/i) ||
          cleanLine.match(/\d+[,\.]\d+\s*%/) || // Qualsiasi percentuale
          cleanLine.match(/\b(SI|Esenti)\b/i) ||
          cleanLine.match(/[ABC]\/\d+/) || // Categorie catastali
          cleanLine.match(/gruppo\s*d/i)) {
        relevantLines.push(cleanLine);
      }
    }
    
    // Se non abbiamo trovato una tabella strutturata, prendi più contenuto
    if (!foundTable) {
      console.log('   ⚠️ Tabella non rilevata chiaramente, estendo ricerca...');
      const allLines = content.split('\n').map(l => l.trim());
      return allLines.slice(0, 1500).join('\n'); // Prime 1500 righe
    }
    
    // Limita a 12000 caratteri per tabelle complesse
    const result = relevantLines.join('\n');
    return result.length > 12000 ? result.substring(0, 12000) + '...' : result;
  }

  // Genera il file TypeScript
  generateTypeScriptFile(cityName, rates) {
    // Rimuove l'underscore dal nome per la costante
    const cleanCityName = cityName.replace('_', '');
    const constantName = `imuRates${cleanCityName}2025`;
    
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

  // Processare un singolo PDF
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
      
      const rates = await this.extractRatesWithAI(cityName, content);
      
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

  // Processare tutti i PDF
  async processAllPdfs() {
    try {
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      const files = fs.readdirSync(this.statementsDir)
        .filter(file => file.endsWith('.pdf'))
        .sort();

      console.log(`🚀 Trovati ${files.length} file PDF da processare con AI...`);
      console.log(`🤖 Modelli: ${this.modelConfig.primary} (primario), ${this.modelConfig.fallback} (fallback)`);

      // Conta i file già processati
      let skipped = 0;
      let processed = 0;

      for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        const cityName = this.extractCityName(filename);
        const outputFilename = `${this.toCamelCase(cityName)}2025.ts`;
        const outputPath = path.join(this.outputDir, outputFilename);
        
        // Salta se il file è già stato processato
        if (fs.existsSync(outputPath)) {
          skipped++;
          if (skipped % 100 === 0) { // Log ogni 100 file saltati
            console.log(`⏭️  Saltati ${skipped} file già processati...`);
          }
          continue;
        }
        
        console.log(`\n[${i + 1}/${files.length}] Processando: ${filename} (Nuovi: ${processed + 1}, Saltati: ${skipped})`);
        
        try {
          await this.processSinglePdf(filename);
          processed++;
          
          // Piccola pausa per evitare rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`❌ Errore processando ${filename}:`, error.message);
        }
      }
      
      console.log(`\n🎉 Processo AI completato!`);
      console.log(`📊 Statistiche: ${processed} nuovi processati, ${skipped} già esistenti saltati`);
      
    } catch (error) {
      console.error('❌ Errore generale:', error);
    }
  }
}

// Funzioni di utilizzo
async function extractAllImuRatesWithAI(apiKey) {
  const statementsDir = path.join(__dirname, '../data/statements');
  const outputDir = path.join(statementsDir, '2025');
  
  const extractor = new AIImuRateExtractor(statementsDir, outputDir, apiKey);
  await extractor.processAllPdfs();
}

async function extractSingleImuRateWithAI(filename, apiKey) {
  const statementsDir = path.join(__dirname, '../data/statements');
  const outputDir = path.join(statementsDir, '2025');
  
  const extractor = new AIImuRateExtractor(statementsDir, outputDir, apiKey);
  await extractor.processSinglePdf(filename);
}

// Esecuzione diretta
if (require.main === module) {
  const args = process.argv.slice(2);
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Imposta la variabile OPENAI_API_KEY o passala come parametro');
    console.log('Uso: OPENAI_API_KEY=your_key node aiExtraction.js [filename]');
    process.exit(1);
  }
  
  if (args.length === 0) {
    console.log('🚀 Avvio estrazione AI di tutte le aliquote IMU...');
    extractAllImuRatesWithAI(apiKey);
  } else {
    console.log(`🎯 Estrazione AI singola per: ${args[0]}`);
    extractSingleImuRateWithAI(args[0], apiKey);
  }
}

module.exports = { extractAllImuRatesWithAI, extractSingleImuRateWithAI, AIImuRateExtractor }; 