export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesVigolzonePC2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.525
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.525
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
    ratePercent: 0.885
    categoryTypes: ["D"]
    context: "Esclusa D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.885
    categoryTypes: []
  },
  {
    condition: "Terreni agricoli - Collocazione: Ricadenti nei fogli catastali",
    details: "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: Fogli totalmente esenti:7-14-15-20-21-22-24-25-28-29-30-31-32-33-34-35-36-37-38-39-40-41Fogli parzialmente esenti:3-8-9-16-23-26-27 verifica se il mappale ricade in zona pianeggiante o in zona collina",
    ratePercent: 0
    categoryTypes: []
    context: "Fogli totalmente esenti: 7-14-15-20-21-22-24-25-28-29-30-31-32-33-34-35-36-37-38-39-40-41; Fogli parzialmente esenti: 3-8-9-16-23-26-27"
    zone: "Verifica se il mappale ricade in zona pianeggiante o in zona collina"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione a canone libero"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    ratePercent: 1.025
    categoryTypes: []
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito",
    ratePercent: 1.025
    categoryTypes: []
    context: "Locazione o comodato d'uso gratuito"
  }
];
