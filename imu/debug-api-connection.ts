import * as fs from 'fs';
import * as path from 'path';

/**
 * Debug della connessione API OpenAPI catasto
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

async function debugApiConnection() {
  console.log('🔍 DEBUG CONNESSIONE API OPENAPI CATASTO');
  console.log('=' .repeat(50));
  
  const credentials = loadCredentials();
  
  console.log('📋 Configurazione:');
  console.log(`   Base URL: ${credentials.baseUrl}`);
  console.log(`   API Key: ${credentials.apiKey?.substring(0, 10)}...`);
  console.log(`   Token: ${credentials.token?.substring(0, 20)}...`);
  
  // Costruisce URL completo
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  const testUrl = `${baseUrl}/richiesta/ricerca_nazionale/`;
  console.log(`\n🔗 URL completo: ${testUrl}`);
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': credentials.apiKey,
    'Authorization': `Bearer ${credentials.token}`,
  };
  
  console.log('\n📤 Headers inviati:');
  console.log(`   Content-Type: ${headers['Content-Type']}`);
  console.log(`   Accept: ${headers['Accept']}`);
  console.log(`   X-API-Key: ${headers['X-API-Key']?.substring(0, 10)}...`);
  console.log(`   Authorization: Bearer ${headers['Authorization']?.substring(7, 27)}...`);
  
  const body = {
    cf_piva: 'VNNFNC42H16A182X',
    tipo_catasto: 'TF'
  };
  
  console.log('\n📋 Body richiesta:');
  console.log(JSON.stringify(body, null, 2));
  
  try {
    console.log('\n🚀 Invio richiesta...');
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    console.log(`\n📈 Risposta ricevuta:`);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Headers:`);
    
    response.headers.forEach((value, key) => {
      console.log(`     ${key}: ${value}`);
    });
    
    const contentType = response.headers.get('content-type');
    console.log(`\n📋 Content-Type: ${contentType}`);
    
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      console.log('\n📋 Risposta JSON:');
      console.log(JSON.stringify(responseData, null, 2));
      
      if (!response.ok) {
        console.log('\n❌ ANALISI ERRORE:');
        console.log(`   Codice errore API: ${responseData.error}`);
        console.log(`   Messaggio: ${responseData.message}`);
        console.log(`   Success: ${responseData.success}`);
        
        // Suggerimenti specifici
        if (responseData.error === 246) {
          console.log('\n💡 POSSIBILI CAUSE (Error 246):');
          console.log('   - Credenziali sandbox scadute');
          console.log('   - API Key non valida per sandbox');
          console.log('   - Token non autorizzato per questo endpoint');
        } else if (responseData.error === 401) {
          console.log('\n💡 POSSIBILI CAUSE (Error 401):');
          console.log('   - API Key incorretta');
          console.log('   - Token Bearer non valido');
          console.log('   - Headers di autenticazione malformati');
        }
      } else {
        console.log('\n✅ Richiesta completata con successo!');
      }
    } else {
      const textResponse = await response.text();
      console.log('\n📋 Risposta non-JSON:');
      console.log(textResponse.substring(0, 500));
    }
    
  } catch (error) {
    console.log('\n❌ ERRORE DI RETE:');
    console.log(error);
    
    console.log('\n💡 POSSIBILI CAUSE:');
    console.log('   - URL endpoint non corretto');
    console.log('   - Firewall che blocca la connessione');
    console.log('   - Server OpenAPI non raggiungibile');
  }
}

debugApiConnection()
  .then(() => console.log('\n✅ Debug completato'))
  .catch(error => console.error('\n❌ Debug fallito:', error)); 