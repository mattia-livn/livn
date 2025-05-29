/**
 * Script di test con attesa prolungata per i risultati OpenAPI
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
 * Attendi risultati con polling
 */
async function waitForResults(requestId, maxAttempts = 10, intervalMs = 10000) {
  console.log(`⏳ Attesa risultati per ID: ${requestId}`);
  console.log(`🔄 Max tentativi: ${maxAttempts}, Intervallo: ${intervalMs/1000}s`);
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`\n📡 Tentativo ${attempt}/${maxAttempts}...`);
    
    try {
      const response = await fetch(`${config.baseUrl}/richiesta/${requestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.catasto_token}`,
        }
      });
      
      if (!response.ok) {
        console.log(`❌ Errore HTTP: ${response.status}`);
        continue;
      }
      
      const result = await response.json();
      console.log(`📊 Stato: ${result.data?.stato || 'N/A'}`);
      
      if (result.data?.stato === 'evasa') {
        console.log('✅ Risultati pronti!');
        return { success: true, data: result };
      } else if (result.data?.stato === 'errore') {
        console.log('❌ Errore nella ricerca');
        return { success: false, error: 'Errore nel processing', data: result };
      } else {
        console.log(`⏳ Ancora in elaborazione... (${result.data?.stato || 'unknown'})`);
      }
      
      if (attempt < maxAttempts) {
        console.log(`⏰ Attesa ${intervalMs/1000} secondi prima del prossimo tentativo...`);
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
      
    } catch (error) {
      console.log(`❌ Errore nel tentativo ${attempt}:`, error.message);
    }
  }
  
  return { success: false, error: 'Timeout - risultati non pronti', data: null };
}

/**
 * Analizza i risultati della ricerca
 */
function analyzeResults(data) {
  console.log('\n📈 Analisi Dettagliata Risultati:');
  
  if (!data?.data?.risultato) {
    console.log('ℹ️ Nessun risultato disponibile');
    return;
  }
  
  const risultato = data.data.risultato;
  
  // Province trovate
  if (risultato.province && risultato.province.length > 0) {
    console.log(`\n🏙️ Province con immobili: ${risultato.province.length}`);
    risultato.province.forEach((prov, index) => {
      console.log(`  ${index + 1}. ${prov.provincia} - ${prov.numero_immobili || 'N/A'} immobili`);
    });
  }
  
  // Immobili diretti
  if (risultato.immobili && risultato.immobili.length > 0) {
    console.log(`\n🏠 Immobili trovati direttamente: ${risultato.immobili.length}`);
    risultato.immobili.forEach((immobile, index) => {
      console.log(`\n  📍 Immobile ${index + 1}:`);
      console.log(`     📮 Indirizzo: ${immobile.indirizzo || 'N/A'}`);
      console.log(`     🏷️ Categoria: ${immobile.categoria || 'N/A'}`);
      console.log(`     💰 Rendita: ${immobile.rendita || 'N/A'}`);
      console.log(`     📑 Foglio: ${immobile.foglio || 'N/A'}`);
      console.log(`     🔢 Particella: ${immobile.particella || 'N/A'}`);
      console.log(`     🏠 Subalterno: ${immobile.subalterno || 'N/A'}`);
    });
  }
  
  // Proprietari
  if (risultato.intestatari && risultato.intestatari.length > 0) {
    console.log(`\n👥 Proprietari trovati: ${risultato.intestatari.length}`);
    risultato.intestatari.forEach((intestatario, index) => {
      console.log(`  ${index + 1}. ${intestatario.denominazione || intestatario.nome + ' ' + intestatario.cognome}`);
      console.log(`     📄 CF: ${intestatario.codice_fiscale || 'N/A'}`);
      console.log(`     🏛️ Proprietà: ${intestatario.tipo_diritto || 'N/A'}`);
      console.log(`     📊 Quota: ${intestatario.quota || 'N/A'}`);
    });
  }
  
  if (!risultato.province?.length && !risultato.immobili?.length && !risultato.intestatari?.length) {
    console.log('ℹ️ Nessun immobile trovato per questo codice fiscale');
    console.log('💡 Possibili motivi:');
    console.log('   - Non possiedi immobili registrati al catasto');
    console.log('   - Gli immobili sono registrati con CF diverso');
    console.log('   - Problemi temporanei nell\'elaborazione');
  }
}

/**
 * Test completo con attesa prolungata
 */
async function testWithLongWait() {
  console.log('🚀 Test Ricerca Catastale con Attesa Prolungata\n');
  
  if (!config.catasto_token) {
    console.log('❌ Token catasto non configurato!');
    return;
  }
  
  console.log('🔧 Configurazione:');
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`📄 Codice Fiscale: ${REAL_CF}`);
  
  try {
    // Fase 1: Avvia ricerca
    console.log('\n1️⃣ Avvio Ricerca Nazionale...');
    const searchResponse = await fetch(`${config.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.catasto_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cf_piva: REAL_CF,
        tipo_catasto: 'TF'
      })
    });
    
    if (!searchResponse.ok) {
      const error = await searchResponse.text();
      console.log('❌ Errore nella richiesta:', error);
      return;
    }
    
    const searchResult = await searchResponse.json();
    const requestId = searchResult.data?.id;
    
    if (!requestId) {
      console.log('❌ ID richiesta non trovato');
      return;
    }
    
    console.log(`✅ Ricerca avviata con ID: ${requestId}`);
    
    // Fase 2: Attendi risultati con polling
    const finalResult = await waitForResults(requestId, 12, 10000); // 2 minuti totali
    
    if (finalResult.success) {
      console.log('\n🎉 Risultati ottenuti con successo!');
      analyzeResults(finalResult.data);
      
      // Salva risultati per l'app
      console.log('\n💾 Dati pronti per l\'integrazione nell\'app React!');
      
    } else {
      console.log('\n⚠️ Risultati non pronti');
      console.log('💡 La ricerca potrebbe essere ancora in corso');
      console.log('🔄 Riprova tra qualche minuto o controlla su OpenAPI console');
    }
    
  } catch (error) {
    console.log('❌ Errore generale:', error.message);
  }
}

// Esegui test
if (require.main === module) {
  testWithLongWait().catch(console.error);
}

module.exports = { waitForResults, analyzeResults }; 