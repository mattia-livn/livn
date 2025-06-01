export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesRasunAnterselvaBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota per abitazione principale"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati",
    ratePercent: 1.06
    categoryTypes: ["B","C","D","E"]
    context: "Aliquota per fabbricati diversi dall'abitazione principale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Aliquota per fabbricati produttivi"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenti da IMU"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per terreni edificabili"
  }
];
