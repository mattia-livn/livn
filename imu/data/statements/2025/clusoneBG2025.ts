export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesClusoneBG2025: ImuRateEntry[] = [
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
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.76
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
    ratePercent: 1.01
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.01
    categoryTypes: ["D/5"]
  },
  {
    condition: "Immobili di categoria /1 utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Codice ATECO: 84.24.00 - Ordine pubblico e sicu zza nazionale",
    ratePercent: 0
    categoryTypes: ["/1"]
    context: "Utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro"
  },
  {
    condition: "Immobili di categoria /1 utilizzati per attività dei vigili del fuoco",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - Fabbricati a disposizione o utilizzati: Immobili locati - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Codice ATECO: 84.25.10 - Attivita' dei vigili del fuoco",
    ratePercent: 0
    categoryTypes: ["/1"]
    context: "Utilizzati per attività dei vigili del fuoco"
  },
  {
    condition: "Immobili di categoria /1 e /2 utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro",
    ratePercent: 0.76
    categoryTypes: ["/1","/2"]
    context: "Utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro"
  },
  {
    condition: "Immobili di categoria A/10, C/1, C/3 concessi in comodato",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Requisiti soggettivi del comodatario: Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 0 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0
    categoryTypes: ["A/10","C/1","C/3"]
    context: "Immobili concessi in comodato"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria A/10, C/1, C/3 utilizzati direttamente dal soggetto passivo",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: Dentro il centro storico - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona giuridica esercente attivita' d'imp sa da un numero di mesi non superio a: 0 - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0
    categoryTypes: ["A/10","C/1","C/3"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
    zone: "Dentro il centro storico"
  },
  {
    condition: "Immobili di categoria C/1 concessi in comodato in zone ad alto tasso di abbandono",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: Piazza dell’Orologio, Piazza Sant’And a, Via Carpinoni, Via Que na dall’incrocio con Via Pietro Fanzago, salendo verso Piazza aradello, Vicolo Caio, Largo Locatelli, Piazza aradello, Via Matteotti, Via de ernardi - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato",
    ratePercent: 0
    categoryTypes: ["C/1"]
    context: "Immobili concessi in comodato"
    zone: "In zone soggette ad un alto tasso di abbandono di attività economico-commerciale"
  }
];
