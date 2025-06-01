export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesFalzesBZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale e relative pertinenze",
    details: "Abitazione principale e relative pertinenze: 0,60%",
    ratePercent: 0.6
    categoryTypes: ["Abitazione principale"]
    context: "Aliquota ridotta per la casa di residenza del proprietario"
  },
  {
    condition: "Altri fabbricati",
    details: "Altri fabbricati: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Altri fabbricati"]
    context: "Aliquota standard per immobili diversi dall'abitazione principale"
  },
  {
    condition: "Fabbricati gruppo D",
    details: "Fabbricati gruppo D: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Fabbricati gruppo D"]
    context: "Aliquota per immobili produttivi/commerciali"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli: Esenti",
    ratePercent: 0
    categoryTypes: ["Terreni agricoli"]
    context: "Esenzione per superfici coltivabili"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili: 1,06%",
    ratePercent: 1.06
    categoryTypes: ["Aree fabbricabili"]
    context: "Aliquota per terreni edificabili"
  }
];
