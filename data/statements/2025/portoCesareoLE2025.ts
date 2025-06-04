// portoCesareoLE2025.ts
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

export const imuRatesPortoCesareoLE2025: ImuRateEntry[] = [
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
    "ratePercent": 0.000882,
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
    "ratePercent": 0.0007,
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
    "ratePercent": 0.0005600000000000001,
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
    "ratePercent": 0.001082,
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
    "label": "Abitazione locata o in comodato con contratto registrato, utilizzata come abitazione principale",
    "ratePercent": 0.0006820000000000001,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Con contratto gistrato - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
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
    "label": "Abitazione locata o in comodato con contratto registrato, utilizzata come abitazione principale, categorie catastali A/1, A/2, A/3, A/4, A/5, A/6, A/7",
    "ratePercent": 0.00066,
    "categoryTypes": [
      "A/1",
      "A/2",
      "A/3",
      "A/4",
      "A/5",
      "A/6",
      "A/7"
    ],
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
        "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
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
    "label": "Immobili di categoria A/10",
    "ratePercent": 0.00091,
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
  },
  {
    "label": "Immobili di categoria C, categorie catastali C/1, C/3",
    "ratePercent": 0.0008100000000000001,
    "categoryTypes": [
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/3",
        "predicate": "['C/1','C/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C, categoria catastale C/4",
    "ratePercent": 0.0008100000000000001,
    "categoryTypes": [
      "C/4"
    ],
    "officialDescription": "- C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria C/4",
        "predicate": "['C/4'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione a disposizione, categorie catastali A/1, A/2, A/3, A/4, A/5, A/6, A/7",
    "ratePercent": 0.001082,
    "categoryTypes": [
      "A/1",
      "A/2",
      "A/3",
      "A/4",
      "A/5",
      "A/6",
      "A/7"
    ],
    "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
        "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
      }
    ]
  }
];
