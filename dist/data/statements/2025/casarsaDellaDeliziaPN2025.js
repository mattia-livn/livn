"use strict";
// casarsaDellaDeliziaPN2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesCasarsaDellaDeliziaPN2025 = void 0;
exports.imuRatesCasarsaDellaDeliziaPN2025 = [
    {
        "label": "Abitazione principale e relative pertinenze",
        "ratePercent": 0.0006,
        "categoryTypes": [
            "Abitazione principale"
        ],
        "officialDescription": "Abitazione principale e relative pertinenze: 0,60%",
        "conditions": [
            {
                "description": "L'entità ha categoria Abitazione principale",
                "predicate": "['Abitazione principale'].includes(entity.category)"
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
            "Altri fabbricati"
        ],
        "officialDescription": "Altri fabbricati: 1,06%",
        "conditions": [
            {
                "description": "L'entità ha categoria Altri fabbricati",
                "predicate": "['Altri fabbricati'].includes(entity.category)"
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
        "ratePercent": 0.00076,
        "categoryTypes": [
            "Fabbricati gruppo D"
        ],
        "officialDescription": "Fabbricati gruppo D: 0,76%",
        "conditions": [
            {
                "description": "L'entità ha categoria Fabbricati gruppo D",
                "predicate": "['Fabbricati gruppo D'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Terreni agricoli",
        "ratePercent": 0,
        "categoryTypes": [
            "Terreni agricoli"
        ],
        "officialDescription": "Terreni agricoli: 0,00%",
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
        "officialDescription": "Aree fabbricabili: 1,06%",
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
//# sourceMappingURL=casarsaDellaDeliziaPN2025.js.map