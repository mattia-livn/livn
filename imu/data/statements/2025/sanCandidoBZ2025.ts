export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanCandidoBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale con aliquota ridotta",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota ridotta per abitazione principale"
    zone: "Tutto il comune"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati non rientranti nell'abitazione principale",
    ratePercent: 1.06
    categoryTypes: ["B","C","E"]
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale"
    zone: "Tutto il comune"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati produttivi del gruppo D",
    ratePercent: 0.86
    categoryTypes: ["D"]
    context: "Aliquota per fabbricati produttivi, escluso D/10"
    zone: "Tutto il comune"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli esenti da IMU",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione per terreni agricoli"
    zone: "Tutto il comune"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili con aliquota ordinaria",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per terreni edificabili"
    zone: "Tutto il comune"
  }
];
