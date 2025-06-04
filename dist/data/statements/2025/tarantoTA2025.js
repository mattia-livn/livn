"use strict";
// tarantoTA2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesTarantoTA2025 = void 0;
exports.imuRatesTarantoTA2025 = [
    {
        "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        "ratePercent": 0.0005,
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
        "ratePercent": 0.0005,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/3",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/3"
        ],
        "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/3",
                "predicate": "['D/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categorie catastali D/1, D/2, D/4, D/5, D/6, D/7, D/8, D/9",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/1",
            "D/2",
            "D/4",
            "D/5",
            "D/6",
            "D/7",
            "D/8",
            "D/9"
        ],
        "officialDescription": "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19;escluse da agevolazione le imp se del carboniero Reg.CE n.1407/2002 e siderurgia all. discipl. multisett.aiuti g.li destinati ai grandi progetti invest.di cui alla Com.C 2002315 GUCE C70/02 - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attivit�: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/2 o D/4 o D/5 o D/6 o D/7 o D/8 o D/9",
                "predicate": "['D/1','D/2','D/4','D/5','D/6','D/7','D/8','D/9'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato",
        "ratePercent": 0.00092,
        "categoryTypes": [
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/11"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/11",
                "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7','A/11'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
        "ratePercent": 0.0004,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Immobili di categoria C, oggetto di attività di recupero per miglioramento del decoro urbano o della classe energetica",
        "ratePercent": 0.00053,
        "categoryTypes": [
            "C/1",
            "C/2",
            "C/3",
            "C/4"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19;escluse da agevolazione le imp se del carboniero Reg.CE n.1407/2002 e siderurgia all. discipl. multisett.aiuti g.li destinati ai grandi progetti invest.di cui alla Com.C 2002315 GUCE C70/02 - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attivit�: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/2 o C/3 o C/4",
                "predicate": "['C/1','C/2','C/3','C/4'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C, collocazione immobile: Centro storico Città vecchia",
        "ratePercent": 0,
        "categoryTypes": [
            "C/1",
            "C/2",
            "C/3",
            "C/4"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: Centro storico Citt� vecchia - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1 o C/2 o C/3 o C/4",
                "predicate": "['C/1','C/2','C/3','C/4'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=tarantoTA2025.js.map