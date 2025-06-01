export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCastelnovoDiSottoRE2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.54
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.54
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
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
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
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.98
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.98
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i. - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C - C/2 Magazzini e locali di deposito, C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro, C/7 Tettoie chiuse od aperte",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1.06
    categoryTypes: ["C/2","C/6","C/7"]
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Privi di ogni arredo, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Utilizzo/Inutilizzo: Privi di ogni ar do, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria - /5 Scuole e laboratori scientifici",
    details: "Immobili di categoria Categoria catastale: - /5 Scuole e laboratori scientifici",
    ratePercent: 0.2
    categoryTypes: ["/5"]
  }
];
