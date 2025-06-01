export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSpinetoliAP2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.55
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.55
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
    ratePercent: 1.05
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.9
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.05
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.05
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.65
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
    context: "Con contratto registrato"
  },
  {
    condition: "Abitazione locata o in comodato in zone specifiche",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Con contratto gistrato - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Collocazione immobile: In una zona specificamente indicata dal comune: - Via Costanzo Mazzoni;- Via Giacinto Centini;- Via del Forte;- Via del",
    ratePercent: 0.76
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
    context: "Con contratto registrato"
    zone: "Via Costanzo Mazzoni, Via Giacinto Centini, Via del Forte"
  },
  {
    condition: "Immobili di categoria A10, C in zone specifiche",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: - Via Costanzo Mazzoni;- Via Giacinto Centini;- Via del Forte;- Via del Castello;- Via Domenico Michelessi;- Via dei Capperi;- Via Orazio Piccolomini;- Largo Ciabattoni;- Piazza Roma;- Piazza Giacomo Leopardi;- Via elvede ; - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    ratePercent: 0.76
    categoryTypes: ["A/10","C/1","C/3"]
    context: "Con contratto registrato"
    zone: "Via Costanzo Mazzoni, Via Giacinto Centini, Via del Forte, Via del Castello, Via Domenico Michelessi, Via dei Capperi, Via Orazio Piccolomini, Largo Ciabattoni, Piazza Roma, Piazza Giacomo Leopardi, Via elvede"
  }
];
