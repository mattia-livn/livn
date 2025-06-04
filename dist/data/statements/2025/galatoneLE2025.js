"use strict";
// galatoneLE2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesGalatoneLE2025 = void 0;
exports.imuRatesGalatoneLE2025 = [
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
        "ratePercent": 0.00106,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/1 Opifici, in una zona specificamente indicata dal comune",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/1"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - Collocazione immobile: In una zona specificamente indicata dal comune: ALIQUOTA PREVISTA SOLO PER FABBRICATI IN CUI VIENE SVOLTA ATTIVITA' DI FRANTOIO",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1",
                "predicate": "['D/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Terreni agricoli coltivati da coltivatori diretti o imprenditori agricoli professionali",
        "ratePercent": 0,
        "officialDescription": "- Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: ter ni agricoli posseduti e condotti da coltivatori di tti o imp nditori agricoli professionali di cui all’articolo 1 del dec to legislativo 29.3.2004, n. 99, iscritti nella p videnza agricola",
        "conditions": [
            {
                "description": "È un terreno agricolo",
                "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
            }
        ]
    },
    {
        "label": "Terreni agricoli a immutabile destinazione agro silvo-pastorale a proprietà collettiva indivisibile e non usucapibile",
        "ratePercent": 0,
        "officialDescription": "- Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: ter ni agricoli a immutabile destinazione agro silvo-pastorale a propriet� collettiva indivisibile e non usucapibile",
        "conditions": [
            {
                "description": "È un terreno agricolo",
                "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.00053,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/11"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Limitatamente ad un solo immobile.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/11",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7','A/11'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
        "ratePercent": 0.000795,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n. 431/1998 e s.m.i.",
        "ratePercent": 0.000795,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n. 431/1998 e s.m.i.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione, abitazioni non locate e non concesse in comodato, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
        "ratePercent": 0.00053,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Utilizzo/Inutilizzo: Sprovvisti di utenze di fornitura attive di acqua, luce e gas - Fabbricati divenuti inagibili a seguito di calamit� naturali",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione, abitazioni non locate e non concesse in comodato, fabbricati di interesse storico",
        "ratePercent": 0.00053,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI INTERESSE STORICO RIF. ART.10 DLGS 22/01/2004 NR.42",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione",
        "ratePercent": 0,
        "officialDescription": "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 12",
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
    }
];
//# sourceMappingURL=galatoneLE2025.js.map