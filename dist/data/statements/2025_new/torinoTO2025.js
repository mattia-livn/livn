"use strict";
// torinoTO2025.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.imuRatesTorinoTO2025 = void 0;
exports.imuRatesTorinoTO2025 = [
    {
        label: "Abitazione principale A/1, A/8, A/9 e relative pertinenze",
        ratePercent: 0.006,
        categoryTypes: ["A/1", "A/8", "A/9", "C/2", "C/6", "C/7"],
        officialDescription: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
        conditions: [
            {
                description: "L'entità è un fabbricato",
                predicate: "entity.type === 'fabbricato'"
            },
            {
                description: "L'entità è stata indicata come abitazione principale",
                predicate: "entity.isMainResidence === true"
            },
            {
                description: "L'entità ha categoria A/1, A/8 o A/9",
                predicate: "['A/1','A/8','A/9'].includes(entity.category)"
            },
            {
                description: "L'entità ha categoria C/2, C/6 o C/7 ed è pertinenza di un A/1, A/8 o A/9 indicato come abitazione principale",
                predicate: "['C/2','C/6','C/7'].includes(entity.category) && entity.isAppurtenanceOf?.some(e => ['A/1','A/8','A/9'].includes(e.category) && e.isMainResidence)"
            }
        ]
    },
    {
        label: "Assimilazione abitazione principale per anziani/disabili",
        ratePercent: 0.006,
        officialDescription: "Assimilazione all'abitazione principale dell'unità immobiliare posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c), n. 6), della legge n. 160 del 2019",
        conditions: [
            {
                description: "L'immobile è posseduto da un anziano o disabile",
                predicate: "entity.ownerIsElderlyOrDisabled === true"
            },
            {
                description: "Il proprietario è ricoverato o domiciliato in struttura di assistenza",
                predicate: "entity.ownerIsInstitutionalized === true"
            }
        ]
    },
    {
        label: "Fabbricato rurale ad uso agricolo",
        ratePercent: 0.001,
        categoryTypes: ["D/10", "C/2", "C/6", "C/7"],
        officialDescription: "Fabbricati rurali ad uso strumentale (inclusa la categoria catastale D/10)",
        conditions: [
            {
                description: "Il fabbricato è utilizzato per attività agricola",
                predicate: "entity.isAgriculturalUse === true"
            },
            {
                description: "Il proprietario è un coltivatore diretto o imprenditore agricolo",
                predicate: "entity.ownerIsAgriculturalEntrepreneur === true"
            }
        ]
    },
    {
        label: "Fabbricati gruppo D (escluso D/10)",
        ratePercent: 0.0106,
        categoryTypes: ["D/1", "D/2", "D/3", "D/4", "D/5", "D/6", "D/7", "D/8", "D/9"],
        officialDescription: "Fabbricati appartenenti al gruppo catastale D (esclusa la categoria catastale D/10)",
        conditions: [
            {
                description: "L'entità ha categoria D diversa da D/10",
                predicate: "entity.category.startsWith('D') && entity.category !== 'D/10'"
            }
        ]
    },
    {
        label: "Terreno agricolo",
        ratePercent: 0.0106,
        officialDescription: "Terreni agricoli",
        conditions: [
            {
                description: "È un terreno agricolo",
                predicate: "entity.type === 'terreno' && entity.isAgricultural === true"
            }
        ]
    },
    {
        label: "Area fabbricabile",
        ratePercent: 0.0096,
        officialDescription: "Aree fabbricabili",
        conditions: [
            {
                description: "Il terreno è edificabile secondo PRG o catasto",
                predicate: "entity.isBuildable === true"
            }
        ]
    },
    {
        label: "Fabbricato ordinario (no abitazione principale né gruppo D)",
        ratePercent: 0.0106,
        officialDescription: "Fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
        conditions: [
            {
                description: "Non è abitazione principale",
                predicate: "entity.isMainResidence !== true"
            },
            {
                description: "Non è del gruppo D",
                predicate: "!entity.category.startsWith('D')"
            }
        ]
    },
    {
        label: "Fabbricato D/3 attività cinematografica (ATECO 59.14.00)",
        ratePercent: 0.0096,
        categoryTypes: ["D/3"],
        officialDescription: "Fabbricati D/3 con codice ATECO 59.14.00 - Attività di proiezione cinematografica",
        conditions: [
            {
                description: "Categoria catastale D/3",
                predicate: "entity.category === 'D/3'"
            },
            {
                description: "Codice ATECO 59.14.00",
                predicate: "entity.atecoCode === '59.14.00'"
            }
        ]
    },
    {
        label: "Fabbricati D/1 o D/7 usati da startup innovative (ATECO 72.1)",
        ratePercent: 0.0086,
        categoryTypes: ["D/1", "D/7"],
        officialDescription: "Fabbricati D/1 o D/7 utilizzati da startup innovative con codice ATECO 72.1",
        conditions: [
            {
                description: "Categoria catastale D/1 o D/7",
                predicate: "['D/1','D/7'].includes(entity.category)"
            },
            {
                description: "Codice ATECO 72.1",
                predicate: "entity.atecoCode === '72.1'"
            },
            {
                description: "Startup attiva da meno di 24 mesi",
                predicate: "entity.tenantCompanyAgeMonths <= 24"
            }
        ]
    },
    {
        label: "Abitazione locata/comodato con ente per accoglienza migranti",
        ratePercent: 0.0086,
        categoryTypes: ["A/2", "A/3", "A/4", "A/5", "A/6", "A/7"],
        officialDescription: "Soggetti affidatari dei servizi di accoglienza integrata destinati a richiedenti asilo e titolari di protezione internazionale o umanitaria",
        conditions: [
            {
                description: "Il locatario è un ente per l'accoglienza migranti",
                predicate: "entity.tenantIsMigrantSupportOrg === true"
            }
        ]
    },
    {
        label: "Abitazione locata a canone concordato (art. 2, c.3 L.431/1998)",
        ratePercent: 0.00575,
        categoryTypes: ["A/2", "A/3", "A/4", "A/5", "A/6", "A/7"],
        officialDescription: "Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
        conditions: [
            {
                description: "Il contratto è a canone concordato",
                predicate: "entity.contractType === 'canone_concordato'"
            }
        ]
    },
    {
        label: "Abitazione locata a studenti (art. 5, c.2 L.431/1998)",
        ratePercent: 0.00575,
        categoryTypes: ["A/2", "A/3", "A/4", "A/5", "A/6", "A/7"],
        officialDescription: "Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
        conditions: [
            {
                description: "Il contratto è per studenti",
                predicate: "entity.contractType === 'studenti'"
            }
        ]
    },
    {
        label: "Abitazione locata con contratto transitorio (art. 5, c.3 L.431/1998)",
        ratePercent: 0.00575,
        categoryTypes: ["A/2", "A/3", "A/4", "A/5", "A/6", "A/7"],
        officialDescription: "Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
        conditions: [
            {
                description: "Il contratto è transitorio",
                predicate: "entity.contractType === 'transitorio'"
            }
        ]
    },
    {
        label: "Fabbricati A/10, C/2, C/3 usati da startup innovative (ATECO 72.1)",
        ratePercent: 0.0086,
        categoryTypes: ["A/10", "C/2", "C/3"],
        officialDescription: "Immobili A/10, C/2, C/3 utilizzati da startup innovative con codice ATECO 72.1",
        conditions: [
            {
                description: "Categoria catastale A/10, C/2 o C/3",
                predicate: "['A/10','C/2','C/3'].includes(entity.category)"
            },
            {
                description: "Codice ATECO 72.1",
                predicate: "entity.atecoCode === '72.1'"
            },
            {
                description: "Startup attiva da meno di 24 mesi",
                predicate: "entity.tenantCompanyAgeMonths <= 24"
            }
        ]
    }
];
//# sourceMappingURL=torinoTO2025.js.map