# Sistema Intelligente di Domande IMU 2025

## Panoramica

Questo sistema genera automaticamente domande mirate per classificare correttamente ogni immobile nelle casistiche IMU specifiche del comune. Attualmente supporta **Torino 2025**.

## Come Funziona

### 1. Input: Dati dalla Visura Catastale
```typescript
interface RawProperty {
  id: string;
  type: 'fabbricato' | 'terreno';
  category?: string; // A/1, D/3, etc.
  address: string;
  owners: string[];
}
```

### 2. Output: Domande Intelligenti Raggruppate
```typescript
interface QuestionGroup {
  title: string;
  description: string;
  questions: Question[];
  applicableRates: string[]; // Aliquote che potrebbero applicarsi
}
```

### 3. Utilizzo Base
```typescript
import { TorinIMUQuestionGenerator } from './questionGenerator';

const generator = new TorinIMUQuestionGenerator();
const questionGroups = generator.generateQuestions(immobile);
```

## Gruppi di Domande

### 🏠 **Informazioni di Base**
- **Abitazione principale**: Solo per fabbricati residenziali
- **Pertinenze**: Per categorie C/2, C/6, C/7 
- **Edificabilità**: Per terreni

### 👤 **Informazioni sul Proprietario**  
- **Anziani/Disabili**: Per agevolazioni specifiche
- **Imprenditori Agricoli**: Per fabbricati rurali

### 🏢 **Informazioni sull'Uso**
- **Uso agricolo**: Per fabbricati rurali
- **Attività economiche**: Codici ATECO specifici
- **Startup innovative**: Con limite 24 mesi

### 📋 **Informazioni Contrattuali**
- **Locazioni agevolate**: Canone concordato, studenti, transitorio
- **Enti per migranti**: Agevolazioni specifiche

## Esempi Pratici

### Appartamento A/2
```
🏠 IMMOBILE: prop_001
   Tipo: fabbricato
   Categoria: A/2
   
📋 GRUPPO 1: Informazioni di base
   ❓ Questo immobile è indicato come abitazione principale?
   
📋 GRUPPO 2: Informazioni contrattuali  
   ❓ L'immobile è dato in locazione?
   ❓ Che tipo di contratto di locazione è?
```

### Fabbricato D/1 (Industriale)
```
🏠 IMMOBILE: prop_002
   Tipo: fabbricato  
   Categoria: D/1
   
📋 GRUPPO 1: Informazioni sull'uso
   ❓ Nell'immobile viene svolta un'attività economica?
   ❓ Qual è il codice ATECO dell'attività svolta?
   ❓ Da quanti mesi è attiva la startup? (se ATECO 72.1)
```

### Terreno
```
🏠 IMMOBILE: prop_003
   Tipo: terreno
   
📋 GRUPPO 1: Informazioni di base
   ❓ Questo terreno è considerato edificabile?
   
📋 GRUPPO 2: Informazioni sull'uso  
   ❓ Questo immobile è utilizzato per attività agricola?
```

## Intelligenza del Sistema

### ✨ **Domande Condizionali**
- Le domande appaiono solo se necessarie
- Dipendenze logiche tra domande (`dependsOn`)
- Filtri basati su categoria catastale

### 🎯 **Granularità Perfetta**
- Ogni domanda ha una **ragione specifica**
- Riferimenti diretti alle **aliquote applicabili**
- **Zero ridondanza**: solo domande necessarie

### 🔍 **Analisi Intelligente**
- Analizza le condizioni del regolamento comunale
- Identifica automaticamente le aliquote potenziali
- Genera domande mirate per disambiguare

## Aliquote Supportate (Torino 2025)

| Categoria | Aliquota | Casistiche |
|-----------|----------|------------|
| Abitazione principale A/1,A/8,A/9 | 0.6‰ | + pertinenze C/2,C/6,C/7 |
| Anziani/disabili | 0.6‰ | Assimilazione ab. principale |
| Fabbricati rurali | 0.1‰ | Uso agricolo + coltivatore diretto |
| Fabbricati gruppo D | 10.6‰ | Escluso D/10 |
| Terreni agricoli | 10.6‰ | Uso effettivo agricolo |
| Aree edificabili | 9.6‰ | Da PRG o catasto |
| Altri fabbricati | 10.6‰ | Default |
| Cinema D/3 | 9.6‰ | ATECO 59.14.00 |
| Startup D/1,D/7 | 8.6‰ | ATECO 72.1, <24 mesi |
| Startup A/10,C/2,C/3 | 8.6‰ | ATECO 72.1, <24 mesi |
| Accoglienza migranti | 8.6‰ | Enti specializzati |
| Canone concordato | 5.75‰ | Art. 2 L.431/1998 |
| Studenti | 5.75‰ | Art. 5 L.431/1998 |
| Contratti transitori | 5.75‰ | Art. 5 L.431/1998 |

## Estensibilità

Per aggiungere altri comuni:
1. Creare file `{comune}{CODICE}{anno}.ts` 
2. Implementare interfacce `ImuRateEntry` e `ImuRateCondition`
3. Estendere il generatore per il nuovo comune

## Vantaggi

✅ **Automazione completa**: Da visura a domande mirate  
✅ **Zero errori**: Basato su regolamenti ufficiali  
✅ **Efficienza**: Solo domande necessarie  
✅ **Trasparenza**: Ogni domanda spiega il perché  
✅ **Scalabilità**: Facilmente estendibile ad altri comuni  

---

*Sistema sviluppato per garantire la corretta classificazione IMU 2025* 