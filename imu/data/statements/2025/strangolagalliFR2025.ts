export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesStrangolagalliFR2025: ImuRateEntry[] = [
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
    ratePercent: 1
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
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
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO.",
    ratePercent: 0.2
    categoryTypes: []
    context: "Residenziali"
    zone: "AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO"
  },
  {
    condition: "Aree fabbricabili diverse da residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Diverse da residenziali - Situate in determinate zone: AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO.",
    ratePercent: 0.2
    categoryTypes: []
    context: "Diverse da residenziali"
    zone: "AREE FABBRICABILI DI FATTO INEDIFICABILI PERCHE' LA SUPERFICIE NON RAGGIUNGE IL LOTTO MINIMO"
  },
  {
    condition: "Abitazione a disposizione non locata e non concessa in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Utilizzo/Inutilizzo: Con uso limitato e discontinuo o stagionale, per un utilizzo complessivo non superiore a mesi: 5",
    ratePercent: 0.8
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Con uso limitato e discontinuo o stagionale"
  },
  {
    condition: "Abitazione a disposizione non locata e non concessa in comodato, priva di arredi e utenze",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Utilizzo/Inutilizzo: Privi di ogni arredo, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    ratePercent: 0.5
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Privi di ogni arredo, sprovvisti di utenze di fornitura attive"
  },
  {
    condition: "Abitazione a disposizione non locata e non concessa in comodato, soggetto con invalidità civile",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Requisiti del soggetto passivo: Soggetto con invalidità civile riconosciuta in percentuale non inferiore al: 70%",
    ratePercent: 0.2
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Soggetto con invalidità civile riconosciuta"
  },
  {
    condition: "Abitazione a disposizione non locata e non concessa in comodato, portatore di handicap grave",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 12 - Requisiti del soggetto passivo: Portatore di handicap grave riconosciuto ai sensi dell'art. 3, comma 3, della L. 104/92",
    ratePercent: 0.2
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Portatore di handicap grave"
  },
  {
    condition: "Abitazione locata o in comodato, contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - Durata del contratto di durata non inferiore a mesi, specifica : 36 - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al secondo grado in linea retta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.7
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6"]
    context: "Comodato d'uso gratuito, contratto registrato"
  }
];
