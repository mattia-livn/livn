export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesVillafrancaDiVeronaVR2025: ImuRateEntry[] = [
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
    ratePercent: 0.98
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.98
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.98
    categoryTypes: []
  },
  {
    condition: "Terreni agricoli di proprietà di ONLUS o enti del terzo settore",
    details: "Ter ni agricoli - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Fabbricati di proprietà di ONLUS o enti del terzo settore",
    details: "A e Fabbricabili - Di propriet� di ONLUS o enti del terzo setto",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato a ONLUS o altri enti del terzo settore",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: ONLUS o altri enti del terzo setto - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo di proprietà di ONLUS o enti del terzo settore",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo - Requisiti del soggetto passivo: Di proprieta' di ONLUS o enti del terzo setto",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato a parenti sino al primo grado",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non",
    ratePercent: 0
    categoryTypes: []
  }
];
