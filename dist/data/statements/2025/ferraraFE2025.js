"use strict";
// ferraraFE2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesFerraraFE2025 = void 0;
exports.imuRatesFerraraFE2025 = [
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
        "ratePercent": 0.00102,
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
        "ratePercent": 0.0009,
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
        "ratePercent": 0.00102,
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
        "ratePercent": 0.00102,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/7 e D/8 in zona ZLS Emilia Romagna",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D/7",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: nuove costruzioni alizzate su a e ricomp se nella ZLS Emilia Romagna istituita con DPCM del 10.10.2024 nel rispetto del Piano di sviluppo strategico della Regione Emilia Romagna",
        "conditions": [
            {
                "description": "L'entità ha categoria D/7 o D/8",
                "predicate": "['D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/2",
        "ratePercent": 0.0009,
        "categoryTypes": [
            "D/2"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/2",
                "predicate": "['D/2'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/5",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/5"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria D/5",
                "predicate": "['D/5'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D, categorie D/1, D/2, D/3, D/4, D/6, D/7, D/8",
        "ratePercent": 0.00106,
        "categoryTypes": [
            "D/1",
            "D/2",
            "D/3",
            "D/4",
            "D/6",
            "D/7",
            "D/8"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali",
        "conditions": [
            {
                "description": "L'entità ha categoria D/1 o D/2 o D/3 o D/4 o D/6 o D/7 o D/8",
                "predicate": "['D/1','D/2','D/3','D/4','D/6','D/7','D/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato con contratti specifici",
        "ratePercent": 0.0005,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/8",
            "A/9"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8 o A/9",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8','A/9'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
        "ratePercent": 0.0005200000000000001,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
        "ratePercent": 0.0009,
        "categoryTypes": [
            "A/1",
            "A/2",
            "A/3",
            "A/4",
            "A/5",
            "A/6",
            "A/7",
            "A/8",
            "A/9"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
        "conditions": [
            {
                "description": "L'entità ha categoria A/1 o A/2 o A/3 o A/4 o A/5 o A/6 o A/7 o A/8 o A/9",
                "predicate": "['A/1','A/2','A/3','A/4','A/5','A/6','A/7','A/8','A/9'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=ferraraFE2025.js.map