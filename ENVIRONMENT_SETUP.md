# Configurazione Variabili d'Ambiente

## OpenAPI per Ricerca Catastale

Per utilizzare la funzionalità di ricerca catastale tramite codice fiscale, è necessario configurare l'integrazione con OpenAPI.

### Variabili Richieste

Aggiungi le seguenti variabili al tuo file `.env.local`:

```bash
# OpenAPI Configuration
OPENAPI_BASE_URL=https://catasto.openapi.it
OPENAPI_CATASTO_TOKEN=your_catasto_token_here
```

### Come Ottenere le Credenziali OpenAPI

1. **Registrazione**: Vai su [console.openapi.com](https://console.openapi.com)
2. **Account**: Crea un account o accedi se ne hai già uno
3. **Sottoscrizione**: Scegli un piano per l'API Catasto:
   - **Pay per Use**: €0,30 per richiesta
   - **Abbonamenti**: Prezzi ridotti per volumi elevati
4. **API Key**: Ottieni la tua chiave API dall'area riservata
5. **Token Catasto**: Ottieni il token specifico per il servizio catasto

### ⚠️ IMPORTANTE - Configurazione Corretta

**Abbiamo scoperto che:**
- ✅ URL base: `https://catasto.openapi.it`
- ✅ Token: Usa il **token catasto specifico** (non l'API key generale)
- ✅ Parametro: `cf_piva` (non `codice_fiscale`)
- ✅ Autenticazione: `Bearer token`

### Costi Stimati

- **Ricerca nazionale**: €0,30 per codice fiscale
- **Ricerca provinciale**: €0,30 per provincia
- **Visura catastale**: €0,99-1,90 per documento

### Limiti di Rate

- **Richieste giornaliere**: 40-2000 a seconda del piano
- **Richieste simultanee**: Variabile per piano

### Test dell'Integrazione

Una volta configurate le variabili, puoi testare l'integrazione:

1. Avvia il server di sviluppo: `npm run dev`
2. Vai alla sezione "Ricerca per Codice Fiscale"
3. Inserisci un codice fiscale di test
4. Verifica che la ricerca funzioni correttamente

### Note Importanti

- **Sicurezza**: Non condividere mai la tua API key
- **Ambiente di produzione**: Usa variabili d'ambiente sicure in produzione
- **Monitoraggio**: Controlla l'utilizzo per evitare costi inaspettati
- **Backup**: Considera sempre un sistema di fallback

### Esempio di Configurazione Completa

```bash
# OpenAPI per ricerca catastale
OPENAPI_BASE_URL=https://api.openapi.it
OPENAPI_KEY=sk-1234567890abcdef...

# Supabase (esistente)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (esistente)  
OPENAI_API_KEY=your_openai_key
```

### Troubleshooting

**Errore: "Unauthorized"**
- Verifica che l'API key sia corretta
- Controlla che il piano sia attivo

**Errore: "Rate limit exceeded"**  
- Hai superato il limite giornaliero
- Considera l'upgrade del piano

**Errore: "Timeout"**
- Le API di OpenAPI sono asincrone, potrebbe servire più tempo
- Il sistema implementa automaticamente i retry 