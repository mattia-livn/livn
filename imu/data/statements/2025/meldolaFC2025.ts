export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMeldolaFC2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.48
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.48
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
    ratePercent: 0.94
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.94
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.94
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.94
    categoryTypes: []
  },
  {
    condition: "Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.76
    categoryTypes: ["D"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.5
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione destinata a struttura turistico-ricettiva - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Immobili di categoria A10, , C - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit� - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  }
];
