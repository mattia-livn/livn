import * as fs from 'fs';
import * as path from 'path';

function loadCredentials() {
  const envPath = path.join(__dirname, '.env.local');
  console.log('📁 Caricamento da:', envPath);
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📄 Contenuto file:', envContent.length, 'caratteri');
  
  const lines = envContent.split('\n');
  const env: Record<string, string> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        env[key.trim()] = value.trim();
        
        if (key.includes('OPENAPI')) {
          console.log(`🔑 ${key.trim()}: ${value.trim().substring(0, 20)}...`);
        }
      }
    }
  }
  
  const credentials = {
    baseUrl: env.OPENAPI_SANDBOX_URL,
    apiKey: env.OPENAPI_SANDBOX_KEY,
    token: env.OPENAPI_SANDBOX_TOKEN
  };
  
  console.log('\n📋 Credenziali caricate:');
  console.log(`   Base URL: ${credentials.baseUrl}`);
  console.log(`   API Key: ${credentials.apiKey?.substring(0, 20)}... (lunghezza: ${credentials.apiKey?.length})`);
  console.log(`   Token: ${credentials.token?.substring(0, 20)}... (lunghezza: ${credentials.token?.length})`);
  
  return credentials;
}

const creds = loadCredentials(); 