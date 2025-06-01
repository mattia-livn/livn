export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesApricaSO2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.5
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
    ratePercent: 0.94
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
    ratePercent: 0.94
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.94
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Categoria catastale: D/2 Alberghi e pensioni con fine di lucro",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro",
    ratePercent: 0.84
    categoryTypes: ["D/2"]
  },
  {
    condition: "Immobili di categoria C - Categoria catastale: C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1
    categoryTypes: ["C/1"]
  },
  {
    condition: "Immobili di categoria C - Categoria catastale: C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati direttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.84
    categoryTypes: ["C/1"]
  }
];
