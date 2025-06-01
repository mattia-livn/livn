export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesZolaPredosaBO2025: ImuRateEntry[] = [
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
    ratePercent: 0.1
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
    condition: "Fabbricati a disposizione o utilizzati: Immobili locati - Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni",
    details: "Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 1
    categoryTypes: ["D"]
  },
  {
    condition: "Fabbricati a disposizione o utilizzati: Immobili utilizzati direttamente dal soggetto passivo - Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni",
    details: "Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 1
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli parzialmente e totalmente esenti",
    details: "Ter ni agricoli - Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: FOGLI PARZIALMENTE ESENTI: 22 e 23;FOGLI TOTALMENTE ESENTI: 24, 25, 26, 27, 29, 30, 31, 32, 33, 34 , 35,36, 37, 38, 39 e 40",
    ratePercent: 0
    categoryTypes: []
    zone: "FOGLI PARZIALMENTE ESENTI: 22 e 23; FOGLI TOTALMENTE ESENTI: 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 e 40"
  },
  {
    condition: "Abitazione locata o in comodato - Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.8
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C - Immobili locati - Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 1
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Immobili di categoria A10, C - Immobili utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo",
    ratePercent: 1
    categoryTypes: ["A10","C"]
  }
];
