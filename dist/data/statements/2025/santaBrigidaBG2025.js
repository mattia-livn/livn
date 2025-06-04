"use strict";
// santaBrigidaBG2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesSantaBrigidaBG2025 = void 0;
exports.imuRatesSantaBrigidaBG2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.0004,
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
        "ratePercent": 0.0004,
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
        "ratePercent": 0.0009599999999999999,
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
        "ratePercent": 0.0009599999999999999,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/2",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/2"
        ],
        "officialDescription": "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/2",
                "predicate": "['D/2'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Altri fabbricati locati o in comodato",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Locatario/comodatario non titola di proprieta' o altro diritto ale di godimento su immobili - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
            },
            {
                "description": "Non è abitazione principale",
                "predicate": "entity.isMainResidence !== true"
            },
            {
                "description": "Non è del gruppo D",
                "predicate": "!entity.category?.startsWith('D')"
            }
        ]
    },
    {
        "label": "Immobili di categoria C",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "C"
        ],
        "officialDescription": "Immobili di categoria C",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=santaBrigidaBG2025.js.map