export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesChiusiSI2025: ImuRateEntry[] = [
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
    ratePercent: 0
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
    condition: "Immobili di categoria C/1 Negozi e botteghe",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Porsenna o via Arunte o piazza Graziano da Chiusi o via Ermanno aldetti o via onci o via Mecenate o via Lavinia o via Giuseppe Garibaldi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Tipologia di attività: Attivita' innovative - Start up",
    ratePercent: 0
    categoryTypes: ["C/1"]
    context: "Immobili concessi in comodato, Attività innovative - Start up"
    zone: "Via Porsenna, via Arunte, piazza Graziano da Chiusi, via Ermanno aldetti, via onci, via Mecenate, via Lavinia, via Giuseppe Garibaldi"
  },
  {
    condition: "Immobili di categoria C/2 Magazzini e locali di deposito",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - Collocazione immobile: In una zona specificamente indicata dal comune: Via Porsenna o via Arunte o piazza Graziano da Chiusi o via Ermanno aldetti o via onci o via Mecenate o via Lavinia o via Giuseppe Garibaldi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Tipologia di attività: Attivita' innovative - Start up",
    ratePercent: 0
    categoryTypes: ["C/2"]
    context: "Immobili concessi in comodato, Attività innovative - Start up"
    zone: "Via Porsenna, via Arunte, piazza Graziano da Chiusi, via Ermanno aldetti, via onci, via Mecenate, via Lavinia, via Giuseppe Garibaldi"
  },
  {
    condition: "Immobili di categoria C/3 Laboratori per arti e mestieri",
    details: "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: Via Porsenna o via Arunte o piazza Graziano da Chiusi o",
    ratePercent: 0
    categoryTypes: ["C/3"]
    context: "Immobili concessi in comodato, Attività innovative - Start up"
    zone: "Via Porsenna, via Arunte, piazza Graziano da Chiusi, via Ermanno aldetti, via onci, via Mecenate, via Lavinia, via Giuseppe Garibaldi"
  },
  {
    condition: "Immobili di categoria C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro",
    details: "Immobili di categoria C Categoria catastale: - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - Collocazione immobile: In una zona specificamente indicata dal comune: via Porsenna o via Arunte o piazza Graziano da Chiusi o via Ermanno aldetti o via onci o via Mecenate o via Lavinia o via Giuseppe Garibaldi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Tipologia di attività: Attivita' innovative - Start up",
    ratePercent: 0
    categoryTypes: ["C/6"]
    context: "Immobili concessi in comodato, Attività innovative - Start up"
    zone: "Via Porsenna, via Arunte, piazza Graziano da Chiusi, via Ermanno aldetti, via onci, via Mecenate, via Lavinia, via Giuseppe Garibaldi"
  },
  {
    condition: "Immobili di categoria A/10 Uffici e studi privati",
    details: "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati - Collocazione immobile: In una zona specificamente indicata dal comune: Via Porsenna o via Arunte o piazza Graziano da Chiusi o via Ermanno aldetti o via onci o via Mecenate o via Lavinia o via Giuseppe Garibaldi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Tipologia di attività: Attivita' innovative - Start up",
    ratePercent: 0
    categoryTypes: ["A/10"]
    context: "Immobili concessi in comodato, Attività innovative - Start up"
    zone: "Via Porsenna, via Arunte, piazza Graziano da Chiusi, via Ermanno aldetti, via onci, via Mecenate, via Lavinia, via Giuseppe Garibaldi"
  }
];
