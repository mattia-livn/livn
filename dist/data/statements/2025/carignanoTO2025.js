"use strict";
// carignanoTO2025.ts
// Migrato automaticamente dal formato legacy
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesCarignanoTO2025 = void 0;
exports.imuRatesCarignanoTO2025 = [
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
        "ratePercent": 0.001035,
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
        "ratePercent": 0.0009350000000000001,
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
        "ratePercent": 0.001035,
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
        "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/5",
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
        "label": "Immobili di categoria C, categoria C/1 Negozi e botteghe",
        "ratePercent": 0.0009350000000000001,
        "categoryTypes": [
            "C/1"
        ],
        "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe",
        "conditions": [
            {
                "description": "L'entità ha categoria C/1",
                "predicate": "['C/1'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Immobili di categoria A/10, C, varie categorie",
        "ratePercent": 0.000985,
        "categoryTypes": [
            "A/10",
            "C/1",
            "C/2",
            "C/3",
            "C/4",
            "C/5",
            "C/6",
            "C/7",
            "C/8"
        ],
        "officialDescription": "Categoria catastale: - A/10 Uffici e studi privati - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
        "conditions": [
            {
                "description": "L'entità ha categoria A/10 o C/1 o C/2 o C/3 o C/4 o C/5 o C/6 o C/7 o C/8",
                "predicate": "['A/10','C/1','C/2','C/3','C/4','C/5','C/6','C/7','C/8'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
        "ratePercent": 0.0009599999999999999,
        "categoryTypes": [
            "A/2",
            "A/3"
        ],
        "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico",
        "conditions": [
            {
                "description": "L'entità ha categoria A/2 o A/3",
                "predicate": "['A/2','A/3'].includes(entity.category)"
            }
        ]
    },
    {
        "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
        "ratePercent": 0.00078,
        "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
        "conditions": [
            {
                "description": "Condizione applicabile in base al regolamento comunale",
                "predicate": "true // Da specificare in base alle condizioni locali"
            }
        ]
    }
];
//# sourceMappingURL=carignanoTO2025.js.map