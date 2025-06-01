export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesBiennoBS2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.4
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.4
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
    ratePercent: 1.03
    categoryTypes: ["D"]
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
    details: "Aree fabbricabili",
    ratePercent: 1.03
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.03
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/4",
    details: "Categoria catastale: - D/4 Case di cura ed ospedali con fine di lucro - Superficie: Non inferiore a Mq 3000 MQ - Collocazione immobile: In una zona specificamente indicata dal comune: Via Pradelli - Fabbricati a disposizione o utilizzati: Immobili utilizzati direttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : ONLUS o altri enti del terzo settore - Codice ATECO: 87.10.00 - Struttura di assistenza infermieristica residenziale per anziani",
    ratePercent: 0.86
    categoryTypes: ["D/4"]
    context: "ONLUS o altri enti del terzo settore"
    zone: "Via Pradelli"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D, categoria catastale /1 e /2",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - Superficie: Non inferiore a Mq 3000 MQ - Collocazione immobile: In una zona specificamente indicata dal comune: Via Pradelli",
    ratePercent: 0.3
    categoryTypes: ["/1","/2"]
    context: "ONLUS o altri enti del terzo settore"
    zone: "Via Pradelli"
  }
];
