// cerciventoUD2025.ts
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

export const imuRatesCerciventoUD2025: ImuRateEntry[] = [
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
      "B",
      "C",
      "D",
      "E"
    ],
    "officialDescription": "Altri fabbricati non rientranti nelle categorie speciali",
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
    "label": "Fabbricati gruppo D",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "Fabbricati produttivi classificati nel gruppo catastale D",
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
    "categoryTypes": [
      "Terreni agricoli"
    ],
    "officialDescription": "Terreni agricoli",
    "conditions": [
      {
        "description": "L'entità ha categoria Terreni agricoli",
        "predicate": "['Terreni agricoli'].includes(entity.category)"
      },
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "Aree fabbricabili"
    ],
    "officialDescription": "Aree fabbricabili",
    "conditions": [
      {
        "description": "L'entità ha categoria Aree fabbricabili",
        "predicate": "['Aree fabbricabili'].includes(entity.category)"
      },
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  }
];
