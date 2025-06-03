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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadServiceAI = void 0;
const ai_extraction_service_1 = require("./ai-extraction-service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
/**
 * Servizio di upload semplificato che usa solo AI extraction
 */
class UploadServiceAI {
    constructor() {
        this.aiExtractor = new ai_extraction_service_1.AIExtractionService();
        this.tempDir = path.join(__dirname, '..', 'temp-uploads');
        // Crea directory temporanea se non esiste
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }
    /**
     * Imposta callback per feedback progressivo
     */
    setProgressCallback(callback) {
        this.progressCallback = callback;
    }
    /**
     * Invia messaggio di progresso
     */
    sendProgress(message) {
        if (this.progressCallback) {
            this.progressCallback(message);
        }
        console.log(`📢 ${message}`);
    }
    /**
     * Processa file multipli usando AI extraction con feedback progressivo
     */
    async processFiles(files) {
        this.sendProgress('🚀 Analisi iniziata...');
        console.log('🚀 === INIZIO PROCESSO UPLOAD AI ===');
        console.log(`📁 File ricevuti: ${files.length}`);
        try {
            // Salva file temporaneamente per debug
            this.sendProgress(`📁 Preparazione di ${files.length} file...`);
            await this.saveTemporaryFiles(files);
            // Processa file uno per uno con feedback
            let allFabbricati = [];
            let allTerreni = [];
            let allErrors = [];
            let allWarnings = [];
            let totalConfidence = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.sendProgress(`🔍 Analisi file ${i + 1}/${files.length}: ${file.name}...`);
                // Usa AI extraction per processare il singolo file
                const aiResult = await this.aiExtractor.extractFromMultipleFiles([file]);
                allFabbricati.push(...aiResult.fabbricati);
                allTerreni.push(...aiResult.terreni);
                allErrors.push(...aiResult.errors);
                allWarnings.push(...aiResult.warnings);
                totalConfidence += aiResult.confidence;
                if (aiResult.fabbricati.length + aiResult.terreni.length > 0) {
                    this.sendProgress(`✅ Trovati ${aiResult.fabbricati.length + aiResult.terreni.length} immobili in ${file.name}`);
                }
                else {
                    this.sendProgress(`⚠️ Nessun immobile trovato in ${file.name}`);
                }
            }
            const avgConfidence = files.length > 0 ? totalConfidence / files.length : 0;
            const totalImmobili = allFabbricati.length + allTerreni.length;
            this.sendProgress(`🎯 Analisi completata: ${totalImmobili} immobili trovati (confidenza: ${avgConfidence.toFixed(1)}%)`);
            console.log('🤖 === RISULTATO ESTRAZIONE AI ===');
            console.log(`✅ Successo: ${totalImmobili > 0}`);
            console.log(`🎯 Confidenza: ${avgConfidence.toFixed(1)}%`);
            console.log(`🏠 Fabbricati: ${allFabbricati.length}`);
            console.log(`🌱 Terreni: ${allTerreni.length}`);
            console.log(`⚠️ Errori: ${allErrors.length}`);
            console.log(`🟡 Warning: ${allWarnings.length}`);
            if (allFabbricati.length > 0) {
                console.log('🏠 === DETTAGLI FABBRICATI TROVATI ===');
                allFabbricati.forEach((fab, index) => {
                    console.log(`  Fabbricato ${index + 1}:`);
                    console.log(`    ├─ Foglio: ${fab.foglio}`);
                    console.log(`    ├─ Particella: ${fab.particella}`);
                    console.log(`    ├─ Subalterno: ${fab.subalterno || 'N/A'}`);
                    console.log(`    ├─ Categoria: ${fab.categoria}`);
                    console.log(`    ├─ Rendita: €${fab.rendita}`);
                    console.log(`    ├─ Titolarità: ${fab.proprietario?.titolarita || 'N/A'}`);
                    console.log(`    └─ Comune: ${fab.comune}`);
                });
            }
            if (allTerreni.length > 0) {
                console.log('🌱 === DETTAGLI TERRENI TROVATI ===');
                allTerreni.forEach((ter, index) => {
                    console.log(`  Terreno ${index + 1}:`);
                    console.log(`    ├─ Foglio: ${ter.foglio}`);
                    console.log(`    ├─ Particella: ${ter.particella}`);
                    console.log(`    ├─ Qualità: ${ter.qualita}`);
                    console.log(`    ├─ Superficie: ${ter.superficie} mq`);
                    console.log(`    ├─ Titolarità: ${ter.proprietario?.titolarita || 'N/A'}`);
                    console.log(`    └─ Comune: ${ter.comune}`);
                });
            }
            return {
                success: totalImmobili > 0,
                message: totalImmobili > 0
                    ? `✅ Estrazione AI completata: ${allFabbricati.length} fabbricati, ${allTerreni.length} terreni (confidenza: ${avgConfidence.toFixed(1)}%)`
                    : `⚠️ Nessun immobile estratto dai file caricati`,
                fabbricati: allFabbricati,
                terreni: allTerreni,
                errors: allErrors,
                warnings: allWarnings,
                confidence: avgConfidence
            };
        }
        catch (error) {
            console.error('❌ Errore durante processamento AI:', error);
            this.sendProgress(`❌ Errore durante l'analisi: ${error.message}`);
            return {
                success: false,
                message: `❌ Errore estrazione AI: ${error.message}`,
                fabbricati: [],
                terreni: [],
                errors: [`Errore estrazione AI: ${error.message}`],
                warnings: []
            };
        }
    }
    /**
     * Salva file temporaneamente per debug
     */
    async saveTemporaryFiles(files) {
        const savedPaths = [];
        for (const file of files) {
            const tempFileName = `${(0, uuid_1.v4)()}_${file.name}`;
            const tempFilePath = path.join(this.tempDir, tempFileName);
            try {
                fs.writeFileSync(tempFilePath, file.buffer);
                savedPaths.push(tempFilePath);
                console.log(`💾 File salvato temporaneamente: ${tempFilePath}`);
                console.log(`📁 Nome file: ${file.name}`);
                console.log(`📊 Dimensione: ${file.buffer.length} bytes`);
                console.log(`🏷️ Tipo MIME: ${file.mimeType}`);
            }
            catch (error) {
                console.error(`❌ Errore salvando file temporaneo ${file.name}:`, error);
            }
        }
        return savedPaths;
    }
    /**
     * Pulisce file temporanei
     */
    cleanupTempFiles(filePaths) {
        for (const filePath of filePaths) {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`🗑️ File temporaneo eliminato: ${filePath}`);
                }
            }
            catch (error) {
                console.error(`❌ Errore eliminando file temporaneo ${filePath}:`, error);
            }
        }
    }
}
exports.UploadServiceAI = UploadServiceAI;
