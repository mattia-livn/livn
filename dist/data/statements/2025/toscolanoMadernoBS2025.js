"use strict";
// toscolanoMadernoBS2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesToscolanoMadernoBS2025 = void 0;
exports.imuRatesToscolanoMadernoBS2025 = [
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
        "ratePercent": 0.0008,
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
        "ratePercent": 0.0008399999999999999,
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
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/2",
            "D/3",
            "D/4",
            "D/5",
            "D/6",
            "D/7",
            "D/8",
            "D/9"
        ],
        "officialDescription": "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
        "conditions": [
            {
                "description": "L'entità ha categoria D/2 o D/3 o D/4 o D/5 o D/6 o D/7 o D/8 o D/9",
                "predicate": "['D/2','D/3','D/4','D/5','D/6','D/7','D/8','D/9'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0.00091,
        "categoryTypes": [
            "D/1"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1",
                "predicate": "['D/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/11"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/11",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7','A/11'].includes(entity.category)"
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
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/11"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/11",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7','A/11'].includes(entity.category)"
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
        "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0.0008,
        "categoryTypes": [
            "A/10",
            "C/1",
            "C/3",
            "C/4",
            "C/5"
        ],
        "officialDescription": "Immobili di categoria A10, C",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10 o C/1 o C/3 o C/4 o C/5",
                "predicate": "['A/10','C/1','C/3','C/4','C/5'].includes(entity.category)"
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
//# sourceMappingURL=toscolanoMadernoBS2025.js.map