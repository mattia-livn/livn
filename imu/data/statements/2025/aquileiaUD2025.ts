export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesAquileiaUD2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze - Aliquota 0,60%",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
    context: "Aliquota ridotta per abitazione principale"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati - Aliquota 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D - Aliquota 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Fabbricati gruppo D"]
    context: "Escluso D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli - Esenti",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione per terreni agricoli"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili - Aliquota 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
  }
];
