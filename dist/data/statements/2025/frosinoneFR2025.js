"use strict";
// frosinoneFR2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesFrosinoneFR2025 = void 0;
exports.imuRatesFrosinoneFR2025 = [
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
        "label": "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Ciamarra,Via de Gasperi, Via Fi nze, Piazza Gramsci, Via ragaglia, Via Angeloni, Piazza Valchera, Via/Piazza Garibaldi, Via Minghetti,Via Plebiscito,Via attisti,Viale Roma,Via Fosse Ardeatine,Piazza Risorgimento,Via Sella ,Via/Piazza Paleario, - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Giordano runo, Via Alighieri, Largo Amendola, Piazza Cairoli, Via Cavour, Via Cip sso, Via Colle Campagiorni, Via Forma, Via Guglielmi, Piazza IV Novemb , Largo San Silverio, Via Lecce, Via Maccari, Vicolo Moccia, Vicolo Paglia ruciate, - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
        "ratePercent": 0.00086,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Piazza Diamanti, Piazza Vittorio Veneto, Via Rattazzi, Corso della Repubblica, Via Ricciotti, Via San Gerardo Maiella, Via XX Settemb , Via Ferra lli, Via righindi, Via Marconi. - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    }
];
//# sourceMappingURL=frosinoneFR2025.js.map