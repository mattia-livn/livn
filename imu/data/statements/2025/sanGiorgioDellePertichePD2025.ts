export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanGiorgioDellePertichePD2025: ImuRateEntry[] = [
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
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.86
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
    context: "Istituto di credito, cambio e assicurazione con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, immobili in Via Caselle",
    details: "Collocazione immobile: In una zona specificamente indicata dal comune: Tutti gli immobili ricadenti in Via Caselle",
    ratePercent: 1.06
    categoryTypes: ["D"]
    zone: "Via Caselle"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, immobili a disposizione",
    details: "Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Immobili a disposizione"
  },
  {
    condition: "Aree fabbricabili situate nel futuro Parco Commerciale in Via Caselle",
    details: "Situate in determinate zone: A e edificabili ubicate nel futuro Parco Commerciale in Via Caselle",
    ratePercent: 1.06
    categoryTypes: []
    context: "Ubicate nel futuro Parco Commerciale"
    zone: "Via Caselle"
  },
  {
    condition: "Abitazione locata o in comodato, categoria catastale A/2, A/3, A/4, A/5, A/6, A/7",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019",
    ratePercent: 0.66
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Comodato d'uso gratuito, con contratto registrato"
  },
  {
    condition: "Altri fabbricati, immobili di categoria A10, C in Via Caselle",
    details: "Immobili di categoria A10, , C - Collocazione immobile: In una zona specificamente indicata dal comune: Tutti gli immobili ricadenti in Via Caselle",
    ratePercent: 1.06
    categoryTypes: ["A10","C"]
    zone: "Via Caselle"
  }
];
