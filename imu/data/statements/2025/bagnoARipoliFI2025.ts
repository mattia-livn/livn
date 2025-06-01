export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesBagnoARipoliFI2025: ImuRateEntry[] = [
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
    ratePercent: 1.06
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
    zone: "Ricadenti nei fogli catastali n.: fogli catastali: Ai sensi della Circola Ministero Finanze n. 9/1993, il Comune è classificato parzialmente delimitato e l'esenzione spetta solo nelle zone individuate dalla Legge n. 984/1977 elenco allegato alla deliberazione CIPAA del 06/04/1983: per intero Fogli da 1 a 12, da 17 a 22 e da 24 a 76; parzialmente solo alcune particelle Fogli 13, 14, 15, 16 e 23."
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
    condition: "Fabbricati appartenenti al gruppo catastale D - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R.",
    ratePercent: 0.9
    categoryTypes: ["D"]
  },
  {
    condition: "Immobili di categoria A10, C - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R.",
    ratePercent: 0.9
    categoryTypes: ["A/10","C/1","C/3"]
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    ratePercent: 0.76
    categoryTypes: []
    context: "Purché l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Abitazione locata o in comodato - Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 0.76
    categoryTypes: []
    context: "Purché l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Abitazione locata o in comodato - Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.76
    categoryTypes: []
    context: "Purché l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Abitazione locata o in comodato - Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.76
    categoryTypes: []
    context: "Purché l'affittuario/comodatario la utilizzi come abitazione principale."
  }
];
