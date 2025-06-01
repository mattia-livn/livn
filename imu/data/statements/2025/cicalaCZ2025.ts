export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCicalaCZ2025: ImuRateEntry[] = [
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
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
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
    condition: "Immobili dati in comodato gratuito",
    details: "- immobili dati in comodato gratuito art. 1, comma 777, lett. e, della legge n. 160 del 2019: al comune o ad altro ente territoriale, o ad ente non commerciale, esclusivamente per l'esercizio dei rispettivi scopi istituzionali o statutari;",
    ratePercent: 0
    categoryTypes: []
    context: "Comodato gratuito per scopi istituzionali o statutari"
  },
  {
    condition: "Esercizi commerciali e artigianali situati in zone chiuse al traffico",
    details: "- esercizi commerciali e artigianali situati in zone p cluse al traffico a causa dello svolgimento di lavori per la alizzazione di ope pubbliche che si protraggono per olt sei mesi art. 1, comma 86, della legge n. 549 del 1995 con aliquota agevolata applicata: 0,8;",
    ratePercent: 0.8
    categoryTypes: []
    context: "Zone chiuse al traffico per lavori pubblici oltre sei mesi"
  },
  {
    condition: "Immobili conferiti in trust a favore di persone con handicap grave",
    details: "- immobili conferiti in trust istituito a favo di persone con handicap grave di cui all'art. 6 della legge n. 112 del 2016 con aliquota agevolata applicata: 0,8%.",
    ratePercent: 0.8
    categoryTypes: []
    context: "Trust a favore di persone con handicap grave"
  }
];
