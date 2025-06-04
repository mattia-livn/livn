// bussolengoVR2025.ts
// Migrato automaticamente dal formato legacy

export interface ImuRateCondition {
  description: string;
  predicate: string;
}

export interface ImuRateEntry {
  label: string;
  ratePercent: number;
  categoryTypes?: string[];
  officialDescription: string;
  conditions: ImuRateCondition[];
}

export const imuRatesBussolengoVR2025: ImuRateEntry[] = [
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
    "ratePercent": 0.001,
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
    "label": "Immobili di categoria A/10, C/1, C/3",
    "ratePercent": 0.00098,
    "categoryTypes": [
      "A/10",
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/1 o C/3",
        "predicate": "['A/10','C/1','C/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria /1, /2, /3, /4, /5, /6, /7, /8",
    "ratePercent": 0.001,
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
  },
  {
    "label": "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito, categoria catastale A/2, A/3",
    "ratePercent": 0.0007,
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
    "label": "Abitazione utilizzata direttamente dal soggetto passivo, categoria catastale A/1, A/8, A/9, con requisiti specifici",
    "ratePercent": 0.0003,
    "categoryTypes": [
      "A/1",
      "A/8",
      "A/9"
    ],
    "officialDescription": "Abitazione utilizzata di ttamente dal soggetto passivo Categoria catastale: - A/1 Abitazioni di tipo signorile - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Requisiti del soggetto passivo: Portato di handicap grave riconosciuto ai sensi dell'art. 3, comma 3, della L. 104/92 - Reddito ISEE del soggetto passivo non superio a € 20000,00",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/8 o A/9",
        "predicate": "['A/1','A/8','A/9'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione utilizzata direttamente dal soggetto passivo, categoria catastale A/1, A/8, A/9, con invalidità civile",
    "ratePercent": 0.0003,
    "categoryTypes": [
      "A/1",
      "A/8",
      "A/9"
    ],
    "officialDescription": "Abitazione utilizzata di ttamente dal soggetto passivo Categoria catastale: - A/1 Abitazioni di tipo signorile - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Requisiti del soggetto passivo: Soggetto con invalidita' civile riconosciuta in percentuale non inferio al: 100% - Reddito ISEE del soggetto passivo non superio a € 20000,00",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/8 o A/9",
        "predicate": "['A/1','A/8','A/9'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1, C/3, utilizzati direttamente dal soggetto passivo come bottega storica o artigiana",
    "ratePercent": 0.0007,
    "categoryTypes": [
      "C/1",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1 o C/3",
        "predicate": "['C/1','C/3'].includes(entity.category)"
      }
    ]
  }
];
