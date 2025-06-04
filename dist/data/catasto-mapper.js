"use strict";
// Logica di mappatura tra dati catastali e parametri IMU
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatastoFactory = exports.CatastoMapper = void 0;
/**
 * Classe per elaborare e mappare i dati catastali ai parametri IMU
 */
class CatastoMapper {
    /**
     * Elabora i dati catastali e li converte nei parametri necessari per il matching IMU
     */
    static elaboraDatiCatastali(datoCatastale) {
        const informazioniDerivate = this.estraiInformazioni(datoCatastale);
        const parametriMatching = this.creaParametriMatching(informazioniDerivate);
        return {
            datiOriginali: datoCatastale,
            informazioniDerivate,
            parametriPerMatching: parametriMatching,
            condizioniApplicabili: this.identificaCondizioniApplicabili(informazioniDerivate),
            errori: this.validaDati(datoCatastale)
        };
    }
    /**
     * Estrae informazioni strutturate dai dati catastali grezzi
     */
    static estraiInformazioni(datoCatastale) {
        const base = {
            comuneNormalizzato: this.normalizzaComune(datoCatastale.comune),
            identificativo: datoCatastale.identificativoCatastale
        };
        if (datoCatastale.tipo === 'fabbricato') {
            return this.elaboraFabbricato(datoCatastale.dati, base);
        }
        else {
            return this.elaboraTerreno(datoCatastale.dati, base);
        }
    }
    /**
     * Elabora i dati di un fabbricato
     */
    static elaboraFabbricato(fabbricato, base) {
        return Object.assign(Object.assign({}, base), { categoriaAtastale: fabbricato.categoria, superficie: this.estraiSuperficie(fabbricato.superficieCatastale || fabbricato.consistenza), ubicazione: this.estraiUbicazione(fabbricato.indirizzo, fabbricato.zonaCensuaria), tipoImmobile: this.determinaTipoImmobile(fabbricato.categoria), numeroVani: this.estraiNumeroVani(fabbricato.consistenza), piano: this.estraiPiano(fabbricato.indirizzo), zonaUrbanistica: fabbricato.zonaCensuaria });
    }
    /**
     * Elabora i dati di un terreno
     */
    static elaboraTerreno(terreno, base) {
        return Object.assign(Object.assign({}, base), { categoriaAtastale: 'TERRENO', superficie: this.estraiSuperficie(terreno.superficie), ubicazione: `${terreno.comune} - Foglio ${terreno.foglio}`, qualitaTerreno: terreno.qualita, classeTerreno: terreno.classe });
    }
    /**
     * Crea i parametri nel formato richiesto dal sistema di matching IMU
     */
    static creaParametriMatching(info) {
        const userInfo = {
            categoriaAtastale: info.categoriaAtastale,
            ubicazione: info.ubicazione,
            superficie: info.superficie,
            comune: info.comuneNormalizzato,
            provincia: this.estraiProvincia(info.comuneNormalizzato), // Da implementare
            modalitaUtilizzo: undefined, // Da chiedere all'utente
            caratteristicheSoggetto: undefined, // Da chiedere all'utente
            tipoContratto: undefined, // Da chiedere all'utente
            destinazioneUso: this.deriveDestinazioneUso(info.categoriaAtastale),
            condizioniSpeciali: undefined // Da chiedere all'utente
        };
        // Converto UserPropertyInfo nel formato richiesto
        const parametri = {};
        Object.entries(userInfo).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    parametri[key] = value.join(', ');
                }
                else {
                    parametri[key] = value;
                }
            }
        });
        return parametri;
    }
    /**
     * Identifica le possibili condizioni IMU applicabili basandosi sui dati catastali
     */
    static identificaCondizioniApplicabili(info) {
        const condizioni = [];
        if (info.categoriaAtastale) {
            // Abitazioni principali (A/1, A/8, A/9)
            if (['A/1', 'A/8', 'A/9'].includes(info.categoriaAtastale)) {
                condizioni.push('Abitazione principale');
            }
            // Fabbricati gruppo D
            if (info.categoriaAtastale.startsWith('D/')) {
                condizioni.push('Fabbricati gruppo D');
            }
            // Altri fabbricati
            if (info.categoriaAtastale.match(/^[ABC]/)) {
                condizioni.push('Altri fabbricati');
            }
        }
        // Terreni
        if (info.qualitaTerreno) {
            condizioni.push('Terreni agricoli');
        }
        return condizioni;
    }
    /**
     * Utilities per l'estrazione e normalizzazione dei dati
     */
    static normalizzaComune(comune) {
        return comune.toLowerCase()
            .replace(/[àáâãä]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[^a-z0-9]/g, '')
            .trim();
    }
    static estraiSuperficie(superficie) {
        if (!superficie)
            return undefined;
        const match = superficie.match(/(\d+(?:[.,]\d+)?)/);
        if (match) {
            return parseFloat(match[1].replace(',', '.'));
        }
        return undefined;
    }
    static estraiUbicazione(indirizzo, zona) {
        let ubicazione = indirizzo;
        if (zona) {
            ubicazione += ` (Zona ${zona})`;
        }
        return ubicazione;
    }
    static determinaTipoImmobile(categoria) {
        if (categoria.startsWith('A/'))
            return 'abitativo';
        if (categoria.startsWith('B/'))
            return 'commerciale';
        if (categoria.startsWith('C/'))
            return 'commerciale';
        if (categoria.startsWith('D/'))
            return 'industriale';
        return 'altro';
    }
    static estraiNumeroVani(consistenza) {
        const match = consistenza.match(/(\d+)\s*vani?/i);
        return match ? parseInt(match[1]) : undefined;
    }
    static estraiPiano(indirizzo) {
        const match = indirizzo.match(/piano\s*(\d+)/i);
        return match ? match[1] : undefined;
    }
    static estraiProvincia(comune) {
        // TODO: Implementare mappatura comune -> provincia
        // Per ora ritorna una provincia fittizia
        return 'XX';
    }
    static deriveDestinazioneUso(categoria) {
        if (!categoria)
            return undefined;
        const mapping = {
            'A/1': 'Abitazione civile',
            'A/2': 'Abitazione rurale',
            'A/3': 'Abitazione economica',
            'A/4': 'Abitazione popolare',
            'A/5': 'Abitazione ultrapopolare',
            'A/6': 'Abitazione rurale',
            'A/7': 'Abitazione villino',
            'A/8': 'Abitazione villa',
            'A/9': 'Castello e palazzi',
            'A/10': 'Uffici e studi privati',
            'A/11': 'Abitazioni tipiche',
            'B/1': 'Collegi e educandati',
            'B/2': 'Case di cura',
            'B/3': 'Prigioni e riformatori',
            'B/4': 'Uffici pubblici',
            'B/5': 'Scuole e laboratori',
            'B/6': 'Biblioteche e musei',
            'B/7': 'Cappelle e oratori',
            'B/8': 'Magazzini sotterranei',
            'C/1': 'Negozi e botteghe',
            'C/2': 'Magazzini e locali deposito',
            'C/3': 'Laboratori per arti e mestieri',
            'C/4': 'Fabbricati per esercizi sportivi',
            'C/5': 'Stabilimenti balneari',
            'C/6': 'Stalle, scuderie, rimesse',
            'C/7': 'Tettoie chiuse',
            'D/1': 'Opifici industriali',
            'D/2': 'Alberghi e pensioni',
            'D/3': 'Teatri e cinema',
            'D/4': 'Case di cura private',
            'D/5': 'Istituti di credito',
            'D/6': 'Fabbricati per esercizi sportivi',
            'D/7': 'Fabbricati per culto',
            'D/8': 'Fabbricati per servizi pubblici',
            'D/9': 'Costruzioni per trasporti',
            'D/10': 'Fabbricati per funzioni produttive'
        };
        return mapping[categoria] || 'Altro';
    }
    /**
     * Valida i dati catastali e restituisce eventuali errori
     */
    static validaDati(datoCatastale) {
        const errori = [];
        if (!datoCatastale.comune) {
            errori.push('Comune mancante');
        }
        if (!datoCatastale.identificativoCatastale) {
            errori.push('Identificativo catastale mancante');
        }
        if (datoCatastale.tipo === 'fabbricato') {
            const fabbricato = datoCatastale.dati;
            if (!fabbricato.categoria) {
                errori.push('Categoria catastale mancante');
            }
            if (!fabbricato.rendita) {
                errori.push('Rendita catastale mancante');
            }
        }
        if (datoCatastale.tipo === 'terreno') {
            const terreno = datoCatastale.dati;
            if (!terreno.qualita) {
                errori.push('Qualità del terreno mancante');
            }
            if (!terreno.superficie) {
                errori.push('Superficie del terreno mancante');
            }
        }
        return errori;
    }
}
exports.CatastoMapper = CatastoMapper;
/**
 * Factory per creare oggetti DatoCatastale dai dati grezzi
 */
class CatastoFactory {
    static creaFabbricato(dati) {
        return {
            tipo: 'fabbricato',
            comune: dati.comune,
            identificativoCatastale: `Fg.${dati.foglio} Part.${dati.particella} Sub.${dati.subalterno}`,
            dati,
            dataEstrazione: new Date().toISOString(),
            fonte: 'Agenzia delle Entrate - Catasto Fabbricati'
        };
    }
    static creaTerreno(dati) {
        return {
            tipo: 'terreno',
            comune: dati.comune,
            identificativoCatastale: `Fg.${dati.foglio} Part.${dati.particella}`,
            dati,
            dataEstrazione: new Date().toISOString(),
            fonte: 'Agenzia delle Entrate - Catasto Terreni'
        };
    }
}
exports.CatastoFactory = CatastoFactory;
//# sourceMappingURL=catasto-mapper.js.map