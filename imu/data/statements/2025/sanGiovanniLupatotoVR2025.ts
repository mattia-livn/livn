export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanGiovanniLupatotoVR2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.5
    categoryTypes: []
    context: "Ai sensi dell'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019"
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
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Esclusa la categoria catastale D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Terreni agricoli",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.05
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/3 e D/6",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro",
    ratePercent: 0.86
    categoryTypes: ["D/3","D/6"]
    context: "Con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/2 e D/5",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/5 Istituto di credito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/2","D/5"]
    context: "Con fine di lucro"
  },
  {
    condition: "Abitazione locata o in comodato, locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Purché l'affittuario/comodatario la utilizzi come abitazione principale"
  },
  {
    condition: "Immobili di categoria C",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
    ratePercent: 0.93
    categoryTypes: ["C/1","C/2","C/3","C/4"]
    context: "Senza fine di lucro"
  },
  {
    condition: "Immobili di categoria /1",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme",
    ratePercent: 0.95
    categoryTypes: ["/1"]
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione Fino a mesi: 12",
    ratePercent: 0
    categoryTypes: []
    context: "Fino a mesi: 12"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato, comodato d'uso gratuito con contratto registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto registrato - Condizioni locatario/comodatario: Parenti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019"
  }
];
