// rezzatoBS2025.ts
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

export const imuRatesRezzatoBS2025: ImuRateEntry[] = [
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
    "ratePercent": 0.00103,
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
    "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.00103,
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
    "label": "Fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.0009,
    "categoryTypes": [
      "D/1",
      "D/2",
      "D/5",
      "D/6",
      "D/7",
      "D/8"
    ],
    "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del locatario, comodatario o soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/2 o D/5 o D/6 o D/7 o D/8",
        "predicate": "['D/1','D/2','D/5','D/6','D/7','D/8'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.00092,
    "categoryTypes": [
      "D/1",
      "D/7",
      "D/8"
    ],
    "officialDescription": "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    "conditions": [
      {
        "description": "L'entità ha categoria D/1 o D/7 o D/8",
        "predicate": "['D/1','D/7','D/8'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Terreni agricoli",
    "ratePercent": 0.00094,
    "officialDescription": "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: dal 17 in poi ubicati a sud del Naviglio",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    "ratePercent": 0.0006,
    "officialDescription": "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria A10, C",
    "ratePercent": 0.0009,
    "categoryTypes": [
      "A/10",
      "C/1",
      "C/2",
      "C/3",
      "C/4",
      "C/6"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del locatario, comodatario o soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/1 o C/2 o C/3 o C/4 o C/6",
        "predicate": "['A/10','C/1','C/2','C/3','C/4','C/6'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato",
    "ratePercent": 0.00099,
    "categoryTypes": [
      "A/2",
      "A/3",
      "A/4",
      "A/5",
      "A/6",
      "A/7"
    ],
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    "conditions": [
      {
        "description": "L'entità ha categoria A/2 o A/3 o A/4 o A/5 o A/6 o A/7",
        "predicate": "['A/2','A/3','A/4','A/5','A/6','A/7'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria A10, C",
    "ratePercent": 0.00092,
    "categoryTypes": [
      "A/10",
      "C/1",
      "C/2",
      "C/3",
      "C/4",
      "C/6"
    ],
    "officialDescription": "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10 o C/1 o C/2 o C/3 o C/4 o C/6",
        "predicate": "['A/10','C/1','C/2','C/3','C/4','C/6'].includes(entity.category)"
      }
    ]
  }
];
