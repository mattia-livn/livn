export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanluriSU2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0
    categoryTypes: []
    context: "NO"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0.1
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.86
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.93
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 0.93
    categoryTypes: ["D/5"]
  },
  {
    condition: "Fabbricati a disposizione o utilizzati, immobili a disposizione da almeno 12 mesi",
    details: "Fabbricati a disposizione o utilizzati: Immobili a disposizione - Purché la condizione di immobile a disposizione persista da almeno: 12 mesi",
    ratePercent: 0.83
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione, non locate e non concesse in comodato, prive di arredo e utenze",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Utilizzo/Inutilizzo: Privi di ogni ar do, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    ratePercent: 0.83
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C, a disposizione da almeno 12 mesi",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili a disposizione - Purché la condizione di immobile a disposizione persista da almeno: 12 mesi",
    ratePercent: 0.83
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/1, negozi e botteghe, superficie non superiore a 100 mq, dentro il centro storico",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Superficie: Non superio a Mq 100 MQ - Collocazione immobile: Dentro il centro storico - Limitatamente ad un solo immobile.",
    ratePercent: 0.76
    categoryTypes: ["C/1"]
    zone: "Dentro il centro storico"
  }
];
