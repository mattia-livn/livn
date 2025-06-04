import { FabbricatoCatastale, TerrenoCatastale, DatoCatastale, ElaborazioneCatastale } from '../types/catasto';
/**
 * Classe per elaborare e mappare i dati catastali ai parametri IMU
 */
export declare class CatastoMapper {
    /**
     * Elabora i dati catastali e li converte nei parametri necessari per il matching IMU
     */
    static elaboraDatiCatastali(datoCatastale: DatoCatastale): ElaborazioneCatastale;
    /**
     * Estrae informazioni strutturate dai dati catastali grezzi
     */
    private static estraiInformazioni;
    /**
     * Elabora i dati di un fabbricato
     */
    private static elaboraFabbricato;
    /**
     * Elabora i dati di un terreno
     */
    private static elaboraTerreno;
    /**
     * Crea i parametri nel formato richiesto dal sistema di matching IMU
     */
    private static creaParametriMatching;
    /**
     * Identifica le possibili condizioni IMU applicabili basandosi sui dati catastali
     */
    private static identificaCondizioniApplicabili;
    /**
     * Utilities per l'estrazione e normalizzazione dei dati
     */
    private static normalizzaComune;
    private static estraiSuperficie;
    private static estraiUbicazione;
    private static determinaTipoImmobile;
    private static estraiNumeroVani;
    private static estraiPiano;
    private static estraiProvincia;
    private static deriveDestinazioneUso;
    /**
     * Valida i dati catastali e restituisce eventuali errori
     */
    private static validaDati;
}
/**
 * Factory per creare oggetti DatoCatastale dai dati grezzi
 */
export declare class CatastoFactory {
    static creaFabbricato(dati: FabbricatoCatastale): DatoCatastale;
    static creaTerreno(dati: TerrenoCatastale): DatoCatastale;
}
