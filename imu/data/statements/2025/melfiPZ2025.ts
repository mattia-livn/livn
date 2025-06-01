export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMelfiPZ2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.2
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.2
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
    ratePercent: 1.06
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
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/1 e D/7",
    details: "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.14
    categoryTypes: ["D/1","D/7"]
  },
  {
    condition: "Immobili di categoria C, categoria C/3",
    details: "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.4
    categoryTypes: ["C/3"]
  },
  {
    condition: "Immobili di categoria C, categoria C/1, locati in centro storico",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Centro storico - Zona urbanisticamente individuata come A. - Fabbricati a disposizione o utilizzati: Immobili locati",
    ratePercent: 0.4
    categoryTypes: ["C/1"]
    context: "Immobili locati"
    zone: "Centro storico"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale",
    ratePercent: 0.3
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 0.3
    categoryTypes: []
    context: "Locazione"
  },
  {
    condition: "Immobili di categoria C, categoria C/1, utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Centro storico - Zona urbanisticamente individuata come A. - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 47 - COMMERCIO AL D TAGLIO ESCLUSO QUELLO DI AUTOVEICOLI E DI MOTOCICLI",
    ratePercent: 0.4
    categoryTypes: ["C/1"]
    context: "Utilizzato per attività produttiva e/o commerciale"
    zone: "Centro storico"
  },
  {
    condition: "Immobili di categoria C, categoria C/1, utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Centro storico - Zona urbanisticamente individuata come A. - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Codice ATECO: 46 - COMMERCIO ALL'INGROSSO ESCLUSO QUELLO DI AUTOVEICOLI E DI MOTOCICLI",
    ratePercent: 0.4
    categoryTypes: ["C/1"]
    context: "Utilizzato per attività produttiva e/o commerciale"
    zone: "Centro storico"
  }
];
