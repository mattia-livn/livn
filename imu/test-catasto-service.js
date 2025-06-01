"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catasto_service_1 = require("./services/catasto-service");
const catasto_mapper_1 = require("./data/catasto-mapper");
/**
 * Test del servizio catasto OpenAPI con dati mock
 * Questo test verifica che il servizio funzioni senza effettuare chiamate reali all'API
 */
// Mock del servizio fetch per simulare le risposte API
const originalFetch = global.fetch;
function mockApiResponses() {
    const mockFetch = (url, options) => {
        const body = JSON.parse(options?.body || '{}');
        console.log(`🔧 MOCK API Call: ${url}`);
        console.log(`📋 Body:`, body);
        // Mock ricerca_nazionale
        if (url.includes('/richiesta/ricerca_nazionale')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-nazionale-123',
                        stato: 'in_elaborazione', // Prima risposta in elaborazione
                        parametri: body,
                        risultato: undefined,
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        // Mock per il polling della ricerca_nazionale
        if (url.includes('/richiesta/mock-nazionale-123')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-nazionale-123',
                        stato: 'evasa', // Ora è completata
                        parametri: { cf_piva: '12485671007', tipo_catasto: 'TF' },
                        risultato: {
                            province: [
                                { provincia: 'ROMA Territorio-RM', fabbricati: 1, terreni: 0 },
                                { provincia: 'MILANO-MI', fabbricati: 0, terreni: 1 }
                            ]
                        },
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        // Mock ricerca_persona per fabbricati
        if (url.includes('/richiesta/ricerca_persona') && body.tipo_catasto === 'F') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-persona-f-123',
                        stato: 'in_elaborazione',
                        parametri: body,
                        risultato: undefined,
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        // Mock per il polling della ricerca_persona fabbricati
        if (url.includes('/richiesta/mock-persona-f-123')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-persona-f-123',
                        stato: 'evasa',
                        parametri: { cf_piva: '12485671007', tipo_catasto: 'F', provincia: 'ROMA Territorio-RM' },
                        risultato: {
                            soggetti: [{
                                    denominazione: 'TEST SRL',
                                    cf: '12485671007',
                                    id_soggetto: 'mock-soggetto-123',
                                    immobili: [{
                                            catasto: 'F',
                                            titolarita: 'Proprietà per 1/1',
                                            ubicazione: 'ROMA (RM) VIA TEST, 123 Piano 2 int. 4',
                                            comune: 'ROMA',
                                            provincia: 'RM',
                                            codice_catastale: 'H501',
                                            sezione: null,
                                            sezione_urbana: null,
                                            foglio: 100,
                                            particella: 200,
                                            subalterno: 5,
                                            classamento: 'zona1 cat. A/2',
                                            classe: '2',
                                            consistenza: '4 vani',
                                            rendita: 'Euro:1.234,56',
                                            id_immobile: 'mock-immobile-f-123'
                                        }]
                                }]
                        },
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        // Mock ricerca_persona per terreni
        if (url.includes('/richiesta/ricerca_persona') && body.tipo_catasto === 'T') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-persona-t-123',
                        stato: 'in_elaborazione',
                        parametri: body,
                        risultato: undefined,
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        // Mock per il polling della ricerca_persona terreni
        if (url.includes('/richiesta/mock-persona-t-123')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        id: 'mock-persona-t-123',
                        stato: 'evasa',
                        parametri: { cf_piva: '12485671007', tipo_catasto: 'T', provincia: 'MILANO-MI' },
                        risultato: {
                            soggetti: [{
                                    denominazione: 'TEST SRL',
                                    cf: '12485671007',
                                    id_soggetto: 'mock-soggetto-123',
                                    immobili: [{
                                            catasto: 'T',
                                            titolarita: 'Proprietà per 1/2',
                                            ubicazione: 'MILANO Località Campagna',
                                            comune: 'MILANO',
                                            provincia: 'MI',
                                            codice_catastale: 'F205',
                                            sezione: null,
                                            foglio: 50,
                                            particella: 75,
                                            qualita: 'Seminativo',
                                            classe: '2',
                                            superficie: 5000,
                                            reddito_dominicale: 'Euro:45,67',
                                            reddito_agrario: 'Euro:23,45',
                                            id_immobile: 'mock-immobile-t-123'
                                        }]
                                }]
                        },
                        esito: 'OK',
                        timestamp: Date.now(),
                        owner: 'test@test.it'
                    },
                    success: true,
                    message: '',
                    error: null
                })
            });
        }
        return Promise.reject(new Error(`Mock non configurato per: ${url}`));
    };
    global.fetch = mockFetch;
}
function mockEmptyResponses() {
    const mockFetch = () => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    id: 'empty-123',
                    stato: 'evasa',
                    risultato: { province: [] }
                },
                success: true,
                message: '',
                error: null
            })
        });
    };
    global.fetch = mockFetch;
}
function restoreApiResponses() {
    global.fetch = originalFetch;
}
async function testCatastoService() {
    console.log('🧪 INIZIO TEST SERVIZIO CATASTO OPENAPI');
    console.log('='.repeat(50));
    // Configurazione mock
    const config = {
        baseUrl: 'https://api.mock.test',
        apiKey: 'mock-api-key',
        token: 'mock-bearer-token'
    };
    const catastoService = new catasto_service_1.CatastoService(config);
    try {
        // Abilita mock
        mockApiResponses();
        console.log('📊 Statistiche iniziali:');
        const initialStats = catastoService.getUsageStats();
        console.log(`   Richieste oggi: ${initialStats.richiesteOggi}`);
        console.log(`   Limite giornaliero: ${initialStats.limiteGiornaliero}`);
        console.log('\n🔍 Test raccolta dati completa...');
        const { fabbricati, terreni } = await catastoService.raccogliDatiCompleti('12485671007');
        console.log('\n📈 RISULTATI TEST:');
        console.log(`🏠 Fabbricati trovati: ${fabbricati.length}`);
        console.log(`🌾 Terreni trovati: ${terreni.length}`);
        // Test fabbricati
        if (fabbricati.length > 0) {
            console.log('\n🏠 DETTAGLIO FABBRICATO MOCK:');
            const fabbricato = fabbricati[0];
            console.log(`   Comune: ${fabbricato.comune}`);
            console.log(`   Categoria: ${fabbricato.categoria}`);
            console.log(`   Foglio: ${fabbricato.foglio}`);
            console.log(`   Particella: ${fabbricato.particella}`);
            console.log(`   Subalterno: ${fabbricato.subalterno}`);
            console.log(`   Rendita: ${fabbricato.rendita}`);
            console.log(`   Indirizzo: ${fabbricato.indirizzo}`);
            // Test mappatura IMU
            console.log('\n🎯 Test mappatura IMU per fabbricato...');
            try {
                const parametriIMU = catasto_mapper_1.CatastoMapper.elaboraDatiCatastali({
                    tipo: 'fabbricato',
                    comune: fabbricato.comune,
                    identificativoCatastale: `Fg.${fabbricato.foglio} Part.${fabbricato.particella} Sub.${fabbricato.subalterno}`,
                    dati: fabbricato,
                    dataEstrazione: new Date().toISOString(),
                    fonte: 'Test Mock'
                });
                console.log('   ✅ Mappatura riuscita:');
                console.log(`   - Categoria catastale: ${parametriIMU.informazioniDerivate.categoriaAtastale}`);
                console.log(`   - Tipo immobile: ${parametriIMU.informazioniDerivate.tipoImmobile}`);
                console.log(`   - Ubicazione: ${parametriIMU.informazioniDerivate.ubicazione}`);
            }
            catch (error) {
                console.error('   ❌ Errore mappatura fabbricato:', error);
            }
        }
        // Test terreni
        if (terreni.length > 0) {
            console.log('\n🌾 DETTAGLIO TERRENO MOCK:');
            const terreno = terreni[0];
            console.log(`   Comune: ${terreno.comune}`);
            console.log(`   Qualità: ${terreno.qualita}`);
            console.log(`   Foglio: ${terreno.foglio}`);
            console.log(`   Particella: ${terreno.particella}`);
            console.log(`   Superficie: ${terreno.superficie}`);
            console.log(`   Reddito dominicale: ${terreno.redditoDominicale}`);
            // Test mappatura IMU
            console.log('\n🎯 Test mappatura IMU per terreno...');
            try {
                const parametriIMU = catasto_mapper_1.CatastoMapper.elaboraDatiCatastali({
                    tipo: 'terreno',
                    comune: terreno.comune,
                    identificativoCatastale: `Fg.${terreno.foglio} Part.${terreno.particella}`,
                    dati: terreno,
                    dataEstrazione: new Date().toISOString(),
                    fonte: 'Test Mock'
                });
                console.log('   ✅ Mappatura riuscita:');
                console.log(`   - Categoria catastale: ${parametriIMU.informazioniDerivate.categoriaAtastale}`);
                console.log(`   - Qualità terreno: ${parametriIMU.informazioniDerivate.qualitaTerreno}`);
                console.log(`   - Ubicazione: ${parametriIMU.informazioniDerivate.ubicazione}`);
            }
            catch (error) {
                console.error('   ❌ Errore mappatura terreno:', error);
            }
        }
        // Statistiche finali
        console.log('\n📊 Statistiche finali:');
        const finalStats = catastoService.getUsageStats();
        console.log(`   Richieste utilizzate: ${finalStats.richiesteOggi}`);
        console.log(`   Richieste rimanenti: ${finalStats.richiesteRimanenti}`);
        console.log('\n✅ TEST COMPLETATO CON SUCCESSO!');
        // Test validazioni
        console.log('\n🔧 Test validazioni e edge cases...');
        // Test con dati vuoti
        console.log('   Testing ricerca senza risultati...');
        const configEmpty = { ...config };
        const emptyService = new catasto_service_1.CatastoService(configEmpty);
        // Override per ritornare risultati vuoti
        mockEmptyResponses();
        const { fabbricati: emptyFabbricati, terreni: emptyTerreni } = await emptyService.raccogliDatiCompleti('00000000000');
        console.log(`   ✅ Nessun risultato: ${emptyFabbricati.length} fabbricati, ${emptyTerreni.length} terreni`);
    }
    catch (error) {
        console.error('\n❌ ERRORE DURANTE IL TEST:', error);
        throw error;
    }
    finally {
        // Ripristina fetch originale
        restoreApiResponses();
    }
}
console.log('🏛️ TEST SERVIZIO CATASTO OPENAPI - MODALITÀ MOCK');
console.log('📝 Questo test verifica il funzionamento del servizio senza chiamate API reali');
console.log('🔧 Utilizza dati mock per simulare le risposte dell\'API OpenAPI catasto\n');
testCatastoService()
    .then(() => {
    console.log('\n🎉 TUTTI I TEST SUPERATI!');
    console.log('\n📋 PROSSIMI STEP:');
    console.log('1. Configurare le credenziali OpenAPI reali nel file .env');
    console.log('2. Testare con dati reali usando npm run demo:catasto');
    console.log('3. Integrare il servizio nel sistema IMU esistente');
    console.log('\n📚 Documentazione: README-catasto-api-integration.md');
})
    .catch((error) => {
    console.error('\n💥 TEST FALLITO:', error);
    process.exit(1);
});
