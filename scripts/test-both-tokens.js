/**
 * Script per testare entrambi i token OpenAPI
 * Aiuta a identificare quale token usare per il servizio catasto
 */

const dotenv = require('dotenv');
const path = require('path');

// Carica le variabili d'ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configurazione
const config = {
  baseUrl: process.env.OPENAPI_BASE_URL || 'https://catasto.openapi.it',
  apiKey: process.env.OPENAPI_KEY || '',
  catasto_token: process.env.OPENAPI_CATASTO_TOKEN || ''
};

// Codice fiscale di test (FAKE)
const TEST_CF = 'RSSMRA80A01H501Z';

/**
 * Test con API Key generale
 */
async function testWithApiKey() {
  console.log('\n🔑 Test con API Key Generale...');
  
  if (!config.apiKey) {
    console.log('❌ OPENAPI_KEY non configurata');
    return false;
  }

  try {
    const response = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
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

    console.log(`📡 Status: ${response.status}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ API Key funziona:', result);
      return true;
    } else {
      const error = await response.text();
      console.log('❌ Errore:', error);
      return false;
    }

  } catch (error) {
    console.log('❌ Errore di rete:', error.message);
    return false;
  }
}

/**
 * Test con Token Catasto specifico
 */
async function testWithCatastoToken() {
  console.log('\n🏛️ Test con Token Catasto...');
  
  if (!config.catasto_token) {
    console.log('❌ OPENAPI_CATASTO_TOKEN non configurata');
    return false;
  }

  try {
    const response = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        codice_fiscale: TEST_CF
      })
    });

    console.log(`📡 Status: ${response.status}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Token Catasto funziona:', result);
      return true;
    } else {
      const error = await response.text();
      console.log('❌ Errore:', error);
      return false;
    }

  } catch (error) {
    console.log('❌ Errore di rete:', error.message);
    return false;
  }
}

/**
 * Test con diversi formati di autenticazione
 */
async function testDifferentAuthFormats() {
  console.log('\n🔍 Test formati autenticazione diversi...');
  
  const formats = [
    { name: 'Bearer Token', header: `Bearer ${config.apiKey}` },
    { name: 'Basic Token', header: config.apiKey },
    { name: 'API-Key Header', header: config.apiKey, headerName: 'X-API-Key' },
    { name: 'Token Header', header: config.apiKey, headerName: 'Token' }
  ];

  for (const format of formats) {
    console.log(`\n📋 Provo formato: ${format.name}`);
    
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (format.headerName) {
        headers[format.headerName] = format.header;
      } else {
        headers['Authorization'] = format.header;
      }

      const response = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          tipo_catasto: 'TF',
          codice_fiscale: TEST_CF
        })
      });

      console.log(`   Status: ${response.status}`);
      
      if (response.ok) {
        console.log(`   ✅ ${format.name} funziona!`);
        return format;
      }

    } catch (error) {
      console.log(`   ❌ Errore: ${error.message}`);
    }
  }
  
  return null;
}

/**
 * Esegue tutti i test
 */
async function runTests() {
  console.log('🚀 Test Identificazione Token Corretto\n');
  
  console.log('🔧 Configurazione:');
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`🔑 API Key: ${config.apiKey ? '✅ Configurata' : '❌ Non configurata'}`);
  console.log(`🏛️ Token Catasto: ${config.catasto_token ? '✅ Configurata' : '❌ Non configurata'}`);
  
  if (!config.apiKey && !config.catasto_token) {
    console.log('\n❌ Nessun token configurato!');
    console.log('\n💡 Configura almeno uno dei token nel file .env.local:');
    console.log('OPENAPI_KEY=la_tua_api_key');
    console.log('OPENAPI_CATASTO_TOKEN=il_tuo_token_catasto');
    return;
  }
  
  // Test entrambi i token
  const apiKeyWorks = await testWithApiKey();
  const catastoTokenWorks = await testWithCatastoToken();
  
  // Se nessuno dei due funziona, prova formati diversi
  if (!apiKeyWorks && !catastoTokenWorks) {
    console.log('\n🔄 Nessun token funziona con Bearer. Provo altri formati...');
    const workingFormat = await testDifferentAuthFormats();
    
    if (workingFormat) {
      console.log(`\n✅ Formato funzionante trovato: ${workingFormat.name}`);
      console.log('📝 Dovrai aggiornare il codice per usare questo formato');
    }
  }
  
  // Risultati finali
  console.log('\n📊 Risultati:');
  console.log(`🔑 API Key: ${apiKeyWorks ? '✅ Funziona' : '❌ Non funziona'}`);
  console.log(`🏛️ Token Catasto: ${catastoTokenWorks ? '✅ Funziona' : '❌ Non funziona'}`);
  
  if (apiKeyWorks || catastoTokenWorks) {
    console.log('\n💡 Raccomandazione:');
    if (apiKeyWorks) {
      console.log('Usa OPENAPI_KEY nel file .env.local');
    } else if (catastoTokenWorks) {
      console.log('Usa OPENAPI_CATASTO_TOKEN nel file .env.local');
      console.log('Aggiorna il codice per usare questa variabile');
    }
  }
}

// Esegui i test
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testWithApiKey, testWithCatastoToken, testDifferentAuthFormats }; 