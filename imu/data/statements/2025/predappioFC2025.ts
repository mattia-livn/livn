export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPredappioFC2025: ImuRateEntry[] = [
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
    context: "SI"
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
    ratePercent: 1.03
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1.03
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie catastali D/1, D/2, D/3, D/4, D/6, D/7, D/8",
    details: "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.02
    categoryTypes: ["D/1","D/2","D/3","D/4","D/6","D/7","D/8"]
  },
  {
    condition: "Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "- Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/10, C",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati",
    ratePercent: 1.02
    categoryTypes: ["A/10","C"]
  },
  {
    condition: "Immobili di categoria C/1, C/3, C/4",
    details: "- C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
    ratePercent: 1.02
    categoryTypes: ["C/1","C/3","C/4"]
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
    context: "Locazione"
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
  }
];
