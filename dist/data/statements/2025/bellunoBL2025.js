"use strict";
// bellunoBL2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesBellunoBL2025 = void 0;
exports.imuRatesBellunoBL2025 = [
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
        "ratePercent": 0.000059999999999999995,
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
        "ratePercent": 0.00091,
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
        "ratePercent": 0.00086,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/8, supermercati",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/8"
        ],
        "officialDescription": "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.11.20 - Supermercati",
        "conditions": [
            {
                "description": "L'entità ha categoria D/8",
                "predicate": "['D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/8, ipermercati",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/8"
        ],
        "officialDescription": "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.11.10 - Ipermercati",
        "conditions": [
            {
                "description": "L'entità ha categoria D/8",
                "predicate": "['D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/5, istituti di credito",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/5"
        ],
        "officialDescription": "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo",
        "conditions": [
            {
                "description": "L'entità ha categoria D/5",
                "predicate": "['D/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C",
        "ratePercent": 0.0008,
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
    },
    {
        "label": "Immobili di categoria A/10, uffici e studi privati",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "A/10"
        ],
        "officialDescription": "Categoria catastale: - A/10 Uffici e studi privati",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10",
                "predicate": "['A/10'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/1, negozi e botteghe, in Via Mezzaterra",
        "ratePercent": 0.00046,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Mezzaterra come da planimetria allegata alla delibera di Consiglio Comunale.",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
        "ratePercent": 0.00086,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: locazione",
        "ratePercent": 0.0009599999999999999,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: comodato d'uso gratuito",
        "ratePercent": 0.0009599999999999999,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=bellunoBL2025.js.map