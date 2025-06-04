import { FabbricatoCatastaleAPI, TerrenoCatastaleAPI } from './catasto-service';
interface AIExtractionResult {
    success: boolean;
    confidence: number;
    fabbricati: FabbricatoCatastaleAPI[];
    terreni: TerrenoCatastaleAPI[];
    errors: string[];
    warnings: string[];
    rawResponse?: string;
}
/**
 * Servizio per l'estrazione AI-powered di dati catastali
 */
export declare class AIExtractionService {
    private openai;
    constructor();
    /**
     * Estrae dati catastali da file usando AI
     */
    extractCatastralData(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<AIExtractionResult>;
    /**
     * Estrae testo da diversi tipi di file
     */
    private extractTextFromFile;
    /**
     * Analizza il testo estratto con OpenAI
     */
    private analyzeWithAI;
    /**
     * Valida e normalizza i dati dei fabbricati
     */
    private validateFabbricati;
    /**
     * Valida e normalizza i dati dei terreni
     */
    private validateTerreni;
    /**
     * Processa file multipli in batch
     */
    extractFromMultipleFiles(files: {
        buffer: Buffer;
        name: string;
        mimeType: string;
    }[]): Promise<AIExtractionResult>;
}
export {};
