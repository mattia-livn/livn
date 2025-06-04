export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSantoStefanoDiMagraSP2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.6,
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
    ratePercent: 0.6,
    categoryTypes: [],
    context: "SI"
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
    ratePercent: 0.1,
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
    ratePercent: 1.14,
    categoryTypes: ["D"]
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
    ratePercent: 0,
    categoryTypes: [],
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
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
            "commune": "santoStefanoDiMagra"
      },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.14,
    categoryTypes: []
  ,
    requiredParameters: {
            "required": [
                  {
                        "name": "ubicazione",
                        "type": "required",
                        "questions": [
                              "In quale zona urbanistica si trova l'area?",
                              "Qual è la destinazione urbanistica?"
                        ],
                        "validationRules": [
                              "Must specify urban zone and destination"
                        ],
                        "detectedValues": [
                              "aree fabbricabili"
                        ]
                  }
            ],
            "conditional": [
                  {
                        "name": "superficie",
                        "type": "conditional",
                        "questions": [
                              "Qual è la superficie dell'area in metri quadri?"
                        ],
                        "validationRules": [
                              "Must be numeric value in square meters"
                        ],
                        "detectedValues": [
                              "aree fabbricabili"
                        ]
                  },
                  {
                        "name": "destinazioneUso",
                        "type": "conditional",
                        "questions": [
                              "Qual è la destinazione d'uso prevista?",
                              "Che tipo di costruzione è consentita?"
                        ],
                        "validationRules": [
                              "Must specify intended use destination"
                        ],
                        "detectedValues": [
                              "aree fabbricabili"
                        ]
                  }
            ],
            "questions": [
                  "In quale zona urbanistica si trova l'area?",
                  "Qual è la destinazione urbanistica?",
                  "Qual è la superficie dell'area in metri quadri?",
                  "Qual è la destinazione d'uso prevista?",
                  "Che tipo di costruzione è consentita?",
                  "In quale zona urbanistica si trova?",
                  "Ha già ottenuto permessi edilizi?"
            ],
            "validationRules": [
                  "Must specify urban zone and destination",
                  "Must be numeric value in square meters",
                  "Must specify intended use destination"
            ],
            "commune": "santoStefanoDiMagra"
      },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.14,
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
            "commune": "santoStefanoDiMagra"
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
    condition: "Fabbricati appartenenti al gruppo catastale D",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro",
    ratePercent: 0.98,
    categoryTypes: ["D/2","D/3","D/4","D/6"]
  ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "santoStefanoDiMagra"
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
                  "gruppo catastale"
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
    condition: "Immobili di categoria A/10, C",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.98,
    categoryTypes: ["A/10","C/1","C/3"]
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
            ]
      },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.46,
    categoryTypes: []
  ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "santoStefanoDiMagra"
    ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "santoStefanoDiMagra"
    },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Locatario/comodatario non titola di propriet� o altro diritto ale di godimento su immobili - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.68,
    categoryTypes: []
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
                  "Comodato"
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
                  "Comodato"
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
    condition: "Immobili di categoria A/10, C - Oggetto di attività di recupero per miglioramento del decoro urbano o della classe energetica",
    details: "Immobili di categoria A10, , C - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: Dentro il centro storico",
    ratePercent: 0.84,
    categoryTypes: ["A/10","C"],
    zone: "Dentro il centro storico"
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
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
                  "attività"
            ]
      },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.68,
    categoryTypes: []
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
    condition: "Immobili di categoria A/10, C",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /4 Uffici pubblici - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Collocazione immobile: Dentro il centro storico",
    ratePercent: 0.84,
    categoryTypes: ["A/10","C/1","C/2","C/3"],
    zone: "Dentro il centro storico"
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
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
                  "A/10"
            ],
            "specificCategories": [
                  "A/10"
            ]
      }
];
