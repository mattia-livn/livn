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

async function testProductionAuth() {
  console.log('🚀 TEST AUTENTICAZIONE PRODUZIONE');
  console.log('=' .repeat(50));
  
  const credentials = loadProductionCredentials();
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log(`\n📊 Credenziali produzione:
   URL: ${baseUrl}
   API Key: ${credentials.apiKey}
   Token: ${credentials.token} (lunghezza: ${credentials.token?.length})`);
  
  // Se il token termina con %, potrebbe essere URL-encoded o troncato
  if (credentials.token?.endsWith('%')) {
    console.log('   ⚠️  Token termina con %, potrebbe essere troncato o URL-encoded');
  }

  const testCases: Array<{name: string, headers: Record<string, string>, url?: string}> = [
    {
      name: "1️⃣ Test endpoint root senza auth",
      headers: {
        'Accept': 'application/json'
      }
    },
    {
      name: "2️⃣ Solo X-API-Key",
      headers: {
        'X-API-Key': credentials.apiKey,
        'Accept': 'application/json'
      }
    },
    {
      name: "3️⃣ Solo Authorization Bearer con token",
      headers: {
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    },
    {
      name: "4️⃣ Entrambi X-API-Key e Authorization Bearer",
      headers: {
        'X-API-Key': credentials.apiKey,
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    },
    {
      name: "5️⃣ API Key come Bearer",
      headers: {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Accept': 'application/json'
      }
    },
    {
      name: "6️⃣ Token senza Bearer prefix",
      headers: {
        'Authorization': credentials.token,
        'Accept': 'application/json'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n${testCase.name}...`);
    try {
      const url = testCase.url || baseUrl;
      const response = await fetch(url, {
        method: 'GET',
        headers: testCase.headers
      });
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.status === 200) {
        console.log('   🎉 SUCCESSO! Autenticazione funzionante!');
        if (response.headers.get('content-type')?.includes('application/json')) {
          const result = await response.json();
          console.log('   Risposta:', JSON.stringify(result, null, 2));
        } else {
          const text = await response.text();
          console.log('   Risposta (text):', text.substring(0, 300));
        }
      } else if (response.status !== 401) {
        console.log('   🔍 Risposta interessante (non 401)');
        if (response.headers.get('content-type')?.includes('application/json')) {
          const result = await response.json();
          console.log('   Risposta:', JSON.stringify(result, null, 2));
        } else {
          const text = await response.text();
          console.log('   Risposta (text):', text.substring(0, 200));
        }
      } else {
        console.log('   ❌ Ancora 401 Unauthorized');
      }
    } catch (error) {
      console.log('   ❌ Errore:', (error as Error).message);
    }
  }

  // Test specifico per endpoint ricerca nazionale
  console.log('\n🏠 Test endpoint ricerca nazionale...');
  try {
    const searchUrl = `${baseUrl}/richiesta/ricerca_nazionale/`;
    const response = await fetch(searchUrl, {
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
    } else {
      const text = await response.text();
      console.log('   Risposta (text):', text.substring(0, 200));
    }
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }
}

testProductionAuth()
  .then(() => console.log('\n✅ Test autenticazione produzione completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 