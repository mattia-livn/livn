export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesIvreaTO2025: ImuRateEntry[] = [
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
    ratePercent: 1.01
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/5 e D/8",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.06
    categoryTypes: ["D/5","D/8"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/1 e D/8 in una zona specifica",
    details: "Categoria catastale: - D/1 Opifici - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: VIA FRANCESCO CARANDINI N. FOGLIO 43 MAPPALE 228",
    ratePercent: 0.76
    categoryTypes: ["D/1","D/8"]
    zone: "VIA FRANCESCO CARANDINI N. FOGLIO 43 MAPPALE 228"
  },
  {
    condition: "Altri fabbricati, abitazione a disposizione, categoria A/3 in una zona specifica",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/3 Abitazioni di tipo economico - Collocazione immobile: In una zona specificamente indicata dal comune: VIA FRANCESCO CARANDINI, 6 FOGLIO 43 MAPPALE 228",
    ratePercent: 0.76
    categoryTypes: ["A/3"]
    zone: "VIA FRANCESCO CARANDINI, 6 FOGLIO 43 MAPPALE 228"
  },
  {
    condition: "Altri fabbricati, abitazione a disposizione, categoria A/4 e A/5",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola",
    ratePercent: 1.01
    categoryTypes: ["A/4","A/5"]
  }
];
