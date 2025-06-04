"use strict";
// strangolagalliFR2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesStrangolagalliFR2025 = void 0;
exports.imuRatesStrangolagalliFR2025 = [
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
        "label": "Aree fabbricabili residenziali situate in determinate zone",
        "ratePercent": 0.0002,
        "officialDescription": "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO.",
        "conditions": [
            {
                "description": "Il terreno è edificabile secondo PRG o catasto",
                "predicate": "entity.isBuildable === true"
            }
        ]
    },
    {
        "label": "Aree fabbricabili diverse da residenziali situate in determinate zone",
        "ratePercent": 0.0002,
        "officialDescription": "A e Fabbricabili - Tipologia: Diverse da residenziali - Situate in determinate zone: AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO.",
        "conditions": [
            {
                "description": "Il terreno è edificabile secondo PRG o catasto",
                "predicate": "entity.isBuildable === true"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locata e non concessa in comodato",
        "ratePercent": 0.0008,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Utilizzo/Inutilizzo: Con uso limitato e discontinuo o stagionale, per un utilizzo complessivo non superiore a mesi: 5",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locata e non concessa in comodato, priva di arredi e utenze",
        "ratePercent": 0.0005,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Utilizzo/Inutilizzo: Privi di ogni arredo, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locata e non concessa in comodato, soggetto con invalidità civile",
        "ratePercent": 0.0002,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Requisiti del soggetto passivo: Soggetto con invalidità civile riconosciuta in percentuale non inferiore al: 70%",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locata e non concessa in comodato, portatore di handicap grave",
        "ratePercent": 0.0002,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Requisiti del soggetto passivo: Portatore di handicap grave riconosciuto ai sensi dell'art. 3, comma 3, della L. 104/92",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, contratto di comodato d'uso gratuito",
        "ratePercent": 0.0007,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Durata del contratto di durata non inferiore a mesi, specifica : 36 - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al secondo grado in linea retta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=strangolagalliFR2025.js.map