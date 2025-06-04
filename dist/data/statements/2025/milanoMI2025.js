"use strict";
// milanoMI2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesMilanoMI2025 = void 0;
exports.imuRatesMilanoMI2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.00068,
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
        "ratePercent": 0.00068,
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
        "ratePercent": 0.00114,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/3",
        "ratePercent": 0.00095,
        "categoryTypes": [
            "D/3"
        ],
        "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo",
        "conditions": [
            {
                "description": "L'entità ha categoria D/3",
                "predicate": "['D/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato con contratto ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
        "ratePercent": 0.00073,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/8",
            "A/9"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8 o A/9",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8','A/9'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato con contratto a canone libero",
        "ratePercent": 0.0010400000000000001,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5",
                "predicate": "['A/1','A/2','A/3','A/4','A/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C utilizzati per attività produttiva e/o commerciale",
        "ratePercent": 0.00095,
        "categoryTypes": [
            "C/1",
            "C/3"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/3",
                "predicate": "['C/1','C/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locata e non concessa in comodato",
        "ratePercent": 0,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Fabbricati divenuti inagibili a seguito di calamità naturali",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=milanoMI2025.js.map