"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatastoService = exports.CatastoError = exports.CatastoErrorCode = void 0;
/**
 * Codici errore dell'API catasto
 */
var CatastoErrorCode;
(function (CatastoErrorCode) {
    CatastoErrorCode[CatastoErrorCode["WRONG_ENDPOINT"] = 255] = "WRONG_ENDPOINT";
    CatastoErrorCode[CatastoErrorCode["INSUFFICIENT_CREDIT"] = 246] = "INSUFFICIENT_CREDIT";
    CatastoErrorCode[CatastoErrorCode["TIPO_CATASTO_NOT_VALID"] = 210] = "TIPO_CATASTO_NOT_VALID";
    CatastoErrorCode[CatastoErrorCode["PROVINCIA_REQUIRED"] = 223] = "PROVINCIA_REQUIRED";
    CatastoErrorCode[CatastoErrorCode["RATE_LIMIT_EXCEEDED"] = 429] = "RATE_LIMIT_EXCEEDED";
})(CatastoErrorCode || (exports.CatastoErrorCode = CatastoErrorCode = {}));
/**
 * Errore del servizio catasto
 */
class CatastoError extends Error {
    constructor(code, httpStatus, message) {
        // Assicura che il messaggio sia sempre una stringa
        const errorMessage = typeof message === 'string'
            ? message
            : (typeof message === 'object' && message !== null)
                ? JSON.stringify(message)
                : 'Errore sconosciuto';
        super(errorMessage);
        this.code = code;
        this.httpStatus = httpStatus;
        this.name = 'CatastoError';
    }
}
exports.CatastoError = CatastoError;
/**
 * Servizio per l'interazione con le API del catasto OpenAPI
 */
class CatastoService {
    constructor(config) {
        this.requestsPerSecond = 1; // Rate limiting: max 1 richiesta al secondo
        this.requestsPerDay = new Map(); // Tracking richieste giornaliere
        this.config = config;
    }
    /**
     * Gestisce il rate limiting
     */
    async handleRateLimit() {
        // Aspetta 1 secondo tra le richieste per rispettare i limiti
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    /**
     * Verifica i limiti giornalieri
     */
    checkDailyLimit() {
        const today = new Date().toISOString().split('T')[0];
        const todayRequests = this.requestsPerDay.get(today) || 0;
        // Limite base: 40 richieste al giorno (varia con subscription)
        if (todayRequests >= 40) {
            throw new CatastoError(CatastoErrorCode.RATE_LIMIT_EXCEEDED, 429, 'Limite giornaliero di richieste raggiunto');
        }
        this.requestsPerDay.set(today, todayRequests + 1);
    }
    /**
     * Effettua una richiesta HTTP all'API catasto
     */
    async makeRequest(endpoint, method = 'POST', body) {
        // Gestione rate limiting
        this.checkDailyLimit();
        await this.handleRateLimit();
        // Costruisce l'URL completo, aggiungendo https:// se mancante
        let baseUrl = this.config.baseUrl;
        if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
            baseUrl = `https://${baseUrl}`;
        }
        const url = `${baseUrl}${endpoint}`;
        const headers = {
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
                }
                else {
                    const textResponse = await response.text();
                    console.log(`⚠️ Risposta non JSON (${response.status}): ${textResponse.substring(0, 200)}...`);
                    throw new Error(`Risposta API non valida: ${response.status} ${response.statusText}`);
                }
            }
            catch (parseError) {
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
                    ? errorCode
                    : response.status;
                throw new CatastoError(finalErrorCode, response.status, errorMessage);
            }
            // Verifica che la risposta abbia la struttura attesa
            if (!responseData || typeof responseData !== 'object') {
                throw new Error('Struttura risposta API non valida');
            }
            return responseData;
        }
        catch (error) {
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
    async waitForCompletion(requestId, maxAttempts = 30, intervalMs = 2000) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
            const response = await this.makeRequest(`/richiesta/${requestId}`, 'GET');
            if (response.data && response.data.stato === 'evasa') {
                return response;
            }
        }
        throw new Error(`Timeout: richiesta ${requestId} non completata dopo ${maxAttempts} tentativi`);
    }
    /**
     * Ricerca nazionale: trova province con immobili intestati a un soggetto
     */
    async ricercaNazionale(cfPiva, tipoCatasto = 'TF') {
        const response = await this.makeRequest('/richiesta/ricerca_nazionale/', 'POST', {
            cf_piva: cfPiva,
            tipo_catasto: tipoCatasto
        });
        // Attende il completamento della richiesta asincrona
        const completedResponse = await this.waitForCompletion(response.data.id);
        return completedResponse.data.risultato;
    }
    /**
     * Ricerca persona: trova tutti gli immobili intestati a un soggetto in una provincia
     */
    async ricercaPersona(cfPiva, provincia, tipoCatasto) {
        const response = await this.makeRequest('/richiesta/ricerca_persona/', 'POST', {
            cf_piva: cfPiva,
            tipo_catasto: tipoCatasto,
            provincia: provincia
        });
        // Attende il completamento della richiesta asincrona
        const completedResponse = await this.waitForCompletion(response.data.id);
        return completedResponse.data.risultato;
    }
    /**
     * Raccoglie tutti i dati catastali di un soggetto (fabbricati e terreni)
     * Implementa il flusso completo descritto dall'utente
     */
    async raccogliDatiCompleti(cfPiva) {
        const fabbricati = [];
        const terreni = [];
        try {
            // 1. Ricerca nazionale per ottenere le province
            console.log(`🔍 Ricerca nazionale per CF/PIVA: ${cfPiva}`);
            const ricercaNazionale = await this.ricercaNazionale(cfPiva, 'TF');
            if (!ricercaNazionale?.province?.length) {
                console.log('❌ Nessuna proprietà trovata');
                return { fabbricati, terreni };
            }
            console.log(`✅ Trovate ${ricercaNazionale.province.length} province con proprietà`);
            // 2. Per ogni provincia con fabbricati, ricerca dettagliata
            for (const provinciaInfo of ricercaNazionale.province) {
                if (provinciaInfo.fabbricati && provinciaInfo.fabbricati > 0) {
                    console.log(`🏠 Ricerca fabbricati in ${provinciaInfo.provincia} (${provinciaInfo.fabbricati} immobili)`);
                    try {
                        const risultatoFabbricati = await this.ricercaPersona(cfPiva, provinciaInfo.provincia, 'F');
                        if (risultatoFabbricati?.soggetti) {
                            for (const soggetto of risultatoFabbricati.soggetti) {
                                for (const immobile of soggetto.immobili) {
                                    if (immobile.catasto === 'F') {
                                        fabbricati.push(this.convertToFabbricatoCatastale(immobile, soggetto));
                                    }
                                }
                            }
                        }
                    }
                    catch (error) {
                        console.error(`❌ Errore ricerca fabbricati in ${provinciaInfo.provincia}:`, error);
                        // Continua con le altre province
                    }
                }
                // 3. Per ogni provincia con terreni, ricerca dettagliata
                if (provinciaInfo.terreni && provinciaInfo.terreni > 0) {
                    console.log(`🌾 Ricerca terreni in ${provinciaInfo.provincia} (${provinciaInfo.terreni} terreni)`);
                    try {
                        const risultatoTerreni = await this.ricercaPersona(cfPiva, provinciaInfo.provincia, 'T');
                        if (risultatoTerreni?.soggetti) {
                            for (const soggetto of risultatoTerreni.soggetti) {
                                for (const immobile of soggetto.immobili) {
                                    if (immobile.catasto === 'T') {
                                        terreni.push(this.convertToTerrenoCatastale(immobile, soggetto));
                                    }
                                }
                            }
                        }
                    }
                    catch (error) {
                        console.error(`❌ Errore ricerca terreni in ${provinciaInfo.provincia}:`, error);
                        // Continua con le altre province
                    }
                }
            }
            console.log(`✅ Raccolta dati completata: ${fabbricati.length} fabbricati, ${terreni.length} terreni`);
            return { fabbricati, terreni };
        }
        catch (error) {
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
    convertToFabbricatoCatastale(immobile, soggetto) {
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
    convertToTerrenoCatastale(immobile, soggetto) {
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
    getUsageStats() {
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
exports.CatastoService = CatastoService;
