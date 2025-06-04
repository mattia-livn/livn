import { FabbricatoCatastaleAPI, TerrenoCatastaleAPI } from './catasto-service';
export interface AdvancedAnalysisResult {
    success: boolean;
    confidence: number;
    errors: string[];
    warnings: string[];
    fabbricati: FabbricatoCatastaleAPI[];
    terreni: TerrenoCatastaleAPI[];
    metadata: {
        fileName: string;
        fileType: string;
        analyzedAt: Date;
        totalProperties: number;
        processingTime: number;
        techniques: string[];
        extractedText?: string;
    };
    qualityAssessment: {
        dataCompleteness: number;
        dataAccuracy: number;
        structureRecognition: number;
        missingFields: string[];
        suggestedActions: string[];
    };
}
export interface AnalysisOptions {
    useOCR?: boolean;
    ocrLanguage?: string;
    enableNLP?: boolean;
    autoCorrection?: boolean;
    strictValidation?: boolean;
    extractImages?: boolean;
}
export declare class AdvancedDataAnalyzer {
    private options;
    private readonly tokenizer;
    private readonly stemmer;
    constructor(options?: AnalysisOptions);
    /**
     * Analizza un file con tecniche avanzate
     */
    analyzeFile(filePath: string, fileName: string): Promise<AdvancedAnalysisResult>;
    /**
     * Determina le strategie di analisi più appropriate per il file
     */
    private determineAnalysisStrategies;
    /**
     * Estrae testo usando una strategia specifica
     */
    private extractTextWithStrategy;
    /**
     * Estrae testo da PDF
     */
    private extractTextFromPDF;
    /**
     * Estrae testo con OCR
     */
    private extractTextWithOCR;
    /**
     * Estrae testo direttamente
     */
    private extractTextDirect;
    /**
     * Estrae testo da CSV
     */
    private extractTextFromCSV;
    /**
     * Verifica se il testo è valido italiano
     */
    private isValidItalianText;
    /**
     * Converte dati CSV in testo strutturato
     */
    private csvToText;
    /**
     * Pulisce e normalizza il testo estratto
     */
    private cleanAndNormalizeText;
    /**
     * Analizza la struttura del documento
     */
    private analyzeDocumentStructure;
    /**
     * Estrae dati catastali con NLP avanzato
     */
    private extractCatastralData;
    /**
     * Costruisce pattern intelligenti usando NLP
     */
    private buildSmartPatterns;
    /**
     * Estrae entità nominate dal testo
     */
    private extractNamedEntities;
    /**
     * Identifica sezioni del documento
     */
    private identifyDocumentSections;
    /**
     * Estrae fabbricati da una sezione
     */
    private extractFabbricatiFromSection;
    /**
     * Estrae terreni da una sezione
     */
    private extractTerreniFromSection;
    /**
     * Estrae proprietario dal contenuto
     */
    private extractProprietario;
    /**
     * Estrae ubicazione specifica da una riga
     */
    private extractUbicazione;
    /**
     * Applica correzioni automatiche
     */
    private applyAutoCorrections;
    /**
     * Corregge categoria catastale
     */
    private correctCategoria;
    /**
     * Corregge qualità terreno
     */
    private correctQualita;
    /**
     * Valida campi numerici
     */
    private validateNumericFields;
    /**
     * Valuta la qualità dei dati estratti
     */
    private assessDataQuality;
    /**
     * Estrae dati da testo usando pattern multipli
     */
    private extractDataFromText;
    /**
     * Costruisce un oggetto fabbricato dai match del pattern
     */
    private buildFabbricatoFromMatch;
    /**
     * Estrae comune dal contesto
     */
    private extractComuneFromContext;
    /**
     * Estrae provincia dal contesto
     */
    private extractProvinciaFromContext;
}
export default AdvancedDataAnalyzer;
