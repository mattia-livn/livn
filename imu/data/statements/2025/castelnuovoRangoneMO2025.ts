export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCastelnuovoRangoneMO2025: ImuRateEntry[] = [
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
    ratePercent: 1.06
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D con specifiche categorie",
    details: "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.96
    categoryTypes: ["D/1","D/2","D/3","D/4","D/6","D/7","D/8","D/9"]
    context: "Utilizzato per attività produttiva e/o commerciale"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D con specifiche categorie e requisiti",
    details: "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 36 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.76
    categoryTypes: ["D/1","D/2","D/3","D/4","D/6","D/7","D/8"]
    context: "Persona giuridica esercente attività da non più di 36 mesi"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D in zona specifica",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: ZONA A - Centro storico del Capoluogo. - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.1 - COMMERCIO AL D TAGLIO IN ESERCIZI NON SPECIALIZZATI",
    ratePercent: 0.76
    categoryTypes: ["D/8"]
    context: "Zona A - Centro storico del Capoluogo"
    zone: "ZONA A"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C in zona specifica",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: Zona A - Centro storico del Capoluogo - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 47.1 - COMMERCIO AL D TAGLIO IN ESERCIZI NON SPECIALIZZATI",
    ratePercent: 0.76
    categoryTypes: ["C/1","C/2","C/3"]
    context: "Zona A - Centro storico del Capoluogo"
    zone: "Zona A"
  },
  {
    condition: "Immobili di categoria A10, C concessi in comodato",
    details: "Immobili di categoria A10, , C Categoria catastale: - A/10 Uffici e studi privati - /5 Scuole e laboratori scientifici - /8 Magazzini sotterranei per depositi di derrate - C/1 Negozi e botteghe - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Requisiti soggettivi del comodatario: ONLUS o altri enti del terzo setto - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro",
    ratePercent: 0.46
    categoryTypes: ["A/10","C/1","C/2","C/3","C/4","C/6","C/7"]
    context: "Concessi in comodato a ONLUS o enti del terzo settore"
  }
];
