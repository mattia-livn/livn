export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMontevarchiAR2025: ImuRateEntry[] = [
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
    ratePercent: 1.11
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.5
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
    ratePercent: 1.11
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D con superficie non superiore a 300 MQ, utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D - Superficie: Non superio a Mq 300 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Superficie non superiore a 300 MQ, utilizzati direttamente dal soggetto passivo"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, locati o concessi in comodato, utilizzati per attività produttiva e/o commerciale",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Locati o concessi in comodato, utilizzati per attività produttiva e/o commerciale"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, locati o concessi in comodato, utilizzati per attività innovative - Start up",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del locatario, comodatario o soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 36 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attivit�: Attivita' innovative - Start up",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Locati o concessi in comodato, utilizzati per attività innovative - Start up"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D con superficie non superiore a 1500 MQ, utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D - Superficie: Non superio a Mq 1500 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Superficie non superiore a 1500 MQ, utilizzati direttamente dal soggetto passivo"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale, locati o in comodato, utilizzati come abitazione principale da persona con disabilità",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Condizioni locatario/comodatario: Persona con disabilita' riconosciuta ai sensi dell'articolo 3, comma 3, della L. 104/92 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Locati o in comodato, utilizzati come abitazione principale da persona con disabilità"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale, locati o in comodato, utilizzati come abitazione principale da soggetto in condizioni di vulnerabilità sociale",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Condizioni locatario/comodatario: Soggetto in condizioni di vulnerabilita' sociale/emergenza abitativa come definite nel golamento - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Locati o in comodato, utilizzati come abitazione principale da soggetto in condizioni di vulnerabilità sociale"
  },
  {
    condition: "Immobili di categoria C utilizzati direttamente dal soggetto passivo per attività produttiva e/o commerciale",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/7 Tettoie chiuse od aperte - Superficie: Non superio a Mq 300 MQ - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.96
    categoryTypes: ["C/1","C/2","C/3","C/7"]
    context: "Utilizzati direttamente dal soggetto passivo per attività produttiva e/o commerciale"
  }
];
