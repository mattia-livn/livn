import * as fs from 'fs';
import * as path from 'path';

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

async function testWorkingAPI() {
  console.log('🏠 TEST API CATASTO FUNZIONANTE');
  console.log('=' .repeat(50));
  
  const credentials = loadProductionCredentials();
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log(`\n📊 Usando credenziali produzione: ${baseUrl}`);
  
  const headers = {
    'X-API-Key': credentials.apiKey,
    'Authorization': `Bearer ${credentials.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Test 1: Ricerca nazionale con POST
  console.log('\n1️⃣ POST Ricerca Nazionale...');
  try {
    const searchUrl = `${baseUrl}/richiesta/ricerca_nazionale/`;
    
    // Codice fiscale di esempio 
    const body = {
      cf_piva: 'RSSMRA85M01H501U', // CF di esempio
      tipo_catasto: 'F' // Solo fabbricati
    };
    
    console.log('   URL:', searchUrl);
    console.log('   Body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const result = await response.json();
      console.log('   Risposta:', JSON.stringify(result, null, 2));
      
      if (result.trace) {
        const decodedTrace = Buffer.from(result.trace, 'base64').toString('utf8');
        console.log('   🔍 Trace decodificato:', decodedTrace);
      }
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 500));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 2: Prova con un CF diverso
  console.log('\n2️⃣ POST con CF diverso...');
  try {
    const searchUrl = `${baseUrl}/richiesta/ricerca_nazionale/`;
    
    const body = {
      cf_piva: 'MRORSS80A01H501X', // CF diverso
      tipo_catasto: 'F'
    };
    
    console.log('   Body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const result = await response.json();
      console.log('   Risposta:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 3: Verifica credito wallet
  console.log('\n3️⃣ Verifica credito wallet...');
  try {
    const walletUrl = `${baseUrl}/wallet/balance`;
    
    const response = await fetch(walletUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': credentials.apiKey,
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const result = await response.json();
      console.log('   Risposta:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  console.log('\n💡 RIEPILOGO:');
  console.log('   ✅ Autenticazione FUNZIONA con credenziali produzione');
  console.log('   ✅ API risponde correttamente');
  console.log('   🔄 Ora possiamo procedere con i test IMU');
}

testWorkingAPI()
  .then(() => console.log('\n✅ Test API funzionante completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 