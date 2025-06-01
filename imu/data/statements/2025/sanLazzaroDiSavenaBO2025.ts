export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanLazzaroDiSavenaBO2025: ImuRateEntry[] = [
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
    condition: "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni non ammesse",
    details: "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni non ammesse dalle schede normative di PSC per gli stessi ambiti in vigo al 1° gennaio dell’anno di imposta - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attività: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
    ratePercent: 0.86
    categoryTypes: ["D"]
    context: "Utilizzato per attività produttiva e/o commerciale"
    zone: "Zone specificamente indicate dal comune"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni ammesse",
    details: "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni ammesse dalle schede normative di PSC per gli stessi ambiti in vigo dal 1° gennaio dell’anno di riferimento - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Tipologia di attività: Imp se che hanno ampliato la propria attivita' economica/aumentato l'occupazione come definite nel golamento",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Utilizzato per attività produttiva e/o commerciale"
    zone: "Zone specificamente indicate dal comune"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D in una zona specificamente indicata dal comune con funzioni ammesse e privi di giochi di azzardo",
    details: "Fabbricati appartenenti al gruppo catastale D - Collocazione immobile: In una zona specificamente indicata dal comune: unità immobiliari insediate all’interno degli ambiti di riqualificazione con funzioni ammesse dalle schede normative di PSC per gli stessi ambiti in vigo dal 1° gennaio dell’anno di riferimento - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Privi o che intendono dismette giochi di azzardo",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Privi di giochi di azzardo"
    zone: "Zone specificamente indicate dal comune"
  },
  {
    condition: "Terreni agricoli coltivati destinati a produzione agricola biologica",
    details: "Ter ni agricoli - Utilizzo: Coltivati e destinati ad alcuni tipi di coltura: Produzione agricola biologica - Collocazione: Ter ni ricadenti in determinate a e: A a: per i ter ni agricoli coltivati destinati a produzione agricola biologica ad esclusione dei ter ni ricadenti in a e montane o di collina per i cui fogli e mappali trova applicazione l'esenzione aliquota 0.00%",
    ratePercent: 0.76
    categoryTypes: []
    context: "Produzione agricola biologica"
    zone: "Esclusione delle aree montane o di collina"
  },
  {
    condition: "Terreni agricoli coltivati in specifiche aree",
    details: "Ter ni agricoli - Utilizzo: Coltivati - Collocazione: Ter ni ricadenti in determinate a e: A a: F16,DA 24 A 27, 31,34,35,DA37A48 F21 M 134, 135, 172, 179, 180, DA 233 A 241, DA 243 A 245,DA 250 A 257- F28 M. 55, 59, 65, DA 69 A 72, 74, 75, DA 85 A 89, DA 118 A 122, DA126 A 132, 140, 193, 194, DA 198 A 200, 222, 223, 226, 227, DA 234 A 254, 474 - F29M 108, DA 110 A 113, DA 125 A 129, DA 145 A 148 - F30 ESCL M DA 1 A 23, 32, 133 - F32 ESCL M DA 1 A 5, 89, 108 - F33 M. 28, 29, 36, DA 38 A 45; DA 59 A 85; 94, 95 - F36 ESCL M 23, DA 46 A 69, DA 71 A 74, DA 80 A 89, DA 91 A 123, DA 152 A 159",
    ratePercent: 0
    categoryTypes: []
    context: "Coltivati"
    zone: "Specifiche aree indicate"
  }
];
