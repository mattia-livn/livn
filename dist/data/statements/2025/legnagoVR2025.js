"use strict";
// legnagoVR2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesLegnagoVR2025 = void 0;
exports.imuRatesLegnagoVR2025 = [
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
        "ratePercent": 0.00106,
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
        "ratePercent": 0.00091,
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
        "label": "Fabbricati appartenenti al gruppo catastale D",
        "ratePercent": 0.00082,
        "categoryTypes": [
            "D/1",
            "D/2",
            "D/3",
            "D/7",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/2 o D/3 o D/7 o D/8",
                "predicate": "['D/1','D/2','D/3','D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/1 Negozi e botteghe",
        "ratePercent": 0.00083,
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
    },
    {
        "label": "Immobili di categoria C/3 Laboratori per arti e mestieri",
        "ratePercent": 0.0008,
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
        "label": "Immobili di categoria C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro e C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
        "ratePercent": 0.00085,
        "categoryTypes": [
            "C/4",
            "C/5"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria C/4 o C/5",
                "predicate": "['C/4','C/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
        "ratePercent": 0.00053,
        "officialDescription": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria A/10 Uffici e studi privati",
        "ratePercent": 0.00099,
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
        "label": "Immobili di categoria /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme, /2 Case di cura ed ospedali senza fine di lucro, /3 Prigioni e riformatori, /4 Uffici pubblici, /5 Scuole e laboratori scientifici, /6 Biblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9, /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto, /8 Magazzini sotterranei per depositi di derrate",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "/1",
            "/2",
            "/3",
            "/4",
            "/5",
            "/6",
            "/7",
            "/8"
        ],
        "officialDescription": "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate",
        "conditions": [
            {
                "description": "L'entità ha categoria /1 o /2 o /3 o /4 o /5 o /6 o /7 o /8",
                "predicate": "['/1','/2','/3','/4','/5','/6','/7','/8'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=legnagoVR2025.js.map