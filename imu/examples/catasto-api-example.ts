import { CatastoService, CatastoConfig, CatastoError } from '../services/catasto-service';
import { CatastoMapper } from '../data/catasto-mapper';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Carica le credenziali dal file .env.local
 */
function loadCredentialsFromEnvLocal(): { apiKey: string; token: string; baseUrl: string } | null {
  try {
    const envLocalPath = path.join(__dirname, '..', '.env.local');
    
    if (!fs.existsSync(envLocalPath)) {
      console.log('📋 File .env.local non trovato. Cercando in directory padre...');
      
      // Prova nella directory padre
      const parentEnvPath = path.join(__dirname, '..', '..', '.env.local');
      if (!fs.existsSync(parentEnvPath)) {
        console.log('❌ File .env.local non trovato né in imu/ né nella directory padre');
        return null;
      }
      
      console.log(`✅ File .env.local trovato in: ${parentEnvPath}`);
      const envContent = fs.readFileSync(parentEnvPath, 'utf8');
      return parseEnvContent(envContent);
    }
    
    console.log(`✅ File .env.local trovato in: ${envLocalPath}`);
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    return parseEnvContent(envContent);
    
  } catch (error) {
    console.error('❌ Errore lettura .env.local:', error);
    return null;
  }
}

/**
 * Parsing del contenuto del file .env.local
 */
function parseEnvContent(content: string): { apiKey: string; token: string; baseUrl: string } | null {
  const lines = content.split('\n');
  const env: Record<string, string> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Rimuove virgolette
        env[key.trim()] = value.trim();
      }
    }
  }
  
  // Cerca le credenziali OpenAPI
  const sandboxKey = env.OPENAPI_SANDBOX_KEY;
  const sandboxToken = env.OPENAPI_SANDBOX_TOKEN;
  const sandboxUrl = env.OPENAPI_SANDBOX_URL || 'https://api.sandbox.openapi.com';
  
  const productionKey = env.OPENAPI_PRODUCTION_KEY;
  const productionToken = env.OPENAPI_PRODUCTION_TOKEN;
  const productionUrl = env.OPENAPI_PRODUCTION_URL || 'https://api.openapi.com';
  
  // Preferisci sandbox se disponibile, altrimenti produzione
  if (sandboxKey && sandboxToken) {
    console.log('🔧 Usando credenziali SANDBOX da .env.local');
    return {
      apiKey: sandboxKey,
      token: sandboxToken,
      baseUrl: sandboxUrl
    };
  } else if (productionKey && productionToken) {
    console.log('⚠️ Usando credenziali PRODUZIONE da .env.local');
    return {
      apiKey: productionKey,
      token: productionToken,
      baseUrl: productionUrl
    };
  }
  
  console.log('❌ Credenziali OpenAPI non trovate in .env.local');
  console.log('📋 Chiavi cercate: OPENAPI_SANDBOX_KEY, OPENAPI_SANDBOX_TOKEN, OPENAPI_PRODUCTION_KEY, OPENAPI_PRODUCTION_TOKEN');
  
  return null;
}

/**
 * Esempio di utilizzo del servizio catasto OpenAPI per IMU 2025
 * 
 * Questo esempio mostra come:
 * 1. Configurare il servizio catasto leggendo da .env.local
 * 2. Raccogliere dati catastali di un soggetto
 * 3. Mappare i dati per il calcolo IMU
 * 4. Gestire errori e rate limiting
 */

async function esempioRaccoltaDatiCatastali() {
  // 1. Caricamento credenziali da .env.local
  console.log('🔐 Caricamento credenziali da .env.local...');
  const credentials = loadCredentialsFromEnvLocal();
  
  if (!credentials) {
    console.error('❌ Configurazione mancante in .env.local');
    console.log('\n📋 ISTRUZIONI CONFIGURAZIONE:');
    console.log('1. Crea un file .env.local nella directory del progetto');
    console.log('2. Aggiungi le seguenti variabili:');
    console.log('   OPENAPI_SANDBOX_KEY=your-sandbox-api-key');
    console.log('   OPENAPI_SANDBOX_TOKEN=your-sandbox-bearer-token');
    console.log('   OPENAPI_SANDBOX_URL=https://api.sandbox.openapi.com');
    console.log('\n📚 Per ottenere le credenziali:');
    console.log('   - Registrati su https://console.openapi.com');
    console.log('   - Attiva "Italian cadastres" in API Library');
    console.log('   - Genera API Key e Token');
    console.log('   - Ricarica il wallet per le richieste');
    return;
  }

  const config: CatastoConfig = {
    baseUrl: credentials.baseUrl,
    apiKey: credentials.apiKey,
    token: credentials.token
  };

  const catastoService = new CatastoService(config);

  // 2. Codice fiscale/PIVA del soggetto da analizzare
  const cfPiva = 'VNNFNC42H16A182X'; // Nuovo CF di test

  try {
    console.log('🚀 Avvio raccolta dati catastali per IMU 2025');
    console.log(`📋 Soggetto: ${cfPiva}`);
    console.log(`🔗 Endpoint: ${config.baseUrl}`);
    
    // Verifica statistiche utilizzo prima di iniziare
    const stats = catastoService.getUsageStats();
    console.log(`📊 Richieste oggi: ${stats.richiesteOggi}/${stats.limiteGiornaliero}`);
    
    if (stats.richiesteRimanenti < 10) {
      console.warn('⚠️ Attenzione: poche richieste rimanenti oggi');
    }

    // 3. Raccolta dati completa
    const { fabbricati, terreni } = await catastoService.raccogliDatiCompleti(cfPiva);

    console.log('\n📈 RISULTATI RACCOLTA DATI:');
    console.log(`🏠 Fabbricati trovati: ${fabbricati.length}`);
    console.log(`🌾 Terreni trovati: ${terreni.length}`);

    // 4. Elaborazione dati per IMU
    if (fabbricati.length > 0) {
      console.log('\n🏠 DETTAGLIO FABBRICATI:');
      fabbricati.forEach((fabbricato, index) => {
        console.log(`\n--- Fabbricato ${index + 1} ---`);
        console.log(`📍 Comune: ${fabbricato.comune}`);
        console.log(`🏷️ Categoria: ${fabbricato.categoria}`);
        console.log(`📐 Consistenza: ${fabbricato.consistenza}`);
        console.log(`💰 Rendita: ${fabbricato.rendita}`);
        console.log(`📍 Indirizzo: ${fabbricato.indirizzo}`);
        console.log(`⚖️ Titolarità: ${fabbricato.titolarita}`);

        try {
          // Mappatura automatica per IMU
          const parametriIMU = CatastoMapper.elaboraDatiCatastali({
            tipo: 'fabbricato',
            comune: fabbricato.comune,
            identificativoCatastale: `Fg.${fabbricato.foglio} Part.${fabbricato.particella} Sub.${fabbricato.subalterno}`,
            dati: fabbricato,
            dataEstrazione: new Date().toISOString(),
            fonte: 'OpenAPI Catasto'
          });

          console.log('🎯 Parametri IMU mappati:');
          console.log(`   📂 Categoria catastale: ${parametriIMU.informazioniDerivate.categoriaAtastale}`);
          console.log(`   🏡 Tipo immobile: ${parametriIMU.informazioniDerivate.tipoImmobile}`);
          console.log(`   📍 Ubicazione: ${parametriIMU.informazioniDerivate.ubicazione}`);
          console.log(`   📏 Superficie: ${parametriIMU.informazioniDerivate.superficie || 'Non disponibile'}`);

        } catch (error) {
          console.error(`❌ Errore mappatura fabbricato ${index + 1}:`, error);
        }
      });
    }

    if (terreni.length > 0) {
      console.log('\n🌾 DETTAGLIO TERRENI:');
      terreni.forEach((terreno, index) => {
        console.log(`\n--- Terreno ${index + 1} ---`);
        console.log(`📍 Comune: ${terreno.comune}`);
        console.log(`🌱 Qualità: ${terreno.qualita}`);
        console.log(`📏 Superficie: ${terreno.superficie}`);
        console.log(`💰 Reddito dominicale: ${terreno.redditoDominicale}`);
        console.log(`🌾 Reddito agrario: ${terreno.redditoAgrario}`);
        console.log(`⚖️ Titolarità: ${terreno.titolarita}`);

        try {
          // Mappatura automatica per IMU
          const parametriIMU = CatastoMapper.elaboraDatiCatastali({
            tipo: 'terreno',
            comune: terreno.comune,
            identificativoCatastale: `Fg.${terreno.foglio} Part.${terreno.particella}`,
            dati: terreno,
            dataEstrazione: new Date().toISOString(),
            fonte: 'OpenAPI Catasto'
          });

          console.log('🎯 Parametri IMU mappati:');
          console.log(`   📂 Categoria catastale: ${parametriIMU.informazioniDerivate.categoriaAtastale}`);
          console.log(`   🏡 Qualità terreno: ${parametriIMU.informazioniDerivate.qualitaTerreno}`);
          console.log(`   📍 Ubicazione: ${parametriIMU.informazioniDerivate.ubicazione}`);
          console.log(`   📏 Superficie: ${parametriIMU.informazioniDerivate.superficie}`);

        } catch (error) {
          console.error(`❌ Errore mappatura terreno ${index + 1}:`, error);
        }
      });
    }

    // 5. Statistiche finali
    const finalStats = catastoService.getUsageStats();
    console.log('\n📊 STATISTICHE UTILIZZO:');
    console.log(`🔢 Richieste utilizzate: ${finalStats.richiesteOggi}`);
    console.log(`⏳ Richieste rimanenti: ${finalStats.richiesteRimanenti}`);

    if (fabbricati.length === 0 && terreni.length === 0) {
      console.log('\n💡 SUGGERIMENTO: Nessun immobile trovato. Verificare:');
      console.log('   - Codice fiscale/PIVA corretto');
      console.log('   - Presenza di immobili intestati al soggetto');
      console.log('   - Credito sufficiente nel wallet OpenAPI');
    }

  } catch (error) {
    console.error('\n❌ ERRORE DURANTE LA RACCOLTA DATI:');
    
    if (error instanceof CatastoError) {
      // Gestione errori specifici dell'API catasto
      switch (error.code) {
        case 246: // INSUFFICIENT_CREDIT
          console.error('💳 Credito insufficiente nel wallet OpenAPI');
          console.error('   Soluzione: Ricaricare il wallet su console.openapi.com');
          break;
        case 429: // RATE_LIMIT_EXCEEDED
          console.error('⏰ Limite di richieste superato');
          console.error('   Soluzione: Attendere il reset giornaliero o attivare subscription');
          break;
        case 210: // TIPO_CATASTO_NOT_VALID
          console.error('📋 Tipo catasto non valido');
          console.error('   Soluzione: Verificare i parametri (T, F, TF)');
          break;
        case 223: // PROVINCIA_REQUIRED
          console.error('📍 Provincia richiesta mancante');
          break;
        case 255: // WRONG_ENDPOINT
          console.error('🔗 Endpoint non corretto');
          console.error('   Soluzione: Verificare URL e configurazione in .env.local');
          break;
        default:
          console.error(`🔧 Errore API: ${error.message} (Codice: ${error.code})`);
      }
    } else {
      console.error('🔧 Errore generico:', error);
    }

    console.log('\n🛠️ RISOLUZIONE PROBLEMI:');
    console.log('1. Verificare configurazione in .env.local');
    console.log('2. Controllare credito wallet su console.openapi.com');
    console.log('3. Verificare connessione internet');
    console.log('4. Consultare documentazione OpenAPI catasto');
  }
}

/**
 * Esempio di ricerca mirata su singola provincia
 */
async function esempioRicercaMirata() {
  const credentials = loadCredentialsFromEnvLocal();
  if (!credentials) {
    console.log('❌ Credenziali non disponibili, skip ricerca mirata');
    return;
  }

  const config: CatastoConfig = {
    baseUrl: credentials.baseUrl,
    apiKey: credentials.apiKey,
    token: credentials.token
  };

  const catastoService = new CatastoService(config);

  try {
    console.log('\n🎯 ESEMPIO RICERCA MIRATA SU PROVINCIA');
    
    // Ricerca solo fabbricati in una provincia specifica
    const cfPiva = '12485671007';
    const provincia = 'ROMA Territorio-RM';
    
    console.log(`🔍 Ricerca fabbricati per ${cfPiva} in ${provincia}`);
    
    const risultato = await catastoService.ricercaPersona(cfPiva, provincia, 'F');
    
    if (risultato?.soggetti) {
      console.log(`✅ Trovati ${risultato.soggetti.length} soggetti`);
      
      risultato.soggetti.forEach((soggetto, index) => {
        console.log(`\n--- Soggetto ${index + 1}: ${soggetto.denominazione || `${soggetto.nome} ${soggetto.cognome}`} ---`);
        console.log(`📋 CF: ${soggetto.cf}`);
        console.log(`🏠 Immobili: ${soggetto.immobili.length}`);
        
        soggetto.immobili.forEach((immobile, immIndex) => {
          console.log(`   ${immIndex + 1}. ${immobile.ubicazione}`);
          console.log(`      📂 ${immobile.classamento}`);
          console.log(`      💰 ${immobile.rendita}`);
        });
      });
    }

  } catch (error) {
    console.error('❌ Errore ricerca mirata:', error);
  }
}

/**
 * Configurazione per demo
 */
export async function runCatastoDemo() {
  console.log('🏛️ DEMO SERVIZIO CATASTO OPENAPI PER IMU 2025');
  console.log('=' .repeat(60));

  // Esempio completo
  await esempioRaccoltaDatiCatastali();

  console.log('\n' + '=' .repeat(60));

  // Esempio mirato
  await esempioRicercaMirata();

  console.log('\n✅ Demo completata!');
  console.log('📚 Per più informazioni: console.openapi.com/apis/catasto');
}

// Esegui demo se script chiamato direttamente
if (require.main === module) {
  runCatastoDemo().catch(console.error);
} 