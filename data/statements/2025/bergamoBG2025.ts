// bergamoBG2025.ts
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

export const imuRatesBergamoBG2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.0004,
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
    "ratePercent": 0.0004,
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
    "ratePercent": 0.00076,
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
    "label": "Abitazione locata o in comodato con contratto di locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    "ratePercent": 0.0006,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 Negozi e botteghe con superficie non superiore a 250 MQ",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Superficie: Non superio a Mq 250 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 47 - COMMERCIO AL D TAGLIO ESCLUSO QUELLO DI AUTOVEICOLI E DI MOTOCICLI",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 Negozi e botteghe con superficie non superiore a 250 MQ",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Superficie: Non superio a Mq 250 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 45 - COMMERCIO ALL'INGROSSO E AL D TAGLIO E RIPARAZIONE DI AUTOVEICOLI E MOTOCICLI",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 Negozi e botteghe con superficie non superiore a 100 MQ",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe - Superficie: Non superio a Mq 100 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 56 - ATTIVITA' DEI SERVIZI DI RISTORAZIONE",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C/1 Negozi e botteghe con superficie non superiore a 100 MQ",
    "ratePercent": 0.00076,
    "categoryTypes": [
      "C/1"
    ],
    "officialDescription": "Categoria catastale: - C/1 Negozi e botteghe - Superficie: Non superio a Mq 100 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana",
    "conditions": [
      {
        "description": "L'entità ha categoria C/1",
        "predicate": "['C/1'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    "ratePercent": 0.0009599999999999999,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    "ratePercent": 0.0009,
    "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  }
];
