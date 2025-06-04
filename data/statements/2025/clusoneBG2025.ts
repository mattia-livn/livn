// clusoneBG2025.ts
// Migrato automaticamente dal formato legacy

export interface ImuRateCondition {
  description: string;
  predicate: string;
}

export interface ImuRateEntry {
  label: string;
  ratePercent: number;
  categoryTypes?: string[];
  officialDescription: string;
  conditions: ImuRateCondition[];
}

export const imuRatesClusoneBG2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.0006,
    "categoryTypes": [
      "A/1",
      "A/8",
      "A/9"
    ],
    "officialDescription": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/8 o A/9",
        "predicate": "['A/1','A/8','A/9'].includes(entity.category)"
      },
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    "ratePercent": 0.0006,
    "officialDescription": "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    "conditions": [
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    "ratePercent": 0,
    "categoryTypes": [
      "D/10"
    ],
    "officialDescription": "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    "conditions": [
      {
        "description": "L'entità ha categoria D/10",
        "predicate": "['D/10'].includes(entity.category)"
      },
      {
        "description": "Il fabbricato è utilizzato per attività agricola",
        "predicate": "entity.isAgriculturalUse === true"
      },
      {
        "description": "Il proprietario è un coltivatore diretto o imprenditore agricolo",
        "predicate": "entity.ownerIsAgriculturalEntrepreneur === true"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Terreni agricoli",
    "ratePercent": 0,
    "officialDescription": "Ter ni agricoli",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili",
    "ratePercent": 0.00076,
    "officialDescription": "A e fabbricabili",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  },
  {
    "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.00101,
    "officialDescription": "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "conditions": [
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    "ratePercent": 0.00101,
    "categoryTypes": [
      "D/5"
    ],
    "officialDescription": "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria D/5",
        "predicate": "['D/5'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria /1 utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    "ratePercent": 0,
    "categoryTypes": [
      "/1"
    ],
    "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Codice ATECO: 84.24.00 - Ordine pubblico e sicu zza nazionale",
    "conditions": [
      {
        "description": "L'entità ha categoria /1",
        "predicate": "['/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria /1 utilizzati per attività dei vigili del fuoco",
    "ratePercent": 0,
    "categoryTypes": [
      "/1"
    ],
    "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Codice ATECO: 84.25.10 - Attivita' dei vigili del fuoco",
    "conditions": [
      {
        "description": "L'entità ha categoria /1",
        "predicate": "['/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria /1 e /2 utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "/1",
      "/2"
    ],
    "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria /1 o /2",
        "predicate": "['/1','/2'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria A/10, C/1, C/3 concessi in comodato",
    "ratePercent": 0,
    "categoryTypes": [
      "A/10",
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Requisiti soggettivi del comodatario: Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 0 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/1 o C/3",
        "predicate": "['A/10','C/1','C/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria A/10, C/1, C/3 utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0,
    "categoryTypes": [
      "A/10",
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 0 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/1 o C/3",
        "predicate": "['A/10','C/1','C/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 concessi in comodato in zone ad alto tasso di abbandono",
    "ratePercent": 0,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: Piazza dell’Orologio, Piazza Sant’And a, Via Carpinoni, Via Que na dall’incrocio con Via Pietro Fanzago, salendo verso Piazza aradello, Vicolo Caio, Largo Locatelli, Piazza aradello, Via Matteotti, Via de ernardi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  }
];
