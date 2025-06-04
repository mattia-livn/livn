"use strict";
// romanengoCR2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesRomanengoCR2025 = void 0;
exports.imuRatesRomanengoCR2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.0006,
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
        "ratePercent": 0.0006,
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
        "label": "Aree fabbricabili",
        "ratePercent": 0.00114,
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
        "ratePercent": 0.00114,
        "categoryTypes": [
            "D/1",
            "D/5",
            "D/6",
            "D/7",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/5 o D/6 o D/7 o D/8",
                "predicate": "['D/1','D/5','D/6','D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/4 e C/7",
        "ratePercent": 0.00108,
        "categoryTypes": [
            "C/4",
            "C/7"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/7 Tettoie chiuse od aperte",
        "conditions": [
            {
                "description": "L'entità ha categoria C/4 o C/7",
                "predicate": "['C/4','C/7'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/6",
        "ratePercent": 0.00098,
        "categoryTypes": [
            "C/6"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria C/6",
                "predicate": "['C/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione destinata a struttura turistico-ricettiva",
        "ratePercent": 0.00114,
        "officialDescription": "Abitazione destinata a struttura turistico-ricettiva",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato",
        "ratePercent": 0.00114,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione",
        "ratePercent": 0.00114,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota olt la misura dell’1,06%: Seconde case, ossia immobili ad uso abitativo diversi dall'abitazione principale del proprietario.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione utilizzata direttamente dal soggetto passivo",
        "ratePercent": 0.00114,
        "officialDescription": "Abitazione utilizzata di ttamente dal soggetto passivo - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota olt la misura dell’1,06%: Seconde case, ossia immobili ad uso abitativo diverse dall'abitazione principale del proprietario.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria A/10, C/1, C/2, C/3",
        "ratePercent": 0.00114,
        "categoryTypes": [
            "A/10",
            "C/1",
            "C/2",
            "C/3"
        ],
        "officialDescription": "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /2 Case di cura ed ospedali senza fine di lucro - /4 Uffici pubblici - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10 o C/1 o C/2 o C/3",
                "predicate": "['A/10','C/1','C/2','C/3'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=romanengoCR2025.js.map