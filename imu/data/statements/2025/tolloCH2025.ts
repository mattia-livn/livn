export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesTolloCH2025: ImuRateEntry[] = [
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
    ratePercent: 0.96
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.86
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D situati nel centro urbano",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: FA RICATI SITUATI NEL CENTRO UR ANO NEL TERRITORIO COMUNALE, CLASSIFICATI NEL VIGENTE PAINO DI RECUPERO ESCLUSIVAMENTE NELLE ZONE A1 E A2 - Fabbricati a disposizione o utilizzati: Immobili locati",
    ratePercent: 0.86
    categoryTypes: ["D/8"]
    context: "Immobili locati"
    zone: "Centro urbano, zone A1 e A2"
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.96
    categoryTypes: []
    context: "Comodato d'uso gratuito, contratto registrato"
  },
  {
    condition: "Immobili di categoria A10, C",
    details: "Immobili di categoria A10, C Categoria catastale: - A/10 Uffici e studi privati - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.96
    categoryTypes: ["A/10","C/1","C/3"]
  },
  {
    condition: "Immobili di categoria C situati nel centro urbano",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: IMMO ILI SITUATI NEL CENTRO UR ANO DEL TERRITORIO COMUNALE CLASSIFICATI NEL VIGENTE PIANO DI",
    ratePercent: 0.86
    categoryTypes: ["C/1","C/3"]
    zone: "Centro urbano"
  }
];
