import * as fs from 'fs';
import * as path from 'path';

/**
 * Test dello stato del server OpenAPI catasto
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

async function testServerStatus() {
  console.log('🏥 TEST STATO SERVER OPENAPI');
  console.log('=' .repeat(40));
  
  const credentials = loadCredentials();
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  const headers = {
    'X-API-Key': credentials.apiKey,
    'Authorization': `Bearer ${credentials.token}`,
    'Accept': 'application/json'
  };

  // Test 1: Endpoint di base
  console.log('\n1️⃣ Test endpoint base...');
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      console.log('   Risposta:', JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 200));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 2: Endpoint con autenticazione semplice
  console.log('\n2️⃣ Test endpoint con auth...');
  try {
    const authTestUrl = `${baseUrl}/status`;
    const response = await fetch(authTestUrl, {
      method: 'GET',
      headers
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      console.log('   Risposta:', JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 200));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 3: Endpoint ricerca nazionale con dati diversi
  console.log('\n3️⃣ Test ricerca nazionale con CF diverso...');
  try {
    const testUrl = `${baseUrl}/richiesta/ricerca_nazionale/`;
    
    // Prova con un CF più "standard"
    const body = {
      cf_piva: 'RSSMRA85M01H501U', // CF di esempio comune
      tipo_catasto: 'F' // Solo fabbricati per semplicità
    };
    
    console.log('   Body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      console.log('   Risposta:', JSON.stringify(data, null, 2));
      
      if (data.trace) {
        const decodedTrace = Buffer.from(data.trace, 'base64').toString('utf8');
        console.log('   🔍 Trace decodificato:', decodedTrace);
      }
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 200));
    }
    
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 4: Verifica credito wallet
  console.log('\n4️⃣ Test verifica credito...');
  try {
    const walletUrl = `${baseUrl}/wallet/balance`;
    const response = await fetch(walletUrl, {
      method: 'GET',
      headers
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      console.log('   Risposta:', JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 200));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  console.log('\n💡 ANALISI:');
  console.log('   - Se tutti i test falliscono: problema server OpenAPI');
  console.log('   - Se solo ricerca_nazionale fallisce: problema specifico endpoint');
  console.log('   - Se auth fallisce: problema credenziali');
  console.log('   - Trace "AvWs.Mongo.php" indica problema database lato server');
}

testServerStatus()
  .then(() => console.log('\n✅ Test stato server completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 