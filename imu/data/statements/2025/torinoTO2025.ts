export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTorinoTO2025: ImuRateEntry[] = [
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/3",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica",
    ratePercent: 0.96
    categoryTypes: ["D/3"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie D/1 e D/7",
    details: "Categoria catastale: - D/1 Opifici - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72.1 - RICERCA E SVILUPPO SPERIMENTALE NEL CAMPO DELLE SCIENZE NATURALI E DELL'INGEGNERIA",
    ratePercent: 0.86
    categoryTypes: ["D/1","D/7"]
  },
  {
    condition: "Altri fabbricati, abitazione locata o in comodato, categorie A/2, A/3, A/4, A/5",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola",
    ratePercent: 0.86
    categoryTypes: ["A/2","A/3","A/4","A/5"]
  },
  {
    condition: "Altri fabbricati, abitazione locata o in comodato, categorie A/6, A/7",
    details: "- A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Soggetti affidatari dei servizi di accoglienza integrata destinati a richiedenti asilo e titolari di protezione internazionale o umanitaria",
    ratePercent: 0.86
    categoryTypes: ["A/6","A/7"]
  },
  {
    condition: "Altri fabbricati, abitazione locata o in comodato, locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.575
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati, abitazione locata o in comodato, locazione a studenti",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.575
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati, abitazione locata o in comodato, locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 3, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.575
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati, immobili di categoria A10, C",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/2 Magazzini e locali di deposito - C/3 Laboratori per arti e mestieri - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 24 - Tipologia di attivit�: Attivita' innovative - Start up - Codice ATECO: 72.1 - RICERCA E SVILUPPO SPERIMENTALE NEL CAMPO DELLE SCIENZE NATURALI E DELL'INGEGNERIA",
    ratePercent: 0.86
    categoryTypes: ["A/10","C/2","C/3"]
  }
];
