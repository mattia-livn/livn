interface ImuRateEntry {
    condition: string;
    details: string;
    ratePercent: number;
    context?: string;
    categoryTypes?: string[];
    zone?: string;
    requiredParameters?: any;
}
interface CommuneConditionsResult {
    aliquota: number;
    descrizione: string;
    conditionMatched: ImuRateEntry | null;
    matchingScore: number;
}
export declare class CommuneConditionsService {
    private loadedCommunes;
    private communeFileCache;
    constructor();
    /**
     * Costruisce l'indice dei file comunali disponibili
     */
    private buildCommuneFileIndex;
    /**
     * Estrae il nome del comune dal filename
     */
    private extractCommuneNameFromFile;
    /**
     * Trova il file del comune più vicino al nome fornito
     */
    private findCommuneFile;
    /**
     * Carica le condizioni specifiche di un comune
     */
    private loadCommuneConditions;
    /**
     * Parsing del nuovo formato JSON dei file migrati
     */
    private parseNewFormatConditionsFromFile;
    /**
     * Fallback: parsing del formato vecchio (per file non ancora migrati)
     */
    private parseOldFormatConditionsFromFile;
    /**
     * Cerca un campo stringa nelle righe successive
     */
    private findFieldInNextLines;
    /**
     * Cerca un numero nelle righe successive
     */
    private findNumberInNextLines;
    /**
     * Cerca un array nelle righe successive
     */
    private findArrayInNextLines;
    /**
     * Trova la migliore condizione applicabile per un immobile
     */
    findBestCondition(fabbricato: any, userAnswers: any, immobileIndex: number, communeName: string): Promise<CommuneConditionsResult>;
    /**
     * Calcola il punteggio di matching tra una condizione e un immobile
     */
    private calculateMatchingScore;
    /**
     * Genera domande specifiche basate sulle condizioni del comune
     */
    generateCommuneSpecificQuestions(extractedData: any, communeName: string): Promise<any[]>;
    /**
     * Verifica se una condizione è rilevante per un immobile
     */
    private isConditionRelevantForProperty;
    /**
     * Genera opzioni per un parametro specifico
     */
    private getOptionsForParameter;
    /**
     * Metodo pubblico per ottenere tutte le condizioni di un comune
     */
    getConditionsForCommune(communeName: string): Promise<ImuRateEntry[]>;
    /**
     * Restituisce l'elenco dei comuni disponibili
     */
    getAvailableCommunes(): string[];
}
export {};
