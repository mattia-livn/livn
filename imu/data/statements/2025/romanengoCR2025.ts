export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesRomanengoCR2025: ImuRateEntry[] = [
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
    ratePercent: 1.06
    categoryTypes: ["D"]
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
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.14
    categoryTypes: ["D/1","D/5","D/6","D/7","D/8"]
  },
  {
    condition: "Immobili di categoria C/4 e C/7",
    details: "Immobili di categoria C Categoria catastale: - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/7 Tettoie chiuse od aperte",
    ratePercent: 1.08
    categoryTypes: ["C/4","C/7"]
  },
  {
    condition: "Immobili di categoria C/6",
    details: "Immobili di categoria C Categoria catastale: - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro",
    ratePercent: 0.98
    categoryTypes: ["C/6"]
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva",
    details: "Abitazione destinata a struttura turistico-ricettiva",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota olt la misura dell’1,06%: Seconde case, ossia immobili ad uso abitativo diversi dall'abitazione principale del proprietario.",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo - Ulteriori condizioni non rinvenibili tra quelle proposte nella p sente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota olt la misura dell’1,06%: Seconde case, ossia immobili ad uso abitativo diverse dall'abitazione principale del proprietario.",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/10, C/1, C/2, C/3",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /2 Case di cura ed ospedali senza fine di lucro - /4 Uffici pubblici - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri",
    ratePercent: 1.14
    categoryTypes: ["A/10","C/1","C/2","C/3"]
  }
];
