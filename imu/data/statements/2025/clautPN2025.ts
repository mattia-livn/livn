export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesClautPN2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale",
    details: "Abitazione principale e relative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Aliquota ridotta per abitazione principale"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati non rientranti nelle categorie speciali",
    ratePercent: 1.06
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Aliquota ordinaria per fabbricati diversi dall'abitazione principale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati produttivi classificati nel gruppo catastale D",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/2","D/3","D/4","D/5","D/6","D/7","D/8","D/9"]
    context: "Aliquota specifica per fabbricati produttivi"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli non esenti",
    ratePercent: 0.76
    categoryTypes: []
    context: "Aliquota per terreni agricoli"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.06
    categoryTypes: []
    context: "Aliquota per terreni edificabili"
  },
  {
    condition: "Abitazione principale assimilata",
    details: "Abitazione principale assimilata per legge",
    ratePercent: 0.6
    categoryTypes: []
    context: "Assimilazione a abitazione principale"
  },
  {
    condition: "Immobili esenti",
    details: "Immobili esenti da IMU",
    ratePercent: 0
    categoryTypes: []
    context: "Esenzione totale"
  }
];
