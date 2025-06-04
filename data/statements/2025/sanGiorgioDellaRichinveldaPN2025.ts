// sanGiorgioDellaRichinveldaPN2025.ts
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

export const imuRatesSanGiorgioDellaRichinveldaPN2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale",
    "ratePercent": 0.0006,
    "categoryTypes": [
      "A/1",
      "A/8",
      "A/9"
    ],
    "officialDescription": "Abitazione principale e relative pertinenze",
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
    "label": "Altri fabbricati",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "A/2",
      "A/3",
      "A/4",
      "A/5",
      "A/6",
      "A/7"
    ],
    "officialDescription": "Altri fabbricati non rientranti nell'abitazione principale",
    "conditions": [
      {
        "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
        "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
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
    "label": "Fabbricati gruppo D",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "D/1",
      "D/2",
      "D/3",
      "D/4",
      "D/5",
      "D/6",
      "D/7",
      "D/8",
      "D/9"
    ],
    "officialDescription": "Fabbricati appartenenti al gruppo D, escluso D/10",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/2 o D/3 o D/4 o D/5 o D/6 o D/7 o D/8 o D/9",
        "predicate": "['D/1','D/2','D/3','D/4','D/5','D/6','D/7','D/8','D/9'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Terreni agricoli",
    "ratePercent": 0,
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
    "ratePercent": 0.00106,
    "officialDescription": "Aree fabbricabili",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  }
];
