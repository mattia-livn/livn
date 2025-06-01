export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanBenedettoDelTrontoAP2025: ImuRateEntry[] = [
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
    context: "di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019"
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
    context: "esclusa la categoria catastale D/10"
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
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R.",
    ratePercent: 0.79
    categoryTypes: ["D"]
    context: "Immobili non produttivi di ddito fondiario art. 43 T.U.I.R."
  },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Purchè l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Abitazione locata o in comodato con contratto di locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Durata del contratto di durata non inferio a mesi, specifica : 3",
    ratePercent: 0.79
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
    context: "Durata del contratto di durata non inferio a mesi, specifica : 3"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Purchè l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Immobili di categoria A/10, C utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici - /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/5 Stabilimenti balneari e di acque curative senza fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Immobili non produttivi di ddito fondiario art. 43 T.U.I.R.",
    ratePercent: 0.79
    categoryTypes: ["A/10","C"]
    context: "Immobili non produttivi di ddito fondiario art. 43 T.U.I.R."
  }
];
