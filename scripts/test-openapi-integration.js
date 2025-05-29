/**
 * Script di test per l'integrazione OpenAPI
 * 
 * Questo script testa la connessione e le funzionalità di base
 * dell'API OpenAPI per la ricerca catastale.
 */

const dotenv = require('dotenv');
const path = require('path');

// Carica le variabili d'ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configurazione
const config = {
  baseUrl: process.env.OPENAPI_BASE_URL || 'https://catasto.openapi.it',
  apiKey: process.env.OPENAPI_KEY || ''
};

// Codice fiscale di test (FAKE - solo per test)
const TEST_CF = 'RSSMRA80A01H501Z';

/**
 * Test della ricerca nazionale
 */
async function testNationalSearch() {
  console.log('\n🔍 Test Ricerca Nazionale...');
  
  if (!config.apiKey) {
    console.log('❌ OPENAPI_KEY non configurata');
    return false;
  }

  try {
    // Step 1: Avvia ricerca nazionale
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        codice_fiscale: TEST_CF
      })
    });

    if (!searchResponse.ok) {
      console.log(`❌ Errore nella richiesta: ${searchResponse.status} ${searchResponse.statusText}`);
      return false;
    }

    const searchResult = await searchResponse.json();
    console.log('✅ Richiesta avviata:', searchResult);

    // Step 2: Recupera i risultati
    console.log('⏳ Attendo i risultati...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const resultResponse = await fetch(`${config.baseUrl}/richiesta/${searchResult.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
      }
    });

    if (!resultResponse.ok) {
      console.log(`❌ Errore nel recupero risultati: ${resultResponse.status}`);
      return false;
    }

    const result = await resultResponse.json();
    console.log('📋 Risultati:', JSON.stringify(result, null, 2));

    return true;

  } catch (error) {
    console.log('❌ Errore:', error.message);
    return false;
  }
}

/**
 * Test della ricerca per provincia
 */
async function testProvinceSearch() {
  console.log('\n🏙️ Test Ricerca per Provincia...');
  
  try {
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_persona`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        provincia: 'RM', // Roma
        codice_fiscale: TEST_CF
      })
    });

    if (!searchResponse.ok) {
      console.log(`❌ Errore nella richiesta: ${searchResponse.status}`);
      return false;
    }

    const searchResult = await searchResponse.json();
    console.log('✅ Ricerca provinciale avviata:', searchResult);

    return true;

  } catch (error) {
    console.log('❌ Errore:', error.message);
    return false;
  }
}

/**
 * Test di connessione base
 */
async function testConnection() {
  console.log('\n🌐 Test Connessione...');
  
  try {
    // Test di connessione semplice (se disponibile endpoint di health check)
    const response = await fetch(config.baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
      }
    });

    console.log(`📡 Status connessione: ${response.status}`);
    return response.status < 500; // Accetta anche 401/403 per confermare che il server risponde

  } catch (error) {
    console.log('❌ Errore di connessione:', error.message);
    return false;
  }
}

/**
 * Verifica configurazione
 */
function checkConfiguration() {
  console.log('🔧 Verifica Configurazione...');
  
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`🔐 API Key: ${config.apiKey ? '✅ Configurata' : '❌ Non configurata'}`);
  
  if (!config.apiKey) {
    console.log('\n💡 Per configurare l\'API Key:');
    console.log('1. Registrati su https://console.openapi.com');
    console.log('2. Ottieni la tua API key');
    console.log('3. Aggiungila al file .env.local come OPENAPI_KEY=your_key_here');
    return false;
  }
  
  return true;
}

/**
 * Esegue tutti i test
 */
async function runAllTests() {
  console.log('🚀 Avvio Test OpenAPI Integration\n');
  
  // Verifica configurazione
  if (!checkConfiguration()) {
    process.exit(1);
  }
  
  // Test di connessione
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.log('\n❌ Test di connessione fallito');
    process.exit(1);
  }
  
  // Test ricerca nazionale
  const nationalSearchOk = await testNationalSearch();
  
  // Test ricerca provinciale
  const provinceSearchOk = await testProvinceSearch();
  
  // Risultati finali
  console.log('\n📊 Risultati Test:');
  console.log(`🌐 Connessione: ${connectionOk ? '✅' : '❌'}`);
  console.log(`🔍 Ricerca Nazionale: ${nationalSearchOk ? '✅' : '❌'}`);
  console.log(`🏙️ Ricerca Provinciale: ${provinceSearchOk ? '✅' : '❌'}`);
  
  const allPassed = connectionOk && nationalSearchOk && provinceSearchOk;
  console.log(`\n${allPassed ? '🎉 Tutti i test sono passati!' : '⚠️ Alcuni test sono falliti'}`);
  
  if (!allPassed) {
    console.log('\n💡 Suggerimenti:');
    console.log('- Verifica che l\'API key sia corretta');
    console.log('- Controlla di avere credito sufficiente');
    console.log('- Verifica la connessione internet');
  }
}

// Esegui i test se chiamato direttamente
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testConnection,
  testNationalSearch,
  testProvinceSearch,
  checkConfiguration
}; 