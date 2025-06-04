/**
 * Interfaccia per i dati del Catasto Fabbricati
 * Rappresenta le informazioni di un immobile registrato al catasto
 */
export interface FabbricatoCatastale {
    comune: string;
    sezione?: string;
    foglio: string;
    particella: string;
    subalterno: string;
    indirizzo: string;
    zonaCensuaria: string;
    categoria: string;
    classe: string;
    consistenza: string;
    superficieCatastale?: string;
    rendita: string;
    titolarita: string;
}
/**
 * Interfaccia per i dati del Catasto Terreni
 * Rappresenta le informazioni di un terreno registrato al catasto
 */
export interface TerrenoCatastale {
    comune: string;
    sezione?: string;
    foglio: string;
    particella: string;
    qualita: string;
    classe: string;
    superficie: string;
    redditoDominicale: string;
    redditoAgrario: string;
    titolarita: string;
    altreInformazioni?: string;
}
/**
 * Interfaccia unificata per qualsiasi dato catastale
 * Permette di gestire sia fabbricati che terreni in modo uniforme
 */
export interface DatoCatastale {
    tipo: 'fabbricato' | 'terreno';
    comune: string;
    identificativoCatastale: string;
    dati: FabbricatoCatastale | TerrenoCatastale;
    dataEstrazione: string;
    fonte: string;
}
/**
 * Interfaccia per le informazioni derivate dai dati catastali
 * Mappatura verso i parametri necessari per le condizioni IMU
 */
export interface InformazioniDerivate {
    categoriaAtastale?: string;
    superficie?: number;
    ubicazione?: string;
    tipoImmobile?: 'abitativo' | 'commerciale' | 'industriale' | 'altro';
    numeroVani?: number;
    piano?: string;
    qualitaTerreno?: string;
    classeTerreno?: string;
    comuneNormalizzato: string;
    zonaUrbanistica?: string;
    identificativo: string;
}
/**
 * Risultato dell'elaborazione dei dati catastali
 * Include sia i dati originali che quelli derivati per il matching IMU
 */
export interface ElaborazioneCatastale {
    datiOriginali: DatoCatastale;
    informazioniDerivate: InformazioniDerivate;
    parametriPerMatching: {
        [key: string]: string | number | boolean;
    };
    condizioniApplicabili?: string[];
    errori?: string[];
}
export type CategoriaFabbricato = string;
export type QualitaTerreno = string;
export interface ConfigurazioneEstrazione {
    includiStorico: boolean;
    includiGraffati: boolean;
    formatoOutput: 'completo' | 'essenziale';
    validazione: boolean;
}
