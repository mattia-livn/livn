export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMalborghettoValbrunaUD2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze: 0,60%",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota per l'abitazione principale e le sue pertinenze"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["B","C","D","E"]
    context: "Aliquota per fabbricati diversi dall'abitazione principale"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale",
    details: "Fabbricati rurali ad uso strumentale: 0,00%",
    ratePercent: 0
    categoryTypes: ["D/10"]
    context: "Esenzione per fabbricati rurali ad uso strumentale"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli: 0,76%",
    ratePercent: 0.76
    categoryTypes: ["Terreni agricoli"]
    context: "Aliquota per terreni agricoli"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per aree fabbricabili"
  }
];
