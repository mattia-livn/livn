export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesRomaRM2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.6
    categoryTypes: []
    context: "Posseduta da anziani o disabili"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0.1
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/3",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    ratePercent: 0.86
    categoryTypes: ["D/3"]
    context: "Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, utilizzati da ONLUS o altri enti del terzo settore",
    details: "Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : ONLUS o altri enti del terzo setto",
    ratePercent: 0.86
    categoryTypes: ["D"]
    context: "Utilizzati da ONLUS o altri enti del terzo settore"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/8",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 0.86
    categoryTypes: ["D/8"]
    context: "Fabbricati costruiti o adattati per le speciali esigenze di un'attività commerciale"
  },
  {
    condition: "Terreni agricoli di proprietà di ONLUS o enti del terzo settore",
    details: "Ter ni agricoli - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.86
    categoryTypes: []
    context: "Di proprietà di ONLUS o enti del terzo settore"
  },
  {
    condition: "Aree fabbricabili di proprietà di ONLUS o enti del terzo settore",
    details: "A e Fabbricabili - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.86
    categoryTypes: []
    context: "Di proprietà di ONLUS o enti del terzo settore"
  },
  {
    condition: "Altri fabbricati di categoria A10, C, di proprietà di ONLUS o enti del terzo settore",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati Immobili di categoria A10, , C - Requisiti del soggetto passivo: Di proprieta' di ONLUS o",
    ratePercent: 0.86
    categoryTypes: ["A10","C"]
    context: "Di proprietà di ONLUS o enti del terzo settore"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.76
    categoryTypes: []
    context: "Assegnati dagli IACP o enti di edilizia residenziale pubblica"
  },
  {
    condition: "Immobili di categoria C, utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R. - Limitatamente ad un solo immobile.",
    ratePercent: 0.86
    categoryTypes: ["C/1","C/3"]
    context: "Utilizzati direttamente dal soggetto passivo"
  },
  {
    condition: "Immobili di categoria C, locati o concessi in comodato o utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 47.62.10 - Commercio al dettaglio di giornali, riviste e periodici",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Locati o concessi in comodato o utilizzati direttamente dal soggetto passivo"
  }
];
