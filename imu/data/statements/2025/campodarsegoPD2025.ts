export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCampodarsegoPD2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.5
    categoryTypes: []
    context: "SI"
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
    ratePercent: 0.86
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    ratePercent: 0.76
    categoryTypes: []
    context: "Locazione"
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
    ratePercent: 0.86
    categoryTypes: ["A/10","C/1","C/3","C/4","C/5"]
  },
  {
    condition: "Immobili di categoria",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate",
    ratePercent: 0.76
    categoryTypes: ["/1","/2","/3","/4","/5","/6","/7","/8"]
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.10.00 - Alberghi",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.10.00 - Alberghi",
    ratePercent: 0.76
    categoryTypes: []
    context: "Codice ATECO: 55.10.00"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacamere per brevi soggiorni, case ed appartamenti per vacanze, bed and breakfast, residence",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacame per b vi soggiorni, case ed appartamenti per vacanze, bed and b akfast, sidence",
    ratePercent: 0.76
    categoryTypes: []
    context: "Codice ATECO: 55.20.51"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.52 - Attività di alloggio connesse alle aziende agricole",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.52 - Attivita' di alloggio connesse alle aziende agricole",
    ratePercent: 0.76
    categoryTypes: []
    context: "Codice ATECO: 55.20.52"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo - Requisiti del soggetto passivo: Di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.76
    categoryTypes: []
  }
];
