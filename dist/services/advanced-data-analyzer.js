"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedDataAnalyzer = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const iconv = __importStar(require("iconv-lite"));
const natural = __importStar(require("natural"));
const tesseract_js_1 = require("tesseract.js");
// import * as pdf2pic from 'pdf-poppler';
const string_similarity_1 = __importDefault(require("string-similarity"));
class AdvancedDataAnalyzer {
    constructor(options = {}) {
        this.options = options;
        // Inizializza NLP tools
        this.tokenizer = new natural.WordTokenizer();
        this.stemmer = natural.PorterStemmerIt; // Stemmer italiano
        // Configurazione default
        this.options = Object.assign({ useOCR: true, ocrLanguage: 'ita', enableNLP: true, autoCorrection: true, strictValidation: false, extractImages: false }, options);
    }
    /**
     * Analizza un file con tecniche avanzate
     */
    async analyzeFile(filePath, fileName) {
        const startTime = Date.now();
        const result = {
            success: false,
            confidence: 0,
            errors: [],
            warnings: [],
            fabbricati: [],
            terreni: [],
            metadata: {
                fileName,
                fileType: path.extname(fileName).toLowerCase(),
                analyzedAt: new Date(),
                totalProperties: 0,
                processingTime: 0,
                techniques: []
            },
            qualityAssessment: {
                dataCompleteness: 0,
                dataAccuracy: 0,
                structureRecognition: 0,
                missingFields: [],
                suggestedActions: []
            }
        };
        try {
            // Determina la strategia di analisi
            const strategies = this.determineAnalysisStrategies(fileName);
            result.metadata.techniques = strategies;
            let extractedText = '';
            // Estrai il testo usando le strategie appropriate
            for (const strategy of strategies) {
                try {
                    const text = await this.extractTextWithStrategy(filePath, strategy);
                    if (text && text.length > extractedText.length) {
                        extractedText = text;
                    }
                }
                catch (error) {
                    result.warnings.push(`Strategia ${strategy} fallita: ${error.message}`);
                }
            }
            if (!extractedText) {
                result.errors.push('Impossibile estrarre testo dal file');
                return result;
            }
            result.metadata.extractedText = extractedText;
            // Pulisci e normalizza il testo
            const cleanedText = this.cleanAndNormalizeText(extractedText);
            // Analizza la struttura del documento
            const documentStructure = this.analyzeDocumentStructure(cleanedText);
            result.qualityAssessment.structureRecognition = documentStructure.confidence;
            // Estrai i dati catastali
            const extractionResult = await this.extractCatastralData(cleanedText, documentStructure);
            result.fabbricati = extractionResult.fabbricati;
            result.terreni = extractionResult.terreni;
            result.confidence = extractionResult.confidence;
            // Validazione e correzione automatica
            if (this.options.autoCorrection) {
                await this.applyAutoCorrections(result);
            }
            // Valutazione qualità
            this.assessDataQuality(result);
            result.metadata.totalProperties = result.fabbricati.length + result.terreni.length;
            result.success = result.metadata.totalProperties > 0 && result.errors.length === 0;
        }
        catch (error) {
            result.errors.push(`Errore durante l'analisi: ${error.message}`);
        }
        result.metadata.processingTime = Date.now() - startTime;
        return result;
    }
    /**
     * Determina le strategie di analisi più appropriate per il file
     */
    determineAnalysisStrategies(fileName) {
        const extension = path.extname(fileName).toLowerCase();
        const strategies = [];
        switch (extension) {
            case '.pdf':
                strategies.push('pdf-parse');
                if (this.options.useOCR) {
                    strategies.push('ocr');
                }
                break;
            case '.txt':
                strategies.push('text-direct');
                break;
            case '.csv':
                strategies.push('csv-parse');
                break;
            case '.jpg':
            case '.jpeg':
            case '.png':
            case '.tiff':
                if (this.options.useOCR) {
                    strategies.push('ocr');
                }
                break;
            default:
                strategies.push('text-direct');
        }
        return strategies;
    }
    /**
     * Estrae testo usando una strategia specifica
     */
    async extractTextWithStrategy(filePath, strategy) {
        switch (strategy) {
            case 'pdf-parse':
                return await this.extractTextFromPDF(filePath);
            case 'ocr':
                return await this.extractTextWithOCR(filePath);
            case 'text-direct':
                return await this.extractTextDirect(filePath);
            case 'csv-parse':
                return await this.extractTextFromCSV(filePath);
            default:
                throw new Error(`Strategia sconosciuta: ${strategy}`);
        }
    }
    /**
     * Estrae testo da PDF
     */
    async extractTextFromPDF(filePath) {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        // Debug: salva il testo estratto per analisi
        const debugPath = filePath.replace(/\.pdf$/i, '_extracted_text.txt');
        try {
            fs.writeFileSync(debugPath, pdfData.text);
            console.log(`💾 Testo estratto salvato in: ${debugPath}`);
            console.log(`📄 Testo estratto (primi 1000 caratteri):`);
            console.log('='.repeat(80));
            console.log(pdfData.text.substring(0, 1000));
            console.log('='.repeat(80));
            // Debug aggiuntivo: analizza la struttura del testo
            const lines = pdfData.text.split('\n');
            console.log(`📊 Statistiche testo:`);
            console.log(`├─ Lunghezza totale: ${pdfData.text.length} caratteri`);
            console.log(`├─ Numero righe: ${lines.length}`);
            console.log(`├─ Righe non vuote: ${lines.filter(l => l.trim().length > 0).length}`);
            // Cerca parole chiave specifiche
            const keywords = ['visura', 'catastale', 'foglio', 'particella', 'subalterno', 'categoria', 'rendita', 'terreni', 'fabbricati'];
            console.log(`🔍 Parole chiave trovate:`);
            keywords.forEach(keyword => {
                const count = (pdfData.text.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
                if (count > 0) {
                    console.log(`├─ "${keyword}": ${count} volte`);
                }
            });
        }
        catch (error) {
            console.warn('⚠️ Impossibile salvare file debug:', error);
        }
        return pdfData.text;
    }
    /**
     * Estrae testo con OCR
     */
    async extractTextWithOCR(filePath) {
        const worker = await (0, tesseract_js_1.createWorker)(this.options.ocrLanguage || 'ita');
        try {
            // Se è un PDF, prima convertiamo in immagine
            let imagePath = filePath;
            const extension = path.extname(filePath).toLowerCase();
            if (extension === '.pdf') {
                // TODO: Implementare conversione PDF -> immagine
                // const options = {
                //   format: 'jpeg',
                //   out_dir: path.dirname(filePath),
                //   out_prefix: 'pdf_page',
                //   page: 1
                // };
                // const convertedFiles = await pdf2pic.convert(filePath, options);
                // imagePath = convertedFiles[0].path;
                throw new Error('Conversione PDF per OCR non ancora implementata');
            }
            const { data: { text } } = await worker.recognize(imagePath);
            return text;
        }
        finally {
            await worker.terminate();
        }
    }
    /**
     * Estrae testo direttamente
     */
    async extractTextDirect(filePath) {
        // Prova diverse codifiche
        const encodings = ['utf8', 'latin1', 'windows-1252'];
        for (const encoding of encodings) {
            try {
                const buffer = fs.readFileSync(filePath);
                const text = iconv.decode(buffer, encoding);
                // Verifica se il testo sembra valido (contiene caratteri italiani)
                if (this.isValidItalianText(text)) {
                    return text;
                }
            }
            catch (error) {
                continue;
            }
        }
        // Fallback a UTF-8
        return fs.readFileSync(filePath, 'utf8');
    }
    /**
     * Estrae testo da CSV
     */
    async extractTextFromCSV(filePath) {
        return new Promise((resolve, reject) => {
            const rows = [];
            const stream = fs.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => rows.push(row))
                .on('end', () => {
                // Converte CSV in formato testo per il parsing
                const text = this.csvToText(rows);
                resolve(text);
            })
                .on('error', reject);
        });
    }
    /**
     * Verifica se il testo è valido italiano
     */
    isValidItalianText(text) {
        const italianWords = ['comune', 'provincia', 'foglio', 'particella', 'categoria', 'rendita'];
        const lowercaseText = text.toLowerCase();
        return italianWords.some(word => lowercaseText.includes(word));
    }
    /**
     * Converte dati CSV in testo strutturato
     */
    csvToText(rows) {
        let text = '';
        for (const row of rows) {
            for (const [key, value] of Object.entries(row)) {
                text += `${key}: ${value}\n`;
            }
            text += '\n';
        }
        return text;
    }
    /**
     * Pulisce e normalizza il testo estratto
     */
    cleanAndNormalizeText(text) {
        return text
            // Rimuovi caratteri speciali in eccesso
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
            // Normalizza spazi
            .replace(/\s+/g, ' ')
            // Normalizza caratteri italiani
            .replace(/à|á|ä/g, 'a')
            .replace(/è|é|ë/g, 'e')
            .replace(/ì|í|ï/g, 'i')
            .replace(/ò|ó|ö/g, 'o')
            .replace(/ù|ú|ü/g, 'u')
            .trim();
    }
    /**
     * Analizza la struttura del documento
     */
    analyzeDocumentStructure(text) {
        const lines = text.split('\n');
        const patterns = {
            hasHeaders: false,
            hasTables: false,
            hasVisceral: false,
            sectionCount: 0,
            confidence: 0
        };
        // Cerca pattern tipici delle visure
        const visureKeywords = [
            'visura catastale',
            'agenzia del territorio',
            'catasto',
            'dati identificativi',
            'intestazione catastale'
        ];
        const foundKeywords = visureKeywords.filter(keyword => text.toLowerCase().includes(keyword));
        patterns.hasVisceral = foundKeywords.length > 0;
        patterns.confidence = foundKeywords.length / visureKeywords.length;
        // Analizza struttura tabellare
        patterns.hasTables = lines.some(line => (line.match(/\|/g) || []).length > 2 ||
            (line.match(/\t/g) || []).length > 2);
        return { confidence: patterns.confidence, patterns };
    }
    /**
     * Estrae dati catastali con NLP avanzato
     */
    async extractCatastralData(text, structure) {
        const result = {
            fabbricati: [],
            terreni: [],
            confidence: 0
        };
        // Pattern migliorati con NLP
        const patterns = this.buildSmartPatterns();
        // Estrai entità nominate
        const entities = this.extractNamedEntities(text);
        // Trova sezioni del documento
        const sections = this.identifyDocumentSections(text);
        // Processa ogni sezione
        for (const section of sections) {
            if (section.type === 'fabbricati') {
                const fabbricati = this.extractFabbricatiFromSection(section.content, patterns, entities);
                result.fabbricati.push(...fabbricati);
            }
            else if (section.type === 'terreni') {
                const terreni = this.extractTerreniFromSection(section.content, patterns, entities);
                result.terreni.push(...terreni);
            }
        }
        // Calcola confidence
        const totalFound = result.fabbricati.length + result.terreni.length;
        result.confidence = totalFound > 0 ? Math.min(0.8, totalFound * 0.3) : 0;
        return result;
    }
    /**
     * Costruisce pattern intelligenti usando NLP
     */
    buildSmartPatterns() {
        return {
            fabbricato: {
                // Pattern migliorati basati sui dati reali dell'utente
                basic: /(?:fg\.?|foglio)[\s:]*(\d+)[\s\w]*(?:part\.?|particella)[\s:]*(\d+)[\s\w]*(?:sub\.?|subalterno)[\s:]*(\d+)/i,
                // Pattern specifico per il formato visura dell'utente
                visura_format: /foglio:\s*(\d+)[\s\S]*?particella:\s*(\d+)[\s\S]*?subalterno:\s*(\d+)[\s\S]*?categoria:\s*([a-z]\/\d+)[\s\S]*?(?:classe:\s*(\d+))?[\s\S]*?(?:consistenza:\s*([\d,.]+))?[\s\S]*?rendita:\s*€?\s*([\d,.]+)/gi,
                // Pattern per righe separate (il formato dell'utente)
                multiline_user: /foglio:\s*(\d+)[\s\S]{0,200}particella:\s*(\d+)[\s\S]{0,200}subalterno:\s*(\d+)[\s\S]{0,200}categoria:\s*([a-z]\/\d+)[\s\S]{0,200}rendita:\s*€\s*([\d,.]+)/gi,
                // Pattern semplificato per dati su righe adiacenti
                line_by_line: /foglio:\s*(\d+)[\s\n]*particella:\s*(\d+)[\s\n]*subalterno:\s*(\d+)[\s\n]*categoria:\s*([a-z\/\d]+)[\s\S]*?rendita:\s*€\s*([\d,.]+)/gi,
                extended: /(?:fg\.?|foglio)[\s:]*(\d+)[\s\w]*(?:part\.?|particella)[\s:]*(\d+)[\s\w]*(?:sub\.?|subalterno)[\s:]*(\d+)[\s\w]*(?:cat\.?|categoria)[\s:]*([a-z\/\d]+)[\s\w]*(?:cl\.?|classe)[\s:]*(\w+)[\s\w]*(?:cons\.?|consistenza)[\s:]*(\d+[,.]?\d*)[\s\w]*(?:rendita|€)[\s:]*(\d+[,.]?\d*)/i,
                // Pattern alternativi per formati diversi
                alternative1: /(\d+)\s+(\d+)\s+(\d+)\s+([a-z\/\d]+)\s+(\w+)\s+(\d+[,.]?\d*)\s+€?\s*(\d+[,.]?\d*)/i,
                alternative2: /foglio\s+(\d+)[\s\S]*?particella\s+(\d+)[\s\S]*?sub(?:alterno)?\s+(\d+)[\s\S]*?categoria\s+([a-z\/\d]+)[\s\S]*?rendita[\s\S]*?€\s*(\d+[,.]?\d*)/i,
                // Pattern per tabelle
                tabular: /^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z]\/\d+)\s+(\d+)\s+([\d,]+)\s+€?\s*([\d,.]+)\s*$/m,
                // Pattern super-flessibili per catasto italiano
                flexible1: /(?:^\s*)?(\d{1,4})[\s\-\.]*(\d{1,6})[\s\-\.]*(\d{1,3})[\s\w]*([AB]\/?\d{1,2}|[A-Z]{1,2}\/?\d{1,2})[\s\w]*(\d{1,2})[\s\w]*(\d+[,.]?\d*)[\s\w]*€?\s*(\d+[,.]?\d*)/mi,
                flexible2: /(\d+)[\s\S]{0,50}(\d+)[\s\S]{0,50}(\d+)[\s\S]{0,100}([AB]\/\d+|[A-Z]\/\d+)[\s\S]{0,100}(\d+[,.]?\d*)[\s\S]{0,50}€[\s\S]{0,10}(\d+[,.]?\d*)/i,
                // Pattern per righe separate
                multiline1: /foglio[:\s]*(\d+)[\s\S]*?particella[:\s]*(\d+)[\s\S]*?sub[a-z]*[:\s]*(\d+)[\s\S]*?categoria[:\s]*([a-z\/\d]+)[\s\S]*?rendita[:\s]*€?\s*(\d+[,.]?\d*)/i
            },
            terreno: {
                basic: /(?:fg\.?|foglio)[\s:]*(\d+)[\s\w]*(?:part\.?|particella)[\s:]*(\d+)[\s\w]*(?:qual\.?|qualità)[\s:]*(\w+)/i,
                extended: /(?:fg\.?|foglio)[\s:]*(\d+)[\s\w]*(?:part\.?|particella)[\s:]*(\d+)[\s\w]*(?:qual\.?|qualità)[\s:]*(\w+)[\s\w]*(?:cl\.?|classe)[\s:]*(\w+)[\s\w]*(?:sup\.?|superficie)[\s\w]*(\d+[,.]?\d*)[\s\w]*(?:rd|reddito.*?dominicale)[\s\w]*€?\s*(\d+[,.]?\d*)[\s\w]*(?:ra|reddito.*?agrario)[\s\w]*€?\s*(\d+[,.]?\d*)/i,
                alternative1: /(\d+)\s+(\d+)\s+(\w+)\s+(\w+)\s+ha\s+([\d,.]+)\s+€?\s*([\d,.]+)\s+€?\s*([\d,.]+)/i,
                tabular: /^\s*(\d+)\s+(\d+)\s+([A-Z]+)\s+(\d+)\s+Ha\s+([\d,.]+)\s+€?\s*([\d,.]+)\s+€?\s*([\d,.]+)\s*$/m,
                flexible1: /(\d+)[\s\S]{0,50}(\d+)[\s\S]{0,100}(SEMINATIVO|PASCOLO|BOSCO|VIGNETO|FRUTTETO|OLIVETO|PRATO)[\s\S]{0,100}(\d+[,.]?\d*)[\s\S]{0,50}€[\s\S]{0,10}(\d+[,.]?\d*)/i
            },
            proprietario: {
                standard: /(?:cognome|denominazione)[\s:]*([a-z\s]+)[\s\S]*?(?:nome)[\s:]*([a-z\s]+)[\s\S]*?(?:cf|codice.*?fiscale)[\s:]*([a-z0-9]{16})/i,
                alternative: /([a-z]+\s+[a-z]+)[\s\S]*?([a-z]{6}\d{2}[a-z]\d{2}[a-z]\d{3}[a-z])/i,
                simple: /((?:[a-z]+\s+){1,3}[a-z]+)[\s\S]*?([a-z]{6}\d{2}[a-z]\d{2}[a-z]\d{3}[a-z])/i,
                flexible: /([A-Z][a-z]+\s+[A-Z][a-z]+)[\s\S]*?([A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z])/
            },
            ubicazione: {
                standard: /(?:comune)[\s:]*([a-z\s]+)[\s\S]*?(?:provincia)[\s:]*\(?([a-z]{2})\)?/i,
                alternative: /([a-z\s]+)\s*\(([a-z]{2})\)/i,
                simple: /comune[\s:]+([a-z\s]+)/i
            },
            // Pattern per riconoscimento automatico di numeri e codici
            numbers: {
                foglio: /(?:fog?\.?|f\.?)[\s:]*(\d{1,4})/gi,
                particella: /(?:part\.?|p\.?)[\s:]*(\d{1,6})/gi,
                subalterno: /(?:sub\.?|s\.?)[\s:]*(\d{1,3})/gi,
                categoria: /(?:cat\.?|categoria)[\s:]*([a-z]\/?\d+|[a-z]{1,2}\/?\d{1,2})/gi,
                rendita: /(?:rendita|€)[\s:]*€?\s*(\d+[,.]?\d*)/gi
            },
            // Pattern per sezioni specifiche
            sections: {
                fabbricati: /(?:fabbricati|urbani|edifici|immobili\s+urbani)/i,
                terreni: /(?:terreni|agricoli|rustici|immobili\s+rurali)/i,
                intestatario: /(?:intestat|proprietar|titolar)/i,
                datiIdentificativi: /dati\s+identificativi/i,
                datiReddituali: /dati\s+reddituali/i
            }
        };
    }
    /**
     * Estrae entità nominate dal testo
     */
    extractNamedEntities(text) {
        const entities = {
            luoghi: [],
            codici: [],
            numeri: [],
            date: []
        };
        // Usa tokenizzazione per identificare entità
        const tokens = this.tokenizer.tokenize(text.toLowerCase());
        // Pattern per luoghi italiani
        const luoghiPattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\([A-Z]{2}\)/g;
        const luoghi = text.match(luoghiPattern) || [];
        entities.luoghi = luoghi;
        // Pattern per codici fiscali
        const cfPattern = /[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/g;
        const codici = text.match(cfPattern) || [];
        entities.codici = codici;
        return entities;
    }
    /**
     * Identifica sezioni del documento
     */
    identifyDocumentSections(text) {
        const sections = [];
        const lines = text.split('\n');
        let currentSection = { type: 'unknown', content: '', confidence: 0 };
        for (const line of lines) {
            const lineLower = line.toLowerCase();
            // Identifica inizio sezioni
            if (lineLower.includes('fabbricati') || lineLower.includes('urbani')) {
                if (currentSection.content) {
                    sections.push(currentSection);
                }
                currentSection = { type: 'fabbricati', content: '', confidence: 0.8 };
            }
            else if (lineLower.includes('terreni') || lineLower.includes('agricoli')) {
                if (currentSection.content) {
                    sections.push(currentSection);
                }
                currentSection = { type: 'terreni', content: '', confidence: 0.8 };
            }
            else if (lineLower.includes('intestat') || lineLower.includes('proprietar')) {
                if (currentSection.content) {
                    sections.push(currentSection);
                }
                currentSection = { type: 'proprietari', content: '', confidence: 0.9 };
            }
            currentSection.content += line + '\n';
        }
        if (currentSection.content) {
            sections.push(currentSection);
        }
        return sections;
    }
    /**
     * Estrae fabbricati da una sezione
     */
    extractFabbricatiFromSection(content, patterns, entities) {
        console.log('🏠 === ESTRAZIONE FABBRICATI CON PATTERN MIGLIORATI ===');
        console.log(`📄 Contenuto da analizzare: "${content.substring(0, 200)}..."`);
        console.log('🔍 CHIAMANDO NUOVO extractDataFromText...');
        // Usa il nuovo metodo con pattern migliorati
        const extractionResult = this.extractDataFromText(content);
        console.log(`✅ Estrazione completata: ${extractionResult.fabbricati.length} fabbricati trovati`);
        // Debug dettagliato dei risultati
        extractionResult.fabbricati.forEach((fab, index) => {
            console.log(`🏠 Fabbricato ${index + 1}:`, {
                foglio: fab.foglio,
                particella: fab.particella,
                subalterno: fab.subalterno,
                categoria: fab.categoria,
                rendita: fab.rendita
            });
        });
        return extractionResult.fabbricati;
    }
    /**
     * Estrae terreni da una sezione
     */
    extractTerreniFromSection(content, patterns, entities) {
        console.log('🌱 === ESTRAZIONE TERRENI CON PATTERN MIGLIORATI ===');
        console.log(`📄 Contenuto da analizzare: "${content.substring(0, 200)}..."`);
        // Usa il nuovo metodo con pattern migliorati
        const extractionResult = this.extractDataFromText(content);
        console.log(`✅ Estrazione completata: ${extractionResult.terreni.length} terreni trovati`);
        return extractionResult.terreni;
    }
    /**
     * Estrae proprietario dal contenuto
     */
    extractProprietario(content, patterns) {
        const patternNames = ['standard', 'alternative', 'simple'];
        for (const patternName of patternNames) {
            const pattern = patterns.proprietario[patternName];
            if (pattern) {
                const match = content.match(pattern);
                if (match) {
                    if (patternName === 'standard') {
                        return {
                            denominazione: `${match[2].trim()} ${match[1].trim()}`,
                            codiceFiscale: match[3].toUpperCase(),
                            titolarita: 'Proprietà',
                            quota: { numeratore: 1, denominatore: 1 }
                        };
                    }
                    else {
                        return {
                            denominazione: match[1].trim(),
                            codiceFiscale: match[2].toUpperCase(),
                            titolarita: 'Proprietà',
                            quota: { numeratore: 1, denominatore: 1 }
                        };
                    }
                }
            }
        }
        return {
            denominazione: '',
            codiceFiscale: '',
            titolarita: 'Proprietà',
            quota: { numeratore: 1, denominatore: 1 }
        };
    }
    /**
     * Estrae ubicazione specifica da una riga
     */
    extractUbicazione(line, content) {
        // Cerca pattern di indirizzo nella riga
        const addressPatterns = [
            /via\s+[a-z\s]+\d*/i,
            /piazza\s+[a-z\s]+\d*/i,
            /viale\s+[a-z\s]+\d*/i,
            /corso\s+[a-z\s]+\d*/i,
            /vicolo\s+[a-z\s]+\d*/i
        ];
        for (const pattern of addressPatterns) {
            const match = line.match(pattern);
            if (match) {
                return match[0].trim();
            }
        }
        // Fallback: cerca nel contenuto generale
        for (const pattern of addressPatterns) {
            const match = content.match(pattern);
            if (match) {
                return match[0].trim();
            }
        }
        return '';
    }
    /**
     * Applica correzioni automatiche
     */
    async applyAutoCorrections(result) {
        // Correzione categorie catastali
        for (const fabbricato of result.fabbricati) {
            fabbricato.categoria = this.correctCategoria(fabbricato.categoria);
        }
        // Correzione qualità terreni
        for (const terreno of result.terreni) {
            terreno.qualita = this.correctQualita(terreno.qualita);
        }
        // Validazione campi numerici
        this.validateNumericFields(result);
    }
    /**
     * Corregge categoria catastale
     */
    correctCategoria(categoria) {
        const categorieValid = ['A/1', 'A/2', 'A/3', 'A/4', 'A/5', 'A/6', 'A/7', 'A/8', 'A/9', 'A/10', 'A/11'];
        if (!categoria)
            return '';
        // Trova la categoria più simile
        const similarities = categorieValid.map(cat => ({
            categoria: cat,
            similarity: string_similarity_1.default.compareTwoStrings(categoria.toUpperCase(), cat)
        }));
        const bestMatch = similarities.reduce((best, current) => current.similarity > best.similarity ? current : best);
        return bestMatch.similarity > 0.6 ? bestMatch.categoria : categoria;
    }
    /**
     * Corregge qualità terreno
     */
    correctQualita(qualita) {
        const qualitaValid = ['SEMINATIVO', 'PASCOLO', 'BOSCO', 'VIGNETO', 'FRUTTETO', 'OLIVETO'];
        if (!qualita)
            return '';
        const similarities = qualitaValid.map(qual => ({
            qualita: qual,
            similarity: string_similarity_1.default.compareTwoStrings(qualita.toUpperCase(), qual)
        }));
        const bestMatch = similarities.reduce((best, current) => current.similarity > best.similarity ? current : best);
        return bestMatch.similarity > 0.7 ? bestMatch.qualita : qualita.toUpperCase();
    }
    /**
     * Valida campi numerici
     */
    validateNumericFields(result) {
        // Valida fabbricati
        for (const fabbricato of result.fabbricati) {
            if (fabbricato.rendita && fabbricato.rendita > 100000) {
                result.warnings.push(`Rendita molto alta per fabbricato ${fabbricato.foglio}/${fabbricato.particella}/${fabbricato.subalterno}: €${fabbricato.rendita}`);
            }
        }
        // Valida terreni
        for (const terreno of result.terreni) {
            if (terreno.superficie && terreno.superficie > 1000000) {
                result.warnings.push(`Superficie molto grande per terreno ${terreno.foglio}/${terreno.particella}: ${terreno.superficie} mq`);
            }
        }
    }
    /**
     * Valuta la qualità dei dati estratti
     */
    assessDataQuality(result) {
        const assessment = result.qualityAssessment;
        // Calcola completezza
        let totalFields = 0;
        let filledFields = 0;
        for (const fabbricato of result.fabbricati) {
            totalFields += 8; // numero campi principali
            if (fabbricato.comune)
                filledFields++;
            if (fabbricato.provincia)
                filledFields++;
            if (fabbricato.foglio)
                filledFields++;
            if (fabbricato.particella)
                filledFields++;
            if (fabbricato.categoria)
                filledFields++;
            if (fabbricato.classe)
                filledFields++;
            if (fabbricato.consistenza)
                filledFields++;
            if (fabbricato.rendita)
                filledFields++;
        }
        for (const terreno of result.terreni) {
            totalFields += 8; // numero campi principali
            if (terreno.comune)
                filledFields++;
            if (terreno.provincia)
                filledFields++;
            if (terreno.foglio)
                filledFields++;
            if (terreno.particella)
                filledFields++;
            if (terreno.qualita)
                filledFields++;
            if (terreno.classe)
                filledFields++;
            if (terreno.superficie)
                filledFields++;
            if (terreno.redditoDominicale)
                filledFields++;
        }
        assessment.dataCompleteness = totalFields > 0 ? filledFields / totalFields : 0;
        assessment.dataAccuracy = result.confidence;
        // Identifica campi mancanti
        const missingFields = [];
        if (result.fabbricati.some(f => !f.comune))
            missingFields.push('comune');
        if (result.fabbricati.some(f => !f.categoria))
            missingFields.push('categoria fabbricato');
        if (result.fabbricati.some(f => !f.rendita))
            missingFields.push('rendita');
        if (result.terreni.some(t => !t.qualita))
            missingFields.push('qualità terreno');
        assessment.missingFields = missingFields;
        // Suggerisci azioni
        const suggestions = [];
        if (assessment.dataCompleteness < 0.7) {
            suggestions.push('Verifica la qualità del file caricato');
        }
        if (assessment.structureRecognition < 0.5) {
            suggestions.push('Il documento potrebbe non essere una visura catastale standard');
        }
        if (result.confidence < 0.6) {
            suggestions.push('Considera di caricare un file con qualità migliore');
        }
        assessment.suggestedActions = suggestions;
    }
    /**
     * Estrae dati da testo usando pattern multipli
     */
    extractDataFromText(text) {
        const patterns = this.buildSmartPatterns();
        let fabbricati = [];
        let terreni = [];
        console.log('🔍 Inizio estrazione con pattern migliorati...');
        // Ordine di priorità dei pattern (prima i più specifici)
        const patternOrder = ['visura_format', 'multiline_user', 'line_by_line', 'extended', 'multiline1', 'flexible1', 'flexible2', 'alternative1', 'alternative2', 'basic', 'tabular'];
        for (const patternName of patternOrder) {
            if (!patterns.fabbricato[patternName])
                continue;
            console.log(`📋 Testando pattern fabbricato "${patternName}"`);
            const pattern = patterns.fabbricato[patternName];
            let matches;
            // Reset regex per pattern globali
            if (pattern.global) {
                pattern.lastIndex = 0;
            }
            // Per pattern globali, trova tutti i match
            if (pattern.global) {
                while ((matches = pattern.exec(text)) !== null) {
                    console.log(`✅ Pattern "${patternName}" ha trovato match:`, matches);
                    try {
                        const fabbricato = this.buildFabbricatoFromMatch(matches, patternName, text);
                        if (fabbricato && fabbricato.foglio && fabbricato.particella) {
                            fabbricati.push(fabbricato);
                            console.log(`🏠 Fabbricato aggiunto: F.${fabbricato.foglio} P.${fabbricato.particella} S.${fabbricato.subalterno} Cat.${fabbricato.categoria} €${fabbricato.rendita}`);
                        }
                    }
                    catch (error) {
                        console.warn(`⚠️ Errore nel parsing del pattern "${patternName}":`, error);
                    }
                }
            }
            else {
                // Pattern non globali
                matches = text.match(pattern);
                if (matches && matches.length > 1) {
                    console.log(`✅ Pattern "${patternName}" ha trovato match:`, matches);
                    try {
                        const fabbricato = this.buildFabbricatoFromMatch(matches, patternName, text);
                        if (fabbricato && fabbricato.foglio && fabbricato.particella) {
                            fabbricati.push(fabbricato);
                            console.log(`🏠 Fabbricato aggiunto: F.${fabbricato.foglio} P.${fabbricato.particella} S.${fabbricato.subalterno} Cat.${fabbricato.categoria} €${fabbricato.rendita}`);
                        }
                    }
                    catch (error) {
                        console.warn(`⚠️ Errore nel parsing del pattern "${patternName}":`, error);
                    }
                }
            }
            // Se abbiamo trovato fabbricati con questo pattern, smetti di provare altri
            if (fabbricati.length > 0) {
                console.log(`🎯 Trovati ${fabbricati.length} fabbricati con pattern "${patternName}", interrompo ricerca`);
                break;
            }
        }
        // Se non abbiamo trovato fabbricati con i pattern standard, ritorna vuoto
        if (fabbricati.length === 0) {
            console.log('🔄 Nessun dato trovato con pattern migliorati');
        }
        // Estrazione terreni (mantieni il codice esistente per i terreni)
        for (const [patternName, pattern] of Object.entries(patterns.terreno)) {
            console.log(`🌱 Testando pattern terreno "${patternName}"`);
            const matches = text.match(pattern);
            if (matches && matches.length > 1) {
                console.log(`✅ Pattern terreno "${patternName}" ha trovato match:`, matches);
                try {
                    const terreno = {
                        comune: this.extractComuneFromContext(text),
                        provincia: this.extractProvinciaFromContext(text),
                        foglio: parseInt(matches[1]),
                        particella: parseInt(matches[2]),
                        qualita: matches[3] || '',
                        classe: matches[4] || '',
                        superficie: matches[5] ? parseFloat(matches[5].replace(',', '.')) : 0,
                        redditoDominicale: matches[6] ? parseFloat(matches[6].replace(',', '.')) : 0,
                        redditoAgrario: matches[7] ? parseFloat(matches[7].replace(',', '.')) : 0,
                        proprietario: {
                            denominazione: '',
                            codiceFiscale: '',
                            titolarita: 'Proprietà',
                            quota: { numeratore: 1, denominatore: 1 }
                        },
                        dataAggiornamento: new Date(),
                        idImmobile: `${matches[1]}-${matches[2]}`
                    };
                    terreni.push(terreno);
                    break;
                }
                catch (error) {
                    console.warn(`⚠️ Errore nel parsing del terreno "${patternName}":`, error);
                }
            }
        }
        console.log(`📊 Estrazione completata: ${fabbricati.length} fabbricati, ${terreni.length} terreni trovati`);
        return { fabbricati, terreni };
    }
    /**
     * Costruisce un oggetto fabbricato dai match del pattern
     */
    buildFabbricatoFromMatch(matches, patternName, fullText) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let fabbricato = {};
        console.log(`🔧 Costruendo fabbricato con pattern "${patternName}" da match:`, matches);
        if (patternName === 'visura_format' || patternName === 'multiline_user' || patternName === 'line_by_line') {
            // Pattern specifici per il formato dell'utente
            fabbricato = {
                foglio: parseInt(matches[1]),
                particella: parseInt(matches[2]),
                subalterno: parseInt(matches[3]),
                categoria: ((_a = matches[4]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || '',
                classe: matches[5] || '',
                consistenza: matches[6] ? parseFloat(matches[6].replace(',', '.')) : 0,
                rendita: matches[7] ? parseFloat(matches[7].replace(',', '.')) : 0
            };
        }
        else if (patternName === 'extended') {
            fabbricato = {
                foglio: parseInt(matches[1]),
                particella: parseInt(matches[2]),
                subalterno: parseInt(matches[3]),
                categoria: ((_b = matches[4]) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || '',
                classe: matches[5] || '',
                consistenza: parseFloat(((_c = matches[6]) === null || _c === void 0 ? void 0 : _c.replace(',', '.')) || '0'),
                rendita: parseFloat(((_d = matches[7]) === null || _d === void 0 ? void 0 : _d.replace(',', '.')) || '0')
            };
        }
        else if (patternName === 'flexible1' || patternName === 'flexible2') {
            fabbricato = {
                foglio: parseInt(matches[1]),
                particella: parseInt(matches[2]),
                subalterno: parseInt(matches[3]),
                categoria: ((_e = matches[4]) === null || _e === void 0 ? void 0 : _e.toUpperCase()) || '',
                classe: matches[5] || '',
                consistenza: parseFloat(((_f = matches[6]) === null || _f === void 0 ? void 0 : _f.replace(',', '.')) || '0'),
                rendita: parseFloat(((_g = matches[7]) === null || _g === void 0 ? void 0 : _g.replace(',', '.')) || '0')
            };
        }
        else {
            // Pattern basic e altri
            fabbricato = {
                foglio: parseInt(matches[1]),
                particella: parseInt(matches[2]),
                subalterno: parseInt(matches[3]) || 1,
                categoria: ((_h = matches[4]) === null || _h === void 0 ? void 0 : _h.toUpperCase()) || '',
                classe: matches[5] || '',
                consistenza: 0,
                rendita: matches[5] ? parseFloat(matches[5].replace(',', '.')) : 0
            };
        }
        // Aggiungi proprietà mancanti
        const fullFabbricato = Object.assign(Object.assign({}, fabbricato), { comune: this.extractComuneFromContext(fullText), provincia: this.extractProvinciaFromContext(fullText), codiceCatastale: '', sezione: null, sezioneUrbana: null, superficie: 0, zona: '', ubicazione: '', piano: '', interno: '', proprietario: {
                denominazione: '',
                codiceFiscale: '',
                titolarita: 'Proprietà',
                quota: { numeratore: 1, denominatore: 1 }
            }, dataAggiornamento: new Date(), idImmobile: `${fabbricato.foglio}-${fabbricato.particella}-${fabbricato.subalterno}` });
        console.log(`✅ Fabbricato costruito:`, {
            foglio: fullFabbricato.foglio,
            particella: fullFabbricato.particella,
            subalterno: fullFabbricato.subalterno,
            categoria: fullFabbricato.categoria,
            rendita: fullFabbricato.rendita,
            comune: fullFabbricato.comune
        });
        return fullFabbricato;
    }
    /**
     * Estrae comune dal contesto
     */
    extractComuneFromContext(text) {
        const patterns = [
            /comune[\s:]+([a-z\s]+?)[\s\(]/i,
            /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\([A-Z]{2}\)/,
            /comune[\s:]+([a-z\s]+)/i
        ];
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                return match[1].trim().toUpperCase();
            }
        }
        return '';
    }
    /**
     * Estrae provincia dal contesto
     */
    extractProvinciaFromContext(text) {
        const match = text.match(/\(([A-Z]{2})\)|provincia[\s:]*([A-Z]{2})/i);
        return match ? (match[1] || match[2]).toUpperCase() : '';
    }
}
exports.AdvancedDataAnalyzer = AdvancedDataAnalyzer;
exports.default = AdvancedDataAnalyzer;
//# sourceMappingURL=advanced-data-analyzer.js.map