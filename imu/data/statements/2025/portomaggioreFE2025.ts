export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPortomaggioreFE2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.48
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.48
    categoryTypes: []
    context: "SI"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 1.06
    categoryTypes: ["D"]
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
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/3 utilizzati da ONLUS o altri enti del terzo settore",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : ONLUS o altri enti del terzo setto",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
    context: "ONLUS o altri enti del terzo settore"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie D/1, D/7, D/8 utilizzati da imprese che hanno ampliato la propria attività economica",
    details: "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Tipologia di attivit�: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
    ratePercent: 0.91
    categoryTypes: ["D/1","D/7","D/8"]
    context: "Imprese che hanno ampliato la propria attività economica"
  },
  {
    condition: "Immobili di categoria C utilizzati da persona giuridica esercente attività d'impresa",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un",
    ratePercent: 0.46
    categoryTypes: ["C/1","C/2","C/3"]
    context: "Persona giuridica esercente attività d'impresa"
  },
  {
    condition: "Immobili di categoria C utilizzati come bottega storica o artigiana",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 60 - Destinazione d'uso: ottega storica o artigiana",
    ratePercent: 0.46
    categoryTypes: ["C/1","C/2","C/3"]
    context: "Bottega storica o artigiana"
  },
  {
    condition: "Abitazione locata o in comodato con particolari condizioni",
    details: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Durata del contratto di durata non inferio a mesi, specifica : 36 - Condizioni locatario/comodatario: Soggetto in condizioni di vulnerabilita' sociale/emergenza abitativa come definite nel golamento - Locatario/comodatario non titola di propriet� o altro diritto ale di godimento su immobili - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale. - Reddito ISEE del comodatario non superio a � 35000 �",
    ratePercent: 0.4
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Accordi/Patti territoriali, vulnerabilità sociale"
  }
];
