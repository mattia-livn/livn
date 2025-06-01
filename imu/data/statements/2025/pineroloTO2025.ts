export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPineroloTO2025: ImuRateEntry[] = [
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
    ratePercent: 1.02
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: []
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.4
    categoryTypes: []
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 6",
    ratePercent: 0
    categoryTypes: []
    context: "Fino a mesi: 6"
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Periodo non coperto da contratti purch� la condizione di immobile a disposizione persista da almeno: 12 - Utilizzo/Inutilizzo: Privi di ogni ar do, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    ratePercent: 1.06
    categoryTypes: []
    context: "Privi di ogni arredo, sprovvisti di utenze attive"
  },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, C Categoria catastale:",
    ratePercent: 1.06
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Abitazione a disposizione - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
    context: "Inagibili a seguito di calamità naturali"
  },
  {
    condition: "Immobili di categoria A10, C - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Immobili di categoria A10, , C - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: ["A10","C"]
    context: "Inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali",
    details: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento",
    ratePercent: 0.48
    categoryTypes: []
    context: "Accordi/Patti territoriali"
  }
];
