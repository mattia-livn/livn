"use strict";
// valdidentroSO2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesValdidentroSO2025 = void 0;
exports.imuRatesValdidentroSO2025 = [
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
        "ratePercent": 0.0007,
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
        "label": "Fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/2",
            "D/7",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/2 o D/7 o D/8",
                "predicate": "['D/2','D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/7"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/7",
                "predicate": "['A/2','A/3','A/7'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "C/2",
            "C/4",
            "C/6"
        ],
        "officialDescription": "Immobili di categoria , C Categoria catastale: - /5 Scuole e laboratori scientifici - C/2 Magazzini e locali di deposito - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di",
        "conditions": [
            {
                "description": "L'entità ha categoria C/2 o C/4 o C/6",
                "predicate": "['C/2','C/4','C/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
        "ratePercent": 0.0005600000000000001,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero - Durata del contratto di durata non inferio a mesi, specifica : 6",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione destinata a struttura turistico-ricettiva - Attività condotta in forma imprenditoriale",
        "ratePercent": 0.0005600000000000001,
        "officialDescription": "Abitazione destinata a struttura turistico-ricettiva - Attività condotta in forma imp nditoriale",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione destinata a struttura turistico-ricettiva - In attività da almeno mesi: 6",
        "ratePercent": 0.0005600000000000001,
        "officialDescription": "Abitazione destinata a struttura turistico-ricettiva - In attivit� da almeno mesi: 6",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria A10, C",
        "ratePercent": 0.00046,
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
        "label": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
        "ratePercent": 0.00046,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Collocazione immobile: In zona non servita da servizi pubblici",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=valdidentroSO2025.js.map