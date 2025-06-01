export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesAbetoneCutiglianoPT2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.5
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
    condition: "Aree fabbricabili",
    details: "Aree fabbricabili",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.04
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/5",
    details: "Categoria catastale: - D/5 Istituto di credito, cambio e assicurazione con fine di lucro - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO DELLE SEZIONI CATASTALI \"A\" e \"B\"",
    ratePercent: 1.03
    categoryTypes: ["D/5"]
    zone: "Sezioni catastali \"A\" e \"B\""
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie D/1, D/2, D/3, D/4, D/6, D/7, D/8, D/9",
    details: "Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attività industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attività commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO DELLE SEZIONI CATASTALI \"A\" e \"B\"",
    ratePercent: 0.92
    categoryTypes: ["D/1","D/2","D/3","D/4","D/6","D/7","D/8","D/9"]
    zone: "Sezioni catastali \"A\" e \"B\""
  },
  {
    condition: "Altri fabbricati, immobili di categoria A/10",
    details: "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO DELLE SEZIONI CATASTALI \"A\" e \"B\"",
    ratePercent: 1.03
    categoryTypes: ["A/10"]
    zone: "Sezioni catastali \"A\" e \"B\""
  },
  {
    condition: "Altri fabbricati, immobili di categoria C",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO DELLE SEZIONI CATASTALI \"A\" e \"B\"",
    ratePercent: 1.02
    categoryTypes: ["C/1","C/3"]
    zone: "Sezioni catastali \"A\" e \"B\""
  },
  {
    condition: "Altri fabbricati, immobili di categoria C",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO SEZIONE CATASTALE \"C\"",
    ratePercent: 1.06
    categoryTypes: ["C/1","C/3"]
    zone: "Sezione catastale \"C\""
  },
  {
    condition: "Altri fabbricati, immobili di categoria A/10",
    details: "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati - Collocazione immobile: In una zona specificamente indicata dal comune: FABBRICATI UBICATI NEL TERRITORIO DELLA SEZIONE CATASTALE \"C\"",
    ratePercent: 1.06
    categoryTypes: ["A/10"]
    zone: "Sezione catastale \"C\""
  }
];
