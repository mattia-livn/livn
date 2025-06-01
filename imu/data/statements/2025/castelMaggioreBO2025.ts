export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCastelMaggioreBO2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.4
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.4
    categoryTypes: []
    context: "SI"
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
    ratePercent: 1
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.8
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
    condition: "Terreni agricoli condotti da CD e IAP e Società agricole non posseduti",
    details: "Ter ni agricoli - Utilizzo: Ter ni agricoli condotti da CD e IAP e Societa' agricole non posseduti",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/5 Scuole e laboratori scientifici",
    details: "Immobili di categoria Categoria catastale: - /5 Scuole e laboratori scientifici",
    ratePercent: 0.6
    categoryTypes: ["A/5"]
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/10, C/1, C/3",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    ratePercent: 1
    categoryTypes: ["A/10","C/1","C/3"]
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 6",
    ratePercent: 0
    categoryTypes: []
    context: "Fino a mesi: 6"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    ratePercent: 0.8
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 0.8
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Condizioni locatario/comodatario: Parenti - Indipendentemente dal grado di parentela",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Indipendentemente dal grado di pa ntela",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C/2, C/6, C/7",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    ratePercent: 0.8
    categoryTypes: ["C/2","C/6","C/7"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
  }
];
