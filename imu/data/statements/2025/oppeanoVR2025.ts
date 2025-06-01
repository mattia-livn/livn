export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesOppeanoVR2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.57
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.57
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
    ratePercent: 1.04
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 12",
    ratePercent: 0
    categoryTypes: []
    context: "Fino a mesi: 12"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10, C concessi in comodato a ONLUS o altri enti del terzo settore",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Requisiti soggettivi del comodatario: ONLUS o altri enti del terzo setto - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Con contratto gistrato",
    ratePercent: 0
    categoryTypes: ["A10","C"]
    context: "ONLUS o altri enti del terzo settore"
  },
  {
    condition: "Abitazione locata o in comodato a ONLUS o altri enti del terzo settore",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Durata del contratto di durata non inferio a mesi, specifica : 12 - Con contratto gistrato - Condizioni locatario/comodatario: ONLUS o altri enti del terzo setto",
    ratePercent: 0
    categoryTypes: []
    context: "ONLUS o altri enti del terzo settore"
  },
  {
    condition: "Immobili di categoria C/1 e C/2 utilizzati per commercio al dettaglio",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.11 - Commercio al dettaglio in esercizi non specializzati con p valenza di prodotti alimentari e bevande",
    ratePercent: 0.7
    categoryTypes: ["C/1","C/2"]
    context: "Commercio al dettaglio"
  },
  {
    condition: "Immobili di categoria C/1 e C/2 utilizzati per commercio di tabacco",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.26 - Commercio al dettaglio di prodotti del tabacco in esercizi specializzati",
    ratePercent: 0.7
    categoryTypes: ["C/1","C/2"]
    context: "Commercio di tabacco"
  },
  {
    condition: "Immobili di categoria C/1 e C/2 utilizzati per minimercati",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: ottega storica o artigiana - Codice ATECO: 47.11.4 - Minimercati ed altri esercizi non specializzati di alimentari vari",
    ratePercent: 0.7
    categoryTypes: ["C/1","C/2"]
    context: "Minimercati"
  }
];
