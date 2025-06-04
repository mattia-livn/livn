"use strict";
// oristanoOR2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesOristanoOR2025 = void 0;
exports.imuRatesOristanoOR2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.00055,
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
        "ratePercent": 0.00055,
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
        "ratePercent": 0.00086,
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
        "ratePercent": 0.00101,
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
        "label": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
        "ratePercent": 0.00106,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
        "ratePercent": 0.00055,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al primo grado",
        "ratePercent": 0.00061,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al secondo grado in linea retta",
        "ratePercent": 0.00086,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Durata del contratto di durata non inferiore a 36 mesi",
        "ratePercent": 0.0003,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Durata del contratto di durata non inferio a mesi, specifica : 36 - Destinazione d'uso: Purch� l'affittuario/comodatario la",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i. - Durata del contratto di durata non inferiore a 6 mesi",
        "ratePercent": 0.0003,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i. - Durata del contratto di durata non inferio a mesi, specifica : 6",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i. - Durata del contratto di durata non inferiore a 1 mese",
        "ratePercent": 0.0003,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i. - Durata del contratto di durata non inferio a mesi, specifica : 1",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria A10, C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati direttamente dal soggetto passivo",
        "ratePercent": 0.00091,
        "categoryTypes": [
            "A10",
            "C"
        ],
        "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R.",
        "conditions": [
            {
                "description": "L'entità ha categoria A10",
                "predicate": "['A10'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=oristanoOR2025.js.map