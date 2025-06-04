"use strict";
// sanDamianoDastiAT2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesSanDamianoDastiAT2025 = void 0;
exports.imuRatesSanDamianoDastiAT2025 = [
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
        "ratePercent": 0.001,
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
        "ratePercent": 0.001,
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
        "ratePercent": 0.001,
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
        "ratePercent": 0.001,
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
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00094,
        "categoryTypes": [
            "D/1",
            "D/2",
            "D/3"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/2 o D/3",
                "predicate": "['D/1','D/2','D/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D a disposizione",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/1",
            "D/2",
            "D/3"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/2 o D/3",
                "predicate": "['D/1','D/2','D/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D/5 e D/8",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/5",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/5 o D/8",
                "predicate": "['D/5','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Aree fabbricabili diverse da residenziali",
        "ratePercent": 0.00106,
        "officialDescription": "A e Fabbricabili - Tipologia: Diverse da sidenziali",
        "conditions": [
            {
                "description": "Il terreno è edificabile secondo PRG o catasto",
                "predicate": "entity.isBuildable === true"
            }
        ]
    }
];
//# sourceMappingURL=sanDamianoDastiAT2025.js.map