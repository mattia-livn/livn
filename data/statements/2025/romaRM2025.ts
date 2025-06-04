// romaRM2025.ts
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

export const imuRatesRomaRM2025: ImuRateEntry[] = [
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
    "ratePercent": 0.00114,
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
    "ratePercent": 0.00114,
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
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/3",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, utilizzati da ONLUS o altri enti del terzo settore",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : ONLUS o altri enti del terzo setto",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/8",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "D/8"
    ],
    "officialDescription": "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    "conditions": [
      {
        "description": "L'entità ha categoria D/8",
        "predicate": "['D/8'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Terreni agricoli di proprietà di ONLUS o enti del terzo settore",
    "ratePercent": 0.00086,
    "officialDescription": "Ter ni agricoli - Di propriet� di ONLUS o enti del terzo setto",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili di proprietà di ONLUS o enti del terzo settore",
    "ratePercent": 0.00086,
    "officialDescription": "A e Fabbricabili - Di propriet� di ONLUS o enti del terzo setto",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  },
  {
    "label": "Altri fabbricati di categoria A10, C, di proprietà di ONLUS o enti del terzo settore",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati Immobili di categoria A10, , C - Requisiti del soggetto passivo: Di proprieta' di ONLUS o",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
      },
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
    "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    "ratePercent": 0.00076,
    "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria C, utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R. - Limitatamente ad un solo immobile.",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/3",
        "predicate": "['C/1','C/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C, locati o concessi in comodato o utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 47.62.10 - Commercio al dettaglio di giornali, riviste e periodici",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  }
];
