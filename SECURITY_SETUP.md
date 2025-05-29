# ⚠️ CONFIGURAZIONE SICURA CREDENZIALI

## Passo 1: Rigenerare le Credenziali (IMPORTANTE!)

Dato che le credenziali sono state condivise, è necessario rigenerarle:

1. Vai su [console.openapi.com](https://console.openapi.com)
2. Accedi al tuo account
3. Vai in "API Keys" o "Credenziali"
4. **Rigenera** entrambe le chiavi per sicurezza
5. Annota le nuove credenziali in modo sicuro

## Passo 2: Identificare la Chiave Corretta

Hai ricevuto due token:
- **API Key generale**: Per l'accesso base alle API
- **Token Catasto**: Specifico per il servizio catasto

### Verifica quale usare:
1. Controlla la documentazione OpenAPI
2. Nel nostro sistema, configureremo `OPENAPI_KEY`
3. Se hai dubbi, prova prima con l'API Key generale

## Passo 3: Configurazione .env.local

Crea/modifica il file `.env.local` nella root del progetto:

```bash
# OpenAPI Configuration
OPENAPI_BASE_URL=https://api.openapi.it
OPENAPI_KEY=la_tua_nuova_api_key_qui

# Se serve anche il token specifico catasto:
OPENAPI_CATASTO_TOKEN=il_tuo_nuovo_token_catasto_qui

# Altre configurazioni esistenti...
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
```

## Passo 4: Test delle Credenziali

Dopo aver configurato:

```bash
npm run test:openapi
```

## Passo 5: Sicurezza per il Futuro

### ✅ Buone Pratiche:
- Non condividere mai le credenziali in chat/email
- Usa variabili d'ambiente per produzione
- Rigenera periodicamente le chiavi
- Monitora l'utilizzo delle API

### ❌ Da Evitare:
- Hardcode delle credenziali nel codice
- Commit di file .env nel repository
- Condivisione di credenziali in messaggi

## Note Specifiche OpenAPI

Se il servizio ha due tipi di token, potremmo dover modificare la nostra implementazione per usare quello specifico del catasto. Testa prima con l'API key generale.

## Troubleshooting

Se ottieni errori di autenticazione:
1. Verifica che la chiave sia stata copiata correttamente
2. Controlla se serve il token specifico catasto
3. Verifica che il piano sia attivo
4. Controlla i log per errori specifici 