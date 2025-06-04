import { FabbricatoCatastaleAPI, TerrenoCatastaleAPI } from './catasto-service';
export interface VisuraParsingResult {
    success: boolean;
    errors: string[];
    fabbricati: FabbricatoCatastaleAPI[];
    terreni: TerrenoCatastaleAPI[];
    metadata: {
        fileName: string;
        fileType: string;
        parsedAt: Date;
        totalProperties: number;
    };
}
export interface VisuraUploadOptions {
    maxFileSize?: number;
    allowedTypes?: string[];
    extractImagesFromPDF?: boolean;
}
export declare class VisureParser {
    private options;
    private readonly defaultOptions;
    constructor(options?: VisuraUploadOptions);
    /**
     * Parsa una visura catastale da file
     */
    parseVisura(filePath: string, fileName: string): Promise<VisuraParsingResult>;
    /**
     * Parsa visura PDF (richiede OCR o estrazione testo)
     */
    private parsePDFVisura;
    /**
     * Parsa visura in formato testo
     */
    private parseTextVisura;
    /**
     * Parsa visura in formato CSV
     */
    private parseCSVVisura;
    /**
     * Estrae dati da contenuto testuale di visura
     */
    private parseTextContent;
    /**
     * Helper per parsare le rendite in formato monetario
     */
    private parseRendita;
    /**
     * Parsa contenuto CSV con formato predefinito
     */
    private parseCSVContent;
    /**
     * Genera template CSV per l'utente
     */
    generateCSVTemplate(): string;
    /**
     * Valida i dati estratti
     */
    validateExtractedData(data: VisuraParsingResult): string[];
}
