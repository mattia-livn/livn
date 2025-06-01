export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesAlessandriaAL2025: ImuRateEntry[] = [
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
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
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
    condition: "Fabbricati appartenenti al gruppo catastale D - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.93
    categoryTypes: ["D"]
    context: "Divenuti inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Collocazione immobile: In una zona specificamente indicata dal comune: spinetta ma ngo e castelceriolo",
    ratePercent: 0.96
    categoryTypes: []
    context: "Non locate e non concesse in comodato"
    zone: "spinetta marengo e castelceriolo"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Collocazione immobile: In una zona specificamente indicata dal comune: spinetta ma ngo e castelceriolo",
    ratePercent: 0.96
    categoryTypes: []
    context: "Locazione o comodato d'uso gratuito"
    zone: "spinetta marengo e castelceriolo"
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.93
    categoryTypes: []
    context: "Divenuti inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.93
    categoryTypes: []
    context: "Divenuti inagibili a seguito di calamità naturali"
  },
  {
    condition: "Immobili di categoria A10, C - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Immobili di categoria A10, , C - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.93
    categoryTypes: ["A10","C"]
    context: "Divenuti inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747",
    ratePercent: 0.9
    categoryTypes: []
    context: "Comodato d'uso gratuito a parenti sino al primo grado"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfare particolari esigenze abitative",
    details: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Accordi/Patti territoriali per esigenze abitative"
  }
];
