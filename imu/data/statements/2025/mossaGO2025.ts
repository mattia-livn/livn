export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMossaGO2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze: 0,60%",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
  },
  {
    condition: "Fabbricati rurali ad uso strumentale",
    details: "Fabbricati rurali ad uso strumentale: 0,00%",
    ratePercent: 0
    categoryTypes: ["Fabbricati rurali"]
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli: 0,76%",
    ratePercent: 0.76
    categoryTypes: ["Terreni agricoli"]
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
  },
  {
    condition: "Fabbricati gruppo D (escluso D/10)",
    details: "Fabbricati gruppo D (escluso D/10): 0,86%",
    ratePercent: 0.86
    categoryTypes: ["Fabbricati gruppo D"]
  }
];
