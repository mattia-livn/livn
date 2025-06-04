"use strict";
// gavirateVA2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesGavirateVA2025 = void 0;
exports.imuRatesGavirateVA2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.0004,
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
        "ratePercent": 0.0004,
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
        "label": "Immobili di categoria C/2, C/6, C/7",
        "ratePercent": 0.00098,
        "categoryTypes": [
            "C/2",
            "C/6",
            "C/7"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte",
        "conditions": [
            {
                "description": "L'entità ha categoria C/2 o C/6 o C/7",
                "predicate": "['C/2','C/6','C/7'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/1, C/3, C/4",
        "ratePercent": 0.0010400000000000001,
        "categoryTypes": [
            "C/1",
            "C/3",
            "C/4"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/3 o C/4",
                "predicate": "['C/1','C/3','C/4'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato",
        "ratePercent": 0.0010400000000000001,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione destinata a struttura turistico-ricettiva",
        "ratePercent": 0.0010400000000000001,
        "officialDescription": "Abitazione destinata a struttura turistico-ricettiva",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione",
        "ratePercent": 0.0010400000000000001,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione utilizzata direttamente dal soggetto passivo",
        "ratePercent": 0.0010400000000000001,
        "officialDescription": "Abitazione utilizzata di ttamente dal soggetto passivo",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
        "ratePercent": 0.0010400000000000001,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=gavirateVA2025.js.map