import OpenAI from 'openai';
import supabase from './supabaseClient';
import { processAdvancedPDF } from './advancedPdfProcessor';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Funzione aggiornata per estrarre testo da PDF usando pdf-parse
async function processPDF(fileData: Blob): Promise<string> {
  try {
    console.log('🔄 Elaborazione PDF con pdf-parse...');
    
    // Usa il processore avanzato
    const extractedData = await processAdvancedPDF(fileData);
    
    console.log(`📄 Estrazione completata:`);
    console.log(`   📝 Testo: ${extractedData.text.length} caratteri`);
    console.log(`   📊 Tabelle: ${extractedData.tables.length}`);
    console.log(`   🎯 Confidenza: ${extractedData.confidence}`);
    console.log(`   📋 Pagine: ${extractedData.metadata.pages}`);
    
    if (extractedData.confidence === 'low') {
      console.warn('⚠️ Qualità estrazione bassa - considera OCR per PDF scansionati');
    }
    
    return extractedData.text || '[NESSUN TESTO ESTRATTO]';
    
  } catch (error) {
    console.error('❌ Errore nell\'estrazione PDF avanzata:', error);
    return `[ERRORE NELL'ESTRAZIONE DEL TESTO: ${error instanceof Error ? error.message : 'Errore sconosciuto'}]`;
  }
}

export interface DeliberaAnalysis {
  municipalityInfo: {
    name: string;
    province: string;
    deliberaNumber?: string;
    year?: number;
  };
  imuRates: {
    standardRate?: number;
    primaryResidence?: number;
    commercialProperties?: number;
    industrialProperties?: number;
    agriculturalLand?: number;
    buildableLand?: number;
  };
  exemptions: string[];
  specialRules: string[];
  categories: {
    category: string;
    coefficient: number;
    specificRate?: number;
  }[];
  analysisConfidence: 'high' | 'medium' | 'low';
  extractedText: string;
  errors?: string[];
}

export async function analyzeDeliberaFromSupabase(
  bucketName: string = 'imu',
  fileName: string,
  folderPath: string = 'statements/2025'
): Promise<DeliberaAnalysis> {
  try {
    const fullPath = `${folderPath}/${fileName}`;
    console.log(`📄 Scaricamento delibera: ${fullPath} dal bucket ${bucketName}`);
    
    // 1. Scarica il file da Supabase
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(bucketName)
      .download(fullPath);
    
    if (downloadError) {
      throw new Error(`Errore download da Supabase: ${downloadError.message}`);
    }
    
    if (!fileData) {
      throw new Error('File non trovato nel bucket');
    }
    
    console.log(`📋 File scaricato, dimensione: ${fileData.size} bytes`);
    
    // 2. Estrai testo dal PDF
    const pdfText = await processPDF(fileData);
    console.log(`📝 Testo estratto: ${pdfText.length} caratteri`);
    
    // 3. Analizza con AI
    const analysis = await analyzeDeliberaText(pdfText, fileName);
    
    return {
      ...analysis,
      extractedText: pdfText.substring(0, 1000) + '...' // Prime 1000 caratteri per brevità
    };
    
  } catch (error) {
    console.error('Errore nell\'analisi della delibera:', error);
    return {
      municipalityInfo: {
        name: 'Errore',
        province: 'XX'
      },
      imuRates: {},
      exemptions: [],
      specialRules: [],
      categories: [],
      analysisConfidence: 'low',
      extractedText: '',
      errors: [error instanceof Error ? error.message : 'Errore sconosciuto']
    };
  }
}

async function analyzeDeliberaText(text: string, fileName: string): Promise<Omit<DeliberaAnalysis, 'extractedText'>> {
  const prompt = `
Analizza questo testo di una delibera comunale italiana sull'IMU e estrai le informazioni fiscali principali.

NOME FILE: ${fileName}

TESTO DELIBERA:
${text}

Estrai e struttura le seguenti informazioni in formato JSON:

{
  "municipalityInfo": {
    "name": "Nome del comune",
    "province": "Sigla provincia", 
    "deliberaNumber": "Numero delibera",
    "year": 2025
  },
  "imuRates": {
    "standardRate": 10.6,
    "primaryResidence": 4.0,
    "commercialProperties": 10.6,
    "industrialProperties": 10.6,
    "agriculturalLand": 10.6,
    "buildableLand": 10.6
  },
  "exemptions": [
    "Lista delle esenzioni trovate"
  ],
  "specialRules": [
    "Regole speciali o riduzioni"
  ],
  "categories": [
    {
      "category": "A/1",
      "coefficient": 160,
      "specificRate": 10.6
    }
  ],
  "analysisConfidence": "high|medium|low"
}

ISTRUZIONI:
1. Cerca aliquote IMU espresse in per mille (‰) o percentuale (%)
2. Identifica categorie catastali e loro coefficienti
3. Trova esenzioni per prima casa, disabili, etc.
4. Cerca riduzioni per famiglie numerose o altri casi
5. Determina il livello di confidenza dell'analisi
6. Se non trovi informazioni, usa null o array vuoti
7. Le aliquote sono tipicamente tra 0.1% e 1.06%

Rispondi SOLO con il JSON, senza altro testo.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Sei un esperto in normativa fiscale italiana, specializzato nell\'analisi di delibere comunali IMU. Estrai informazioni precise e strutturate.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.1,
    });

    const result = response.choices[0].message?.content?.trim();
    
    if (!result) {
      throw new Error('Nessuna risposta dall\'AI');
    }

    // Estrai il JSON dalla risposta
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Formato JSON non trovato nella risposta AI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    
    // Valida e pulisci i dati
    return validateAndCleanAnalysis(analysis);
    
  } catch (error) {
    console.error('Errore nell\'analisi AI della delibera:', error);
    return {
      municipalityInfo: { name: 'Analisi fallita', province: 'XX' },
      imuRates: {},
      exemptions: [],
      specialRules: [],
      categories: [],
      analysisConfidence: 'low',
      errors: [error instanceof Error ? error.message : 'Errore AI']
    };
  }
}

function validateAndCleanAnalysis(analysis: any): Omit<DeliberaAnalysis, 'extractedText'> {
  // Sanitizza e valida i dati estratti dall'AI
  const cleaned = {
    municipalityInfo: {
      name: analysis.municipalityInfo?.name || 'Non trovato',
      province: analysis.municipalityInfo?.province || 'XX',
      deliberaNumber: analysis.municipalityInfo?.deliberaNumber || undefined,
      year: analysis.municipalityInfo?.year || new Date().getFullYear()
    },
    imuRates: {
      standardRate: validateRate(analysis.imuRates?.standardRate),
      primaryResidence: validateRate(analysis.imuRates?.primaryResidence),
      commercialProperties: validateRate(analysis.imuRates?.commercialProperties),
      industrialProperties: validateRate(analysis.imuRates?.industrialProperties),
      agriculturalLand: validateRate(analysis.imuRates?.agriculturalLand),
      buildableLand: validateRate(analysis.imuRates?.buildableLand)
    },
    exemptions: Array.isArray(analysis.exemptions) ? analysis.exemptions : [],
    specialRules: Array.isArray(analysis.specialRules) ? analysis.specialRules : [],
    categories: Array.isArray(analysis.categories) ? analysis.categories.filter((cat: any) => 
      cat.category && typeof cat.coefficient === 'number'
    ) : [],
    analysisConfidence: ['high', 'medium', 'low'].includes(analysis.analysisConfidence) 
      ? analysis.analysisConfidence 
      : 'medium'
  };

  return cleaned;
}

function validateRate(rate: any): number | undefined {
  if (typeof rate !== 'number') return undefined;
  
  // Le aliquote IMU sono tipicamente tra 0.1‰ (0.01%) e 10.6‰ (1.06%)
  if (rate < 0.01 || rate > 20) return undefined;
  
  // Se il valore sembra essere in percentuale (es. 1.06) convertilo in per mille (10.6)
  if (rate < 2) {
    return Math.round(rate * 1000) / 100; // da % a ‰
  }
  
  return Math.round(rate * 100) / 100; // arrotonda a 2 decimali
}

export async function listDelibereInBucket(
  bucketName: string = 'imu', 
  folderPath: string = 'statements/2025'
): Promise<string[]> {
  try {
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath);
    
    if (error) {
      throw new Error(`Errore nel listare i file: ${error.message}`);
    }
    
    console.log(`📂 Trovati ${files?.length || 0} file nella cartella ${folderPath}`);
    
    return files?.map((file: any) => file.name).filter((name: string) => 
      name.toLowerCase().endsWith('.pdf')
    ) || [];
    
  } catch (error) {
    console.error('Errore nel listare le delibere:', error);
    return [];
  }
} 