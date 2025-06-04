import { FabbricatoCatastale, TerrenoCatastale } from '../types/catasto';
/**
 * Configurazione per il servizio catasto OpenAPI
 */
export interface CatastoConfig {
    baseUrl: string;
    apiKey: string;
    token: string;
}
/**
 * Interfacce per l'integrazione con servizio catasto API reale
 * Basate sui dati OpenAPI del catasto dell'Agenzia delle Entrate
 */
export interface ProprietarioCatastale {
    denominazione: string;
    codiceFiscale: string;
    titolarita: string;
    quota: {
        numeratore: number;
        denominatore: number;
    };
}
/**
 * Interfaccia per i dati del Catasto Fabbricati dal servizio API
 */
export interface FabbricatoCatastaleAPI {
    comune: string;
    provincia: string;
    codiceCatastale: string;
    sezione: string | null;
    sezioneUrbana: string | null;
    foglio: number;
    particella: number;
    subalterno: number;
    categoria: string;
    classe: string;
    consistenza: number;
    superficie: number;
    rendita: number;
    zona: string;
    ubicazione: string;
    piano: string;
    interno: string;
    proprietario: ProprietarioCatastale;
    dataAggiornamento: Date;
    idImmobile: string;
}
/**
 * Interfaccia per i dati del Catasto Terreni dal servizio API
 */
export interface TerrenoCatastaleAPI {
    comune: string;
    provincia: string;
    codiceCatastale: string;
    sezione: string | null;
    foglio: number;
    particella: number;
    subalterno?: number;
    qualita: string;
    classe: string;
    superficie: number;
    redditoDominicale: number;
    redditoAgrario: number;
    ubicazione: string;
    proprietario: ProprietarioCatastale;
    dataAggiornamento: Date;
    idImmobile: string;
}
/**
 * Risposta dell'endpoint ricerca_nazionale (formato reale API)
 */
export interface RicercaNazionaleRisposta {
    data: {
        endpoint: string;
        stato: 'in_elaborazione' | 'evasa' | 'in_erogazione';
        callback: boolean;
        parametri: {
            cf_piva: string;
            tipo_catasto: 'T' | 'F' | 'TF';
        };
        risultato?: {
            soggetti: Array<{
                cognome?: string;
                nome?: string;
                denominazione?: string;
                data_nascita?: string;
                luogo_nascita?: string;
                sesso?: string;
                cf: string;
                id_soggetto: string;
                catasti: Array<{
                    citta: string;
                    provincia: string;
                    fabbricati: number;
                    terreni: number;
                    comuni: Array<{
                        comune: string;
                        fabbricati: number;
                        terreni: number;
                    }>;
                }>;
            }>;
        };
        esito: 'OK' | 'ERROR' | null;
        timestamp: number;
        owner: string;
        id: string;
    };
    success: boolean;
    message: string;
    error: number | null;
}
/**
 * Risposta dell'endpoint ricerca_persona
 */
export interface RicercaPersonaRisposta {
    data: {
        endpoint: string;
        stato: 'in_elaborazione' | 'evasa';
        callback: boolean;
        parametri: {
            cf_piva: string;
            tipo_catasto: 'T' | 'F';
            provincia: string;
        };
        risultato?: {
            soggetti: Array<{
                denominazione?: string;
                nome?: string;
                cognome?: string;
                sede?: string;
                cf: string;
                id_soggetto: string;
                immobili: Array<{
                    catasto: 'F' | 'T';
                    titolarita: string;
                    ubicazione: string;
                    comune: string;
                    provincia: string;
                    codice_catastale: string;
                    sezione: string | null;
                    sezione_urbana: string | null;
                    foglio: number;
                    particella: number;
                    subalterno?: number;
                    classamento?: string;
                    classe?: string;
                    consistenza?: string;
                    rendita?: string;
                    qualita?: string;
                    superficie?: number;
                    reddito_dominicale?: string;
                    reddito_agrario?: string;
                    id_immobile: string;
                }>;
            }>;
        };
        esito: 'OK' | 'ERROR';
        timestamp: number;
        owner: string;
        id: string;
    };
    success: boolean;
    message: string;
    error: number | null;
}
/**
 * Codici errore dell'API catasto
 */
export declare enum CatastoErrorCode {
    WRONG_ENDPOINT = 255,// 400 Bad Request
    INSUFFICIENT_CREDIT = 246,// 402 Payment Required
    TIPO_CATASTO_NOT_VALID = 210,// 406 Not Acceptable
    PROVINCIA_REQUIRED = 223,// 428 Precondition Required
    RATE_LIMIT_EXCEEDED = 429
}
/**
 * Errore del servizio catasto
 */
export declare class CatastoError extends Error {
    code: CatastoErrorCode;
    httpStatus: number;
    constructor(code: CatastoErrorCode, httpStatus: number, message: string | object);
}
/**
 * Servizio per l'interazione con le API del catasto OpenAPI
 */
export declare class CatastoService {
    private readonly config;
    private readonly requestsPerSecond;
    private readonly requestsPerDay;
    constructor(config: CatastoConfig);
    /**
     * Gestisce il rate limiting
     */
    private handleRateLimit;
    /**
     * Verifica i limiti giornalieri
     */
    private checkDailyLimit;
    /**
     * Effettua una richiesta HTTP all'API catasto
     */
    private makeRequest;
    /**
     * Attende che una richiesta asincrona sia completata
     */
    private waitForCompletion;
    /**
     * Ricerca nazionale: trova province con immobili intestati a un soggetto
     */
    ricercaNazionale(cfPiva: string, tipoCatasto?: 'T' | 'F' | 'TF'): Promise<RicercaNazionaleRisposta['data']['risultato']>;
    /**
     * Ricerca persona: trova tutti gli immobili intestati a un soggetto in una provincia
     */
    ricercaPersona(cfPiva: string, provincia: string, tipoCatasto: 'T' | 'F'): Promise<RicercaPersonaRisposta['data']['risultato']>;
    /**
     * Raccoglie tutti i dati catastali di un soggetto (fabbricati e terreni)
     * Implementa il flusso completo descritto dall'utente
     */
    raccogliDatiCompleti(cfPiva: string): Promise<{
        fabbricati: FabbricatoCatastale[];
        terreni: TerrenoCatastale[];
    }>;
    /**
     * Converte i dati API in formato FabbricatoCatastale (interfaccia esistente)
     */
    private convertToFabbricatoCatastale;
    /**
     * Converte i dati API in formato TerrenoCatastale (interfaccia esistente)
     */
    private convertToTerrenoCatastale;
    /**
     * Ottiene le statistiche di utilizzo del servizio
     */
    getUsageStats(): {
        richiesteOggi: number;
        richiesteRimanenti: number;
        limiteGiornaliero: number;
    };
}
