export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMosoInPassiriaBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale e relative pertinenze",
    ratePercent: 0.6,
    categoryTypes: ["A/1","A/8","A/9"],
    context: "Aliquota ridotta per abitazione principale",
    zone: "Tutto il territorio comunale"
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
                  "Abitazione principale"
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
                  "Abitazione principale"
            ]
      },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati non rientranti nelle categorie speciali",
    ratePercent: 1.06,
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"],
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale",
    zone: "Tutto il territorio comunale"
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
            "commune": "mosoInPassiria"
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
    condition: "Fabbricati gruppo D",
    details: "Fabbricati appartenenti al gruppo D, escluso D/10",
    ratePercent: 0.86,
    categoryTypes: ["D/1","D/2","D/3","D/4","D/5","D/6","D/7","D/8","D/9"],
    context: "Aliquota per fabbricati produttivi",
    zone: "Tutto il territorio comunale"
  ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "mosoInPassiria"
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
                  "Fabbricati"
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
    details: "Terreni agricoli esenti da IMU",
    ratePercent: 0,
    categoryTypes: [],
    context: "Esenzione per terreni agricoli",
    zone: "Tutto il territorio comunale"
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
            "commune": "mosoInPassiria"
      },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili soggette a IMU",
    ratePercent: 1.06,
    categoryTypes: [],
    context: "Aliquota per terreni edificabili",
    zone: "Tutto il territorio comunale"
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
            "commune": "mosoInPassiria"
      }
];
