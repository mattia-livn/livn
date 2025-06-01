export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMonzaMB2025: ImuRateEntry[] = [
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/3",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo",
    ratePercent: 0.87
    categoryTypes: ["D/3"]
  },
  {
    condition: "Immobili di categoria C utilizzati per attività produttiva e/o commerciale",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.84
    categoryTypes: ["C/1","C/3"]
  },
  {
    condition: "Abitazione locata o in comodato, utilizzata come abitazione principale",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato a parenti fino al secondo grado",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C di proprietà di ONLUS o enti del terzo settore",
    details: "Immobili di categoria A10, , C - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.84
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Abitazione locata o in comodato di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.84
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato di proprieta' di ONLUS o di altri enti del terzo setto - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.84
    categoryTypes: []
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.84
    categoryTypes: []
  }
];
