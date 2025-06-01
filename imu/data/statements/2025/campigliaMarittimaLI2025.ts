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
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.58
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.58
    categoryTypes: []
    context: "Posseduta da anziani o disabili"
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
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.91
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
    context: "Istituto di credito, cambio e assicurazione con fine di lucro"
  },
  {
    condition: "Terreni agricoli ricadenti nei fogli catastali specificati",
    details: "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 33, 34, 35, 36, 37, 38, 39, 48, 49, 50, 51, 52, 53, 54, 55.",
    ratePercent: 0
    categoryTypes: []
    zone: "Fogli catastali: 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 33, 34, 35, 36, 37, 38, 39, 48, 49, 50, 51, 52, 53, 54, 55"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione - Durata del contratto di durata non inferio a mesi, specifica : 12 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.81
    categoryTypes: []
    context: "Locazione, durata non inferiore a 12 mesi, uso abitazione principale"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.75
    categoryTypes: []
    context: "Comodato d'uso gratuito, parenti sino al secondo grado, uso abitazione principale"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la",
    ratePercent: 0.75
    categoryTypes: []
    context: "Comodato d'uso gratuito registrato, parenti sino al primo grado, uso abitazione principale"
  },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, , C",
    ratePercent: 0.91
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacame per b vi soggiorni, case ed appartamenti per vacanze, bed and b akfast, sidence - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.91
    categoryTypes: []
    context: "Codice ATECO: 55.20.51, attività condotta in forma imprenditoriale"
  }
];
