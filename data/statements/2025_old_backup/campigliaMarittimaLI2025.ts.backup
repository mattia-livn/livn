export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCampigliaMarittimaLI2025: ImuRateEntry[] = [
  {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
},
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.58
    categoryTypes: ["A/1","A/8","A/9"]
  ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "categoria catastale",
                  "A/1",
                  "A/8",
                  "A/9"
            ],
            "specificCategories": [
                  "A/1",
                  "A/8",
                  "A/9"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Abitazione",
                  "categoria catastale",
                  "A/1",
                  "A/8",
                  "A/9"
            ],
            "specificCategories": [
                  "A/1",
                  "A/8",
                  "A/9"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "Abitazione principale"
            ]
      },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.58
    categoryTypes: []
    context: "Posseduta da anziani o disabili"
  ,
    requiredParameters: {
      required: [
      {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "abitazione principale"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "abitazione"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "abitazione principale"
            ]
      },
  {
            "name": "caratteristicheSoggetto",
            "type": "conditional",
            "questions": [
                  "Ha particolari caratteristiche (handicap, invalidità, età)?",
                  "È una ONLUS o ente del terzo settore?",
                  "È studente o anziano?"
            ],
            "validationRules": [
                  "Must specify if special subject characteristics apply"
            ],
            "detectedValues": [
                  "anziani"
            ]
      },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0
    categoryTypes: ["D/10"]
  ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "categoria catastale",
                  "D/10"
            ],
            "specificCategories": [
                  "D/10"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Fabbricati",
                  "categoria catastale",
                  "D/10"
            ],
            "specificCategories": [
                  "D/10"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "Fabbricati"
            ]
      },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "categoria catastale",
                  "D/10"
            ],
            "specificCategories": [
                  "D/10"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Fabbricati",
                  "gruppo catastale",
                  "categoria catastale",
                  "D/10"
            ],
            "specificCategories": [
                  "D/10"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "Fabbricati"
            ]
      },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.91
    categoryTypes: []
  ,
    requiredParameters: {
            "required": [
                  {
                        "name": "categoriaAtastale",
                        "type": "required",
                        "questions": [
                              "Qual è la categoria catastale del terreno?"
                        ],
                        "validationRules": [
                              "Must be valid cadastral category for agricultural land"
                        ],
                        "detectedValues": [
                              "terreni agricoli"
                        ]
                  },
                  {
                        "name": "ubicazione",
                        "type": "required",
                        "questions": [
                              "In quale zona del comune si trova il terreno?",
                              "Qual è l'ubicazione specifica?"
                        ],
                        "validationRules": [
                              "Must specify location within municipality"
                        ],
                        "detectedValues": [
                              "terreni agricoli"
                        ]
                  }
            ],
            "conditional": [
                  {
                        "name": "superficie",
                        "type": "conditional",
                        "questions": [
                              "Qual è la superficie del terreno in metri quadri?"
                        ],
                        "validationRules": [
                              "Must be numeric value in square meters"
                        ],
                        "detectedValues": [
                              "terreni agricoli"
                        ]
                  },
                  {
                        "name": "condizioniSpeciali",
                        "type": "conditional",
                        "questions": [
                              "Il terreno è soggetto a particolari vincoli?",
                              "È un terreno coltivato?"
                        ],
                        "validationRules": [
                              "Must specify if special conditions apply"
                        ],
                        "detectedValues": [
                              "terreni agricoli"
                        ]
                  }
            ],
            "questions": [
                  "Qual è la categoria catastale del terreno?",
                  "In quale zona del comune si trova il terreno?",
                  "Qual è l'ubicazione specifica?",
                  "Qual è la superficie del terreno in metri quadri?",
                  "Il terreno è soggetto a particolari vincoli?",
                  "È un terreno coltivato?",
                  "Si tratta di terreno agricolo coltivato?",
                  "È un terreno edificabile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category for agricultural land",
                  "Must specify location within municipality",
                  "Must be numeric value in square meters",
                  "Must specify if special conditions apply"
            ],
            "commune": "campigliaMarittima"
      },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  ,
    requiredParameters: {
            "required": [
                  {
                        "name": "categoriaAtastale",
                        "type": "required",
                        "questions": [
                              "Qual è la categoria catastale dell'immobile?"
                        ],
                        "validationRules": [
                              "Must be valid cadastral category"
                        ],
                        "detectedValues": [
                              "altri fabbricati"
                        ]
                  },
                  {
                        "name": "modalitaUtilizzo",
                        "type": "required",
                        "questions": [
                              "Come viene utilizzato l'immobile?",
                              "È locato o a disposizione?"
                        ],
                        "validationRules": [
                              "Must specify usage type"
                        ],
                        "detectedValues": [
                              "altri fabbricati"
                        ]
                  }
            ],
            "conditional": [
                  {
                        "name": "ubicazione",
                        "type": "conditional",
                        "questions": [
                              "In quale zona si trova l'immobile?"
                        ],
                        "validationRules": [
                              "Must specify location"
                        ],
                        "detectedValues": [
                              "altri fabbricati"
                        ]
                  },
                  {
                        "name": "tipoContratto",
                        "type": "conditional",
                        "questions": [
                              "Se locato, che tipo di contratto?",
                              "Qual è la durata del contratto?"
                        ],
                        "validationRules": [
                              "Must specify contract type if rented"
                        ],
                        "detectedValues": [
                              "altri fabbricati"
                        ]
                  }
            ],
            "questions": [
                  "Qual è la categoria catastale dell'immobile?",
                  "Come viene utilizzato l'immobile?",
                  "È locato o a disposizione?",
                  "In quale zona si trova l'immobile?",
                  "Se locato, che tipo di contratto?",
                  "Qual è la durata del contratto?",
                  "È diverso dall'abitazione principale?",
                  "Appartiene al gruppo catastale D?"
            ],
            "validationRules": [
                  "Must be valid cadastral category",
                  "Must specify usage type",
                  "Must specify location",
                  "Must specify contract type if rented"
            ],
            "commune": "campigliaMarittima"
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "Altri",
                  "fabbricati"
            ]
      },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
    context: "Istituto di credito, cambio e assicurazione con fine di lucro"
  ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "categoria catastale",
                  "D/5"
            ],
            "specificCategories": [
                  "D/5"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Fabbricati",
                  "gruppo catastale",
                  "categoria catastale",
                  "D/5"
            ],
            "specificCategories": [
                  "D/5"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "Fabbricati"
            ]
      },
  {
    condition: "Terreni agricoli ricadenti nei fogli catastali specificati",
    details: "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 33, 34, 35, 36, 37, 38, 39, 48, 49, 50, 51, 52, 53, 54, 55.",
    ratePercent: 0
    categoryTypes: []
    zone: "Fogli catastali: 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 33, 34, 35, 36, 37, 38, 39, 48, 49, 50, 51, 52, 53, 54, 55"
  ,
    requiredParameters: {
      required: [],
      conditional: [
      {
            "name": "ubicazione",
            "type": "conditional",
            "questions": [
                  "In quale zona/area del comune si trova l'immobile?",
                  "Si trova nel centro storico?",
                  "Qual è il foglio catastale?"
            ],
            "validationRules": [
                  "Must specify location within municipality"
            ],
            "detectedValues": [
                  "ricadenti"
            ]
      ,
    requiredParameters: {
      required: [],
      conditional: [
      {
            "name": "ubicazione",
            "type": "conditional",
            "questions": [
                  "In quale zona/area del comune si trova l'immobile?",
                  "Si trova nel centro storico?",
                  "Qual è il foglio catastale?"
            ],
            "validationRules": [
                  "Must specify location within municipality"
            ],
            "detectedValues": [
                  "Terreni",
                  "ricadenti"
            ]
      },
  {
    condition: "Abitazione locata o in comodato con contratto di locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione - Durata del contratto di durata non inferio a mesi, specifica : 12 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.81
    categoryTypes: []
    context: "Locazione, durata non inferiore a 12 mesi, uso abitazione principale"
  ,
    requiredParameters: {
      required: [
      {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Abitazione"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato"
            ]
      },
  {
            "name": "tipoContratto",
            "type": "conditional",
            "questions": [
                  "Che tipo di contratto di locazione/comodato?",
                  "Qual è la durata del contratto?",
                  "Il contratto è registrato?"
            ],
            "validationRules": [
                  "Must specify contract type and duration"
            ],
            "detectedValues": [
                  "contratto"
            ]
      },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.75
    categoryTypes: []
    context: "Comodato d'uso gratuito, parenti sino al secondo grado, uso abitazione principale"
  ,
    requiredParameters: {
      required: [
      {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato",
                  "comodato"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Abitazione"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato",
                  "comodato"
            ]
      },
  {
            "name": "tipoContratto",
            "type": "conditional",
            "questions": [
                  "Che tipo di contratto di locazione/comodato?",
                  "Qual è la durata del contratto?",
                  "Il contratto è registrato?"
            ],
            "validationRules": [
                  "Must specify contract type and duration"
            ],
            "detectedValues": [
                  "contratto"
            ]
      },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la",
    ratePercent: 0.75
    categoryTypes: []
    context: "Comodato d'uso gratuito registrato, parenti sino al primo grado, uso abitazione principale"
  ,
    requiredParameters: {
      required: [
      {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato",
                  "comodato"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Abitazione"
            ]
      },
  {
            "name": "modalitaUtilizzo",
            "type": "required",
            "questions": [
                  "Come viene utilizzato l'immobile?",
                  "È la sua abitazione principale?",
                  "È locato o dato in comodato?"
            ],
            "validationRules": [
                  "Must specify usage type"
            ],
            "detectedValues": [
                  "locata",
                  "comodato",
                  "comodato"
            ]
      },
  {
            "name": "tipoContratto",
            "type": "conditional",
            "questions": [
                  "Che tipo di contratto di locazione/comodato?",
                  "Qual è la durata del contratto?",
                  "Il contratto è registrato?"
            ],
            "validationRules": [
                  "Must specify contract type and duration"
            ],
            "detectedValues": [
                  "contratto"
            ]
      },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, , C",
    ratePercent: 0.91
    categoryTypes: ["A10","C"]
  ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "A10"
            ],
            "specificCategories": [
                  "A10"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "A10"
            ],
            "specificCategories": [
                  "A10"
            ]
      },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacame per b vi soggiorni, case ed appartamenti per vacanze, bed and b akfast, sidence - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.91
    categoryTypes: []
    context: "Codice ATECO: 55.20.51, attività condotta in forma imprenditoriale"
  ,
    requiredParameters: {
      required: [],
      conditional: [
      {
            "name": "destinazioneUso",
            "type": "conditional",
            "questions": [
                  "Qual è la destinazione d'uso specifica?",
                  "Che tipo di attività vi si svolge?",
                  "Qual è il codice ATECO?"
            ],
            "validationRules": [
                  "Must specify specific use destination"
            ],
            "detectedValues": [
                  "turistico-ricettiva"
            ]
      ,
    requiredParameters: {
      required: [
      {
            "name": "categoriaAtastale",
            "type": "required",
            "questions": [
                  "Qual è la categoria catastale dell'immobile?"
            ],
            "validationRules": [
                  "Must be valid cadastral category (A/1, A/2, etc.)"
            ],
            "detectedValues": [
                  "Abitazione"
            ]
      },
  {
            "name": "destinazioneUso",
            "type": "conditional",
            "questions": [
                  "Qual è la destinazione d'uso specifica?",
                  "Che tipo di attività vi si svolge?",
                  "Qual è il codice ATECO?"
            ],
            "validationRules": [
                  "Must specify specific use destination"
            ],
            "detectedValues": [
                  "turistico-ricettiva"
            ]
      }
];
