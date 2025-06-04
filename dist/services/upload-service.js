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
exports.UploadService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const visure_parser_1 = require("./visure-parser");
const advanced_data_analyzer_1 = require("./advanced-data-analyzer");
const ai_extraction_service_1 = require("./ai-extraction-service");
class UploadService {
    constructor(config = {}) {
        this.sessions = new Map();
        this.config = {
            tempDir: config.tempDir || path.join(process.cwd(), 'temp-uploads'),
            maxFileSize: config.maxFileSize || 10, // 10MB
            allowedTypes: config.allowedTypes || ['text/csv', 'text/plain', 'application/pdf'],
            cleanupAfterMs: config.cleanupAfterMs || 30 * 60 * 1000, // 30 minuti
            useAdvancedAnalysis: config.useAdvancedAnalysis !== false, // Default true
            enableOCR: config.enableOCR !== false // Default true
        };
        this.parser = new visure_parser_1.VisureParser({
            maxFileSize: this.config.maxFileSize,
            allowedTypes: this.config.allowedTypes
        });
        this.analyzer = new advanced_data_analyzer_1.AdvancedDataAnalyzer({
            useOCR: this.config.enableOCR,
            ocrLanguage: 'ita',
            enableNLP: true,
            autoCorrection: true,
            strictValidation: false
        });
        this.aiExtractor = new ai_extraction_service_1.AIExtractionService();
        // Assicura che la directory temp esista
        this.ensureTempDir();
        // Avvia cleanup automatico ogni 5 minuti
        this.startCleanupScheduler();
    }
    /**
     * Processa un file caricato dall'utente
     */
    async processUpload(fileBuffer, fileName, mimeType) {
        var _a;
        console.log('🔍 === INIZIO PROCESSO UPLOAD ===');
        console.log(`📁 Nome file: ${fileName}`);
        console.log(`📊 Dimensione: ${fileBuffer.length} bytes`);
        console.log(`🏷️ Tipo MIME: ${mimeType}`);
        // Genera ID sessione unico
        const sessionId = crypto.randomUUID();
        // Valida file
        const validation = this.validateFile(fileBuffer, fileName, mimeType);
        if (!validation.valid) {
            console.log(`❌ File non valido: ${validation.errors.join(', ')}`);
            throw new Error(`File non valido: ${validation.errors.join(', ')}`);
        }
        // Crea sessione
        const session = {
            id: sessionId,
            fileName,
            fileSize: fileBuffer.length,
            uploadedAt: new Date(),
            expiresAt: new Date(Date.now() + this.config.cleanupAfterMs),
            status: 'processing'
        };
        this.sessions.set(sessionId, session);
        try {
            // Salva temporaneamente il file
            const tempFilePath = path.join(this.config.tempDir, `${sessionId}_${fileName}`);
            fs.writeFileSync(tempFilePath, fileBuffer);
            console.log(`💾 File salvato temporaneamente: ${tempFilePath}`);
            let finalResult;
            if (this.config.useAdvancedAnalysis) {
                console.log(`🚀 === AVVIO ANALISI AVANZATA ===`);
                console.log(`🔍 Avvio analisi avanzata per: ${fileName}`);
                // Usa analisi avanzata
                const advancedResult = await this.analyzer.analyze(fileBuffer, fileName, mimeType);
                session.advancedResult = advancedResult;
                console.log('📋 === RISULTATO ANALISI AVANZATA ===');
                console.log(`✅ Successo: ${advancedResult.success}`);
                console.log(`🎯 Confidenza: ${(advancedResult.confidence * 100).toFixed(1)}%`);
                console.log(`🏠 Fabbricati trovati: ${advancedResult.fabbricati.length}`);
                console.log(`🌱 Terreni trovati: ${advancedResult.terreni.length}`);
                console.log(`⚠️ Errori: ${advancedResult.errors.length}`);
                console.log(`🟡 Warning: ${advancedResult.warnings.length}`);
                if (advancedResult.fabbricati.length > 0) {
                    console.log('🏠 === DETTAGLI FABBRICATI TROVATI ===');
                    advancedResult.fabbricati.forEach((fab, i) => {
                        console.log(`  Fabbricato ${i + 1}:`);
                        console.log(`    ├─ Foglio: ${fab.foglio}`);
                        console.log(`    ├─ Particella: ${fab.particella}`);
                        console.log(`    ├─ Subalterno: ${fab.subalterno}`);
                        console.log(`    ├─ Categoria: ${fab.categoria}`);
                        console.log(`    ├─ Rendita: €${fab.rendita}`);
                        console.log(`    └─ Comune: ${fab.comune}`);
                    });
                }
                else {
                    console.log('⚠️ === NESSUN FABBRICATO TROVATO ===');
                }
                // Converte risultato avanzato in formato compatibile
                finalResult = this.convertAdvancedToStandardResult(advancedResult);
                console.log(`✅ Analisi avanzata completata: ${advancedResult.metadata.totalProperties} immobili trovati (confidence: ${(advancedResult.confidence * 100).toFixed(1)}%)`);
                if (advancedResult.warnings.length > 0) {
                    console.log(`⚠️ Avvisi: ${advancedResult.warnings.join(', ')}`);
                }
            }
            else {
                console.log('📊 === ANALISI STANDARD ===');
                // Usa parser tradizionale
                finalResult = await this.parser.parseVisura(fileBuffer, fileName);
                console.log(`📊 Analisi standard completata: ${finalResult.fabbricati.length} fabbricati, ${finalResult.terreni.length} terreni`);
            }
            // Aggiorna sessione con risultato
            session.status = finalResult.success ? 'completed' : 'error';
            session.result = finalResult;
            if (!finalResult.success) {
                session.errors = finalResult.errors;
                console.log(`❌ Errori durante l'analisi: ${(_a = finalResult.errors) === null || _a === void 0 ? void 0 : _a.join(', ')}`);
            }
            // CANCELLA IMMEDIATAMENTE il file temporaneo
            this.deleteFileSync(tempFilePath);
            const analysisType = this.config.useAdvancedAnalysis ? 'avanzata' : 'standard';
            console.log(`✅ File processato (${analysisType}): ${fileName} (${finalResult.fabbricati.length} fabbricati, ${finalResult.terreni.length} terreni)`);
            console.log('🔍 === FINE PROCESSO UPLOAD ===');
            return sessionId;
        }
        catch (error) {
            session.status = 'error';
            session.errors = [error.message];
            // Cancella file anche in caso di errore
            const tempFilePath = path.join(this.config.tempDir, `${sessionId}_${fileName}`);
            this.deleteFileSync(tempFilePath);
            console.error(`❌ === ERRORE DURANTE ELABORAZIONE ===`);
            console.error(`File: ${fileName}`);
            console.error('Errore:', error);
            console.error('Stack:', error.stack);
        }
        return sessionId;
    }
    /**
     * Converte risultato analisi avanzata in formato standard
     */
    convertAdvancedToStandardResult(advancedResult) {
        return {
            success: advancedResult.success,
            errors: advancedResult.errors,
            fabbricati: advancedResult.fabbricati,
            terreni: advancedResult.terreni,
            metadata: {
                fileName: advancedResult.metadata.fileName,
                fileType: advancedResult.metadata.fileType,
                parsedAt: advancedResult.metadata.analyzedAt,
                totalProperties: advancedResult.metadata.totalProperties
            }
        };
    }
    /**
     * Recupera il risultato di una sessione di upload
     */
    getSessionResult(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return null;
        }
        // Controlla scadenza
        if (session.expiresAt < new Date()) {
            session.status = 'expired';
            this.sessions.delete(sessionId);
            return null;
        }
        return session;
    }
    /**
     * Valida il file prima del processing
     */
    validateFile(fileBuffer, fileName, mimeType) {
        const errors = [];
        // Controlla dimensione
        const fileSizeMB = fileBuffer.length / (1024 * 1024);
        if (fileSizeMB > this.config.maxFileSize) {
            errors.push(`File troppo grande: ${fileSizeMB.toFixed(2)}MB (max: ${this.config.maxFileSize}MB)`);
        }
        // Controlla tipo MIME
        if (!this.config.allowedTypes.includes(mimeType)) {
            errors.push(`Tipo file non supportato: ${mimeType}`);
        }
        // Controlla estensione
        const extension = path.extname(fileName).toLowerCase();
        const allowedExtensions = ['.csv', '.txt', '.pdf'];
        if (!allowedExtensions.includes(extension)) {
            errors.push(`Estensione non supportata: ${extension}`);
        }
        // Controlla nome file
        if (!fileName || fileName.length > 255) {
            errors.push('Nome file non valido');
        }
        return {
            valid: errors.length === 0,
            errors
        };
    }
    /**
     * Assicura che la directory temporanea esista
     */
    ensureTempDir() {
        if (!fs.existsSync(this.config.tempDir)) {
            fs.mkdirSync(this.config.tempDir, { recursive: true });
        }
    }
    /**
     * Cancella un file in modo sicuro
     */
    deleteFileSync(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        catch (error) {
            console.warn(`⚠️  Impossibile cancellare file temporaneo: ${filePath}`, error);
        }
    }
    /**
     * Avvia il cleanup scheduler
     */
    startCleanupScheduler() {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000); // Ogni 5 minuti
    }
    /**
     * Pulisce sessioni scadute e file temporanei orfani
     */
    cleanup() {
        const now = new Date();
        let cleanedSessions = 0;
        let cleanedFiles = 0;
        // Rimuovi sessioni scadute
        for (const [sessionId, session] of this.sessions) {
            if (session.expiresAt < now) {
                this.sessions.delete(sessionId);
                cleanedSessions++;
            }
        }
        // Rimuovi file temporanei orfani
        try {
            if (fs.existsSync(this.config.tempDir)) {
                const files = fs.readdirSync(this.config.tempDir);
                for (const file of files) {
                    const filePath = path.join(this.config.tempDir, file);
                    const stats = fs.statSync(filePath);
                    // Cancella file più vecchi di 1 ora
                    if (now.getTime() - stats.mtime.getTime() > 60 * 60 * 1000) {
                        this.deleteFileSync(filePath);
                        cleanedFiles++;
                    }
                }
            }
        }
        catch (error) {
            console.warn('⚠️  Errore durante cleanup file temporanei:', error);
        }
        if (cleanedSessions > 0 || cleanedFiles > 0) {
            console.log(`🧹 Cleanup completato: ${cleanedSessions} sessioni, ${cleanedFiles} file`);
        }
    }
    /**
     * Genera template CSV per download
     */
    generateTemplate() {
        return {
            content: this.parser.generateCSVTemplate(),
            fileName: 'template-visure-catastali.csv'
        };
    }
    /**
     * Statistiche del servizio
     */
    getStats() {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let completedToday = 0;
        let errorsToday = 0;
        for (const session of this.sessions.values()) {
            if (session.uploadedAt >= todayStart) {
                if (session.status === 'completed')
                    completedToday++;
                if (session.status === 'error')
                    errorsToday++;
            }
        }
        // Calcola dimensione directory temp
        let tempDirSize = 0;
        try {
            if (fs.existsSync(this.config.tempDir)) {
                const files = fs.readdirSync(this.config.tempDir);
                for (const file of files) {
                    const filePath = path.join(this.config.tempDir, file);
                    const stats = fs.statSync(filePath);
                    tempDirSize += stats.size;
                }
            }
        }
        catch (error) {
            console.warn('⚠️  Errore calcolo dimensione temp dir:', error);
        }
        return {
            activeSessions: this.sessions.size,
            completedToday,
            errorsToday,
            tempDirSize: Math.round(tempDirSize / 1024) // KB
        };
    }
    /**
     * Chiude il servizio e pulisce tutto
     */
    shutdown() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        // Cleanup finale
        this.cleanup();
        // Cancella tutte le sessioni
        this.sessions.clear();
        console.log('🔌 UploadService chiuso');
    }
}
exports.UploadService = UploadService;
//# sourceMappingURL=upload-service.js.map