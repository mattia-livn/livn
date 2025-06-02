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
  quota: { numeratore: number; denominatore: number };
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
export enum CatastoErrorCode {
  WRONG_ENDPOINT = 255,          // 400 Bad Request
  INSUFFICIENT_CREDIT = 246,     // 402 Payment Required
  TIPO_CATASTO_NOT_VALID = 210,  // 406 Not Acceptable
  PROVINCIA_REQUIRED = 223,      // 428 Precondition Required
  RATE_LIMIT_EXCEEDED = 429,     // 429 Too Many Requests
}

/**
 * Errore del servizio catasto
 */
export class CatastoError extends Error {
  constructor(
    public code: CatastoErrorCode,
    public httpStatus: number,
    message: string | object
  ) {
    // Assicura che il messaggio sia sempre una stringa
    const errorMessage = typeof message === 'string' 
      ? message 
      : (typeof message === 'object' && message !== null)
        ? JSON.stringify(message)
        : 'Errore sconosciuto';
    
    super(errorMessage);
    this.name = 'CatastoError';
  }
}

/**
 * Servizio per l'interazione con le API del catasto OpenAPI
 */
export class CatastoService {
  private readonly config: CatastoConfig;
  private readonly requestsPerSecond = 1; // Rate limiting: max 1 richiesta al secondo
  private readonly requestsPerDay: Map<string, number> = new Map(); // Tracking richieste giornaliere
  
  constructor(config: CatastoConfig) {
    this.config = config;
  }

  /**
   * Gestisce il rate limiting
   */
  private async handleRateLimit(): Promise<void> {
    // Aspetta 1 secondo tra le richieste per rispettare i limiti
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  /**
   * Verifica i limiti giornalieri
   */
  private checkDailyLimit(): void {
    const today = new Date().toISOString().split('T')[0];
    const todayRequests = this.requestsPerDay.get(today) || 0;
    
    // Limite base: 40 richieste al giorno (varia con subscription)
    if (todayRequests >= 40) {
      throw new CatastoError(
        CatastoErrorCode.RATE_LIMIT_EXCEEDED,
        429,
        'Limite giornaliero di richieste raggiunto'
      );
    }
    
    this.requestsPerDay.set(today, todayRequests + 1);
  }

  /**
   * Effettua una richiesta HTTP all'API catasto
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    body?: any
  ): Promise<T> {
    // Gestione rate limiting
    this.checkDailyLimit();
    await this.handleRateLimit();

    // Costruisce l'URL completo, aggiungendo https:// se mancante
    let baseUrl = this.config.baseUrl;
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }
    
    const url = `${baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Header di autenticazione per OpenAPI catasto
      'X-API-Key': this.config.apiKey,
      'Authorization': `Bearer ${this.config.token}`,
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      let responseData;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          const textResponse = await response.text();
          console.log(`⚠️ Risposta non JSON (${response.status}): ${textResponse.substring(0, 200)}...`);
          throw new Error(`Risposta API non valida: ${response.status} ${response.statusText}`);
        }
      } catch (parseError) {
        throw new Error(`Errore parsing risposta API: ${response.status} ${response.statusText}`);
      }

      // Gestione errori specifici dell'API catasto
      if (!response.ok) {
        const errorCode = responseData?.error || response.status;
        const errorMessage = responseData?.message || 
                           responseData?.error_description || 
                           responseData?.msg ||
                           `Errore HTTP ${response.status}: ${response.statusText}`;
        
        console.log(`❌ Errore API: ${response.status} - Codice: ${errorCode}`);
        console.log(`📋 Messaggio: ${errorMessage}`);
        console.log(`📋 Risposta completa:`, JSON.stringify(responseData, null, 2));
        
        // Usa lo status HTTP come codice se non c'è un codice specifico dell'API
        const finalErrorCode = (typeof errorCode === 'number' && errorCode > 0) 
          ? errorCode as CatastoErrorCode
          : response.status as CatastoErrorCode;
        
        throw new CatastoError(finalErrorCode, response.status, errorMessage);
      }

      // Verifica che la risposta abbia la struttura attesa
      if (!responseData || typeof responseData !== 'object') {
        throw new Error('Struttura risposta API non valida');
      }

      return responseData;
    } catch (error) {
      if (error instanceof CatastoError) {
        throw error;
      }
      
      // Gestione errori di rete o altri errori
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      console.log(`❌ Errore di rete: ${errorMessage}`);
      throw new Error(`Errore di rete: ${errorMessage}`);
    }
  }

  /**
   * Attende che una richiesta asincrona sia completata
   */
  private async waitForCompletion<T extends { data: { stato: string } }>(
    requestId: string,
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<T> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, intervalMs));
      
      const response = await this.makeRequest<T>(`/richiesta/${requestId}`, 'GET');
      
      if (response.data && response.data.stato === 'evasa') {
        return response;
      }
    }
    
    throw new Error(`Timeout: richiesta ${requestId} non completata dopo ${maxAttempts} tentativi`);
  }

  /**
   * Ricerca nazionale: trova province con immobili intestati a un soggetto
   */
  async ricercaNazionale(
    cfPiva: string,
    tipoCatasto: 'T' | 'F' | 'TF' = 'TF'
  ): Promise<RicercaNazionaleRisposta['data']['risultato']> {
    const response = await this.makeRequest<RicercaNazionaleRisposta>(
      '/richiesta/ricerca_nazionale/',
      'POST',
      {
        cf_piva: cfPiva,
        tipo_catasto: tipoCatasto
      }
    );

    // Attende il completamento della richiesta asincrona
    const completedResponse = await this.waitForCompletion<RicercaNazionaleRisposta>(
      response.data.id
    );

    return completedResponse.data.risultato;
  }

  /**
   * Ricerca persona: trova tutti gli immobili intestati a un soggetto in una provincia
   */
  async ricercaPersona(
    cfPiva: string,
    provincia: string,
    tipoCatasto: 'T' | 'F'
  ): Promise<RicercaPersonaRisposta['data']['risultato']> {
    const response = await this.makeRequest<RicercaPersonaRisposta>(
      '/richiesta/ricerca_persona/',
      'POST',
      {
        cf_piva: cfPiva,
        tipo_catasto: tipoCatasto,
        provincia: provincia
      }
    );

    // Attende il completamento della richiesta asincrona
    const completedResponse = await this.waitForCompletion<RicercaPersonaRisposta>(
      response.data.id
    );

    return completedResponse.data.risultato;
  }

  /**
   * Raccoglie tutti i dati catastali di un soggetto (fabbricati e terreni)
   * Implementa il flusso completo descritto dall'utente
   */
  async raccogliDatiCompleti(cfPiva: string): Promise<{
    fabbricati: FabbricatoCatastale[];
    terreni: TerrenoCatastale[];
  }> {
    const fabbricati: FabbricatoCatastale[] = [];
    const terreni: TerrenoCatastale[] = [];

    try {
      // 1. Ricerca nazionale per ottenere le province
      console.log(`🔍 Ricerca nazionale per CF/PIVA: ${cfPiva}`);
      const ricercaNazionale = await this.ricercaNazionale(cfPiva, 'TF');

      if (!ricercaNazionale?.soggetti?.length) {
        console.log('❌ Nessuna proprietà trovata');
        return { fabbricati, terreni };
      }

      console.log(`✅ Trovate ${ricercaNazionale.soggetti.length} province con proprietà`);

      // 2. Per ogni provincia con fabbricati, ricerca dettagliata
      for (const soggetto of ricercaNazionale.soggetti) {
        for (const catasto of soggetto.catasti) {
          if (catasto.fabbricati > 0) {
            console.log(`🏠 Ricerca fabbricati in ${catasto.provincia} (${catasto.fabbricati} immobili)`);
            
            try {
              const risultatoFabbricati = await this.ricercaPersona(cfPiva, catasto.provincia, 'F');
              
              if (risultatoFabbricati?.soggetti) {
                for (const soggettoDettaglio of risultatoFabbricati.soggetti) {
                  for (const immobile of soggettoDettaglio.immobili) {
                    if (immobile.catasto === 'F') {
                      fabbricati.push(this.convertToFabbricatoCatastale(immobile, soggettoDettaglio));
                    }
                  }
                }
              }
            } catch (error) {
              console.error(`❌ Errore ricerca fabbricati in ${catasto.provincia}:`, error);
              // Continua con le altre province
            }
          }

          // 3. Per ogni provincia con terreni, ricerca dettagliata
          if (catasto.terreni > 0) {
            console.log(`🌾 Ricerca terreni in ${catasto.provincia} (${catasto.terreni} terreni)`);
            
            try {
              const risultatoTerreni = await this.ricercaPersona(cfPiva, catasto.provincia, 'T');
              
              if (risultatoTerreni?.soggetti) {
                for (const soggettoDettaglio of risultatoTerreni.soggetti) {
                  for (const immobile of soggettoDettaglio.immobili) {
                    if (immobile.catasto === 'T') {
                      terreni.push(this.convertToTerrenoCatastale(immobile, soggettoDettaglio));
                    }
                  }
                }
              }
            } catch (error) {
              console.error(`❌ Errore ricerca terreni in ${catasto.provincia}:`, error);
              // Continua con le altre province
            }
          }
        }
      }

      console.log(`✅ Raccolta dati completata: ${fabbricati.length} fabbricati, ${terreni.length} terreni`);
      
      return { fabbricati, terreni };

    } catch (error) {
      console.error('❌ Errore durante la raccolta dati catastali:', error);
      
      if (error instanceof CatastoError) {
        // Gestione errori specifici dell'API
        switch (error.code) {
          case CatastoErrorCode.INSUFFICIENT_CREDIT:
            throw new Error('Credito insufficiente per completare la richiesta');
          case CatastoErrorCode.RATE_LIMIT_EXCEEDED:
            throw new Error('Limite di richieste superato. Riprovare più tardi');
          case CatastoErrorCode.TIPO_CATASTO_NOT_VALID:
            throw new Error('Tipo catasto non valido');
          case CatastoErrorCode.PROVINCIA_REQUIRED:
            throw new Error('Provincia richiesta mancante');
          default:
            throw new Error(`Errore API catasto: ${error.message}`);
        }
      }
      
      throw error;
    }
  }

  /**
   * Converte i dati API in formato FabbricatoCatastale (interfaccia esistente)
   */
  private convertToFabbricatoCatastale(
    immobile: NonNullable<RicercaPersonaRisposta['data']['risultato']>['soggetti'][0]['immobili'][0],
    soggetto: NonNullable<RicercaPersonaRisposta['data']['risultato']>['soggetti'][0]
  ): FabbricatoCatastale {
    // Estrae categoria dal classamento (es. "zona6 cat. A/10")
    const categoria = immobile.classamento?.match(/cat\.\s*([A-F]\/\d+)/)?.[1] || '';
    
    // Estrae la rendita numerica (es. "Euro:2.566,79" -> "€ 2.566,79")
    const rendita = immobile.rendita 
      ? immobile.rendita.replace('Euro:', '€ ')
      : '€ 0,00';

    // Estrae la consistenza (es. "3,5 vani")
    const consistenza = immobile.consistenza || '0 vani';

    return {
      comune: immobile.comune,
      sezione: immobile.sezione || undefined,
      foglio: immobile.foglio.toString(),
      particella: immobile.particella.toString(),
      subalterno: (immobile.subalterno || 0).toString(),
      indirizzo: immobile.ubicazione,
      zonaCensuaria: immobile.classamento?.match(/zona(\d+)/)?.[1] || '1',
      categoria,
      classe: immobile.classe || '',
      consistenza,
      superficieCatastale: undefined, // Non disponibile in questo endpoint
      rendita,
      titolarita: immobile.titolarita
    };
  }

  /**
   * Converte i dati API in formato TerrenoCatastale (interfaccia esistente)
   */
  private convertToTerrenoCatastale(
    immobile: NonNullable<RicercaPersonaRisposta['data']['risultato']>['soggetti'][0]['immobili'][0],
    soggetto: NonNullable<RicercaPersonaRisposta['data']['risultato']>['soggetti'][0]
  ): TerrenoCatastale {
    // Formatta i redditi
    const redditoDominicale = immobile.reddito_dominicale 
      ? immobile.reddito_dominicale.replace('Euro:', '€ ')
      : '€ 0,00';
    
    const redditoAgrario = immobile.reddito_agrario 
      ? immobile.reddito_agrario.replace('Euro:', '€ ')
      : '€ 0,00';

    // Formatta la superficie
    const superficie = immobile.superficie 
      ? `${immobile.superficie} m²`
      : '0 m²';

    return {
      comune: immobile.comune,
      sezione: immobile.sezione || undefined,
      foglio: immobile.foglio.toString(),
      particella: immobile.particella.toString(),
      qualita: immobile.qualita || '',
      classe: immobile.classe || '',
      superficie,
      redditoDominicale,
      redditoAgrario,
      titolarita: immobile.titolarita,
      altreInformazioni: `Ultimo aggiornamento: ${new Date().toLocaleDateString('it-IT')}`
    };
  }

  /**
   * Ottiene le statistiche di utilizzo del servizio
   */
  getUsageStats(): {
    richiesteOggi: number;
    richiesteRimanenti: number;
    limiteGiornaliero: number;
  } {
    const today = new Date().toISOString().split('T')[0];
    const richiesteOggi = this.requestsPerDay.get(today) || 0;
    const limiteGiornaliero = 40; // Base, varia con subscription
    
    return {
      richiesteOggi,
      richiesteRimanenti: Math.max(0, limiteGiornaliero - richiesteOggi),
      limiteGiornaliero
    };
  }
} 