export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPredazzoTN2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale e relative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
    context: "Aliquota ridotta per abitazione principale"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati non rientranti nell'abitazione principale",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: ["Fabbricati gruppo D"]
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
