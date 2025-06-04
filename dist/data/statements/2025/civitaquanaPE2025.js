"use strict";
// civitaquanaPE2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesCivitaquanaPE2025 = void 0;
exports.imuRatesCivitaquanaPE2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.00005,
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
        "ratePercent": 0.00001,
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
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 56.1 - RISTORANTI E ATTIVITA' DI RISTORAZIONE MO ILE",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 33.1 - RIPARAZIONE E MANUTENZIONE DI PRODOTTI IN M ALLO, MACCHINE ED APPARECCHIATURE",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1",
                "predicate": "['D/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 31.0 - FA RICAZIONE DI MO ILI",
        "conditions": [
            {
                "description": "L'entità ha categoria D/3 o D/8",
                "predicate": "['D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 25.9 - FA RICAZIONE DI ALTRI PRODOTTI IN M ALLO",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 10.4 - PRODUZIONE DI OLI E GRASSI VEG ALI E ANIMALI",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D a disposizione",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D locati o concessi in comodato",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/1",
            "D/3",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D\\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/3 o D/8",
                "predicate": "['D/1','D/3','D/8'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=civitaquanaPE2025.js.map