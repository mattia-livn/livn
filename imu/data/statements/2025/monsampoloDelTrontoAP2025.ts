export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesMonsampoloDelTrontoAP2025: ImuRateEntry[] = [
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
    ratePercent: 0.76
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
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Locatario/comodatario non titola di propriet� o altro diritto ale di godimento su immobili - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale. - Collocazione immobile: Dentro il centro storico",
    ratePercent: 0.66
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Comodato d'uso gratuito, dentro il centro storico"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria A/10, C/1 - Fuori dal centro storico",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - Collocazione immobile: Fuori dal centro storico - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.76
    categoryTypes: ["A/10","C/1"]
    context: "Fuori dal centro storico, utilizzato per attività produttiva e/o commerciale"
    zone: "Fuori dal centro storico"
  },
  {
    condition: "Immobili di categoria A/10, C/1 - Dentro il centro storico",
    details: "Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.56
    categoryTypes: ["A/10","C/1"]
    context: "Dentro il centro storico, utilizzato per attività produttiva e/o commerciale"
    zone: "Dentro il centro storico"
  }
];
