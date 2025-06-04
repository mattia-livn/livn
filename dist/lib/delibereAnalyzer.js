"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDeliberaFromSupabase = analyzeDeliberaFromSupabase;
exports.listDelibereInBucket = listDelibereInBucket;
const openai_1 = __importDefault(require("openai"));
const supabaseClient_1 = __importDefault(require("./supabaseClient"));
const advancedPdfProcessor_1 = require("./advancedPdfProcessor");
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || '',
});
// Funzione aggiornata per estrarre testo da PDF usando pdf-parse
async function processPDF(fileData) {
    try {
        console.log('🔄 Elaborazione PDF con pdf-parse...');
        // Usa il processore avanzato
        const extractedData = await (0, advancedPdfProcessor_1.processAdvancedPDF)(fileData);
        console.log(`📄 Estrazione completata:`);
        console.log(`   📝 Testo: ${extractedData.text.length} caratteri`);
        console.log(`   📊 Tabelle: ${extractedData.tables.length}`);
        console.log(`   🎯 Confidenza: ${extractedData.confidence}`);
        console.log(`   📋 Pagine: ${extractedData.metadata.pages}`);
        if (extractedData.confidence === 'low') {
            console.warn('⚠️ Qualità estrazione bassa - considera OCR per PDF scansionati');
        }
        return extractedData.text || '[NESSUN TESTO ESTRATTO]';
    }
    catch (error) {
        console.error('❌ Errore nell\'estrazione PDF avanzata:', error);
        return `[ERRORE NELL'ESTRAZIONE DEL TESTO: ${error instanceof Error ? error.message : 'Errore sconosciuto'}]`;
    }
}
async function analyzeDeliberaFromSupabase(bucketName = 'imu', fileName, folderPath = 'statements/2025') {
    try {
        const fullPath = `${folderPath}/${fileName}`;
        console.log(`📄 Scaricamento delibera: ${fullPath} dal bucket ${bucketName}`);
        // 1. Scarica il file da Supabase
        const { data: fileData, error: downloadError } = await supabaseClient_1.default.storage
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
        return Object.assign(Object.assign({}, analysis), { extractedText: pdfText.substring(0, 1000) + '...' // Prime 1000 caratteri per brevità
         });
    }
    catch (error) {
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
async function analyzeDeliberaText(text, fileName) {
    var _a, _b;
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
        const result = (_b = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.trim();
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
    }
    catch (error) {
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
function validateAndCleanAnalysis(analysis) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Sanitizza e valida i dati estratti dall'AI
    const cleaned = {
        municipalityInfo: {
            name: ((_a = analysis.municipalityInfo) === null || _a === void 0 ? void 0 : _a.name) || 'Non trovato',
            province: ((_b = analysis.municipalityInfo) === null || _b === void 0 ? void 0 : _b.province) || 'XX',
            deliberaNumber: ((_c = analysis.municipalityInfo) === null || _c === void 0 ? void 0 : _c.deliberaNumber) || undefined,
            year: ((_d = analysis.municipalityInfo) === null || _d === void 0 ? void 0 : _d.year) || new Date().getFullYear()
        },
        imuRates: {
            standardRate: validateRate((_e = analysis.imuRates) === null || _e === void 0 ? void 0 : _e.standardRate),
            primaryResidence: validateRate((_f = analysis.imuRates) === null || _f === void 0 ? void 0 : _f.primaryResidence),
            commercialProperties: validateRate((_g = analysis.imuRates) === null || _g === void 0 ? void 0 : _g.commercialProperties),
            industrialProperties: validateRate((_h = analysis.imuRates) === null || _h === void 0 ? void 0 : _h.industrialProperties),
            agriculturalLand: validateRate((_j = analysis.imuRates) === null || _j === void 0 ? void 0 : _j.agriculturalLand),
            buildableLand: validateRate((_k = analysis.imuRates) === null || _k === void 0 ? void 0 : _k.buildableLand)
        },
        exemptions: Array.isArray(analysis.exemptions) ? analysis.exemptions : [],
        specialRules: Array.isArray(analysis.specialRules) ? analysis.specialRules : [],
        categories: Array.isArray(analysis.categories) ? analysis.categories.filter((cat) => cat.category && typeof cat.coefficient === 'number') : [],
        analysisConfidence: ['high', 'medium', 'low'].includes(analysis.analysisConfidence)
            ? analysis.analysisConfidence
            : 'medium'
    };
    return cleaned;
}
function validateRate(rate) {
    if (typeof rate !== 'number')
        return undefined;
    // Le aliquote IMU sono tipicamente tra 0.1‰ (0.01%) e 10.6‰ (1.06%)
    if (rate < 0.01 || rate > 20)
        return undefined;
    // Se il valore sembra essere in percentuale (es. 1.06) convertilo in per mille (10.6)
    if (rate < 2) {
        return Math.round(rate * 1000) / 100; // da % a ‰
    }
    return Math.round(rate * 100) / 100; // arrotonda a 2 decimali
}
async function listDelibereInBucket(bucketName = 'imu', folderPath = 'statements/2025') {
    try {
        const { data: files, error } = await supabaseClient_1.default.storage
            .from(bucketName)
            .list(folderPath);
        if (error) {
            throw new Error(`Errore nel listare i file: ${error.message}`);
        }
        console.log(`📂 Trovati ${(files === null || files === void 0 ? void 0 : files.length) || 0} file nella cartella ${folderPath}`);
        return (files === null || files === void 0 ? void 0 : files.map((file) => file.name).filter((name) => name.toLowerCase().endsWith('.pdf'))) || [];
    }
    catch (error) {
        console.error('Errore nel listare le delibere:', error);
        return [];
    }
}
//# sourceMappingURL=delibereAnalyzer.js.map