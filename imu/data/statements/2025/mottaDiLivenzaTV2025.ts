export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMottaDiLivenzaTV2025: ImuRateEntry[] = [
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
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.96
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe dentro il centro storico a disposizione",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1.06
    categoryTypes: ["C/1"]
    context: "Immobili a disposizione"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe dentro il centro storico utilizzati direttamente",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe dentro il centro storico locati",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Immobili locati"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe fuori dal centro storico",
    details: "- Collocazione immobile: Fuori dal centro storico",
    ratePercent: 0.96
    categoryTypes: ["C/1"]
    zone: "Fuori dal centro storico"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe dentro il centro storico locati o concessi in comodato a ONLUS o altri enti del terzo settore",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato - Requisiti soggettivi del locatario o comodatario: ONLUS o altri enti del terzo setto",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Immobili locati o concessi in comodato"
    zone: "Dentro il centro storico"
  }
];
