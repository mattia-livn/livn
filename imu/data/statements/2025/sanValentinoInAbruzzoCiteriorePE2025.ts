export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanValentinoInAbruzzoCiteriorePE2025: ImuRateEntry[] = [
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
    ratePercent: 0.86
    categoryTypes: ["D"]
    context: "Esclusa D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
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
    condition: "Aree fabbricabili situate in determinate zone: ZONA ROSSA P3 DEL P.A.I. - ALTA PERICOLOSITÀ IDROGEOLOGICA",
    details: "A e Fabbricabili - Situate in determinate zone: ZONA ROSSA P3 DEL P.A.I. - ALTA PERICOLOSITA' IDROGEOLOGICA",
    ratePercent: 0
    categoryTypes: []
    context: "Alta pericolosità idrogeologica"
    zone: "ZONA ROSSA P3 DEL P.A.I."
  },
  {
    condition: "Aree fabbricabili situate in determinate zone: ZONA GIALLA P2 DEL P.A.I. - MEDIA PERICOLOSITÀ IDROGEOLOGICA",
    details: "A e Fabbricabili - Situate in determinate zone: ZONA GIALLA P2 DEL P.A.I. - MEDIA PERICOLOSITA' IDROGEOLOGICA",
    ratePercent: 0.38
    categoryTypes: []
    context: "Media pericolosità idrogeologica"
    zone: "ZONA GIALLA P2 DEL P.A.I."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    ratePercent: 0.76
    categoryTypes: []
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: []
    context: "Locazione"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva - Collocazione immobile: In una zona specificamente indicata dal comune: FOGLIO 22 - ALLEGATO A",
    ratePercent: 0.76
    categoryTypes: []
    context: "Struttura turistico-ricettiva"
    zone: "FOGLIO 22 - ALLEGATO A"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale:",
    ratePercent: 0.56
    categoryTypes: []
    context: "Locazione"
  }
];
