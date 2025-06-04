"use strict";
// sardaraSU2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesSardaraSU2025 = void 0;
exports.imuRatesSardaraSU2025 = [
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
        "ratePercent": 0.00005,
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
        "ratePercent": 0.00086,
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
        "officialDescription": "Terr ni agricoli",
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
        "ratePercent": 0.00086,
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
        "label": "Fabbricati appartenenti al gruppo catastale D - Produzione di energia elettrica",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.11.00 - Produzione di energia elettrica",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Trasmissione di energia elettrica",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.12.00 - Trasmissione di energia elettrica",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Distribuzione di energia elettrica",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.13.00 - Distribuzione di energia elettrica",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Commercio di energia elettrica",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.14.00 - Commercio di energia elettrica",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Telecomunicazioni mobili",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Codice ATECO: 61.20.00 - Telecomunicazioni mobili",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Telecomunicazioni satellitari",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Codice ATECO: 61.30.00 - Telecomunicazioni satellitari",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Altre attività connesse alle telecomunicazioni",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Codice ATECO: 61.90.99 - Alt attivita' connesse alle telecomunicazioni nca",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Erogazione di servizi di accesso ad internet ISP",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Codice ATECO: 61.90.10 - Erogazione di servizi di accesso ad internet ISP",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D - Intermediazione in servizi di telecomunicazione e trasmissione dati",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "- Codice ATECO: 61.90.91 - Intermediazione in servizi di telecomunicazione e trasmissione dati",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=sardaraSU2025.js.map