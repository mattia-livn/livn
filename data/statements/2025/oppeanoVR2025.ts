// oppeanoVR2025.ts
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

export const imuRatesOppeanoVR2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.00057,
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
    "ratePercent": 0.00057,
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
    "ratePercent": 0.0001,
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
    "ratePercent": 0.0010400000000000001,
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
    "ratePercent": 0.001,
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
    "ratePercent": 0.001,
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
    "ratePercent": 0.00102,
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
    "label": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale",
    "ratePercent": 0,
    "officialDescription": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 12",
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
    "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    "ratePercent": 0,
    "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria A10, C concessi in comodato a ONLUS o altri enti del terzo settore",
    "ratePercent": 0,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Requisiti soggettivi del comodatario: ONLUS o altri enti del terzo setto - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Con contratto gistrato",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato a ONLUS o altri enti del terzo settore",
    "ratePercent": 0,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Durata del contratto di durata non inferio a mesi, specifica : 12 - Con contratto gistrato - Condizioni locatario/comodatario: ONLUS o altri enti del terzo setto",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 e C/2 utilizzati per commercio al dettaglio",
    "ratePercent": 0.0007,
    "categoryTypes": [
      "C/1",
      "C/2"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.11 - Commercio al dettaglio in esercizi non specializzati con p valenza di prodotti alimentari e bevande",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/2",
        "predicate": "['C/1','C/2'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 e C/2 utilizzati per commercio di tabacco",
    "ratePercent": 0.0007,
    "categoryTypes": [
      "C/1",
      "C/2"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.26 - Commercio al dettaglio di prodotti del tabacco in esercizi specializzati",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/2",
        "predicate": "['C/1','C/2'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 e C/2 utilizzati per minimercati",
    "ratePercent": 0.0007,
    "categoryTypes": [
      "C/1",
      "C/2"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.11.4 - Minimercati ed altri esercizi non specializzati di alimentari vari",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/2",
        "predicate": "['C/1','C/2'].includes(entity.category)"
      }
    ]
  }
];
