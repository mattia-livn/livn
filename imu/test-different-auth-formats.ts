import * as fs from 'fs';
import * as path from 'path';

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

async function testDifferentAuthFormats() {
  console.log('🔑 TEST FORMATI AUTENTICAZIONE DIVERSI');
  console.log('=' .repeat(50));
  
  const credentials = loadCredentials();
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log(`\n📊 Credenziali dal pannello OpenAPI:
   URL: ${baseUrl}
   API Key: ${credentials.apiKey}
   Token: ${credentials.token} (valido fino al 29/06/2025)`);
  
  const testCases: Array<{name: string, headers: Record<string, string>, url?: string}> = [
    {
      name: "1️⃣ Header: Authorization: token",
      headers: {
        'Authorization': credentials.token,
        'Accept': 'application/json'
      }
    },
    {
      name: "2️⃣ Header: X-API-Key solo",
      headers: {
        'X-API-Key': credentials.apiKey,
        'Accept': 'application/json'
      }
    },
    {
      name: "3️⃣ Header: token come query param",
      headers: {
        'Accept': 'application/json'
      },
      url: `${baseUrl}/?token=${credentials.token}`
    },
    {
      name: "4️⃣ Header: API-Key nel formato diverso",
      headers: {
        'API-Key': credentials.apiKey,
        'Accept': 'application/json'
      }
    },
    {
      name: "5️⃣ Header: Token nel formato diverso",
      headers: {
        'Token': credentials.token,
        'Accept': 'application/json'
      }
    },
    {
      name: "6️⃣ Header: Authorization Basic con API Key e Token",
      headers: {
        'Authorization': `Basic ${Buffer.from(`${credentials.apiKey}:${credentials.token}`).toString('base64')}`,
        'Accept': 'application/json'
      }
    },
    {
      name: "7️⃣ Header: Entrambi come li avevamo prima",
      headers: {
        'X-API-Key': credentials.apiKey,
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    },
    {
      name: "8️⃣ Header: API Key come Bearer",
      headers: {
        'Authorization': `Bearer ${credentials.apiKey}`,
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
      
      if (response.status !== 401) {
        // Se non è 401, proviamo a leggere la risposta
        if (response.headers.get('content-type')?.includes('application/json')) {
          const result = await response.json();
          console.log('   🎉 Risposta diversa da 401!');
          console.log('   Risposta:', JSON.stringify(result, null, 2));
        } else {
          const text = await response.text();
          console.log('   🎉 Risposta non-JSON:', text.substring(0, 200));
        }
      } else {
        console.log('   ❌ Ancora 401');
      }
    } catch (error) {
      console.log('   ❌ Errore:', (error as Error).message);
    }
  }

  // Test speciale: controlliamo se l'endpoint root risponde senza auth
  console.log('\n🌐 Test endpoint senza autenticazione...');
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
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
}

testDifferentAuthFormats()
  .then(() => console.log('\n✅ Test formati auth completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 