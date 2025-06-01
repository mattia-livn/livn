import * as fs from 'fs';
import * as path from 'path';
import { CatastoService, CatastoConfig } from './services/catasto-service';

function loadProductionCredentials() {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const lines = envContent.split('\n');
  const env: Record<string, string> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        env[key.trim()] = value.trim();
      }
    }
  }
  
  return {
    baseUrl: env.OPENAPI_URL,
    apiKey: env.OPENAPI_KEY,
    token: env.OPENAPI_TOKEN
  };
}

async function testRealAPI() {
  console.log('🚀 TEST API REALE CATASTO');
  console.log('=' .repeat(50));
  
  const credentials = loadProductionCredentials();
  
  if (!credentials.baseUrl || !credentials.apiKey || !credentials.token) {
    console.log('❌ Credenziali mancanti nel file .env.local');
    return;
  }
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log(`\n📊 Configurazione:
   URL: ${baseUrl}
   API Key: ${credentials.apiKey}
   Token: ${credentials.token} (lunghezza: ${credentials.token?.length})`);
  
  const config: CatastoConfig = {
    baseUrl,
    apiKey: credentials.apiKey,
    token: credentials.token
  };
  
  const catastoService = new CatastoService(config);
  
  // Test con diversi CF per trovarne uno valido
  const codiciDaTestare = [
    'RSSMRA85M01H501U', // CF classico
    'BNCGNN70A01F205X', // CF alternativo
    'MRORSS80A01H501X', // CF diverso
    '12345678901',       // Partita IVA
    '01234567890',       // Partita IVA alternativa
  ];
  
  for (const cf of codiciDaTestare) {
    console.log(`\n🔍 Test con CF/PIVA: ${cf}`);
    
    try {
      console.log('   📡 Ricerca nazionale in corso...');
      const risultatoNazionale = await catastoService.ricercaNazionale(cf, 'F');
      
      if (risultatoNazionale && risultatoNazionale.province.length > 0) {
        console.log('   ✅ TROVATE PROVINCE!');
        console.log('   Province:', risultatoNazionale.province.map(p => `${p.provincia} (${p.fabbricati || 0} fabbricati, ${p.terreni || 0} terreni)`));
        
        // Prova ricerca persona nella prima provincia
        const primaProvincia = risultatoNazionale.province[0];
        if (primaProvincia.fabbricati && primaProvincia.fabbricati > 0) {
          console.log(`\n   🏠 Ricerca dettagli fabbricati in ${primaProvincia.provincia}...`);
          try {
            const risultatoPersona = await catastoService.ricercaPersona(cf, primaProvincia.provincia, 'F');
            
            if (risultatoPersona && risultatoPersona.soggetti.length > 0) {
              console.log('   ✅ DATI IMMOBILI TROVATI!');
              console.log(`   Soggetti: ${risultatoPersona.soggetti.length}`);
              
              risultatoPersona.soggetti.forEach((soggetto, i) => {
                console.log(`   Soggetto ${i + 1}: ${soggetto.denominazione || `${soggetto.nome} ${soggetto.cognome}`}`);
                console.log(`   Immobili: ${soggetto.immobili.length}`);
                
                soggetto.immobili.slice(0, 2).forEach((immobile, j) => {
                  console.log(`     Immobile ${j + 1}: ${immobile.ubicazione}`);
                  console.log(`     Categoria: ${immobile.classamento || 'N/A'}`);
                  console.log(`     Rendita: ${immobile.rendita || 'N/A'}`);
                });
              });
              
              // Test raccolta dati completi
              console.log('\n   📋 Test raccolta dati completi...');
              const datiCompleti = await catastoService.raccogliDatiCompleti(cf);
              console.log(`   ✅ Raccolti ${datiCompleti.fabbricati.length} fabbricati e ${datiCompleti.terreni.length} terreni`);
              
              // Mostra statistiche utilizzo
              const stats = catastoService.getUsageStats();
              console.log(`\n   📊 Statistiche: ${stats.richiesteOggi}/${stats.limiteGiornaliero} richieste oggi`);
              
              return; // Successo! Esci dal loop
            }
          } catch (error) {
            console.log(`   ❌ Errore ricerca persona: ${(error as Error).message}`);
          }
        }
      } else {
        console.log('   ⚪ Nessun immobile trovato per questo CF');
      }
    } catch (error) {
      console.log(`   ❌ Errore ricerca: ${(error as Error).message}`);
      if ((error as any).code === 242) {
        console.log('   💡 CF non valido, proviamo il prossimo...');
      }
    }
  }
  
  console.log('\n⚠️  Nessun CF valido trovato. Potrebbero servire CF reali di test.');
}

testRealAPI()
  .then(() => console.log('\n✅ Test API reale completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 