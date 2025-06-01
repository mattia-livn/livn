export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPalazzoloDelloStellaUD2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze - Aliquota 0,60%",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
    context: "Include pertinenze come garage e cantine"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati - Aliquota 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
    context: "Esclusi fabbricati gruppo D"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D - Aliquota 0,76%",
    ratePercent: 0.76
    categoryTypes: ["Fabbricati gruppo D"]
    context: "Escluso D/10"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli - Esenti",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione totale"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili - Aliquota 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Terreni edificabili"
    zone: "Tutto il territorio comunale"
  }
];
