"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayIMUResults = exports.calculateIMUWithAI = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const openai_1 = __importDefault(require("openai"));
const imuValidator_1 = require("./imuValidator");
// Verifica che la chiave API sia configurata
if (!process.env.OPENAI_API_KEY) {
    console.error('⚠️ OPENAI_API_KEY non configurata nel file .env');
}
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || '',
});
const calculateIMUWithAI = async (cadastralData, municipalRate = 10.6 // per mille, default rate
) => {
    var _a, _b;
    try {
        // Carica i file di contesto dalla cartella data
        const contextFiles = await loadContextFiles();
        const prompt = `
Tu sei un esperto consulente fiscale specializzato nel calcolo dell'IMU (Imposta Municipale Unica).

CONTESTO E REGOLE:
${contextFiles}

DATI CATASTALI DA ANALIZZARE:
${JSON.stringify(cadastralData, null, 2)}

ALIQUOTA COMUNALE: ${municipalRate} per mille

ISTRUZIONI:
1. Analizza ogni particella catastale
2. Determina se è soggetta a IMU
3. Applica la formula corretta in base al tipo (fabbricato/terreno)
4. Usa i coefficienti corretti per categoria catastale
5. Considera quote di possesso e giorni di possesso
6. Calcola l'IMU per ogni particella
7. Fornisci il totale complessivo

FORMULA FABBRICATI:
IMU = ((Rendita Catastale × 1.05) × Coefficiente Categoria) × (Aliquota / 1000) × (Giorni Possesso / 365) × Quota Possesso

FORMULA TERRENI AGRICOLI:
IMU = (Reddito Dominicale × 1.25 × 135) × (Aliquota / 1000) × (Giorni Possesso / 365) × Quota Possesso

RISPOSTA RICHIESTA (formato JSON):
{
  "totalIMU": 0,
  "detailedCalculations": [
    {
      "parcel": {...},
      "imu": 0,
      "formula": "dettagli del calcolo",
      "reasoning": "spiegazione del perché questo calcolo"
    }
  ],
  "summary": "Riassunto completo del calcolo IMU",
  "questions": ["Eventuali domande per chiarimenti"]
}
`;
        console.log('🤖 Esecuzione calcolo AI...');
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'Sei un esperto consulente fiscale specializzato nel calcolo dell\'IMU. Rispondi sempre in italiano e fornisci calcoli precisi e dettagliati.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.1,
        });
        const result = (_b = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.trim();
        if (!result) {
            throw new Error('Nessuna risposta dall\'AI');
        }
        // Estrai il JSON dalla risposta
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Formato JSON non trovato nella risposta');
        }
        const aiResult = JSON.parse(jsonMatch[0]);
        // 🔍 VALIDAZIONE DEI CALCOLI AI
        console.log('🔍 Validazione calcoli AI con sistema deterministico...');
        const validatedResult = (0, imuValidator_1.validateAICalculation)(aiResult, cadastralData.parcels, municipalRate);
        // Log delle correzioni se applicate
        if (!validatedResult.allCalculationsValid) {
            console.log('⚠️ Correzioni applicate dal validatore:');
            validatedResult.validationNotes.forEach(note => console.log(`   ${note}`));
        }
        else {
            console.log('✅ Tutti i calcoli AI validati come corretti');
        }
        return {
            totalIMU: validatedResult.totalIMU,
            detailedCalculations: validatedResult.detailedCalculations.map(calc => ({
                parcel: calc.parcel,
                imu: calc.imu,
                formula: calc.formula,
                reasoning: calc.reasoning
            })),
            summary: validatedResult.summary,
            questions: aiResult.questions || []
        };
    }
    catch (error) {
        console.error('Errore nel calcolo IMU:', error);
        return {
            totalIMU: 0,
            detailedCalculations: [],
            summary: `Errore durante il calcolo: ${error}`,
            questions: ['Si è verificato un errore. Vuoi fornire i dati manualmente?']
        };
    }
};
exports.calculateIMUWithAI = calculateIMUWithAI;
const loadContextFiles = async () => {
    try {
        const dataDir = (0, path_1.join)(process.cwd(), 'data');
        let context = '';
        // Leggi tutti i file .ts nella cartella data
        const files = [
            'cadastral_categories.ts',
            'imu_buildings.ts',
            'imu_agricultural_lands.ts',
            'imu_buildable_lands.ts',
            'agricultural_land_categories.ts'
        ];
        for (const file of files) {
            try {
                const filePath = (0, path_1.join)(dataDir, file);
                const content = (0, fs_1.readFileSync)(filePath, 'utf-8');
                context += `\n\n=== ${file} ===\n${content}`;
            }
            catch (err) {
                console.warn(`File ${file} non trovato o non leggibile`);
            }
        }
        return context;
    }
    catch (error) {
        console.error('Errore nel caricamento dei file di contesto:', error);
        return 'Errore nel caricamento delle regole IMU';
    }
};
const displayIMUResults = (result) => {
    console.log('\n=== 🏛️ CALCOLO IMU COMPLETATO ===');
    console.log(`\n💰 TOTALE IMU DA PAGARE: €${result.totalIMU.toFixed(2)}`);
    console.log('\n📊 DETTAGLIO CALCOLI:');
    result.detailedCalculations.forEach((calc, index) => {
        console.log(`\n${index + 1}. ${calc.parcel.category} - ${calc.parcel.description}`);
        console.log(`   💶 IMU: €${calc.imu.toFixed(2)}`);
        console.log(`   🔢 Formula: ${calc.formula}`);
        console.log(`   💭 Motivazione: ${calc.reasoning}`);
    });
    console.log('\n📝 RIEPILOGO:');
    console.log(result.summary);
    if (result.questions && result.questions.length > 0) {
        console.log('\n❓ DOMANDE PER CHIARIMENTI:');
        result.questions.forEach((question, index) => {
            console.log(`${index + 1}. ${question}`);
        });
    }
};
exports.displayIMUResults = displayIMUResults;
//# sourceMappingURL=imuCalculator.js.map