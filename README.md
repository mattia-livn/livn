# 🏛️ Sistema AI per Calcolo IMU 2025

Applicazione AI-first per il calcolo automatico dell'IMU (Imposta Municipale Unica) utilizzando dati catastali e regole fiscali italiane.

## 🚀 Getting Started

### 1. Configurazione Variabili d'Ambiente

Prima di avviare l'applicazione, crea un file `.env.local` nella directory principale e configura le seguenti variabili:

```bash
# Chiavi per OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Chiavi per OpenAPI (catasto)
OPENAPI_PRODUCTION_KEY=your_openapi_production_key_here
OPENAPI_PRODUCTION_TOKEN=your_openapi_production_token_here
OPENAPI_PRODUCTION_URL=https://api.openapi.com

# Per testing (opzionale)
OPENAPI_SANDBOX_KEY=your_openapi_sandbox_key_here
OPENAPI_SANDBOX_TOKEN=your_openapi_sandbox_token_here
OPENAPI_SANDBOX_URL=https://api.sandbox.openapi.com
```

### 2. Installazione Dipendenze

```bash
npm install
```

### 3. Avvio Server Chat IMU

```bash
npm start
# oppure
npx tsx server-chat-api.ts
```

Il server sarà disponibile su:
- 💬 **Interfaccia web**: http://localhost:3000
- 🔍 **Health check**: http://localhost:3000/api/health
- 📄 **Template CSV**: http://localhost:3000/api/template/csv

### 4. Avvio Interfaccia Next.js (opzionale)

```bash
npm run dev
```

## 📋 Funzionalità Principali

- ✅ **Upload Documenti**: Caricamento di visure catastali (PDF, TXT, CSV)
- ✅ **Estrazione AI**: Analisi automatica con OpenAI GPT-4
- ✅ **Calcolo IMU**: Calcolo automatico dell'IMU 2025
- ✅ **Chat Interattiva**: Interfaccia conversazionale per domande
- ✅ **Integrazione Catasto**: Connessione diretta con OpenAPI catasto
- ✅ **Analisi Avanzata**: Pattern matching e validazione dati

## 🔧 Architettura

```
/services/                # Servizi principali
  ├── chat-imu-service.ts      # Servizio chat IMU
  ├── ai-extraction-service.ts # Estrazione AI da documenti
  ├── upload-service-ai.ts     # Upload e processamento file
  ├── catasto-service.ts       # Integrazione OpenAPI catasto
  └── advanced-data-analyzer.ts # Analisi avanzata dati

/web/                     # Interfaccia web
  └── chat-imu.html       # Interfaccia chat principale

/app/                     # Next.js (opzionale)
  ├── api/                # Endpoint API
  └── page.tsx           # Pagina principale

/data/                    # Dati e regole fiscali
  ├── cadastral_categories.ts # Categorie catastali
  ├── imu_*.ts           # Regole calcolo IMU
  └── statements/        # Delibere comunali

/types/                   # Definizioni TypeScript
/examples/               # Esempi di utilizzo
/scripts/                # Script di utilità
```

## 🧪 Test e Utilizzo

### Test Chat IMU
```bash
npx tsx test-chat-imu.ts
```

### Test Upload Documenti
```bash
npx tsx test-upload-service.ts
```

### Test Integrazione Catasto
```bash
npx tsx test-catasto-service.ts
```

### Demo Completa
```bash
npx tsx examples/catasto-api-example.ts
```

## 📄 Formati Supportati

- **PDF**: Visure catastali, documenti scansionati
- **TXT**: File di testo con dati catastali
- **CSV**: Fogli di calcolo con immobili
- **Immagini**: JPG, PNG (con OCR)

## ⚠️ Sicurezza

- **IMPORTANTE**: Non committare mai il file `.env.local` nel repository
- Le chiavi API sono protette e verificate all'avvio
- Utilizza la sandbox di OpenAPI per i test in sviluppo
- I file caricati sono temporanei e vengono eliminati automaticamente

## 🔗 Integrazioni

- **OpenAI GPT-4**: Per l'estrazione intelligente dei dati
- **OpenAPI Catasto**: Per l'accesso diretto ai dati catastali italiani
- **Tesseract.js**: Per il riconoscimento ottico dei caratteri (OCR)
- **PDF-Parse**: Per l'estrazione di testo da PDF

## 📚 Documentazione Aggiuntiva

- [README-upload-visure.md](README-upload-visure.md) - Guida upload documenti
- [README-catasto-integration.md](README-catasto-integration.md) - Integrazione catasto
- [informazioni_necessarie_imu_2025.md](informazioni_necessarie_imu_2025.md) - Regole IMU 2025

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Strutturare File con Informazioni o Regole

Per mantenere le informazioni e le regole sempre accessibili, puoi creare file Markdown (.md) nella directory principale del progetto. Questi file possono contenere dettagli come categorie di immobili, formule di calcolo dell'IMU, e altre nozioni utili. Assicurati di mantenere una struttura chiara e di aggiornare i file quando necessario.
