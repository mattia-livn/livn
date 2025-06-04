// serravallePistoiesePT2025.ts
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

export const imuRatesSerravallePistoiesePT2025: ImuRateEntry[] = [
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
    "ratePercent": 0.0009599999999999999,
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
    "label": "Terreni agricoli ricadenti nei fogli catastali specificati",
    "ratePercent": 0,
    "officialDescription": "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 28, 29, 30, 31, 32, 33, 35, 39, 40, 41, 42, 43, 44, 45, 46, 47",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli ricadenti nel Foglio Catastale 21",
    "ratePercent": 0,
    "officialDescription": "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: Foglio Catastale 21 - Si applica l'aliquota 0% solo ai ter ni ricadenti sui seguenti mappali :15, 22, 23, 25, 26, 47, dal 49 al 52, 54, 55, dal 57 al 69, dal 83 al 99, 101,102,104, dal 106 al 109, dal 111 al 124, 153, 155, 156, dal 160 al 164, 184, 195, dal 210 al 217, 226, dal 229 al 234, dal 236 al 239.",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli ricadenti nel Foglio Catastale 25",
    "ratePercent": 0,
    "officialDescription": "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: Foglio Catastale 25 - Si applica l'aliquota 0% solo ai ter ni ricadenti sui seguenti mappali :dall'1 al 6, dal 27 al 50, 98, dal 108 al 133, 135, 137, 138, 170, 172, dal 175 al 178, 181, 184, dal 189 al 193, dal 211 al 220, 229, 230, 322, 323, 339, dal 347 al 354, 357, 360, dal 372 al 374, 402, dal 404 al 408, 414.",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli ricadenti nel Foglio Catastale 34",
    "ratePercent": 0,
    "officialDescription": "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: Foglio Catastale 34 - Si applica l'aliquota 0% solo ai ter ni ricadenti sui seguenti mappali : 1, 4, 6, 8, 12, 13, 15, 18, 19, dal 21 al 30, 32, dal 35 al 39, dal 42 al 44, 46, 47, 50, 51, dal 53 al 80, dal 83 al 98, 115, 116, dal 132 al 141, dal 143 al 153, dal 155 al 161, dal 163 al 168, dal 185 al 262.",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  }
];
