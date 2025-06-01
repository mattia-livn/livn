export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesPonteDiLegnoBS2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.2
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.2
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
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.14
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/1 e D/5",
    details: "Categoria catastale: - D/1 Opifici - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/1","D/5"]
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C, categoria C/3, C/2, C/1, C/4",
    details: "Immobili di categoria , C Categoria catastale: - C/3 Laboratori per arti e mestieri - /2 Case di cura ed ospedali senza fine di lucro - C/1 Negozi e botteghe - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /4 Uffici pubblici",
    ratePercent: 0.46
    categoryTypes: ["C/3","C/2","C/1","C/4"]
  },
  {
    condition: "Abitazione utilizzata direttamente dal soggetto passivo",
    details: "Abitazione utilizzata di ttamente dal soggetto passivo",
    ratePercent: 0.46
    categoryTypes: []
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, CAV con convenzione",
    details: "Abitazione destinata a struttura turistico-ricettiva - Collocazione immobile: In una zona specificamente indicata dal comune: CAV CON CONVENZIONE AI SENSI DEL PGT-MINIMO 3 UNITA' A ITATIVE, & CON ALMENO TRE CAMERE ED UN AGNO PER L'ATTIVITA', AL ERGO DIFFUSO - SU TUTTO IL TERRITORIO COMUNALE",
    ratePercent: 0.46
    categoryTypes: []
    zone: "SU TUTTO IL TERRITORIO COMUNALE"
  },
  {
    condition: "Abitazione destinata a struttura turistico-ricettiva, CAV ai sensi artt. 26 e 38 LR 27/2015",
    details: "Abitazione destinata a struttura turistico-ricettiva - Collocazione immobile: In una zona specificamente indicata dal comune: CAV AI SESNI ARTT. 26 E 38 LR 27/2015 REG. ATTUAZ. 7/2016 CON MINIMO 3 UNITA' A ITATIVE CON LOCAZIONE DA 3 A 30 GIORNI IN ALMENO 5 PERIODI ANNUI; MULTIPROPRI A'; IN TUTTO IL TERRITORIO COMUNALE",
    ratePercent: 0.54
    categoryTypes: []
    zone: "IN TUTTO IL TERRITORIO COMUNALE"
  },
  {
    condition: "Immobili di categoria C, categoria C/2, C/6, C/7",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Collocazione immobile: In una zona specificamente indicata dal comune: PERTINENZE DI A ITAZIONI PRINCIPALI MAX QUATTRO U.I. COMPRESE PERTINENZE ESENTI O IN USO GRATUITO A FAMILIARI MAX DUE U.I. IN TUTTO IL TERRITORIO COMUNALE",
    ratePercent: 0.46
    categoryTypes: ["C/2","C/6","C/7"]
    zone: "IN TUTTO IL TERRITORIO COMUNALE"
  }
];
