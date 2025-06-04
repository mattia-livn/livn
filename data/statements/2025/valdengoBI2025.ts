// valdengoBI2025.ts
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

export const imuRatesValdengoBI2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.00045,
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
    "ratePercent": 0.00045,
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
    "ratePercent": 0.00091,
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
    "ratePercent": 0.0010500000000000002,
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
    "ratePercent": 0.0010500000000000002,
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
    "label": "Fabbricati appartenenti al gruppo catastale D - D/1, D/3, D/5",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "D/1",
      "D/3",
      "D/5"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/3 o D/5",
        "predicate": "['D/1','D/3','D/5'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D - D/2, D/6, D/8",
    "ratePercent": 0.00101,
    "categoryTypes": [
      "D/2",
      "D/6",
      "D/8"
    ],
    "officialDescription": "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    "conditions": [
      {
        "description": "L'entità ha categoria D/2 o D/6 o D/8",
        "predicate": "['D/2','D/6','D/8'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C - C/1, C/3, C/4, C/5",
    "ratePercent": 0.00085,
    "categoryTypes": [
      "C/1",
      "C/3",
      "C/4",
      "C/5"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/3 o C/4 o C/5",
        "predicate": "['C/1','C/3','C/4','C/5'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C - C/2, C/6, C/7",
    "ratePercent": 0.0010400000000000001,
    "categoryTypes": [
      "C/2",
      "C/6",
      "C/7"
    ],
    "officialDescription": "- C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte",
    "conditions": [
      {
        "description": "L'entità ha categoria C/2 o C/6 o C/7",
        "predicate": "['C/2','C/6','C/7'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria A10",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A/10"
    ],
    "officialDescription": "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10",
        "predicate": "['A/10'].includes(entity.category)"
      }
    ]
  }
];
