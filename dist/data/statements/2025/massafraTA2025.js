"use strict";
// massafraTA2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesMassafraTA2025 = void 0;
exports.imuRatesMassafraTA2025 = [
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
        "ratePercent": 0.0008,
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
        "label": "Immobili di categoria C utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00092,
        "categoryTypes": [
            "C/1",
            "C/3"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/3",
                "predicate": "['C/1','C/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione non locate e non concesse in comodato",
        "ratePercent": 0,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - Utilizzo/Inutilizzo: Con uso limitato e discontinuo o stagionale, per un utilizzo complessivo non superio a mesi: 0 - Collocazione immobile: In una zona specificamente indicata dal comune: Già destinati ad abitazione principale ai sensi del comma 741, lett.b, L. 160/2019, destinatari di ordinanza sindacale di sgombero emessa tra il01/01/2022 e il 31/12/2022",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/2','A/3','A/4','A/5','A/6'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
        "ratePercent": 0.00106,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=massafraTA2025.js.map