export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCertaldoFI2025: ImuRateEntry[] = [
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
    ratePercent: 0.93
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
    zone: "Ricadenti nei fogli catastali n.: fogli catastali: dall' 1 al 67 - foglio 68: part. dalla 19 alla 22 – part. 28 – part. dalla 55 alla 66 – part. 73- part. dalla 79 alla 90 – part. dalla 95 alla 96 – part. dalla 98 alla 101 – part. dalla 104 alla 108 – part. 112 – part. dalla 120 alla 121 - fogli dal 69 al 76 - foglio 77: part. dalla 1 alla 32 – part. 37 – part. dalla 41 alla 68 – part. 70 – part. dalla 77 alla 79 - foglio 78: part. dalla 17 alla 54 - part. 57 – part. 59 - foglio 79."
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.03
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/4",
    details: "Categoria catastale: - D/4 Case di cura ed ospedali con fine di lucro",
    ratePercent: 1.03
    categoryTypes: ["D/4"]
  },
  {
    condition: "Immobili di categoria A/10, C",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.93
    categoryTypes: ["A/10","C/1","C/3"]
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini",
    ratePercent: 0.99
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini",
    ratePercent: 0.99
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione, destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.99
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
  }
];
