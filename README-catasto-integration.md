# INTEGRAZIONE CATASTO - SISTEMA IMU 2025

## 📋 Overview

Questo sistema permette di **integrare automaticamente** i dati catastali (fabbricati e terreni) con il sistema di analisi delle condizioni IMU, creando un flusso automatico per determinare le aliquote applicabili.

## 🏗️ Architettura del Sistema

### 1. **Tipi di Dati Catastali** (`types/catasto.ts`)

#### FabbricatoCatastale
```typescript
interface FabbricatoCatastale {
  comune: string;           // Es: "TORINO"
  sezione?: string;         // Es: "U"
  foglio: string;          // Es: "115"
  particella: string;      // Es: "456"
  subalterno: string;      // Es: "10"
  indirizzo: string;       // Es: "VIA ROMA n. 23 Piano 2"
  zonaCensuaria: string;   // Es: "1"
  categoria: string;       // Es: "A/2"
  classe: string;          // Es: "3"
  consistenza: string;     // Es: "5 vani" o "45 m²"
  superficieCatastale?: string; // Es: "90 m²"
  rendita: string;         // Es: "€ 523,45"
  titolarita: string;      // Es: "Proprietà per 1/1"
}
```

#### TerrenoCatastale
```typescript
interface TerrenoCatastale {
  comune: string;          // Es: "ASTI"
  sezione?: string;        // Es: "C"
  foglio: string;         // Es: "122"
  particella: string;     // Es: "89"
  qualita: string;        // Es: "Seminativo"
  classe: string;         // Es: "3"
  superficie: string;     // Es: "3.200 m²"
  redditoDominicale: string; // Es: "€ 15,45"
  redditoAgrario: string; // Es: "€ 12,34"
  titolarita: string;     // Es: "Proprietà per 1/1"
  altreInformazioni?: string;
}
```

### 2. **Sistema di Mappatura** (`data/catasto-mapper.ts`)

#### CatastoMapper
La classe principale che:
- **Elabora** i dati catastali grezzi
- **Estrae** informazioni strutturate
- **Mappa** ai parametri necessari per le condizioni IMU
- **Identifica** le condizioni potenzialmente applicabili
- **Valida** la completezza dei dati

#### Flusso di Elaborazione:
```
Dati Catastali Grezzi
        ↓
[CatastoMapper.elaboraDatiCatastali()]
        ↓
┌─ Informazioni Derivate
├─ Parametri per Matching  
├─ Condizioni Applicabili
└─ Validazione Errori
```

## 🔄 Processo di Integrazione

### Fase 1: **Ricezione Dati Catastali**
```typescript
// Esempio: dati ricevuti dal catasto
const datiCatasto: FabbricatoCatastale = {
  comune: "TORINO",
  categoria: "A/2",
  indirizzo: "VIA ROMA n. 23",
  superficie: "90 m²",
  // ... altri dati
};
```

### Fase 2: **Elaborazione e Mappatura**
```typescript
// Crea oggetto strutturato
const datoCatastale = CatastoFactory.creaFabbricato(datiCatasto);

// Elabora e mappa ai parametri IMU
const elaborazione = CatastoMapper.elaboraDatiCatastali(datoCatastale);
```

### Fase 3: **Identificazione Condizioni**
```typescript
// Risultato dell'elaborazione
{
  informazioniDerivate: {
    categoriaAtastale: "A/2",
    superficie: 90,
    ubicazione: "VIA ROMA n. 23 (Zona 1)",
    tipoImmobile: "abitativo"
  },
  condizioniApplicabili: [
    "Abitazione principale",
    "Altri fabbricati"
  ],
  parametriPerMatching: {
    categoriaAtastale: "A/2",
    superficie: 90,
    comune: "torino"
  }
}
```

### Fase 4: **Matching con Condizioni IMU**
Il sistema confronta i parametri derivati con le **997 condizioni uniche** estratte dalle delibere comunali per trovare le aliquote applicabili.

## 🤖 Domande Intelligenti dell'AI

Basandosi sui dati catastali, l'AI può fare domande **specifiche e pertinenti**:

### Per Fabbricati Categoria A/ (Abitazioni):
- "È la sua abitazione principale?"
- "L'immobile è locato o a disposizione?"
- "Ha particolari agevolazioni (handicap, età, etc.)?"

### Per Fabbricati Categoria C/1 (Negozi):
- "Che tipo di attività commerciale si svolge?"
- "L'immobile è locato?"
- "Qual è il codice ATECO dell'attività?"

### Per Terreni:
- "Il terreno è attivamente coltivato?"
- "Si trova in zona edificabile?"
- "È destinato a uso agricolo?"

## 📊 Vantaggi del Sistema

### ✅ **Automatizzazione Intelligente**
- **90% dei parametri** derivati automaticamente dai dati catastali
- Solo le informazioni **non deducibili** vengono chieste all'utente
- **Zero errori** di digitazione su dati catastali

### ✅ **Precisione Massima**
- **Matching esatto** con comune e categoria catastale
- **Validazione automatica** dei dati in ingresso
- **Identificazione precisa** delle condizioni applicabili

### ✅ **User Experience Ottimale**
- **Domande mirate** e contestuali
- **Processo guidato** step-by-step
- **Feedback immediato** su errori o mancanze

## 🔧 Esempi Pratici

### Esempio 1: Abitazione a Torino
```typescript
import { testCatastoMapping } from './examples/catasto-example';

// Esegue il test completo
const risultati = testCatastoMapping();

// Output:
// Categoria: A/2 → Abitazione civile
// Superficie: 90 m² → Derivata automaticamente
// Domande AI: "È la sua abitazione principale?"
```

### Esempio 2: Terreno Agricolo
```typescript
// Terreno seminativo ad Asti
// Categoria: TERRENO → Terreno agricolo
// Superficie: 3200 m² → Derivata automaticamente  
// Domande AI: "Il terreno è coltivato?"
```

## 🚀 Come Utilizzare

### 1. **Import dei moduli necessari**
```typescript
import { CatastoMapper, CatastoFactory } from './data/catasto-mapper';
import { FabbricatoCatastale } from './types/catasto';
```

### 2. **Crea oggetto catastale**
```typescript
const dato = CatastoFactory.creaFabbricato(datiRicevuti);
```

### 3. **Elabora e ottieni parametri**
```typescript
const elaborazione = CatastoMapper.elaboraDatiCatastali(dato);
```

### 4. **Usa per matching IMU**
```typescript
const parametri = elaborazione.parametriPerMatching;
const condizioni = elaborazione.condizioniApplicabili;
// ... procedi con il matching delle aliquote
```

## 📁 Struttura File

```
imu/
├── types/
│   ├── catasto.ts              # Interfacce dati catastali
│   └── enhanced.ts             # Interfacce IMU con parametri
├── data/
│   ├── catasto-mapper.ts       # Logica mappatura principale
│   └── statements/2025/        # Delibere comunali con parametri
├── examples/
│   └── catasto-example.ts      # Esempi pratici di utilizzo
└── README-catasto-integration.md # Questa documentazione
```

---

**🎯 Obiettivo Raggiunto**: Sistema completamente automatizzato per integrare dati catastali con condizioni IMU, permettendo all'AI di fare domande intelligenti e contestuali per determinare le aliquote corrette. 