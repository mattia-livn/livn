// sanGiovanniLupatotoVR2025.ts
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

export const imuRatesSanGiovanniLupatotoVR2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.0005,
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
    "ratePercent": 0.0005,
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
    "ratePercent": 0.0009599999999999999,
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
    "officialDescription": "Terreni agricoli",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili",
    "ratePercent": 0.0010500000000000002,
    "officialDescription": "Aree fabbricabili",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  },
  {
    "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.001,
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
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/3 e D/6",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "D/3",
      "D/6"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3 o D/6",
        "predicate": "['D/3','D/6'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/2 e D/5",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "D/2",
      "D/5"
    ],
    "officialDescription": "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/5 Istituto di credito, cambio e assicurazione con fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria D/2 o D/5",
        "predicate": "['D/2','D/5'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato, locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    "ratePercent": 0.00086,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria C",
    "ratePercent": 0.00093,
    "categoryTypes": [
      "C/1",
      "C/2",
      "C/3",
      "C/4"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/2 o C/3 o C/4",
        "predicate": "['C/1','C/2','C/3','C/4'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria /1",
    "ratePercent": 0.00095,
    "categoryTypes": [
      "/1"
    ],
    "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme",
    "conditions": [
      {
        "description": "L'entità ha categoria /1",
        "predicate": "['/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale",
    "ratePercent": 0,
    "officialDescription": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione Fino a mesi: 12",
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
    "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    "ratePercent": 0,
    "officialDescription": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato, comodato d'uso gratuito con contratto registrato",
    "ratePercent": 0.00086,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  }
];
