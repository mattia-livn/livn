"use strict";
// astiAT2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesAstiAT2025 = void 0;
exports.imuRatesAstiAT2025 = [
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
        "ratePercent": 0.00066,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/2",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D/2"
        ],
        "officialDescription": "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 55 - ALLOGGIO",
        "conditions": [
            {
                "description": "L'entità ha categoria D/2",
                "predicate": "['D/2'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categorie D/1, D/7, D/8",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/1",
            "D/7",
            "D/8"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: Ad esclusione degli immobili ricadenti in localizzazioni commerciali, come definite dalla deliberazione del Consiglio gionale Piemonte n. 563-13414/1999 e s.m.i. - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/7 o D/8",
                "predicate": "['D/1','D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Altri fabbricati, immobili di categoria C, categoria C/1",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Zone esterne al centro abitato urbano della città di Asti, come individuato ai sensi del Codice della strada - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
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
        "label": "Altri fabbricati, immobili di categoria C, categorie C/1, C/2, C/3",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "C/1",
            "C/2",
            "C/3"
        ],
        "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: Ad esclusione degli immobili ricadenti in localizzazioni commerciali, come definite dalla deliberazione del Consiglio gionale Piemonte n. 563-13414/1999 e s.m.i. - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/2 o C/3",
                "predicate": "['C/1','C/2','C/3'].includes(entity.category)"
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
        "label": "Altri fabbricati, abitazione locata o in comodato, categorie A/3, A/4, A/5, A/6",
        "ratePercent": 0.0005600000000000001,
        "categoryTypes": [
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/3','A/4','A/5','A/6'].includes(entity.category)"
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
        "label": "Altri fabbricati, abitazione locata o in comodato a studenti, categorie A/3, A/4, A/5, A/6",
        "ratePercent": 0.0005600000000000001,
        "categoryTypes": [
            "A/3",
            "A/4",
            "A/5",
            "A/6"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i. Categoria catastale: - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - Condizioni locatario/comodatario: Studenti",
        "conditions": [
            {
                "description": "L'entità ha categoria A/3 o A/4 o A/5 o A/6",
                "predicate": "['A/3','A/4','A/5','A/6'].includes(entity.category)"
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
    }
];
//# sourceMappingURL=astiAT2025.js.map