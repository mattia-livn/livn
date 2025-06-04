"use strict";
// sediniSS2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesSediniSS2025 = void 0;
exports.imuRatesSediniSS2025 = [
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
        "ratePercent": 0,
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
        "ratePercent": 0.0009,
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
        "ratePercent": 0.00076,
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
        "ratePercent": 0.0009,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 e D/7",
        "ratePercent": 0.00114,
        "categoryTypes": [
            "D/1",
            "D/7"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/7",
                "predicate": "['D/1','D/7'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.0009,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Locazione",
        "ratePercent": 0.0009,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5",
                "predicate": "['A/2','A/3','A/4','A/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
        "ratePercent": 0.0009,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=sediniSS2025.js.map