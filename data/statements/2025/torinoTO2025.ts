// torinoTO2025.ts
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

export const imuRatesTorinoTO2025: ImuRateEntry[] = [
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
    "ratePercent": 0.0009599999999999999,
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
    "label": "Fabbricati appartenenti al gruppo catastale D, categoria D/3",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "D/3"
    ],
    "officialDescription": "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica",
    "conditions": [
      {
        "description": "L'entità ha categoria D/3",
        "predicate": "['D/3'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D, categorie D/1 e D/7",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "D/1",
      "D/7"
    ],
    "officialDescription": "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72.1 - RICERCA E SVILUPPO SPERIMENTALE NEL CAMPO DELLE SCIENZE NATURALI E DELL'INGEGNERIA",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/7",
        "predicate": "['D/1','D/7'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Altri fabbricati, abitazione locata o in comodato, categorie A/2, A/3, A/4, A/5",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A/2",
      "A/3",
      "A/4",
      "A/5"
    ],
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola",
    "conditions": [
      {
        "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5",
        "predicate": "['A/2','A/3','A/4','A/5'].includes(entity.category)"
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
    "label": "Altri fabbricati, abitazione locata o in comodato, categorie A/6, A/7",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A/6",
      "A/7"
    ],
    "officialDescription": "- A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Soggetti affidatari dei servizi di accoglienza integrata destinati a richiedenti asilo e titolari di protezione internazionale o umanitaria",
    "conditions": [
      {
        "description": "L'entità ha categoria A/6 o A/7",
        "predicate": "['A/6','A/7'].includes(entity.category)"
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
    "label": "Altri fabbricati, abitazione locata o in comodato, locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    "ratePercent": 0.000575,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
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
    "label": "Altri fabbricati, abitazione locata o in comodato, locazione a studenti",
    "ratePercent": 0.000575,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    "conditions": [
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
    "label": "Altri fabbricati, abitazione locata o in comodato, locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998",
    "ratePercent": 0.000575,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
    "conditions": [
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
    "label": "Altri fabbricati, immobili di categoria A10, C",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A/10",
      "C/2",
      "C/3"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72.1 - RICERCA E SVILUPPO SPERIMENTALE NEL CAMPO DELLE SCIENZE NATURALI E DELL'INGEGNERIA",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/2 o C/3",
        "predicate": "['A/10','C/2','C/3'].includes(entity.category)"
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
