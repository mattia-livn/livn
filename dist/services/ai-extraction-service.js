"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIExtractionService = void 0;
const openai_1 = __importDefault(require("openai"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
/**
 * Servizio per l'estrazione AI-powered di dati catastali
 */
class AIExtractionService {
    constructor() {
        // Inizializza OpenAI con la chiave da .env.local
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey || apiKey === 'your-openai-api-key-here') {
            console.warn('⚠️ ATTENZIONE: Chiave OpenAI non configurata!');
            console.warn('   Aggiungi OPENAI_API_KEY nel file .env.local');
            console.warn('   Il servizio AI non funzionerà senza una chiave valida.');
        }
        else {
            console.log('✅ Chiave OpenAI caricata correttamente');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey || 'invalid-key'
        });
    }
    /**
     * Estrae dati catastali da file usando AI
     */
    async extractCatastralData(fileBuffer, fileName, mimeType) {
        try {
            console.log(`🤖 === INIZIO ESTRAZIONE AI ===`);
            console.log(`📁 File: ${fileName} (${mimeType})`);
            // 1. Estrai testo dal file
            const extractedText = await this.extractTextFromFile(fileBuffer, mimeType);
            if (!extractedText || extractedText.trim().length === 0) {
                return {
                    success: false,
                    confidence: 0,
                    fabbricati: [],
                    terreni: [],
                    errors: ['Impossibile estrarre testo dal file'],
                    warnings: []
                };
            }
            console.log(`📄 Testo estratto (${extractedText.length} caratteri)`);
            console.log(`📄 Preview: "${extractedText.substring(0, 200)}..."`);
            // 2. Analizza con OpenAI
            const aiResult = await this.analyzeWithAI(extractedText, fileName);
            console.log(`🤖 Analisi AI completata:`);
            console.log(`  ✅ Successo: ${aiResult.success}`);
            console.log(`  🎯 Confidenza: ${aiResult.confidence}%`);
            console.log(`  🏠 Fabbricati: ${aiResult.fabbricati.length}`);
            console.log(`  🌱 Terreni: ${aiResult.terreni.length}`);
            return aiResult;
        }
        catch (error) {
            console.error('❌ Errore estrazione AI:', error);
            return {
                success: false,
                confidence: 0,
                fabbricati: [],
                terreni: [],
                errors: [`Errore durante l'estrazione AI: ${error.message}`],
                warnings: []
            };
        }
    }
    /**
     * Estrae testo da diversi tipi di file
     */
    async extractTextFromFile(buffer, mimeType) {
        try {
            if (mimeType === 'application/pdf') {
                // Estrazione da PDF
                const pdfData = await (0, pdf_parse_1.default)(buffer);
                return pdfData.text;
            }
            else if (mimeType.startsWith('text/')) {
                // File di testo semplice
                return buffer.toString('utf-8');
            }
            else {
                // Prova a interpretare come testo UTF-8
                return buffer.toString('utf-8');
            }
        }
        catch (error) {
            console.error('❌ Errore estrazione testo:', error);
            throw new Error(`Impossibile estrarre testo da file tipo ${mimeType}`);
        }
    }
    /**
     * Analizza il testo estratto con OpenAI
     */
    async analyzeWithAI(text, fileName) {
        const systemPrompt = `Sei un esperto nell'analisi di visure catastali italiane. Il tuo compito è estrarre in modo preciso e completo tutti i dati degli immobili (fabbricati e terreni) dal testo fornito, inclusi i dati dei proprietari.

IMPORTANTE: Restituisci SOLO un oggetto JSON valido, senza testo aggiuntivo.

Formato di output richiesto:
{
  "success": boolean,
  "confidence": number (0-100),
  "fabbricati": [
    {
      "foglio": string,
      "particella": string,
      "subalterno": string,
      "categoria": string,
      "classe": string,
      "consistenza": string,
      "superficie": number,
      "rendita": number,
      "ubicazione": string,
      "comune": string,
      "provincia": string,
      "proprietario": {
        "denominazione": string,
        "codiceFiscale": string,
        "titolarita": string,
        "quota": {
          "numeratore": number,
          "denominatore": number
        }
      }
    }
  ],
  "terreni": [
    {
      "foglio": string,
      "particella": string,
      "qualita": string,
      "classe": string,
      "superficie": number,
      "redditoDominicale": number,
      "redditoAgrario": number,
      "comune": string,
      "provincia": string,
      "proprietario": {
        "denominazione": string,
        "codiceFiscale": string,
        "titolarita": string,
        "quota": {
          "numeratore": number,
          "denominatore": number
        }
      }
    }
  ],
  "errors": string[],
  "warnings": string[]
}

Regole di estrazione SPECIFICHE:
1. Estrai TUTTI i fabbricati e terreni presenti nel documento, inclusi quelli in tabelle
2. SUBALTERNO: Cerca sempre il subalterno (Sub, Subalt, S.) per i fabbricati. Se non specificato, usa "0"
3. TITOLARITÀ: Estrai informazioni su proprietari, usufruttuari, nuda proprietà, ecc.
   - Cerca pattern come "PROPRIETA'", "PROPRIETA", "NUDA PROPRIETA'", "USUFRUTTO", "DIRITTO DI SUPERFICIE"
   - Cerca abbreviazioni come "PROP", "NP", "USU", "US", "AB" (abitazione)
   - Se non specificato chiaramente, NON assumere "Proprietà" - usa "Non specificata"
4. QUOTA: Estrai le quote di proprietà (es. "1/2", "2/4", "per intero" = 1/1)
5. DATI PROPRIETARIO: Cerca cognome, nome e codice fiscale del proprietario
6. TABELLE: Analizza attentamente le tabelle presenti nel documento
7. Per ogni immobile, cerca di estrarre il maggior numero di informazioni possibili
8. Se un campo non è presente, usa null o stringa vuota
9. Converti sempre le rendite in numeri (rimuovi €, virgole, ecc.)
10. Identifica correttamente categoria catastale (A/1, A/2, C/1, ecc.)
11. Per i terreni, cerca qualità come "SEMINATIVO", "PASCOLO", "ULIVETO", ecc.
12. Calcola una confidenza basata sulla completezza dei dati estratti
13. Aggiungi warnings per dati incompleti o incerti
14. Aggiungi errors solo per problemi gravi

Tipi di titolarità comuni in visure catastali:
- "Proprietà" (o "PROPRIETA'", "PROP")
- "Nuda proprietà" (o "NUDA PROPRIETA'", "NP")
- "Usufrutto" (o "USU", "USUFRUTTO")
- "Diritto di superficie" (o "SUPERFICIE", "SUP")
- "Enfiteusi" (o "ENF")
- "Uso" (o "DIRITTO D'USO")
- "Abitazione" (o "AB", "ABITAZIONE")
- "Non specificata" (quando non è chiaro dal documento)

ESEMPIO di estrazione corretta della titolarità:
- Se vedi "PROPRIETA'" o "PROP" → "Proprietà"
- Se vedi "NP" o "NUDA PROP" → "Nuda proprietà"  
- Se vedi "USU" o "USUFRUTTO" → "Usufrutto"
- Se la colonna è vuota o contiene solo "-" → "Non specificata"

Esempi di quote:
- "per intero" = 1/1
- "1/2" = numeratore 1, denominatore 2
- "3/4" = numeratore 3, denominatore 4
- Se non specificata = 1/1

Esempi di categorie: A/1, A/2, A/3, A/4, A/5, A/6, A/7, A/8, A/9, A/10, A/11, B/1, B/2, C/1, C/2, C/3, C/4, C/5, C/6, C/7, D/1, D/2, ecc.`;
        const userPrompt = `Analizza questa visura catastale e estrai tutti i dati degli immobili CON PARTICOLARE ATTENZIONE a:
- Subalterne dei fabbricati (colonna Sub o Subalt)
- Dati dei proprietari (cognome, nome, codice fiscale)
- Tipo di titolarità (cerca pattern specifici come PROP, NP, USU, ecc. - NON assumere sempre "Proprietà")
- Quote di proprietà
- Tutte le informazioni presenti nelle tabelle

ATTENZIONE CRITICA: Per la titolarità, analizza attentamente il documento e cerca pattern esatti. 
Se non trovi indicazioni specifiche sulla titolarità, usa "Non specificata" invece di assumere "Proprietà".

NOME FILE: ${fileName}

CONTENUTO:
${text}

Restituisci solo il JSON richiesto.`;
        try {
            console.log('🤖 Invio richiesta a OpenAI...');
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4-1106-preview", // Usa GPT-4 Turbo per migliori risultati
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.1, // Bassa creatività per maggiore precisione
                max_tokens: 4000
            });
            const aiResponse = completion.choices[0]?.message?.content;
            if (!aiResponse) {
                throw new Error('Risposta vuota da OpenAI');
            }
            console.log('🤖 Risposta AI ricevuta');
            console.log('📄 Raw response:', aiResponse.substring(0, 500) + '...');
            // Prova a parsare la risposta JSON
            let parsedResult;
            try {
                // Rimuovi eventuali backticks o formattazione markdown
                const cleanJson = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                parsedResult = JSON.parse(cleanJson);
            }
            catch (parseError) {
                console.error('❌ Errore parsing JSON:', parseError);
                console.log('📄 Risposta problematica:', aiResponse);
                throw new Error('Risposta AI non è JSON valido');
            }
            // Valida e completa il risultato
            const validatedResult = {
                success: parsedResult.success ?? true,
                confidence: Math.min(Math.max(parsedResult.confidence ?? 70, 0), 100),
                fabbricati: this.validateFabbricati(parsedResult.fabbricati || []),
                terreni: this.validateTerreni(parsedResult.terreni || []),
                errors: parsedResult.errors || [],
                warnings: parsedResult.warnings || [],
                rawResponse: aiResponse
            };
            return validatedResult;
        }
        catch (error) {
            console.error('❌ Errore chiamata OpenAI:', error);
            throw new Error(`Errore analisi AI: ${error.message}`);
        }
    }
    /**
     * Valida e normalizza i dati dei fabbricati
     */
    validateFabbricati(fabbricati) {
        return fabbricati.map((fab, index) => ({
            comune: String(fab.comune || ''),
            provincia: String(fab.provincia || ''),
            codiceCatastale: String(fab.codiceCatastale || ''),
            sezione: fab.sezione ? String(fab.sezione) : null,
            sezioneUrbana: fab.sezioneUrbana ? String(fab.sezioneUrbana) : null,
            foglio: Number(fab.foglio) || 0,
            particella: Number(fab.particella) || 0,
            subalterno: Number(fab.subalterno) || 0,
            categoria: String(fab.categoria || ''),
            classe: String(fab.classe || ''),
            consistenza: Number(fab.consistenza) || 0,
            superficie: Number(fab.superficie) || 0,
            rendita: Number(fab.rendita) || 0,
            zona: String(fab.zona || ''),
            ubicazione: String(fab.ubicazione || ''),
            piano: String(fab.piano || ''),
            interno: String(fab.interno || ''),
            proprietario: {
                denominazione: String(fab.proprietario?.denominazione || ''),
                codiceFiscale: String(fab.proprietario?.codiceFiscale || ''),
                titolarita: String(fab.proprietario?.titolarita || ''),
                quota: {
                    numeratore: Number(fab.proprietario?.quota?.numeratore) || 1,
                    denominatore: Number(fab.proprietario?.quota?.denominatore) || 1
                }
            },
            dataAggiornamento: new Date(),
            idImmobile: `AI_${Date.now()}_${index}`
        }));
    }
    /**
     * Valida e normalizza i dati dei terreni
     */
    validateTerreni(terreni) {
        return terreni.map((ter, index) => ({
            comune: String(ter.comune || ''),
            provincia: String(ter.provincia || ''),
            codiceCatastale: String(ter.codiceCatastale || ''),
            sezione: ter.sezione ? String(ter.sezione) : null,
            foglio: Number(ter.foglio) || 0,
            particella: Number(ter.particella) || 0,
            subalterno: ter.subalterno ? Number(ter.subalterno) : undefined,
            qualita: String(ter.qualita || ''),
            classe: String(ter.classe || ''),
            superficie: Number(ter.superficie) || 0,
            redditoDominicale: Number(ter.redditoDominicale) || 0,
            redditoAgrario: Number(ter.redditoAgrario) || 0,
            ubicazione: String(ter.ubicazione || ''),
            proprietario: {
                denominazione: String(ter.proprietario?.denominazione || ''),
                codiceFiscale: String(ter.proprietario?.codiceFiscale || ''),
                titolarita: String(ter.proprietario?.titolarita || ''),
                quota: {
                    numeratore: Number(ter.proprietario?.quota?.numeratore) || 1,
                    denominatore: Number(ter.proprietario?.quota?.denominatore) || 1
                }
            },
            dataAggiornamento: new Date(),
            idImmobile: `AI_${Date.now()}_${index}`
        }));
    }
    /**
     * Processa file multipli in batch
     */
    async extractFromMultipleFiles(files) {
        console.log(`🤖 === ESTRAZIONE AI BATCH (${files.length} files) ===`);
        const allResults = [];
        for (const file of files) {
            const result = await this.extractCatastralData(file.buffer, file.name, file.mimeType);
            allResults.push(result);
        }
        // Combina tutti i risultati
        const combinedResult = {
            success: allResults.some(r => r.success),
            confidence: allResults.length > 0 ?
                allResults.reduce((sum, r) => sum + r.confidence, 0) / allResults.length : 0,
            fabbricati: allResults.flatMap(r => r.fabbricati),
            terreni: allResults.flatMap(r => r.terreni),
            errors: allResults.flatMap(r => r.errors),
            warnings: allResults.flatMap(r => r.warnings)
        };
        console.log(`🤖 === RISULTATO BATCH ===`);
        console.log(`  🏠 Totale fabbricati: ${combinedResult.fabbricati.length}`);
        console.log(`  🌱 Totale terreni: ${combinedResult.terreni.length}`);
        console.log(`  🎯 Confidenza media: ${combinedResult.confidence.toFixed(1)}%`);
        return combinedResult;
    }
}
exports.AIExtractionService = AIExtractionService;
