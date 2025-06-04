// ozzanoDellemiliaBO2025.ts
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

export const imuRatesOzzanoDellemiliaBO2025: ImuRateEntry[] = [
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
    "label": "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo per attività produttiva e/o commerciale",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "- Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Terreni agricoli esenti",
    "ratePercent": 0,
    "officialDescription": "- Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: FOGLI CATASTALI TUTTI I MAPPALI: N. 37 – N. 38 – DAL N. 40 AL N. 58 – N. 60 – N. 68; FOGLIO CATASTALE N. 32, LIMITATAMENTE AI MAPPALI: N. 34 –N. 40 –N. 48 – DAL N. 103 AL N. 119 – DAL N. 121 AL N. 132 – N. 144 – N. 145 – N. 152 – DAL N. 325 AL N. 329; FOGLIO CATASTALE N. 59, LIMITATAMENTE AI MAPPALI: DAL N. 1 AL N. 5 – N. 7;",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Altri fabbricati di categoria A10, C utilizzati per attività produttiva e/o commerciale",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
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
    "label": "Altri fabbricati di categoria A10, C utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
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
    "label": "Altri fabbricati di categoria A10, C locati o concessi in comodato per attività produttiva e/o commerciale",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge. - Limitatamente ad un solo immobile.",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
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
    "label": "Altri fabbricati di categoria A10, C locati o concessi in comodato per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    "ratePercent": 0.0009599999999999999,
    "categoryTypes": [
      "A10",
      "C"
    ],
    "officialDescription": "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge. - Limitatamente ad un solo immobile.",
    "conditions": [
      {
        "description": "L'entità ha categoria A10",
        "predicate": "['A10'].includes(entity.category)"
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
    "label": "Abitazione locata o in comodato con contratto registrato, utilizzata come abitazione principale",
    "ratePercent": 0.00086,
    "categoryTypes": [
      "A/2",
      "A/3",
      "A/4",
      "A/5",
      "A/6",
      "A/7"
    ],
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    "conditions": [
      {
        "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
        "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
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
  }
];
