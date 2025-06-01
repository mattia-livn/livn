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

async function testAuthComponents() {
  console.log('🔐 TEST COMPONENTI AUTENTICAZIONE');
  console.log('=' .repeat(50));
  
  const credentials = loadCredentials();
  
  let baseUrl = credentials.baseUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log(`\n📊 Credenziali:
   URL: ${baseUrl}
   API Key: ${credentials.apiKey} (lunghezza: ${credentials.apiKey?.length})
   Token: ${credentials.token} (lunghezza: ${credentials.token?.length})`);
  
  // Test 1: Solo con API Key
  console.log('\n1️⃣ Test solo con X-API-Key...');
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'X-API-Key': credentials.apiKey,
        'Accept': 'application/json'
      }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    const result = await response.json();
    console.log('   Risposta:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 2: Solo con Bearer Token
  console.log('\n2️⃣ Test solo con Authorization Bearer...');
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    const result = await response.json();
    console.log('   Risposta:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 3: Con entrambi
  console.log('\n3️⃣ Test con entrambi X-API-Key e Authorization...');
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'X-API-Key': credentials.apiKey,
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    const result = await response.json();
    console.log('   Risposta:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  // Test 4: Test con endpoint diverso (senza trailing slash)
  console.log('\n4️⃣ Test endpoint /richiesta...');
  try {
    const response = await fetch(`${baseUrl}/richiesta`, {
      method: 'GET',
      headers: {
        'X-API-Key': credentials.apiKey,
        'Authorization': `Bearer ${credentials.token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    const result = await response.json();
    console.log('   Risposta:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('   ❌ Errore:', (error as Error).message);
  }

  console.log('\n🔍 ANALISI TOKEN:');
  if (credentials.token && credentials.token.length < 50) {
    console.log('   ⚠️  Token sembra troppo corto per essere valido');
    console.log('   ⚠️  Token standard sono solitamente >50 caratteri');
  }
  
  if (credentials.token && credentials.token.endsWith('%')) {
    console.log('   ⚠️  Token termina con %, potrebbe essere URL-encoded');
  }
}

testAuthComponents()
  .then(() => console.log('\n✅ Test componenti auth completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 