export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesBellunoBL2025: ImuRateEntry[] = [
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
    ratePercent: 0.06
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.91
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/8, supermercati",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.11.20 - Supermercati",
    ratePercent: 1.06
    categoryTypes: ["D/8"]
    context: "Codice ATECO: 47.11.20 - Supermercati"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/8, ipermercati",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.11.10 - Ipermercati",
    ratePercent: 1.06
    categoryTypes: ["D/8"]
    context: "Codice ATECO: 47.11.10 - Ipermercati"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/5, istituti di credito",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
  },
  {
    condition: "Immobili di categoria C",
    details: "Immobili di categoria C",
    ratePercent: 0.8
    categoryTypes: ["C"]
  },
  {
    condition: "Immobili di categoria A/10, uffici e studi privati",
    details: "Categoria catastale: - A/10 Uffici e studi privati",
    ratePercent: 0.86
    categoryTypes: ["A/10"]
  },
  {
    condition: "Immobili di categoria C/1, negozi e botteghe, in Via Mezzaterra",
    details: "Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Mezzaterra come da planimetria allegata alla delibera di Consiglio Comunale.",
    ratePercent: 0.46
    categoryTypes: ["C/1"]
    context: "Collocazione immobile: In una zona specificamente indicata dal comune: Via Mezzaterra"
    zone: "Via Mezzaterra"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: locazione",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione",
    ratePercent: 0.96
    categoryTypes: []
    context: "Tipo contratto: Locazione"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.96
    categoryTypes: []
    context: "Tipo contratto: Comodato d'uso gratuito"
  }
];
