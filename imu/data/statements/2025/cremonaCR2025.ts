export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCremonaCR2025: ImuRateEntry[] = [
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
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Terreni agricoli di proprietà di ONLUS o enti del terzo settore",
    details: "Ter ni agricoli - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.61
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati di proprietà di ONLUS o enti del terzo settore",
    details: "A e Fabbricabili - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.61
    categoryTypes: []
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.75
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.98
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
  },
  {
    condition: "Abitazione locata o in comodato di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso",
    ratePercent: 0.61
    categoryTypes: []
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione destinata a struttura turistico-ricettiva - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.61
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione di proprietà di ONLUS o di altri enti del terzo settore",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato di proprieta' di ONLUS o di altri enti del terzo setto Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.61
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.61
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
  }
];
