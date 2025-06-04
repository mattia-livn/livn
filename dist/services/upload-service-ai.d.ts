interface FileData {
    buffer: Buffer;
    name: string;
    mimeType: string;
}
interface UploadResult {
    success: boolean;
    message: string;
    fabbricati: any[];
    terreni: any[];
    errors: string[];
    warnings: string[];
    confidence?: number;
}
export type ProgressCallback = (message: string) => void;
/**
 * Servizio di upload semplificato che usa solo AI extraction
 */
export declare class UploadServiceAI {
    private aiExtractor;
    private tempDir;
    private progressCallback?;
    constructor();
    /**
     * Imposta callback per feedback progressivo
     */
    setProgressCallback(callback: ProgressCallback): void;
    /**
     * Invia messaggio di progresso
     */
    private sendProgress;
    /**
     * Processa file multipli usando AI extraction con feedback progressivo
     */
    processFiles(files: FileData[]): Promise<UploadResult>;
    /**
     * Salva file temporaneamente per debug
     */
    private saveTemporaryFiles;
    /**
     * Pulisce file temporanei
     */
    private cleanupTempFiles;
}
export {};
