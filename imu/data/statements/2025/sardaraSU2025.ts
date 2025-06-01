export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSardaraSU2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.05
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.05
    categoryTypes: []
    context: "SI"
  },
  {
    condition: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    details: "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    ratePercent: 0.01
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.86
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Terr ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Produzione di energia elettrica",
    details: "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.11.00 - Produzione di energia elettrica",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 35.11.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Trasmissione di energia elettrica",
    details: "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.12.00 - Trasmissione di energia elettrica",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 35.12.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Distribuzione di energia elettrica",
    details: "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.13.00 - Distribuzione di energia elettrica",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 35.13.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Commercio di energia elettrica",
    details: "- Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 35.14.00 - Commercio di energia elettrica",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 35.14.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Telecomunicazioni mobili",
    details: "- Codice ATECO: 61.20.00 - Telecomunicazioni mobili",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 61.20.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Telecomunicazioni satellitari",
    details: "- Codice ATECO: 61.30.00 - Telecomunicazioni satellitari",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 61.30.00"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Altre attività connesse alle telecomunicazioni",
    details: "- Codice ATECO: 61.90.99 - Alt attivita' connesse alle telecomunicazioni nca",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 61.90.99"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Erogazione di servizi di accesso ad internet ISP",
    details: "- Codice ATECO: 61.90.10 - Erogazione di servizi di accesso ad internet ISP",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 61.90.10"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Intermediazione in servizi di telecomunicazione e trasmissione dati",
    details: "- Codice ATECO: 61.90.91 - Intermediazione in servizi di telecomunicazione e trasmissione dati",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Codice ATECO: 61.90.91"
  }
];
