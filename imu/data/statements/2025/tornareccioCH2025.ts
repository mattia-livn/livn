export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTornareccioCH2025: ImuRateEntry[] = [
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
    ratePercent: 0.8
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
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili residenziali situate in determinate zone inferiori a 100 mq",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: INFERIORI A 100 MQ",
    ratePercent: 0
    categoryTypes: []
    zone: "INFERIORI A 100 MQ"
  },
  {
    condition: "Aree fabbricabili residenziali situate in determinate zone da 0 a 500 mq utilizzati dai proprietari a scopi agricoli o incolti",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: DA O A 500 MQ UTILIZZATI DAI PROPRI ARI A SCOPI AGRICOLI O INCOLTI O SE PER LA LORO CONFORMAZIONE PLANO-ALTIM RICA SI PRESENTANO INEDIFICA ILI, PREVIA AUTODICHIARAZIONE DEL PROPRI ARIO AI SENSI DEGLI ARTT. 46 E 47 DEL DPR 445/2000",
    ratePercent: 0
    categoryTypes: []
    context: "Previa autodichiarazione del proprietario"
    zone: "DA 0 A 500 MQ"
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato e utilizzata come abitazione principale",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
    context: "Con contratto registrato"
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato e utilizzata come abitazione principale sino al terzo grado in linea retta",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al terzo grado in linea tta - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Con contratto registrato"
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo con invalidità civile riconosciuta al 100%",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo Categoria catastale: - A/1 Abitazioni di tipo signorile - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Requisiti del soggetto passivo: Soggetto con invalidita' civile riconosciuta in percentuale non inferio al: 100%",
    ratePercent: 0.55
    categoryTypes: ["A/1","A/8","A/9"]
    context: "Soggetto con invalidità civile riconosciuta al 100%"
  }
];
