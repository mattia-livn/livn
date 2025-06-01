import { CatastoService, CatastoConfig } from './services/catasto-service';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test specifico per il flusso di polling dell'API catasto
 */

function loadCredentials() {
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
    baseUrl: env.OPENAPI_SANDBOX_URL,
    apiKey: env.OPENAPI_SANDBOX_KEY,
    token: env.OPENAPI_SANDBOX_TOKEN
  };
}

async function testPollingFlow() {
  console.log('🔄 TEST FLUSSO POLLING API CATASTO');
  console.log('=' .repeat(50));
  
  const credentials = loadCredentials();
  const config: CatastoConfig = {
    baseUrl: credentials.baseUrl,
    apiKey: credentials.apiKey,
    token: credentials.token
  };

  const catastoService = new CatastoService(config);
  const cfPiva = 'VNNFNC42H16A182X';

  try {
    console.log(`🔍 Inizio ricerca nazionale per CF: ${cfPiva}`);
    console.log('📊 Stato richieste prima:', catastoService.getUsageStats());
    
    // Step 1: Ricerca nazionale
    const risultatoNazionale = await catastoService.ricercaNazionale(cfPiva, 'TF');
    
    console.log('\n✅ Ricerca nazionale completata!');
    console.log('📊 Stato richieste dopo ricerca nazionale:', catastoService.getUsageStats());
    console.log('📋 Risultato:', JSON.stringify(risultatoNazionale, null, 2));

    if (!risultatoNazionale?.province?.length) {
      console.log('❌ Nessuna provincia trovata - test terminato');
      return;
    }

    console.log(`\n🏘️ Trovate ${risultatoNazionale.province.length} province con proprietà`);

    // Step 2: Test ricerca persona per la prima provincia con fabbricati
    const provinciaConFabbricati = risultatoNazionale.province.find(p => p.fabbricati && p.fabbricati > 0);
    
    if (provinciaConFabbricati) {
      console.log(`\n🏠 Test ricerca fabbricati in ${provinciaConFabbricati.provincia}`);
      console.log(`   Numero fabbricati attesi: ${provinciaConFabbricati.fabbricati}`);
      
      try {
        const risultatoFabbricati = await catastoService.ricercaPersona(
          cfPiva, 
          provinciaConFabbricati.provincia, 
          'F'
        );
        
        console.log('✅ Ricerca fabbricati completata!');
        console.log('📊 Stato richieste dopo ricerca fabbricati:', catastoService.getUsageStats());
        console.log('📋 Risultato fabbricati:', JSON.stringify(risultatoFabbricati, null, 2));
        
      } catch (error) {
        console.error('❌ Errore ricerca fabbricati:', error);
      }
    }

    // Step 3: Test ricerca persona per la prima provincia con terreni
    const provinciaConTerreni = risultatoNazionale.province.find(p => p.terreni && p.terreni > 0);
    
    if (provinciaConTerreni) {
      console.log(`\n🌾 Test ricerca terreni in ${provinciaConTerreni.provincia}`);
      console.log(`   Numero terreni attesi: ${provinciaConTerreni.terreni}`);
      
      try {
        const risultatoTerreni = await catastoService.ricercaPersona(
          cfPiva, 
          provinciaConTerreni.provincia, 
          'T'
        );
        
        console.log('✅ Ricerca terreni completata!');
        console.log('📊 Stato richieste dopo ricerca terreni:', catastoService.getUsageStats());
        console.log('📋 Risultato terreni:', JSON.stringify(risultatoTerreni, null, 2));
        
      } catch (error) {
        console.error('❌ Errore ricerca terreni:', error);
      }
    }

  } catch (error) {
    console.error('\n❌ ERRORE NEL FLUSSO:', error);
    console.log('📊 Stato richieste finale:', catastoService.getUsageStats());
  }
}

testPollingFlow()
  .then(() => console.log('\n✅ Test flusso polling completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 