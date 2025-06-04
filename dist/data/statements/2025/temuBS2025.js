"use strict";
// temuBS2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesTemuBS2025 = void 0;
exports.imuRatesTemuBS2025 = [
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
        "ratePercent": 0.00106,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 e D/5",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/1",
            "D/5"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - D/5 Istituto di credito, cambio e assicurazione con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/5",
                "predicate": "['D/1','D/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria A/10, C/1, C/2",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "A/10",
            "C/1",
            "C/2"
        ],
        "officialDescription": "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10 o C/1 o C/2",
                "predicate": "['A/10','C/1','C/2'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione utilizzata direttamente dal soggetto passivo, categoria A/6",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "A/6"
        ],
        "officialDescription": "Abitazione utilizzata di ttamente dal soggetto passivo Categoria catastale: - A/6 Abitazioni di tipo rurale",
        "conditions": [
            {
                "description": "L'entità ha categoria A/6",
                "predicate": "['A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C, collocazione: all'interno del centro abitato",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "C/2",
            "C/6",
            "C/7"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Collocazione immobile: In una zona specificamente indicata dal comune: All'interno del centro abitato pertinenze:1- di abitazioni principali che eccedono quelle esenti per legge e/o golamento;2- di abitazioni in uso gratuito a pa nti fino al secondo grado utilizzate dai medesimi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria C/2 o C/6 o C/7",
                "predicate": "['C/2','C/6','C/7'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=temuBS2025.js.map