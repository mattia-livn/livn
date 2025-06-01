import { getFileFromBucket } from './supabaseClient';
import { analyzePdfContent } from './pdfProcessor';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface UserData {
  codiceFiscale?: string;
  comune?: string;
  categoria?: string;
  superficie?: number;
  rendita?: number;
  [key: string]: any;
}

interface AnalysisResult {
  datiRaccolti: any;
  domande: string[];
  matchFound: boolean;
  reasoning: string;
}

export const processImuStatement = async (
  fileName: string, 
  userData: UserData
): Promise<AnalysisResult | null> => {
  try {
    // 1. Scarica il file PDF da Supabase
    console.log(`Scaricando il file: ${fileName}`);
    const pdfData = await getFileFromBucket(fileName);
    
    if (!pdfData) {
      throw new Error('File non trovato nel bucket Supabase');
    }

    // 2. Converte il Blob in ArrayBuffer
    const arrayBuffer = await pdfData.arrayBuffer();

    // 3. Analizza il contenuto del PDF con AI
    console.log('Analizzando il contenuto del PDF...');
    const pdfContent = await analyzePdfContent(arrayBuffer);
    
    if (!pdfContent) {
      throw new Error('Impossibile analizzare il contenuto del PDF');
    }

    // 4. Esegue il matching con i dati utente
    console.log('Eseguendo il matching con i dati utente...');
    const analysisResult = await performMatching(pdfContent, userData);

    return analysisResult;

  } catch (error) {
    console.error('Errore nel processamento dello statement IMU:', error);
    return null;
  }
};

const performMatching = async (
  pdfContent: string, 
  userData: UserData
): Promise<AnalysisResult> => {
  try {
    const prompt = `
    Analizza il seguente contenuto di un documento IMU e confrontalo con i dati forniti dall'utente.
    
    CONTENUTO DEL DOCUMENTO:
    ${pdfContent}
    
    DATI UTENTE:
    ${JSON.stringify(userData, null, 2)}
    
    Esegui le seguenti operazioni:
    1. Estrai tutti i dati rilevanti dal documento
    2. Confronta i dati con quelli forniti dall'utente
    3. Identifica eventuali discrepanze o informazioni mancanti
    4. Genera domande specifiche per chiarire eventuali ambiguità
    5. Fornisci un ragionamento dettagliato
    
    Rispondi in formato JSON con questa struttura:
    {
      "datiRaccolti": {
        "codiceFiscale": "...",
        "comune": "...",
        "categoria": "...",
        "superficie": 0,
        "rendita": 0,
        "altri_dati": "..."
      },
      "matchFound": true/false,
      "reasoning": "Spiegazione dettagliata del matching...",
      "domande": ["Domanda 1?", "Domanda 2?"]
    }
    `;

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.3,
    });

    const result = response.choices[0].text?.trim();
    
    if (!result) {
      throw new Error('Nessuna risposta dall\'AI');
    }

    return JSON.parse(result);

  } catch (error) {
    console.error('Errore nel matching:', error);
    return {
      datiRaccolti: {},
      domande: ['Si è verificato un errore nell\'analisi. Puoi fornire manualmente i dati?'],
      matchFound: false,
      reasoning: 'Errore durante l\'elaborazione'
    };
  }
};

export const displayResults = (result: AnalysisResult) => {
  console.log('\n=== RISULTATI ANALISI IMU ===');
  console.log('\nDati raccolti:');
  console.log(JSON.stringify(result.datiRaccolti, null, 2));
  
  console.log('\nRagionamento:');
  console.log(result.reasoning);
  
  if (result.domande.length > 0) {
    console.log('\nDomande per l\'utente:');
    result.domande.forEach((domanda, index) => {
      console.log(`${index + 1}. ${domanda}`);
    });
  }
  
  console.log(`\nMatch trovato: ${result.matchFound ? 'Sì' : 'No'}`);
}; 