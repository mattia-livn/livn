export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesGalatoneLE2025: ImuRateEntry[] = [
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/1 Opifici, in una zona specificamente indicata dal comune",
    details: "Categoria catastale: - D/1 Opifici - Collocazione immobile: In una zona specificamente indicata dal comune: ALIQUOTA PREVISTA SOLO PER FABBRICATI IN CUI VIENE SVOLTA ATTIVITA' DI FRANTOIO",
    ratePercent: 0.76
    categoryTypes: ["D/1"]
    context: "ALIQUOTA PREVISTA SOLO PER FABBRICATI IN CUI VIENE SVOLTA ATTIVITA' DI FRANTOIO"
    zone: "In una zona specificamente indicata dal comune"
  },
  {
    condition: "Terreni agricoli coltivati da coltivatori diretti o imprenditori agricoli professionali",
    details: "- Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: ter ni agricoli posseduti e condotti da coltivatori di tti o imp nditori agricoli professionali di cui all’articolo 1 del dec to legislativo 29.3.2004, n. 99, iscritti nella p videnza agricola",
    ratePercent: 0
    categoryTypes: []
    context: "Coltivati da coltivatori diretti o imprenditori agricoli professionali"
    zone: "Terreni ricadenti in determinate aree"
  },
  {
    condition: "Terreni agricoli a immutabile destinazione agro silvo-pastorale a proprietà collettiva indivisibile e non usucapibile",
    details: "- Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: ter ni agricoli a immutabile destinazione agro silvo-pastorale a propriet� collettiva indivisibile e non usucapibile",
    ratePercent: 0
    categoryTypes: []
    context: "Immutabile destinazione agro silvo-pastorale"
    zone: "Terreni ricadenti in determinate aree"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/11 Abitazioni ed alloggi tipici dei luoghi - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Limitatamente ad un solo immobile.",
    ratePercent: 0.53
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7","A/11"]
    context: "Comodato d'uso gratuito"
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.795
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 2, comma 1, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato, tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.795
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 2, comma 3, della Legge n. 431/1998 e s.m.i."
  },
  {
    condition: "Abitazione a disposizione, abitazioni non locate e non concesse in comodato, sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Utilizzo/Inutilizzo: Sprovvisti di utenze di fornitura attive di acqua, luce e gas - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0.53
    categoryTypes: []
    context: "Sprovvisti di utenze di fornitura attive di acqua, luce e gas"
  },
  {
    condition: "Abitazione a disposizione, abitazioni non locate e non concesse in comodato, fabbricati di interesse storico",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI INTERESSE STORICO RIF. ART.10 DLGS 22/01/2004 NR.42",
    ratePercent: 0.53
    categoryTypes: []
    context: "Fabbricati di interesse storico"
    zone: "In una zona specificamente indicata dal comune"
  },
  {
    condition: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attività di assegnazione",
    details: "Fabbricati di civile abitazione destinati ad alloggi sociali non adibiti ad abitazione principale per il periodo di espletamento delle attivit� di assegnazione Fino a mesi: 12",
    ratePercent: 0
    categoryTypes: []
    context: "Destinati ad alloggi sociali"
  }
];
