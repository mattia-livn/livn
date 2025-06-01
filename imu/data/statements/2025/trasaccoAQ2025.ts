export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTrasaccoAQ2025: ImuRateEntry[] = [
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
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: A1 - A2 - A3",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: A1 - A2 - A3",
    ratePercent: 0.7
    categoryTypes: []
    zone: "A1, A2, A3"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: 1 - 2 - 3 - 4 - 5",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: 1 - 2 - 3 - 4 - 5",
    ratePercent: 1
    categoryTypes: []
    zone: "1, 2, 3, 4, 5"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: C1",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: C1",
    ratePercent: 0.96
    categoryTypes: []
    zone: "C1"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: C1A - C1 - C2",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: C1A - C1 - C2",
    ratePercent: 0.76
    categoryTypes: []
    zone: "C1A, C1, C2"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: C3 - C3A",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: C3 - C3A",
    ratePercent: 0.9
    categoryTypes: []
    zone: "C3, C3A"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: C4",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: C4",
    ratePercent: 0.76
    categoryTypes: []
    zone: "C4"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: D1 - D2 - D3 - D4 - D5 - D6",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: D1 - D2 - D3 - D4 - D5 - D6",
    ratePercent: 0.76
    categoryTypes: []
    zone: "D1, D2, D3, D4, D5, D6"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone: E1A",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: E1A",
    ratePercent: 0.76
    categoryTypes: []
    zone: "E1A"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: E1",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: E1",
    ratePercent: 0.7
    categoryTypes: []
    zone: "E1"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: F1 - F2 - F3 - V/P - S1 - S2",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: F1 - F2 - F3 - V/P - S1 - S2",
    ratePercent: 0.4
    categoryTypes: []
    zone: "F1, F2, F3, V/P, S1, S2"
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato e condizioni specifiche",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.56
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Con contratto registrato e condizioni specifiche"
  }
];
