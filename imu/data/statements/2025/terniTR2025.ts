export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTerniTR2025: ImuRateEntry[] = [
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
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato",
    ratePercent: 1.12
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero - Ulteriori condizioni non rinvenibili tra quelle proposte nella presente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota oltre la misura dell’1,06%: Occorre precisare che, oltre agli immobili ad uso abitativo locati a canone di libero mercato, scontano l'aliquota dell' 1,12 % anche le seguenti fattispecie di immobili ad uso abitativo:- Immobili ad uso abitativo concessi in comodato d'uso gratuito a soggetti che non sono parenti in linea retta entro il primo grado del soggetto passivo; - Immobili ad uso abitativo con contratti di locazione stipulati al di fuori degli accordi stabiliti fra le organizzazioni della proprietà edilizia e le organizzazioni dei conduttori, ai sensi della legge 09/12/1998 n.431; - Immobili ad uso abitativo che non sono alloggi regolarmente assegnati dagli Istituti autonomi per le case popolari e dagli enti di edilizia residenziale pubblica; - Immobili ad uso abitativo che non sono stati realizzati nell’ambito dei programmi triennali per l'edilizia residenziale pubblica.",
    ratePercent: 1.12
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/10, Categoria catastale",
    details: "Immobili di categoria A10, Categoria catastale:",
    ratePercent: 1.12
    categoryTypes: ["A/10"]
  },
  {
    condition: "Immobili di categoria C",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Ulteriori condizioni non rinvenibili tra quelle proposte nella presente schermata stabilite dal comune, ai sensi dell’art. 1, comma 755, legge n. 160 del 2019, ai fini dell’applicazione dell’aliquota oltre la misura dell’1,06%: Occorre precisare che l'aliquota del 1,12 % per gli immobili di categoria C/2, C/6 e C/7, si applica nei casi in cui:- gli immobili non sono pertinenza dell'abitazione principale del soggetto passivo;- gli immobili non sono pertinenza di immobili ad uso abitativo, di proprietà del soggetto passivo, concessi in comodato gratuito, unitamente agli stessi, a parenti in linea retta entro il primo grado del soggetto passivo;- gli immobili non sono pertinenza di immobili ad uso abitativo, di proprietà del soggetto passivo, locati, unitamente agli stessi, secondo gli accordi stabiliti fra le organizzazioni della proprietà edilizia e le organizzazioni dei conduttori, ai sensi della legge 09/12/1998 n.431.",
    ratePercent: 1.12
    categoryTypes: ["C/2","C/6","C/7"]
  }
];
