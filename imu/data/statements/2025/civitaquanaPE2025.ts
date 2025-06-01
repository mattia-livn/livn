export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCivitaquanaPE2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.05
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0
    categoryTypes: []
    context: "NO"
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
    ratePercent: 1.06
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
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 56.1 - RISTORANTI E ATTIVITA' DI RISTORAZIONE MO ILE",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
    context: "Codice ATECO: 56.1"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 33.1 - RIPARAZIONE E MANUTENZIONE DI PRODOTTI IN M ALLO, MACCHINE ED APPARECCHIATURE",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
    context: "Codice ATECO: 33.1"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici",
    ratePercent: 0.86
    categoryTypes: ["D/1"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 31.0 - FA RICAZIONE DI MO ILI",
    ratePercent: 0.86
    categoryTypes: ["D/3","D/8"]
    context: "Codice ATECO: 31.0"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 25.9 - FA RICAZIONE DI ALTRI PRODOTTI IN M ALLO",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
    context: "Codice ATECO: 25.9"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Codice ATECO: 10.4 - PRODUZIONE DI OLI E GRASSI VEG ALI E ANIMALI",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
    context: "Codice ATECO: 10.4"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D a disposizione",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili a disposizione",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D locati o concessi in comodato",
    details: "Fabbricati appartenenti al gruppo catastale D\nCategoria catastale: - D/1 Opifici - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/3","D/8"]
  }
];
