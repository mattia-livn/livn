// paviaPV2025.ts
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

export const imuRatesPaviaPV2025: ImuRateEntry[] = [
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
    "ratePercent": 0.00106,
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
    "ratePercent": 0.00106,
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
    "ratePercent": 0.00106,
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
    "ratePercent": 0.00106,
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
    "label": "Fabbricati appartenenti al gruppo catastale D utilizzati da ONLUS o altri enti del terzo settore",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del locatario, comodatario o soggetto passivo utilizzato : ONLUS o altri enti del terzo setto - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D a disposizione di ONLUS o enti del terzo settore",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili a disposizione - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D/3 utilizzati per attività di proiezione cinematografica",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 59.14.0 - Attivita' di proiezione cinematografica",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Altri fabbricati locati o in comodato con contratto ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    "ratePercent": 0.0009599999999999999,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  },
  {
    "label": "Altri fabbricati locati o in comodato con contratto ai sensi dell'art. 5, comma 1, della Legge n. 431/1998",
    "ratePercent": 0.0009599999999999999,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  },
  {
    "label": "Altri fabbricati locati o in comodato con contratto ai sensi dell'art. 5, comma 2, della Legge n. 431/1998",
    "ratePercent": 0.0009599999999999999,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  },
  {
    "label": "Altri fabbricati locati o in comodato con contratto ai sensi dell'art. 5, comma 3, della Legge n. 431/1998",
    "ratePercent": 0.0009599999999999999,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  },
  {
    "label": "Altri fabbricati in comodato d'uso gratuito di proprietà di ONLUS o enti del terzo settore",
    "ratePercent": 0.00046,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  },
  {
    "label": "Altri fabbricati a disposizione di ONLUS o enti del terzo settore",
    "ratePercent": 0.00046,
    "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato di proprieta' di ONLUS o di altri enti del terzo setto - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    "conditions": [
      {
        "description": "Non è abitazione principale",
        "predicate": "entity.isMainResidence !== true"
      },
      {
        "description": "Non è del gruppo D",
        "predicate": "!entity.category?.startsWith('D')"
      }
    ]
  }
];
