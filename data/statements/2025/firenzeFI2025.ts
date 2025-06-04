// firenzeFI2025.ts
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

export const imuRatesFirenzeFI2025: ImuRateEntry[] = [
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
    "label": "Fabbricati appartenenti al gruppo catastale D in zone soggette ad un alto tasso di abbandono di attività economico-commerciale, utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: zone individuate con appositi atti dell'amministrazione comunale - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona fisica di eta' non superio ad anni: 40 - Tipologia di attivit�: Attivita' innovative - Start up",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D in zone soggette ad un alto tasso di abbandono di attività economico-commerciale, locati",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: zone individuate con appositi atti dell'amministrazione comunale - Fabbricati a disposizione o utilizzati: Immobili locati - Requisiti soggettivi del locatario: Persona fisica di eta' non superio ad anni: 40 - Tipologia di attivit�: Attivita' innovative - Start up",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D/3, utilizzati direttamente dal soggetto passivo per attività di proiezione cinematografica",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D/3, concessi in comodato per attività di proiezione cinematografica",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D/3, utilizzati direttamente dal soggetto passivo per gestione di teatri, sale da concerto e altre strutture artistiche",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Codice ATECO: 90.04.00 - Gestione di teatri, sale da concerto e alt struttu artistiche",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D/3, concessi in comodato per gestione di teatri, sale da concerto e altre strutture artistiche",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Codice ATECO: 90.04.00 - Gestione di teatri, sale da concerto e alt struttu artistiche - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  }
];
