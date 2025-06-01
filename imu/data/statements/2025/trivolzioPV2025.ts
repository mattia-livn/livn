export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTrivolzioPV2025: ImuRateEntry[] = [
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
    ratePercent: 0.86
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
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.96
    categoryTypes: []
  },
  {
    condition: "Terreni agricoli coltivati",
    details: "Ter ni agricoli - Utilizzo: Coltivati",
    ratePercent: 0
    categoryTypes: []
    context: "Coltivati"
  },
  {
    condition: "Aree fabbricabili diverse da residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: ART. 62 TESSUTO ASSA DENS. €/mq 30,00 --ART. 63 TESSUTO SEMI-APERTO MEDIA DENS. €/mq 50,00 --ART. 64 TESSUTO ATTIVITA' PRODUTT. INTERNE TESSUTO UR . €/mq 30,00 --ART. 67 TESSUTO PER ATTIVITA' PRODUTTIVE €/mq 25,00 --ART. 74 AREE PRODUTT. ESISTENTI €/mq 25,00--ART. 75 AREE RIC TIVE ESISTENTI €/mq 35,00 -- ART. 18 AREE TRASFORM. PRODUTT. ATP1 €/MQ 20,00 + ATP2 €/mq. 15,00 +ATP3 €/mq 20,00",
    ratePercent: 0.96
    categoryTypes: []
    context: "Diverse da residenziali"
    zone: "ART. 62, ART. 63, ART. 64, ART. 67, ART. 74, ART. 75, ART. 18"
  },
  {
    condition: "Aree fabbricabili residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: ART. 19-AREE DI SPECIFICAZIONE FUNZIONALE AL1-AL2-AL3 RESIDENZIALI VICINO CENTRO A ITATO €/mq 15,00 -- ART. 19 AREE SPECIFIC. FUNZIONALE AL5 RESIDENZ. VICINE CENTRO A ITATO - Valo - €/mq 20,00ART. 19 AREE SPECIFIC. FUNZIONALE AL4 RESIDENZ. VICINE CENTRO A ITATO - Valo - €/mq 23,00- ART. 17 AREE DI TRASFORMAZIONE RESIDENZIALE ATR 4 €/mq 15,00 - ATR 1 €/mq 20,00 - ATR 2 E ATR 3 €/mq 25,00",
    ratePercent: 0.96
    categoryTypes: []
    context: "Residenziali"
    zone: "ART. 19, ART. 17"
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione o comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.96
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
    context: "Locazione o comodato d'uso gratuito"
  }
];
