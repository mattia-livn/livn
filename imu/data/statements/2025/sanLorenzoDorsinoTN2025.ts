export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanLorenzoDorsinoTN2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze: 0,60%",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota per abitazione principale e pertinenze"
    zone: "Tutto il comune"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Aliquota per fabbricati diversi dall'abitazione principale"
    zone: "Tutto il comune"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D: 0,76%",
    ratePercent: 0.76
    categoryTypes: ["D/1","D/2","D/3","D/4","D/5","D/6","D/7","D/8","D/9"]
    context: "Aliquota per fabbricati produttivi"
    zone: "Tutto il comune"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli: 0,00%",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione per terreni agricoli"
    zone: "Tutto il comune"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per terreni edificabili"
    zone: "Tutto il comune"
  }
];
