import { VisuraParsingResult } from './visure-parser';
export interface UploadConfig {
    tempDir?: string;
    maxFileSize?: number;
    allowedTypes?: string[];
    cleanupAfterMs?: number;
    useAdvancedAnalysis?: boolean;
    enableOCR?: boolean;
}
export interface UploadSession {
    id: string;
    fileName: string;
    fileSize: number;
    uploadedAt: Date;
    expiresAt: Date;
    status: 'processing' | 'completed' | 'error' | 'expired';
    result?: VisuraParsingResult;
    advancedResult?: VisuraParsingResult;
    errors?: string[];
}
export declare class UploadService {
    private readonly config;
    private readonly sessions;
    private readonly parser;
    private readonly analyzer;
    private readonly aiExtractor;
    private cleanupInterval?;
    constructor(config?: UploadConfig);
    /**
     * Processa un file caricato dall'utente
     */
    processUpload(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string>;
    /**
     * Converte risultato analisi avanzata in formato standard
     */
    private convertAdvancedToStandardResult;
    /**
     * Recupera il risultato di una sessione di upload
     */
    getSessionResult(sessionId: string): UploadSession | null;
    /**
     * Valida il file prima del processing
     */
    private validateFile;
    /**
     * Assicura che la directory temporanea esista
     */
    private ensureTempDir;
    /**
     * Cancella un file in modo sicuro
     */
    private deleteFileSync;
    /**
     * Avvia il cleanup scheduler
     */
    private startCleanupScheduler;
    /**
     * Pulisce sessioni scadute e file temporanei orfani
     */
    cleanup(): void;
    /**
     * Genera template CSV per download
     */
    generateTemplate(): {
        content: string;
        fileName: string;
    };
    /**
     * Statistiche del servizio
     */
    getStats(): {
        activeSessions: number;
        completedToday: number;
        errorsToday: number;
        tempDirSize: number;
    };
    /**
     * Chiude il servizio e pulisce tutto
     */
    shutdown(): void;
}
