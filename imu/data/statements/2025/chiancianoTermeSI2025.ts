export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesChiancianoTermeSI2025: ImuRateEntry[] = [
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
    ratePercent: 0.91
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.91
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/2 Alberghi e pensioni con fine di lucro",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro",
    ratePercent: 0.76
    categoryTypes: ["D/2"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.86
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi",
    ratePercent: 0.86
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.51 - Affittacame per b vi soggiorni, case ed appartamenti per vacanze, bed and b akfast, sidence",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/1 Negozi e botteghe",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/1 Negozi e botteghe, Immobili concessi in comodato",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.6
    categoryTypes: ["C/1"]
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    ratePercent: 1.06
    categoryTypes: []
  }
];
