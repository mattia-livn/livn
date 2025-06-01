export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTarantoTA2025: ImuRateEntry[] = [
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
    ratePercent: 0.5
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
    ratePercent: 0.5
    categoryTypes: []
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
    ratePercent: 0.1
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
    ratePercent: 1.06
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
    ratePercent: 1.06
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
            "commune": "taranto"
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
            "commune": "taranto"
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/3",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
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
                  "D/3"
            ],
            "specificCategories": [
                  "D/3"
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
                  "D/3"
            ],
            "specificCategories": [
                  "D/3"
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie catastali D/1, D/2, D/4, D/5, D/6, D/7, D/8, D/9",
    details: "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19;escluse da agevolazione le imp se del carboniero Reg.CE n.1407/2002 e siderurgia all. discipl. multisett.aiuti g.li destinati ai grandi progetti invest.di cui alla Com.C 2002315 GUCE C70/02 - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attivit�: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
    ratePercent: 0.76
    categoryTypes: ["D/1","D/2","D/4","D/5","D/6","D/7","D/8","D/9"]
    zone: "zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19"
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
                  "categorie catastali",
                  "D/1",
                  "D/2",
                  "D/4",
                  "D/5",
                  "D/6",
                  "D/7",
                  "D/8",
                  "D/9"
            ],
            "specificCategories": [
                  "D/1",
                  "D/2",
                  "D/4",
                  "D/5",
                  "D/6",
                  "D/7",
                  "D/8",
                  "D/9"
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
                  "categorie catastali",
                  "D/1",
                  "D/2",
                  "D/4",
                  "D/5",
                  "D/6",
                  "D/7",
                  "D/8",
                  "D/9"
            ],
            "specificCategories": [
                  "D/1",
                  "D/2",
                  "D/4",
                  "D/5",
                  "D/6",
                  "D/7",
                  "D/8",
                  "D/9"
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
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi",
    ratePercent: 0.92
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
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
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.4
    categoryTypes: []
  ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "taranto"
    ,
    requiredParameters: {
      required: [],
      conditional: [],
      questions: [],
      validationRules: [],
      commune: "taranto"
    },
  {
    condition: "Immobili di categoria C, oggetto di attività di recupero per miglioramento del decoro urbano o della classe energetica",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19;escluse da agevolazione le imp se del carboniero Reg.CE n.1407/2002 e siderurgia all. discipl. multisett.aiuti g.li destinati ai grandi progetti invest.di cui alla Com.C 2002315 GUCE C70/02 - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attivit�: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
    ratePercent: 0.53
    categoryTypes: ["C/1","C/2","C/3","C/4"]
    zone: "zone Piano ZES interr.Ionica- Reg.Puglia DGR n.612/19"
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
                  "attività"
            ]
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
                  "attività"
            ]
      },
  {
    condition: "Immobili di categoria C, collocazione immobile: Centro storico Città vecchia",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - Oggetto di attivit� di cupero per miglioramento del decoro urbano o della classe energetica. - Collocazione immobile: In una zona specificamente indicata dal comune: Centro storico Citt� vecchia - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0
    categoryTypes: ["C/1","C/2","C/3","C/4"]
    zone: "Centro storico Città vecchia"
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
                  "Centro storico"
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
                  "Centro storico"
            ]
      }
];
