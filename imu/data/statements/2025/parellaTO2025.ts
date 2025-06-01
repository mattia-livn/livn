export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesParellaTO2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "0,55%",
    ratePercent: 0.55
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "SI",
    ratePercent: 0.55
    categoryTypes: []
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "0%",
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "0,76%",
    ratePercent: 0.76
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "0,76%",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "0,76%",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "0,91%",
    ratePercent: 0.91
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato d'uso gratuito",
    details: "0,5%",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
    context: "Tipo contratto: Comodato d'uso gratuito"
  }
];
