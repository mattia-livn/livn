/**
 * Script di test per OpenAPI Catasto con parametri corretti
 */

const dotenv = require('dotenv');
const path = require('path');

// Carica le variabili d'ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configurazione
const config = {
  baseUrl: process.env.OPENAPI_BASE_URL || 'https://catasto.openapi.it',
  catasto_token: process.env.OPENAPI_CATASTO_TOKEN || ''
};

// Codice fiscale di test (FAKE)
const TEST_CF = 'RSSMRA80A01H501Z';

/**
 * Test ricerca nazionale con parametri corretti
 */
async function testCatastoAPI() {
  console.log('\n🏛️ Test API Catasto con parametri corretti...');
  
  if (!config.catasto_token) {
    console.log('❌ OPENAPI_CATASTO_TOKEN non configurata');
    return false;
  }

  try {
    // Test ricerca nazionale
    console.log('\n1️⃣ Test Ricerca Nazionale...');
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        cf_piva: TEST_CF  // Parametro corretto!
      })
    });

    console.log(`📡 Status: ${searchResponse.status}`);
    
    if (searchResponse.ok) {
      const result = await searchResponse.json();
      console.log('✅ Ricerca avviata:', JSON.stringify(result, null, 2));
      
      if (result.data && result.data.id) {
        console.log('\n2️⃣ Recupero risultati...');
        
        // Attendi elaborazione
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const resultResponse = await fetch(`${config.baseUrl}/richiesta/${result.data.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${config.catasto_token}`,
          }
        });
        
        if (resultResponse.ok) {
          const finalResult = await resultResponse.json();
          console.log('✅ Risultati finali:', JSON.stringify(finalResult, null, 2));
          return true;
        } else {
          const error = await resultResponse.text();
          console.log('❌ Errore nel recupero:', error);
        }
      }
      
      return true;
    } else {
      const error = await searchResponse.text();
      console.log('❌ Errore:', error);
      return false;
    }

  } catch (error) {
    console.log('❌ Errore di rete:', error.message);
    return false;
  }
}

/**
 * Test ricerca per provincia
 */
async function testProvinceSearch() {
  console.log('\n🏙️ Test Ricerca Provinciale...');
  
  try {
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_persona`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        provincia: 'RM',
        cf_piva: TEST_CF  // Parametro corretto!
      })
    });

    console.log(`📡 Status: ${searchResponse.status}`);
    
    if (searchResponse.ok) {
      const result = await searchResponse.json();
      console.log('✅ Ricerca provinciale:', JSON.stringify(result, null, 2));
      return true;
    } else {
      const error = await searchResponse.text();
      console.log('❌ Errore:', error);
      return false;
    }

  } catch (error) {
    console.log('❌ Errore:', error.message);
    return false;
  }
}

/**
 * Esegue tutti i test
 */
async function runTests() {
  console.log('🚀 Test API Catasto con parametri corretti\n');
  
  console.log('🔧 Configurazione:');
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`🏛️ Token Catasto: ${config.catasto_token ? '✅ Configurata' : '❌ Non configurata'}`);
  
  if (!config.catasto_token) {
    console.log('\n❌ Token catasto non configurato!');
    console.log('Configura OPENAPI_CATASTO_TOKEN nel file .env.local');
    return;
  }
  
  // Test API catasto
  const catastoWorks = await testCatastoAPI();
  const provinceWorks = await testProvinceSearch();
  
  // Risultati finali
  console.log('\n📊 Risultati:');
  console.log(`🏛️ Ricerca Nazionale: ${catastoWorks ? '✅ Funziona' : '❌ Non funziona'}`);
  console.log(`🏙️ Ricerca Provinciale: ${provinceWorks ? '✅ Funziona' : '❌ Non funziona'}`);
  
  if (catastoWorks || provinceWorks) {
    console.log('\n🎉 API Catasto funziona!');
    console.log('💡 Ricorda di:');
    console.log('1. Usare OPENAPI_CATASTO_TOKEN nel .env.local');
    console.log('2. Usare il parametro "cf_piva" invece di "codice_fiscale"');
    console.log('3. Aggiornare il codice per usare il token catasto');
  }
}

// Esegui i test
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testCatastoAPI, testProvinceSearch }; 