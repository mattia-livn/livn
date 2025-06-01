export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesLaSpeziaSP2025: ImuRateEntry[] = [
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
    context: "Posseduta da anziani o disabili"
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
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro",
    ratePercent: 0.76
    categoryTypes: ["D/2","D/3"]
    context: "Con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attività industriale",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 0.96
    categoryTypes: ["D/4","D/6","D/7"]
    context: "Con fine di lucro"
  },
  {
    condition: "Terreni agricoli - Utilizzo: Coltivati e destinati ad alcuni tipi di coltura",
    details: "Ter ni agricoli - Utilizzo: Coltivati e destinati ad alcuni tipi di coltura: ter ni a immutabile destinazione agro-silvo-pastorale a propriet� collettiva indivisibile e inusucapibile",
    ratePercent: 0
    categoryTypes: []
    context: "Coltivati e destinati ad alcuni tipi di coltura"
  },
  {
    condition: "Terreni agricoli - Collocazione: Terreni ricadenti in determinate aree: Aree: terreni agricoli montani",
    details: "Ter ni agricoli - Collocazione: Ter ni ricadenti in determinate a e: A a: ter ni agricoli montani",
    ratePercent: 0
    categoryTypes: []
    context: "Terreni agricoli montani"
  },
  {
    condition: "Terreni agricoli - Utilizzo: Terreni agricoli condotti da CD e IAP e Società agricole non posseduti",
    details: "Ter ni agricoli - Utilizzo: Ter ni agricoli condotti da CD e IAP e Societa' agricole non posseduti",
    ratePercent: 0
    categoryTypes: []
    context: "Condotti da CD e IAP e Società agricole non posseduti"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile",
    ratePercent: 0.6
    categoryTypes: ["A/2"]
    context: "Locazione a studenti"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.6
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Locazione ai sensi dell'art. 2, comma 3"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini",
    ratePercent: 0.96
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Locazione a canone libero"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purch� l'affittuario/comodatario l...",
    ratePercent: 0
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Comodato d'uso gratuito"
  }
];
