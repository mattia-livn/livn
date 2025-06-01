export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSelvaDeiMoliniBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale e relative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota ridotta per abitazione principale"
    zone: "Tutto il comune"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati non rientranti nelle categorie speciali",
    ratePercent: 1.06
    categoryTypes: ["B","C","E"]
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale"
    zone: "Tutto il comune"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati produttivi classificati nel gruppo catastale D",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/2","D/3","D/4","D/5","D/6","D/7","D/8","D/9"]
    context: "Aliquota specifica per fabbricati produttivi"
    zone: "Tutto il comune"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli coltivati",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti da IMU"
    zone: "Tutto il comune"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili destinate all'edificazione",
    ratePercent: 1.06
    categoryTypes: []
    context: "Aliquota per terreni edificabili"
    zone: "Tutto il comune"
  }
];
