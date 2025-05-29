/**
 * Script di test con codice fiscale reale
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

// Codice fiscale reale (corretto)
const REAL_CF = 'MTTPCC94S01H727X';

/**
 * Test ricerca nazionale con CF reale
 */
async function testRealCadastralSearch() {
  console.log('\n🏛️ Test Ricerca Catastale con CF Reale...');
  console.log(`📄 Codice Fiscale: ${REAL_CF}`);
  
  if (!config.catasto_token) {
    console.log('❌ OPENAPI_CATASTO_TOKEN non configurata');
    return false;
  }

  try {
    // Fase 1: Avvia ricerca nazionale
    console.log('\n1️⃣ Avvio Ricerca Nazionale (Terreni + Fabbricati)...');
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cf_piva: REAL_CF,
        tipo_catasto: 'TF'  // T=Terreni, F=Fabbricati
      })
    });

    console.log(`📡 Status: ${searchResponse.status}`);
    
    if (!searchResponse.ok) {
      const error = await searchResponse.text();
      console.log('❌ Errore nella richiesta:', error);
      return false;
    }

    const searchResult = await searchResponse.json();
    console.log('✅ Ricerca avviata:', JSON.stringify(searchResult, null, 2));
    
    if (!searchResult.data || !searchResult.data.id) {
      console.log('❌ ID richiesta non trovato nella risposta');
      return false;
    }

    const requestId = searchResult.data.id;
    console.log(`📋 ID Richiesta: ${requestId}`);

    // Fase 2: Attendi elaborazione e recupera risultati
    console.log('\n2️⃣ Attesa elaborazione (5 secondi)...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('📡 Recupero risultati...');
    const resultResponse = await fetch(`${config.baseUrl}/richiesta/${requestId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
      }
    });
    
    if (!resultResponse.ok) {
      const error = await resultResponse.text();
      console.log('❌ Errore nel recupero risultati:', error);
      return false;
    }

    const finalResult = await resultResponse.json();
    console.log('\n📊 Risultati Finali:');
    console.log(JSON.stringify(finalResult, null, 2));

    // Analisi risultati
    if (finalResult.data) {
      const data = finalResult.data;
      console.log('\n📈 Analisi Risultati:');
      console.log(`📃 Stato: ${data.stato || 'N/A'}`);
      console.log(`🎯 Esito: ${data.esito || 'N/A'}`);
      
      if (data.risultato) {
        const risultato = data.risultato;
        
        if (risultato.province && risultato.province.length > 0) {
          console.log(`\n🏙️ Province trovate: ${risultato.province.length}`);
          risultato.province.forEach((prov, index) => {
            console.log(`  ${index + 1}. ${prov.provincia} - ${prov.numero_immobili} immobili`);
          });
        } else if (risultato.immobili && risultato.immobili.length > 0) {
          console.log(`\n🏠 Immobili trovati: ${risultato.immobili.length}`);
          risultato.immobili.forEach((immobile, index) => {
            console.log(`  ${index + 1}. ${immobile.indirizzo || 'Indirizzo non specificato'}`);
            console.log(`     Categoria: ${immobile.categoria || 'N/A'}`);
            console.log(`     Rendita: ${immobile.rendita || 'N/A'}`);
          });
        } else {
          console.log('ℹ️ Nessun immobile trovato per questo codice fiscale');
        }
      } else {
        console.log('ℹ️ Risultato vuoto - possibile che non ci siano immobili registrati');
      }
    }

    return true;

  } catch (error) {
    console.log('❌ Errore di rete:', error.message);
    return false;
  }
}

/**
 * Test con solo terreni
 */
async function testTerrestrialSearch() {
  console.log('\n🌱 Test Ricerca Solo Terreni...');
  
  try {
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cf_piva: REAL_CF,
        tipo_catasto: 'T'  // Solo Terreni
      })
    });

    console.log(`📡 Status: ${searchResponse.status}`);
    
    if (searchResponse.ok) {
      const result = await searchResponse.json();
      console.log('✅ Ricerca terreni avviata:', result.data?.id || 'ID non trovato');
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
 * Test con solo fabbricati
 */
async function testBuildingSearch() {
  console.log('\n🏠 Test Ricerca Solo Fabbricati...');
  
  try {
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cf_piva: REAL_CF,
        tipo_catasto: 'F'  // Solo Fabbricati
      })
    });

    console.log(`📡 Status: ${searchResponse.status}`);
    
    if (searchResponse.ok) {
      const result = await searchResponse.json();
      console.log('✅ Ricerca fabbricati avviata:', result.data?.id || 'ID non trovato');
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
  console.log('🚀 Test Ricerca Catastale con CF Reale\n');
  
  console.log('🔧 Configurazione:');
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`🏛️ Token Catasto: ${config.catasto_token ? '✅ Configurato' : '❌ Non configurato'}`);
  console.log(`📄 Codice Fiscale: ${REAL_CF}`);
  
  if (!config.catasto_token) {
    console.log('\n❌ Token catasto non configurato!');
    console.log('Aggiungi OPENAPI_CATASTO_TOKEN al file .env.local');
    return;
  }
  
  // Test principale
  const mainSearchWorks = await testRealCadastralSearch();
  
  // Test aggiuntivi se il principale funziona
  if (mainSearchWorks) {
    await testTerrestrialSearch();
    await testBuildingSearch();
  }
  
  // Risultati finali
  console.log('\n📊 Risultati Test:');
  console.log(`🔍 Ricerca Completa (TF): ${mainSearchWorks ? '✅ Funziona' : '❌ Non funziona'}`);
  
  if (mainSearchWorks) {
    console.log('\n🎉 Integrazione OpenAPI Funzionante!');
    console.log('💡 Prossimi passi:');
    console.log('1. L\'app può ora cercare immobili via codice fiscale');
    console.log('2. Testa il componente React nell\'app');
    console.log('3. Implementa il calcolo IMU sui risultati');
  } else {
    console.log('\n❌ Problemi nell\'integrazione');
    console.log('💡 Verifica:');
    console.log('1. Che il token sia corretto e attivo');
    console.log('2. Che ci sia credito sufficiente');
    console.log('3. Che il CF sia corretto');
  }
}

// Esegui i test
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testRealCadastralSearch, testTerrestrialSearch, testBuildingSearch }; 