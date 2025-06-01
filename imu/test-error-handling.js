"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catasto_service_1 = require("./services/catasto-service");
/**
 * Test specifico per la gestione errori
 */
function mockErrorResponses() {
    const originalFetch = global.fetch;
    global.fetch = (() => {
        return Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
                get: (name) => name === 'content-type' ? 'application/json' : null
            },
            json: () => Promise.resolve({
                error: 246,
                message: 'Insufficient Credit in Wallet: 182.03',
                success: false
            })
        });
    });
    return () => {
        global.fetch = originalFetch;
    };
}
async function testErrorHandling() {
    console.log('🧪 TEST GESTIONE ERRORI CATASTO');
    console.log('='.repeat(40));
    const config = {
        baseUrl: 'https://api.test.com',
        apiKey: 'test-key',
        token: 'test-token'
    };
    const catastoService = new catasto_service_1.CatastoService(config);
    const restoreFetch = mockErrorResponses();
    try {
        await catastoService.ricercaNazionale('12345678901', 'TF');
        console.log('❌ Errore: avrebbe dovuto lanciare un\'eccezione');
    }
    catch (error) {
        if (error instanceof catasto_service_1.CatastoError) {
            console.log('✅ CatastoError catturato correttamente:');
            console.log(`   - Codice: ${error.code}`);
            console.log(`   - HTTP Status: ${error.httpStatus}`);
            console.log(`   - Messaggio: ${error.message}`);
            console.log(`   - Nome: ${error.name}`);
            // Verifica che il messaggio non sia [object Object]
            if (error.message.includes('[object Object]')) {
                console.log('❌ ERRORE: Messaggio ancora malformato!');
            }
            else {
                console.log('✅ Messaggio formattato correttamente');
            }
        }
        else {
            console.log('❌ Errore tipo sbagliato:', error);
        }
    }
    finally {
        restoreFetch();
    }
}
testErrorHandling()
    .then(() => console.log('\n✅ Test gestione errori completato'))
    .catch(error => console.error('\n❌ Test fallito:', error));
