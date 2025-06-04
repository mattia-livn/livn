"use strict";
// roanaVI2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesRoanaVI2025 = void 0;
exports.imuRatesRoanaVI2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0,
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
        "ratePercent": 0,
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
        "ratePercent": 0.0009599999999999999,
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
        "ratePercent": 0.00111,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
        "ratePercent": 0.0009599999999999999,
        "categoryTypes": [
            "D/5"
        ],
        "officialDescription": "Categoria catastale: - D/5 Istituto di credito, cambio e assicurazione con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/5",
                "predicate": "['D/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Locazione",
        "ratePercent": 0.0007099999999999999,
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
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti pregi artistici o storici - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8 o A/9",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8','A/9'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria A10, C",
        "ratePercent": 0.0005600000000000001,
        "categoryTypes": [
            "A/10",
            "C/1",
            "C/3"
        ],
        "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10 o C/1 o C/3",
                "predicate": "['A/10','C/1','C/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.00061,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/8"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Locatario/comodatario non titolare di proprietà o altro diritto reale di godimento su immobili",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria /1, /2",
        "ratePercent": 0.0009599999999999999,
        "categoryTypes": [
            "/1",
            "/2"
        ],
        "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria /1 o /2",
                "predicate": "['/1','/2'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione destinata a struttura turistico-ricettiva",
        "ratePercent": 0.0005600000000000001,
        "officialDescription": "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacamere per brevi soggiorni, case ed appartamenti per vacanze, bed and breakfast, residence - Attività condotta in forma imprenditoriale",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=roanaVI2025.js.map