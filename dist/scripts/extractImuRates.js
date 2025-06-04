"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAllImuRates = extractAllImuRates;
exports.extractSingleImuRate = extractSingleImuRate;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
    // Funzione per parsare il contenuto del PDF ed estrarre le aliquote
    parsePdfContent(content, cityName) {
        const rates = [];
        const lines = content.split('\n');
        // Pattern per individuare le righe con aliquote
        const ratePatterns = [
            {
                pattern: /Abitazione principale.*?A\/1.*?A\/8.*?A\/9/i,
                ratePattern: /(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
                    condition: "Main residence in A/1, A/8, A/9",
                    details: details.trim(),
                    ratePercent: rate,
                    categoryTypes: ["A/1", "A/8", "A/9"]
                })
            },
            {
                pattern: /Assimilazione.*?abitazione principale.*?anziani.*?disabili/i,
                ratePattern: /SI|(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
                    condition: "Assimilation to main residence for elderly/disabled",
                    details: details.trim(),
                    ratePercent: rate,
                    context: "Art. 1, comma 741, lett. c), n. 6), legge n. 160 del 2019"
                })
            },
            {
                pattern: /Fabbricati rurali.*?strumentale.*?D\/10/i,
                ratePattern: /(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
                    condition: "Rural buildings for instrumental use (including D/10)",
                    details: details.trim(),
                    ratePercent: rate,
                    categoryTypes: ["D/10"]
                })
            },
            {
                pattern: /Fabbricati.*?gruppo.*?D.*?esclusa.*?D\/10/i,
                ratePattern: /(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
                    condition: "Buildings in group D (except D/10)",
                    details: details.trim(),
                    ratePercent: rate,
                    categoryTypes: ["D"]
                })
            },
            {
                pattern: /Terreni agricoli/i,
                ratePattern: /(\d+[,.]?\d*%)|Esenti/i,
                createEntry: (details, rate) => ({
                    condition: rate === 0 ? "Agricultural land - EXEMPT" : "Agricultural land",
                    details: details.trim(),
                    ratePercent: rate,
                    context: rate === 0 ? "Esenzione" : undefined
                })
            },
            {
                pattern: /Aree fabbricabili/i,
                ratePattern: /(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
                    condition: "Buildable land",
                    details: details.trim(),
                    ratePercent: rate
                })
            },
            {
                pattern: /Altri fabbricati.*?diversi.*?abitazione principale/i,
                ratePattern: /(\d+[,.]?\d*%)/,
                createEntry: (details, rate) => ({
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
                            const mainResidenceRate = rates.find(r => { var _a; return (_a = r.categoryTypes) === null || _a === void 0 ? void 0 : _a.includes("A/1"); });
                            ratePercent = (mainResidenceRate === null || mainResidenceRate === void 0 ? void 0 : mainResidenceRate.ratePercent) || 0.6;
                        }
                        else if (currentRate.toLowerCase().includes('esenti')) {
                            ratePercent = 0;
                        }
                        else {
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
    generateTypeScriptFile(cityName, rates) {
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
    async processAllPdfs() {
        try {
            // Crea la cartella di output se non esiste
            if (!fs_1.default.existsSync(this.outputDir)) {
                fs_1.default.mkdirSync(this.outputDir, { recursive: true });
            }
            // Legge tutti i file PDF nella cartella statements
            const files = fs_1.default.readdirSync(this.statementsDir)
                .filter(file => file.endsWith('.pdf'))
                .sort(); // Ordine alfabetico
            console.log(`Trovati ${files.length} file PDF da processare...`);
            for (let i = 0; i < files.length; i++) {
                const filename = files[i];
                const filePath = path_1.default.join(this.statementsDir, filename);
                console.log(`\n[${i + 1}/${files.length}] Processando: ${filename}`);
                try {
                    // Legge il contenuto del PDF (come testo)
                    const content = fs_1.default.readFileSync(filePath, 'utf-8');
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
                    const outputPath = path_1.default.join(this.outputDir, outputFilename);
                    fs_1.default.writeFileSync(outputPath, tsContent);
                    console.log(`✅ Creato ${outputFilename} con ${rates.length} aliquote`);
                }
                catch (error) {
                    console.error(`❌ Errore processando ${filename}:`, error);
                }
            }
            console.log('\n🎉 Processo completato!');
        }
        catch (error) {
            console.error('❌ Errore generale:', error);
        }
    }
    // Funzione per processare un singolo PDF
    async processSinglePdf(filename) {
        const filePath = path_1.default.join(this.statementsDir, filename);
        if (!fs_1.default.existsSync(filePath)) {
            console.error(`❌ File non trovato: ${filename}`);
            return;
        }
        console.log(`📄 Processando: ${filename}`);
        try {
            const content = fs_1.default.readFileSync(filePath, 'utf-8');
            const cityName = this.extractCityName(filename);
            const rates = this.parsePdfContent(content, cityName);
            if (rates.length === 0) {
                console.log(`⚠️  Nessuna aliquota trovata per ${cityName}`);
                return;
            }
            const tsContent = this.generateTypeScriptFile(cityName, rates);
            const outputFilename = `${this.toCamelCase(cityName)}2025.ts`;
            const outputPath = path_1.default.join(this.outputDir, outputFilename);
            if (!fs_1.default.existsSync(this.outputDir)) {
                fs_1.default.mkdirSync(this.outputDir, { recursive: true });
            }
            fs_1.default.writeFileSync(outputPath, tsContent);
            console.log(`✅ Creato ${outputFilename} con ${rates.length} aliquote`);
        }
        catch (error) {
            console.error(`❌ Errore processando ${filename}:`, error);
        }
    }
}
// Funzione di utilizzo
async function extractAllImuRates() {
    const statementsDir = path_1.default.join(process.cwd(), 'imu', 'data', 'statements');
    const outputDir = path_1.default.join(statementsDir, '2025');
    const extractor = new ImuRateExtractor(statementsDir, outputDir);
    await extractor.processAllPdfs();
}
async function extractSingleImuRate(filename) {
    const statementsDir = path_1.default.join(process.cwd(), 'imu', 'data', 'statements');
    const outputDir = path_1.default.join(statementsDir, '2025');
    const extractor = new ImuRateExtractor(statementsDir, outputDir);
    await extractor.processSinglePdf(filename);
}
// Se il file viene eseguito direttamente
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('🚀 Avvio estrazione automatica di tutte le aliquote IMU...');
        extractAllImuRates();
    }
    else {
        console.log(`🎯 Estrazione singola per: ${args[0]}`);
        extractSingleImuRate(args[0]);
    }
}
//# sourceMappingURL=extractImuRates.js.map