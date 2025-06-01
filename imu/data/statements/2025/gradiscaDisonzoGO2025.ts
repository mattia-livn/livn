export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesGradiscaDisonzoGO2025: ImuRateEntry[] = [
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
    details: "Altri fabbricati non rientranti nelle categorie speciali",
    ratePercent: 1.06
    categoryTypes: ["B","C","E"]
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati appartenenti al gruppo D, escluso D/10",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Aliquota per fabbricati produttivi"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenti da IMU"
    zone: "Tutto il territorio comunale"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per terreni edificabili"
    zone: "Tutto il territorio comunale"
  }
];
