"use strict";
// sanLazzaroDiSavenaBO2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesSanLazzaroDiSavenaBO2025 = void 0;
exports.imuRatesSanLazzaroDiSavenaBO2025 = [
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
        "label": "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni non ammesse",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni non ammesse dalle schede normative di PSC per gli stessi ambiti in vigo al 1° gennaio dell’anno di imposta - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attività: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni ammesse",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni ammesse dalle schede normative di PSC per gli stessi ambiti in vigo dal 1° gennaio dell’anno di riferimento - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attività: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni ammesse e privi di giochi di azzardo",
        "ratePercent": 0.00076,
        "categoryTypes": [
            "D"
        ],
        "officialDescription": "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni ammesse dalle schede normative di PSC per gli stessi ambiti in vigo dal 1° gennaio dell’anno di riferimento - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Privi o che intendono dismette giochi di azzardo",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    },
    {
        "label": "Terreni agricoli coltivati destinati a produzione agricola biologica",
        "ratePercent": 0.00076,
        "officialDescription": "Ter ni agricoli - Utilizzo: Coltivati e destinati ad alcuni tipi di coltura: Produzione agricola biologica - Collocazione: Ter ni ricadenti in determinate a e: A a: per i ter ni agricoli coltivati destinati a produzione agricola biologica ad esclusione dei ter ni ricadenti in a e montane o di collina per i cui fogli e mappali trova applicazione l'esenzione aliquota 0.00%",
        "conditions": [
            {
                "description": "È un terreno agricolo",
                "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
            }
        ]
    },
    {
        "label": "Terreni agricoli coltivati in specifiche aree",
        "ratePercent": 0,
        "officialDescription": "Ter ni agricoli - Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: F16,DA 24 A 27, 31,34,35,DA37A48 F21 M 134, 135, 172, 179, 180, DA 233 A 241, DA 243 A 245,DA 250 A 257- F28 M. 55, 59, 65, DA 69 A 72, 74, 75, DA 85 A 89, DA 118 A 122, DA126 A 132, 140, 193, 194, DA 198 A 200, 222, 223, 226, 227, DA 234 A 254, 474 - F29M 108, DA 110 A 113, DA 125 A 129, DA 145 A 148 - F30 ESCL M DA 1 A 23, 32, 133 - F32 ESCL M DA 1 A 5, 89, 108 - F33 M. 28, 29, 36, DA 38 A 45; DA 59 A 85; 94, 95 - F36 ESCL M 23, DA 46 A 69, DA 71 A 74, DA 80 A 89, DA 91 A 123, DA 152 A 159",
        "conditions": [
            {
                "description": "È un terreno agricolo",
                "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
            }
        ]
    }
];
//# sourceMappingURL=sanLazzaroDiSavenaBO2025.js.map