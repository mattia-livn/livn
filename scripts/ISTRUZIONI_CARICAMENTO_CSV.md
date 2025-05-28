# 📋 Istruzioni per Caricare la Tabella Comuni su Supabase

## 🎯 Obiettivo
Caricare i dati dei comuni italiani con i loro codici catastali per permettere il calcolo IMU.

## 📝 Passaggi

### 1. **Crea la Tabella**
Vai su **Supabase Dashboard** → **SQL Editor** ed esegui:

```sql
CREATE TABLE comuni (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  provincia VARCHAR(2) NOT NULL,
  codice_comune VARCHAR(4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(nome, provincia)
);

-- Indici per performance
CREATE INDEX idx_comuni_nome ON comuni(nome);
CREATE INDEX idx_comuni_codice ON comuni(codice_comune);
```

### 2. **Carica i Dati CSV**
1. Vai su **Supabase Dashboard** → **Table Editor**
2. Seleziona la tabella `comuni`
3. Clicca su **"Insert"** → **"Import data from CSV"**
4. Carica il file `scripts/comuni-data.csv`
5. Assicurati che le colonne siano mappate correttamente:
   - `nome` → `nome`
   - `provincia` → `provincia` 
   - `codice_comune` → `codice_comune`

### 3. **Verifica il Caricamento**
Esegui questa query per verificare:

```sql
SELECT COUNT(*) as totale_comuni FROM comuni;
SELECT * FROM comuni WHERE nome = 'ALESSANDRIA';
```

Dovresti vedere:
- **Totale comuni**: 50
- **Alessandria**: `nome: ALESSANDRIA, provincia: AL, codice_comune: A182`

## ✅ **Test Funzionamento**
Dopo il caricamento, testa il calcolo IMU:
1. Carica la visura di Alessandria
2. Il sistema dovrebbe trovare automaticamente il codice A182
3. Il calcolo IMU dovrebbe funzionare senza errori

## 📊 **Dati Inclusi**
Il CSV contiene **50 comuni principali** italiani con:
- **Nome comune** (es: ALESSANDRIA)
- **Provincia** (es: AL)
- **Codice catastale** (es: A182)

## 🔧 **Aggiungere Altri Comuni**
Per aggiungere nuovi comuni:
1. Trova il codice catastale su [Agenzia delle Entrate](https://www.agenziaentrate.gov.it/)
2. Aggiungi una riga al CSV o inserisci direttamente su Supabase:

```sql
INSERT INTO comuni (nome, provincia, codice_comune) 
VALUES ('NUOVO_COMUNE', 'XX', 'XXXX');
```

## 🚨 **Note Importanti**
- I nomi comuni devono essere in **MAIUSCOLO**
- Le province sono codici a **2 lettere** (es: AL, MI, RM)
- I codici catastali sono **4 caratteri** alfanumerici
- La combinazione `nome + provincia` deve essere **unica** 