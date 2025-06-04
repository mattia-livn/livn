// genovaGE2025.ts
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

export const imuRatesGenovaGE2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.00058,
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
    "ratePercent": 0.00058,
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
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 Opifici, utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0.0008399999999999999,
    "categoryTypes": [
      "D/1"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 36 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72 - RICERCA SCIENTIFICA E SVILUPPO",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1",
        "predicate": "['D/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 Opifici, immobili locati",
    "ratePercent": 0.0008399999999999999,
    "categoryTypes": [
      "D/1"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili locati - Requisiti soggettivi del locatario: Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 36 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72 - RICERCA SCIENTIFICA E SVILUPPO",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1",
        "predicate": "['D/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 Opifici e D/7, utilizzati direttamente dal soggetto passivo",
    "ratePercent": 0.0008399999999999999,
    "categoryTypes": [
      "D/1",
      "D/7"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Tipologia di attivit�: Imp se che hanno ampliato la propria",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/7",
        "predicate": "['D/1','D/7'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del locatario, comodatario o soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 Opifici, utilizzati direttamente dal soggetto passivo con meno di 49 dipendenti",
    "ratePercent": 0.00101,
    "categoryTypes": [
      "D/1"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Numero di dipendenti non superio a, specifica indica il numero dei dipendenti: 49",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1",
        "predicate": "['D/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/1 Opifici, utilizzati direttamente dal soggetto passivo, microimprese",
    "ratePercent": 0.00101,
    "categoryTypes": [
      "D/1"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Tipologia di attivit�: Microimp se",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1",
        "predicate": "['D/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Aree fabbricabili diverse da residenziali situate nel Distretto di Trasformazione n. 20 Fiera-Kennedy",
    "ratePercent": 0.00076,
    "officialDescription": "- Tipologia: Diverse da sidenziali - Situate in determinate zone: Dist tto di Trasformazione n. 20 Fiera-Kennedy in base al PUC del Comune di Genova D.D. 2015/118.0.0./18 del 27.11.2015",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili residenziali situate nel Distretto di Trasformazione n. 20 Fiera-Kennedy",
    "ratePercent": 0.00076,
    "officialDescription": "- Tipologia: Residenziali - Situate in determinate zone: Dist tto di Trasformazione n. 20 Fiera-Kennedy in base al PUC del Comune di Genova D.D. 2015/118.0.0./18 del 27.11.2015",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  }
];
