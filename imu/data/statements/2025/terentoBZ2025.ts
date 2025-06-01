export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTerentoBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale 0,60%",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D 0,76%",
    ratePercent: 0.76
    categoryTypes: ["Fabbricati gruppo D"]
    context: "Escludendo D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli 0,00%",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenti"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili 1,00%",
    ratePercent: 1
    categoryTypes: ["Aree fabbricabili"]
  }
];
