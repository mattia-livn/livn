export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesLoanoSV2025: ImuRateEntry[] = [
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
    ratePercent: 0.76
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie catastali D/2, D/8, D/9",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio",
    ratePercent: 0.86
    categoryTypes: ["D/2","D/8","D/9"]
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione - Durata del contratto di durata non inferio a mesi, specifica : 12",
    ratePercent: 0.64
    categoryTypes: []
    context: "Durata del contratto di durata non inferiore a 12 mesi"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    ratePercent: 0.64
    categoryTypes: []
    context: "Condizioni locatario/comodatario: Parenti sino al primo grado"
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/1",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo",
    ratePercent: 0.76
    categoryTypes: ["C/1"]
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, codice ATECO: 55.10.00",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.10.00 - Alberghi - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.86
    categoryTypes: []
    context: "Codice ATECO: 55.10.00"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, codice ATECO: 55.30.00",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.30.00 - A e di campeggio e a e att zzate per camper e roulotte - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.86
    categoryTypes: []
    context: "Codice ATECO: 55.30.00"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, codice ATECO: 55.20.10",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.10 - Villaggi turistici - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.86
    categoryTypes: []
    context: "Codice ATECO: 55.20.10"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, codice ATECO: 55.20.20",
    details: "Abitazione destinata a struttura turistico-ricettiva - Codice ATECO: 55.20.20 - Ostelli della gioventu' - Attivit� condotta in forma imp nditoriale",
    ratePercent: 0.86
    categoryTypes: []
    context: "Codice ATECO: 55.20.20"
  }
];
