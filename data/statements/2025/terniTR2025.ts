// terniTR2025.ts
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

export const imuRatesTerniTR2025: ImuRateEntry[] = [
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
    "ratePercent": 0,
    "officialDescription": "Terreni agricoli",
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
    "label": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    "ratePercent": 0.0011200000000000001,
    "officialDescription": "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    "ratePercent": 0.0011200000000000001,
    "officialDescription": "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero - Ulteriori condizioni non rinvenibili tra quelle proposte nella presente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota oltre la misura dell’1,06%: Occorre precisare che, oltre agli immobili ad uso abitativo locati a canone di libero mercato, scontano l'aliquota dell' 1,12 % anche le seguenti fattispecie di immobili ad uso abitativo:- Immobili ad uso abitativo concessi in comodato d'uso gratuito a soggetti che non sono parenti in linea retta entro il primo grado del soggetto passivo; - Immobili ad uso abitativo con contratti di locazione stipulati al di fuori degli accordi stabiliti fra le organizzazioni della proprietà edilizia e le organizzazioni dei conduttori, ai sensi della legge 09/12/1998 n.431; - Immobili ad uso abitativo che non sono alloggi regolarmente assegnati dagli Istituti autonomi per le case popolari e dagli enti di edilizia residenziale pubblica; - Immobili ad uso abitativo che non sono stati realizzati nell’ambito dei programmi triennali per l'edilizia residenziale pubblica.",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Immobili di categoria A/10, Categoria catastale",
    "ratePercent": 0.0011200000000000001,
    "categoryTypes": [
      "A/10"
    ],
    "officialDescription": "Immobili di categoria A10, Categoria catastale:",
    "conditions": [
      {
        "description": "L'entità ha categoria A/10",
        "predicate": "['A/10'].includes(entity.category)"
      }
    ]
  },
  {
    "label": "Immobili di categoria C",
    "ratePercent": 0.0011200000000000001,
    "categoryTypes": [
      "C/2",
      "C/6",
      "C/7"
    ],
    "officialDescription": "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Ulteriori condizioni non rinvenibili tra quelle proposte nella presente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota oltre la misura dell’1,06%: Occorre precisare che l'aliquota del 1,12 % per gli immobili di categoria C/2, C/6 e C/7, si applica nei casi in cui:- gli immobili non sono pertinenza dell'abitazione principale del soggetto passivo;- gli immobili non sono pertinenza di immobili ad uso abitativo, di proprietà del soggetto passivo, concessi in comodato gratuito, unitamente agli stessi, a parenti in linea retta entro il primo grado del soggetto passivo;- gli immobili non sono pertinenza di immobili ad uso abitativo, di proprietà del soggetto passivo, locati, unitamente agli stessi, secondo gli accordi stabiliti fra le organizzazioni della proprietà edilizia e le organizzazioni dei conduttori, ai sensi della legge 09/12/1998 n.431.",
    "conditions": [
      {
        "description": "L'entità ha categoria C/2 o C/6 o C/7",
        "predicate": "['C/2','C/6','C/7'].includes(entity.category)"
      }
    ]
  }
];
