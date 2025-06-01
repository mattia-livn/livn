export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesValdengoBI2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.45
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.45
    categoryTypes: []
    context: "SI"
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
    ratePercent: 0.91
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.05
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.05
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - D/1, D/3, D/5",
    details: "Categoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 0.96
    categoryTypes: ["D/1","D/3","D/5"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - D/2, D/6, D/8",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.01
    categoryTypes: ["D/2","D/6","D/8"]
  },
  {
    condition: "Immobili di categoria C - C/1, C/3, C/4, C/5",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
    ratePercent: 0.85
    categoryTypes: ["C/1","C/3","C/4","C/5"]
  },
  {
    condition: "Immobili di categoria C - C/2, C/6, C/7",
    details: "- C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte",
    ratePercent: 1.04
    categoryTypes: ["C/2","C/6","C/7"]
  },
  {
    condition: "Immobili di categoria A10",
    details: "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati",
    ratePercent: 0.86
    categoryTypes: ["A/10"]
  }
];
