export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesBagnacavalloRA2025: ImuRateEntry[] = [
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
    ratePercent: 1
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
    context: "Istituto di credito, cambio e assicurazione con fine di lucro"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone con vincolo preordinato all'esproprio",
    details: "- Tipologia: Residenziali - Situate in determinate zone: con vincolo p ordinato all'esproprio",
    ratePercent: 0.53
    categoryTypes: []
    context: "Con vincolo preordinato all'esproprio"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone con vincolo preordinato all'esproprio",
    details: "- Tipologia: Diverse da sidenziali - Situate in determinate zone: con vincolo p ordinato all'esproprio",
    ratePercent: 0.53
    categoryTypes: []
    context: "Con vincolo preordinato all'esproprio"
  },
  {
    condition: "Fabbricati residenziali situati in determinate zone in centro storico durante interventi di recupero",
    details: "- Tipologia: Residenziali - Situate in determinate zone: in centro storico durante interventi di cupero",
    ratePercent: 0.1
    categoryTypes: []
    context: "In centro storico durante interventi di recupero"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone in centro storico durante interventi di recupero",
    details: "- Tipologia: Diverse da sidenziali - Situate in determinate zone: in centro storico durante interventi di cupero",
    ratePercent: 0.1
    categoryTypes: []
    context: "In centro storico durante interventi di recupero"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica aventi le stesse finalità",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.46
    categoryTypes: []
    context: "Assegnati dagli IACP o enti di edilizia residenziale pubblica"
  },
  {
    condition: "Abitazione a disposizione - Fabbricati divenuti inagibili a seguito di calamità naturali",
    details: "Abitazione a disposizione - Fabbricati divenuti inagibili a seguito di calamit� naturali",
    ratePercent: 0
    categoryTypes: []
    context: "Divenuti inagibili a seguito di calamità naturali"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 0.86
    categoryTypes: []
    context: "Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i."
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.96
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Comodato d'uso gratuito, condizioni locatario/comodatario: parenti sino al primo grado, ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019"
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito con contratto registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.96
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Comodato d'uso gratuito con contratto registrato, condizioni locatario/comodatario: parenti sino al primo grado, ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019, limitatamente ad un solo immobile"
  }
];
