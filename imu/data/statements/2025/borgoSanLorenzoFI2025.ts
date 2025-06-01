export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesBorgoSanLorenzoFI2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.6
    categoryTypes: []
    context: "SI"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 1.04
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.04
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.04
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Immobili locati",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili locati",
    ratePercent: 1.06
    categoryTypes: ["D"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Immobili a disposizione",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1.06
    categoryTypes: ["D"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    ratePercent: 1.03
    categoryTypes: ["D"]
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C - Immobili a disposizione",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1.06
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C - Immobili locati",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati",
    ratePercent: 1.06
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Immobili di categoria C - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    ratePercent: 1.03
    categoryTypes: ["C/3","C/4"]
  },
  {
    condition: "Immobili di categoria C - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    ratePercent: 1.01
    categoryTypes: ["C/1"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 1.06
    categoryTypes: []
  }
];
