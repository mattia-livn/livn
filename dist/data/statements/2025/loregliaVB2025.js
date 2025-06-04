"use strict";
// loregliaVB2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesLoregliaVB2025 = void 0;
exports.imuRatesLoregliaVB2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.0002,
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
        "ratePercent": 0.0002,
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
        "ratePercent": 0.00076,
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
        "ratePercent": 0.00076,
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
        "ratePercent": 0.00076,
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
        "label": "Fabbricati appartenenti al gruppo catastale D - Categoria catastale: D/1 Opifici",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/1"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati direttamente dal soggetto passivo - Destinazione d'uso: Impianti idroelettrici",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1",
                "predicate": "['D/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Abitazione a disposizione",
        "ratePercent": 0.0005,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/8",
            "A/11"
        ],
        "officialDescription": "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D Abitazione a disposizione - Abitazioni non locate e non concesse in comodato nonche' abitazioni locate o concesse in comodato per periodi inferiori all'anno e comunque per un numero complessivo di mesi inferiore a: mesi: 12 Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/11 Abitazioni ed alloggi tipici dei luoghi - Collocazione immobile: In una zona specificamente indicata dal comune: fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8 o A/11",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8','A/11'].includes(entity.category)"
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
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Immobili di categoria C",
        "ratePercent": 0.0005,
        "categoryTypes": [
            "C/2"
        ],
        "officialDescription": "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito",
        "conditions": [
            {
                "description": "L'entità ha categoria C/2",
                "predicate": "['C/2'].includes(entity.category)"
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
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Immobili di categoria C",
        "ratePercent": 0.0005,
        "categoryTypes": [
            "C/6",
            "C/7"
        ],
        "officialDescription": "- C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Collocazione immobile: In una zona specificamente indicata dal comune: fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma",
        "conditions": [
            {
                "description": "L'entità ha categoria C/6 o C/7",
                "predicate": "['C/6','C/7'].includes(entity.category)"
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
    }
];
//# sourceMappingURL=loregliaVB2025.js.map