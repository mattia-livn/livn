# Livn - Calcolo IMU AI-First

Servizio online intelligente per il calcolo dell'IMU in Italia, che utilizza l'intelligenza artificiale per analizzare automaticamente i documenti catastali e calcolare l'importo dovuto.

## 🎯 Funzionalità

- **Upload Documenti**: Carica visure catastali, contratti, atti di compravendita in formato PDF
- **Analisi AI**: Estrazione automatica delle informazioni catastali dai documenti
- **Dialogo Interattivo**: Completamento guidato dei dati mancanti
- **Calcolo Preciso**: Calcolo IMU basato sulle aliquote comunali 2025
- **Report Dettagliato**: Riepilogo completo con dettagli per ogni immobile

## 🏗️ Architettura

### Frontend
- **Next.js 14** con App Router
- **React 18** con TypeScript
- **Tailwind CSS** per lo styling
- **Lucide React** per le icone

### Backend
- **Supabase** per storage e database
- **Vercel** per deployment e API routes
- **OpenAI/OpenRouter** per analisi AI dei documenti

### Storage
- **Bucket `uploads`**: Documenti caricati dagli utenti
- **Bucket `imu`**: Delibere comunali in `statements/2025/`
  - Formato nome file: `{NomeComune}_{SiglaProvincia}_{CodiceComune}.pdf`
  - Esempio: `Milano_MI_F205.pdf`

## 🚀 Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/your-username/livn-imu-calculator.git
   cd livn-imu-calculator
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp env.example .env.local
   ```
   
   Modifica `.env.local` con i tuoi valori:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Configura Supabase**
   
   Crea i bucket necessari:
   ```sql
   -- Bucket per documenti utenti
   INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false);
   
   -- Bucket per delibere comunali
   INSERT INTO storage.buckets (id, name, public) VALUES ('imu', 'imu', true);
   ```

5. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

## 📁 Struttura del Progetto

```
livn-imu-calculator/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── upload/        # Upload documenti
│   │   ├── analyze/       # Analisi AI
│   │   └── calculate/     # Calcolo IMU
│   ├── globals.css        # Stili globali
│   ├── layout.tsx         # Layout principale
│   └── page.tsx           # Homepage
├── components/            # Componenti React
│   ├── DocumentUpload.tsx # Upload documenti
│   ├── PropertyAnalysis.tsx # Analisi proprietà
│   └── IMUCalculation.tsx # Calcolo IMU
├── lib/                   # Utilities e servizi
│   ├── supabase.ts        # Client Supabase
│   ├── pdf-analyzer.ts    # Analisi PDF
│   └── imu-calculator.ts  # Logica calcolo IMU
├── types/                 # Tipi TypeScript
│   └── property.ts        # Tipi per proprietà
└── README.md
```

## 🔧 Configurazione Supabase

### 1. Bucket Storage

Crea i seguenti bucket in Supabase:

- **uploads** (privato): Per i documenti caricati dagli utenti
- **imu** (pubblico): Per le delibere comunali

### 2. Politiche di Sicurezza

```sql
-- Policy per upload documenti (solo utenti autenticati)
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy per lettura delibere (pubblico)
CREATE POLICY "Public can read IMU statements" ON storage.objects
FOR SELECT USING (bucket_id = 'imu');
```

### 3. Struttura Delibere

Le delibere comunali devono essere caricate nel bucket `imu` con questa struttura:

```
imu/
└── statements/
    └── 2025/
        ├── Milano_MI_F205.pdf
        ├── Roma_RM_H501.pdf
        ├── Napoli_NA_F839.pdf
        └── ...
```

## 🤖 Integrazione AI

### OpenAI
Per l'analisi dei documenti PDF, il sistema può utilizzare OpenAI GPT-4:

```typescript
// Esempio di prompt per l'analisi
const prompt = `
Analizza questo documento catastale e estrai:
- Comune e provincia
- Categoria catastale
- Rendita catastale
- Foglio, particella, subalterno
- Superficie e vani (se disponibili)

Documento: ${pdfText}
`;
```

### OpenRouter
Alternativa a OpenAI per accedere a diversi modelli:

```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'anthropic/claude-3-sonnet',
    messages: [{ role: 'user', content: prompt }]
  })
});
```

## 📊 Calcolo IMU

Il sistema calcola l'IMU seguendo la normativa italiana:

1. **Rivalutazione**: Rendita catastale × 1.05 (5%)
2. **Base imponibile**: Rendita rivalutata × moltiplicatore (160 per cat. A)
3. **Importo lordo**: Base imponibile × aliquota comunale
4. **Detrazioni**: Sottrazione detrazioni (€200 per abitazione principale)
5. **Quota possesso**: Applicazione della quota di possesso

### Aliquote Standard
- **Abitazione principale**: 0.4% - 0.6%
- **Altre abitazioni**: 0.76% - 1.06%
- **Immobili locati**: Stessa aliquota delle altre abitazioni

## 🎨 Interfaccia Utente

L'interfaccia è progettata per essere intuitiva e guidare l'utente attraverso 3 step:

1. **Carica Documenti**: Drag & drop per PDF
2. **Verifica Dati**: Completamento informazioni mancanti
3. **Risultato**: Calcolo dettagliato con possibilità di download

### Componenti Principali

- **DocumentUpload**: Gestisce l'upload con preview
- **PropertyAnalysis**: Mostra proprietà estratte e raccoglie dati mancanti
- **IMUCalculation**: Visualizza il calcolo finale con dettagli

## 🚀 Deployment

### Vercel (Raccomandato)

1. Connetti il repository a Vercel
2. Configura le variabili d'ambiente
3. Deploy automatico ad ogni push

### Altre Piattaforme

Il progetto è compatibile con qualsiasi piattaforma che supporta Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🧪 Testing

```bash
# Test di sviluppo
npm run dev

# Build di produzione
npm run build

# Avvia build di produzione
npm start
```

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Per favore:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📞 Supporto

Per supporto o domande:
- Apri una issue su GitHub
- Email: support@livn.it

## ⚠️ Note Legali

Questo strumento fornisce calcoli indicativi basati sulle informazioni disponibili. Per calcoli ufficiali e consulenza fiscale, consultare sempre un commercialista qualificato.

---

Sviluppato con ❤️ per semplificare il calcolo dell'IMU in Italia.