export interface ExtractedPDFData {
    text: string;
    tables: any[];
    metadata: {
        pages: number;
        title?: string;
        author?: string;
        subject?: string;
        creator?: string;
        producer?: string;
        creationDate?: Date;
        modificationDate?: Date;
    };
    extractionMethod: string;
    confidence: 'high' | 'medium' | 'low';
}
/**
 * Processore PDF avanzato ottimizzato per delibere comunali italiane
 * Combina estrazione testo + tabelle + metadati
 */
export declare function processAdvancedPDF(fileData: Blob | Buffer): Promise<ExtractedPDFData>;
/**
 * Funzione di utilità per verificare se un PDF è scansionato
 */
export declare function isPDFScanned(extractedData: ExtractedPDFData): boolean;
/**
 * Suggerimenti per migliorare l'estrazione
 */
export declare function getExtractionTips(extractedData: ExtractedPDFData): string[];
