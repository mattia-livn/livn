"use strict";
// thieneVI2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesThieneVI2025 = void 0;
exports.imuRatesThieneVI2025 = [
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
        "ratePercent": 0.00004,
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
        "ratePercent": 0.0008900000000000001,
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
        "ratePercent": 0.00064,
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
        "ratePercent": 0.0009699999999999999,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/5"
        ],
        "officialDescription": "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/5",
                "predicate": "['D/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/8",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/8"
        ],
        "officialDescription": "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Superficie: Non inferio a Mq 1500 MQ",
        "conditions": [
            {
                "description": "L'entità ha categoria D/8",
                "predicate": "['D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato",
        "ratePercent": 0.00065,
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria A/10",
        "ratePercent": 0.0008900000000000001,
        "categoryTypes": [
            "A/10"
        ],
        "officialDescription": "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10",
                "predicate": "['A/10'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria B",
        "ratePercent": 0.0008900000000000001,
        "categoryTypes": [
            "B/1",
            "B/2",
            "B/3",
            "B/4"
        ],
        "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici",
        "conditions": [
            {
                "description": "L'entità ha categoria B/1 o B/2 o B/3 o B/4",
                "predicate": "['B/1','B/2','B/3','B/4'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria B, continuazione",
        "ratePercent": 0.0008900000000000001,
        "categoryTypes": [
            "B/5",
            "B/6",
            "B/7",
            "B/8"
        ],
        "officialDescription": "- /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate",
        "conditions": [
            {
                "description": "L'entità ha categoria B/5 o B/6 o B/7 o B/8",
                "predicate": "['B/5','B/6','B/7','B/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C, categoria catastale C/3",
        "ratePercent": 0.0008900000000000001,
        "categoryTypes": [
            "C/3"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri",
        "conditions": [
            {
                "description": "L'entità ha categoria C/3",
                "predicate": "['C/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione a disposizione",
        "ratePercent": 0.00106,
        "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 24 - Utilizzo/Inutilizzo: Sprovvisti di utenze di fornitura attive di acqua, luce e gas",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
        "ratePercent": 0.00065,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria C, categoria catastale C/1",
        "ratePercent": 0.0008900000000000001,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=thieneVI2025.js.map