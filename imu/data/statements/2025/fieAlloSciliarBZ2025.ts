export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesFieAlloSciliarBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale e relative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota ridotta per abitazione principale"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Altri fabbricati",
    details: "Fabbricati diversi dall'abitazione principale",
    ratePercent: 1.06
    categoryTypes: ["B","C","D","E"]
    context: "Aliquota ordinaria per altri fabbricati"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati produttivi classificati nel gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Aliquota ordinaria per fabbricati produttivi"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni destinati all'uso agricolo",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione per terreni agricoli"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Aree fabbricabili",
    details: "Terreni edificabili",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota ordinaria per aree fabbricabili"
    zone: "Tutto il territorio comunale"
  }
];
