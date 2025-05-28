# 🚀 Setup Livn - Calcolo IMU

Guida completa per configurare e avviare il progetto Livn per il calcolo dell'IMU.

## ✅ Stato Attuale

Il progetto è **completamente funzionante** con:
- ✅ Frontend Next.js 14 con interfaccia a 3 step
- ✅ Componenti React per upload, analisi e calcolo
- ✅ API routes per tutte le funzionalità
- ✅ Logica di calcolo IMU completa
- ✅ Build di produzione funzionante

## 🔧 Configurazione Necessaria

### 1. Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI Configuration (per l'analisi AI dei documenti)
OPENAI_API_KEY=your_openai_api_key_here

# OpenRouter Configuration (alternativa a OpenAI)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Environment
NODE_ENV=development
```

### 2. Setup Supabase

1. **Crea un progetto Supabase** su [supabase.com](https://supabase.com)

2. **Crea i bucket di storage:**
   ```sql
   -- Bucket per documenti utenti (privato)
   INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false);
   
   -- Bucket per delibere comunali (pubblico)
   INSERT INTO storage.buckets (id, name, public) VALUES ('imu', 'imu', true);
   ```

3. **Configura le policy di sicurezza:**
   ```sql
   -- Policy per upload documenti
   CREATE POLICY "Users can upload documents" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'uploads');
   
   -- Policy per lettura delibere
   CREATE POLICY "Public can read IMU statements" ON storage.objects
   FOR SELECT USING (bucket_id = 'imu');
   ```

### 3. Setup OpenAI (Opzionale)

Per l'analisi automatica dei documenti PDF:
1. Crea un account su [OpenAI](https://platform.openai.com)
2. Genera una API key
3. Aggiungi la chiave al file `.env.local`

## 🚀 Avvio del Progetto

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri http://localhost:3000
```

## 📋 Come Usare l'Applicazione

### Step 1: Carica Documenti
- Trascina i file PDF (visure catastali, atti, contratti)
- Supporta upload multipli
- Anteprima dei file caricati

### Step 2: Analisi Immobili
- L'AI estrae automaticamente i dati catastali
- Completa le informazioni mancanti
- Specifica se è abitazione principale o locata

### Step 3: Calcolo IMU
- Calcolo automatico basato sulle aliquote comunali 2025
- Dettaglio per ogni immobile
- Totale complessivo da pagare

## 🔧 Funzionalità Implementate

### Frontend
- ✅ Interfaccia utente moderna con Tailwind CSS
- ✅ Upload drag & drop per documenti PDF
- ✅ Wizard a 3 step con progress bar
- ✅ Form dinamici per completamento dati
- ✅ Visualizzazione risultati dettagliata

### Backend
- ✅ API `/api/upload` - Upload documenti su Supabase
- ✅ API `/api/analyze` - Analisi AI dei documenti
- ✅ API `/api/calculate` - Calcolo IMU preciso
- ✅ Integrazione Supabase per storage
- ✅ Supporto OpenAI/OpenRouter per AI

### Calcolo IMU
- ✅ Rivalutazione rendita catastale (+5%)
- ✅ Moltiplicatori per categoria catastale
- ✅ Aliquote comunali differenziate
- ✅ Detrazioni per abitazione principale
- ✅ Gestione quote di possesso

## 🎯 Prossimi Miglioramenti

### Priorità Alta
1. **Database delibere comunali** - Caricare le delibere reali 2025
2. **Validazione documenti** - Controllo formato e contenuto PDF
3. **Gestione errori** - Feedback utente migliorato

### Priorità Media
1. **Autenticazione utenti** - Login e storico calcoli
2. **Export PDF** - Generazione report stampabili
3. **Notifiche email** - Invio risultati via email

### Priorità Bassa
1. **Dashboard admin** - Gestione delibere comunali
2. **API pubbliche** - Integrazione con altri servizi
3. **App mobile** - Versione React Native

## 🐛 Risoluzione Problemi

### Build Errors
Se il build fallisce:
```bash
npm run build
```
Tutti gli errori di linting sono stati risolti.

### Variabili d'Ambiente
Il progetto usa valori di fallback per il build, ma per funzionare correttamente in produzione servono le vere chiavi API.

### Supabase Connection
Verifica che:
- Le URL Supabase siano corrette
- I bucket esistano
- Le policy siano configurate

## 📞 Supporto

Per problemi o domande:
1. Controlla i log del browser (F12)
2. Verifica le variabili d'ambiente
3. Controlla la connessione Supabase
4. Testa le API singolarmente

---

**Il progetto è pronto per essere utilizzato!** 🎉

Configura le variabili d'ambiente e inizia a calcolare l'IMU in modo intelligente. 