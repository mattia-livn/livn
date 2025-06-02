// Tipi per i dati catastali - Logica di dominio per l'integrazione con il catasto

/**
 * Interfaccia per i dati del Catasto Fabbricati
 * Rappresenta le informazioni di un immobile registrato al catasto
 */
export interface FabbricatoCatastale {
  comune: string; // Es: "TORINO"
  sezione?: string; // Es: "U" (se presente)
  foglio: string; // Es: "115"
  particella: string; // Es: "456"
  subalterno: string; // Es: "10"
  indirizzo: string; // Es: "VIA ROMA n. 23 Piano 2"
  zonaCensuaria: string; // Es: "1"
  categoria: string; // Es: "A/2"
  classe: string; // Es: "3"
  consistenza: string; // Es: "5 vani" o "45 m²"
  superficieCatastale?: string; // Es: "90 m²" (se disponibile)
  rendita: string; // Es: "€ 523,45"
  titolarita: string; // Es: "Proprietà per 1/1"
}

/**
 * Interfaccia per i dati del Catasto Terreni
 * Rappresenta le informazioni di un terreno registrato al catasto
 */
export interface TerrenoCatastale {
  comune: string; // Es: "ASTI"
  sezione?: string; // Es: "C" (se presente)
  foglio: string; // Es: "122"
  particella: string; // Es: "89"
  qualita: string; // Es: "Seminativo"
  classe: string; // Es: "3"
  superficie: string; // Es: "3.200 m²"
  redditoDominicale: string; // Es: "€ 15,45"
  redditoAgrario: string; // Es: "€ 12,34"
  titolarita: string; // Es: "Proprietà per 1/1"
  altreInformazioni?: string; // Es: "Ultimo frazionamento: 2020"
}

/**
 * Interfaccia unificata per qualsiasi dato catastale
 * Permette di gestire sia fabbricati che terreni in modo uniforme
 */
export interface DatoCatastale {
  tipo: 'fabbricato' | 'terreno';
  comune: string;
  identificativoCatastale: string; // Es: "Fg.115 Part.456 Sub.10" o "Fg.122 Part.89"
  dati: FabbricatoCatastale | TerrenoCatastale;
  dataEstrazione: string; // Data di estrazione dei dati dal catasto
  fonte: string; // Es: "Agenzia delle Entrate - Catasto"
}

/**
 * Interfaccia per le informazioni derivate dai dati catastali
 * Mappatura verso i parametri necessari per le condizioni IMU
 */
export interface InformazioniDerivate {
  // Parametri base
  categoriaAtastale?: string; // Derivato da categoria (fabbricati) o qualita (terreni)
  superficie?: number; // Derivato da superficieCatastale o superficie, convertito in numero
  ubicazione?: string; // Derivato da indirizzo e zona censuaria
  
  // Parametri specifici fabbricati
  tipoImmobile?: 'abitativo' | 'commerciale' | 'industriale' | 'altro'; // Derivato da categoria
  numeroVani?: number; // Derivato da consistenza se espressa in vani
  piano?: string; // Derivato da indirizzo se presente
  
  // Parametri specifici terreni
  qualitaTerreno?: string; // Derivato da qualita
  classeTerreno?: string; // Derivato da classe
  
  // Metadati
  comuneNormalizzato: string; // Nome comune normalizzato per il matching
  zonaUrbanistica?: string; // Derivato da zona censuaria
  identificativo: string; // Identificativo univoco catastale
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
  condizioniApplicabili?: string[]; // Elenco delle condizioni IMU potenzialmente applicabili
  errori?: string[]; // Eventuali errori nell'elaborazione
}

// Tipi utility per la gestione dei dati catastali

export type CategoriaFabbricato = string; // A/1, A/2, B/1, C/1, D/1, etc.
export type QualitaTerreno = string; // Seminativo, Vigneto, Oliveto, etc.

export interface ConfigurazioneEstrazione {
  includiStorico: boolean;
  includiGraffati: boolean;
  formatoOutput: 'completo' | 'essenziale';
  validazione: boolean;
} 