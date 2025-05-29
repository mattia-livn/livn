# LIVN - Calcolo IMU

Piattaforma intelligente per il calcolo dell'IMU con due modalità di utilizzo:
- **Ricerca automatica tramite codice fiscale** (NUOVO!)
- **Analisi documenti catastali caricati**

## 🚀 Nuove Funzionalità

### Ricerca Catastale Automatica
- Inserisci solo il **codice fiscale**
- Recupera automaticamente **tutti gli immobili** dall'Agenzia delle Entrate
- Calcolo IMU **istantaneo** su tutti gli immobili trovati
- Dati sempre **aggiornati** in tempo reale

## 🏗️ Architettura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   OpenAPI.com    │    │  Agenzia delle  │
│                 │ ─► │   (Catasto API)  │ ─► │     Entrate     │
│ - React UI      │    │                  │    │                 │
│ - API Routes    │    │ - Ricerca CF     │    │ - Dati Ufficiali│
└─────────────────┘    │ - Dati Immobili  │    │ - Sempre Aggiornati│
                       └──────────────────┘    └─────────────────┘
          │
          ▼
┌─────────────────┐    ┌──────────────────┐
│    Supabase     │    │     OpenAI       │
│                 │    │                  │
│ - Database      │    │ - Analisi Docs   │
│ - Comuni        │    │ - Estrazione AI  │
└─────────────────┘    └──────────────────┘
```

## 📋 Funzionalità

### 🔍 Ricerca per Codice Fiscale
- **Input**: Solo codice fiscale
- **Output**: Lista completa degli immobili
- **Vantaggi**: Veloce, preciso, sempre aggiornato

### 📄 Upload Documenti
- **Input**: PDF di visure catastali
- **Output**: Analisi AI dei documenti
- **Vantaggi**: Flessibile per documenti specifici

### 🧮 Calcolo IMU
- Coefficienti aggiornati per categoria
- Aliquote comunali
- Detrazioni automatiche
- Export risultati

## 🛠️ Setup

### 1. Installazione
```bash
git clone https://github.com/your-repo/livn
cd livn
npm install
```

### 2. Configurazione Variabili d'Ambiente

Crea un file `.env.local`:

```bash
# OpenAPI per ricerca catastale
OPENAPI_BASE_URL=https://catasto.openapi.it
OPENAPI_CATASTO_TOKEN=your_catasto_token_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI per analisi documenti
OPENAI_API_KEY=your_openai_key
```

### 3. Setup Database
```bash
npm run setup-supabase
```

### 4. Avvia Development Server
```bash
npm run dev
```

## 🔑 Configurazione OpenAPI

### Ottenere l'API Key

1. **Registrazione**: [console.openapi.com](https://console.openapi.com)
2. **Piano**: Scegli tra pay-per-use o abbonamento
3. **API Key**: Ottieni la chiave dall'area riservata

### Costi
- **Ricerca base**: €0,30 per codice fiscale
- **Visure**: €0,99-1,90 per documento
- **Abbonamenti**: Prezzi ridotti per volumi elevati

### Test Integrazione
```bash
npm run test:openapi
```

## 🧪 Testing

### Test Completo
```bash
npm test
```

### Test Specifici
```bash
# Test integrazione OpenAPI
npm run test:openapi

# Test calcolo IMU
npm run test:imu

# Test upload documenti
npm run test:upload
```

## 📁 Struttura Progetto

```
livn/
├── app/
│   ├── api/
│   │   ├── search-cf/          # API ricerca codice fiscale
│   │   ├── analyze/            # API analisi documenti
│   │   └── calculate/          # API calcolo IMU
│   ├── page.tsx                # Homepage
│   └── layout.tsx
├── components/
│   ├── CadastralSearch.tsx     # Ricerca per CF
│   ├── DocumentUpload.tsx      # Upload documenti
│   └── IMUCalculation.tsx      # Calcolo IMU
├── lib/
│   ├── supabase.ts
│   └── imu-calculator.ts
├── scripts/
│   ├── test-openapi-integration.js
│   └── setup-supabase.js
└── types/
    └── property.ts
```

## 🚀 Deployment

### Vercel (Raccomandato)
1. Fai push su GitHub
2. Connetti repository a Vercel
3. Configura le variabili d'ambiente
4. Deploy automatico

### Variabili Produzione
```bash
OPENAPI_BASE_URL=https://api.openapi.it
OPENAPI_KEY=prod_key_here
NEXT_PUBLIC_SUPABASE_URL=prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_supabase_key
OPENAI_API_KEY=prod_openai_key
```

## 🔄 Workflow Utente

### Metodo 1: Ricerca Automatica
1. **Input**: Codice fiscale
2. **Ricerca**: Automatica via OpenAPI
3. **Risultati**: Lista immobili istantanea
4. **Calcolo**: IMU automatico per tutti

### Metodo 2: Upload Documenti
1. **Upload**: PDF visure catastali
2. **Analisi**: AI estrae dati
3. **Verifica**: Controllo manuale
4. **Calcolo**: IMU sui dati estratti

## 🤝 Contribuire

1. Fork del repository
2. Crea feature branch
3. Implementa modifiche
4. Testa le modifiche
5. Crea Pull Request

## 📞 Supporto

- **Email**: support@livn.com
- **Documentazione**: [docs.livn.com](https://docs.livn.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/livn/issues)

## 📄 Licenza

MIT License - vedi [LICENSE](LICENSE) per dettagli.

## 🏆 Ringraziamenti

- **OpenAPI.com** per l'accesso ai dati catastali
- **Agenzia delle Entrate** per i dati ufficiali
- **Community** per feedback e contributi

### 🔧 Integrazione OpenAPI (CONFIGURATA! ✅)

Abbiamo configurato l'integrazione con OpenAPI per la ricerca catastale:

- **URL Base**: `https://catasto.openapi.it` ✅
- **Token**: Token catasto specifico ✅
- **Parametro**: `cf_piva` (non `codice_fiscale`) ✅
- **Metodo**: `Bearer token` ✅