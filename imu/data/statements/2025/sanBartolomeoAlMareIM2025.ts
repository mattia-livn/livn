export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanBartolomeoAlMareIM2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.4
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.4
    categoryTypes: []
    context: "di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019"
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
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "esclusa la categoria catastale D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.57
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
    condition: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacame per b vi soggiorni, case ed appartamenti per vacanze, bed and b akfast, sidence - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.76
    categoryTypes: []
    context: "Attività condotta in forma imprenditoriale"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.30.00",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.30.00 - A e di campeggio e a e att zzate per camper e roulotte - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.76
    categoryTypes: []
    context: "Attività condotta in forma imprenditoriale"
  },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /4 Uffici pubblici - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
    ratePercent: 0.76
    categoryTypes: ["A/10","C"]
  }
];
