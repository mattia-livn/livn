This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🏛️ Sistema AI per Calcolo IMU

Applicazione AI-first per il calcolo automatico dell'IMU (Imposta Municipale Unica) utilizzando dati catastali e regole fiscali italiane.

## 🚀 Getting Started

### 1. Configurazione Variabili d'Ambiente

Prima di avviare l'applicazione, crea un file `.env` nella directory principale e configura le seguenti variabili:

```bash
# Chiavi per Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Chiavi per OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Chiavi per OpenAPI (catasto)
OPENAPI_TOKEN=your_openapi_token_here
OPENAPI_SANDBOX_TOKEN=your_openapi_sandbox_token_here
```

### 2. Installazione Dipendenze

```bash
npm install
```

### 3. Avvio Server di Sviluppo

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser per vedere l'applicazione.

## 📋 Funzionalità

- ✅ **Analisi Automatica**: Caricamento e analisi di dati catastali
- ✅ **Calcolo IMU Intelligente**: Utilizzo dell'AI per calcoli precisi
- ✅ **Regole Fiscali**: Gestione delle categorie catastali e coefficienti
- ✅ **Test Integrati**: Suite completa di test automatizzati
- ✅ **Interfaccia Web**: Dashboard semplice per test e calcoli

## 🔧 Architettura

```
/data/                    # Regole fiscali e dati di esempio
  ├── test_data.json      # Dati catastali di test
  ├── cadastral_categories.ts # Categorie e coefficienti
  └── imu_*.ts           # Formule di calcolo IMU

/lib/                     # Logica di business
  ├── imuCalculator.ts    # Motore principale di calcolo
  ├── supabaseClient.ts   # Connessione database
  └── test*.ts           # Suite di test

/app/                     # Interface web Next.js
  ├── api/test-imu/       # Endpoint API di test
  └── page.tsx           # Pagina principale
```

## 🧪 Test

Per testare il sistema:

1. Configura il file `.env` con le chiavi API
2. Avvia l'applicazione: `npm run dev`
3. Visita http://localhost:3000
4. Clicca "🚀 Avvia Test IMU"

## ⚠️ Sicurezza

- **IMPORTANTE**: Non committare mai il file `.env` nel repository
- Le chiavi API sono protette e verificate all'avvio
- Utilizza la sandbox di OpenAPI per i test in sviluppo

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
