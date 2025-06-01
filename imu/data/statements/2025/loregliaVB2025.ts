export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesLoregliaVB2025: ImuRateEntry[] = [
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
    details: "Terreni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Categoria catastale: D/1 Opifici",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati direttamente dal soggetto passivo - Destinazione d'uso: Impianti idroelettrici",
    ratePercent: 1.06
    categoryTypes: ["D/1"]
    context: "Impianti idroelettrici"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Abitazione a disposizione",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D Abitazione a disposizione - Abitazioni non locate e non concesse in comodato nonche' abitazioni locate o concesse in comodato per periodi inferiori all'anno e comunque per un numero complessivo di mesi inferiore a: mesi: 12 Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popolare - A/5 Abitazioni di tipo ultrapopolare - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/11 Abitazioni ed alloggi tipici dei luoghi - Collocazione immobile: In una zona specificamente indicata dal comune: fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/11"]
    context: "Abitazioni non locate e non concesse in comodato"
    zone: "fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma"
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Immobili di categoria C",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito",
    ratePercent: 0.5
    categoryTypes: ["C/2"]
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D - Immobili di categoria C",
    details: "- C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro - C/7 Tettoie chiuse od aperte - Collocazione immobile: In una zona specificamente indicata dal comune: fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma",
    ratePercent: 0.5
    categoryTypes: ["C/6","C/7"]
    zone: "fogli 41-42-43-65 alpe Spanero-Rosaccia-Colma"
  }
];
