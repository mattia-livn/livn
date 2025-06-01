export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCodognoLO2025: ImuRateEntry[] = [
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
    ratePercent: 1.03
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie D/7 e D/8",
    details: "Categoria catastale: - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni",
    ratePercent: 1.06
    categoryTypes: ["D/7","D/8"]
    context: "Fabbricati costruiti o adattati per esigenze industriali o commerciali"
  },
  {
    condition: "Abitazione locata o in comodato con contratto a canone libero",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a canone libero",
    ratePercent: 1.03
    categoryTypes: []
    context: "Locazione a canone libero"
  },
  {
    condition: "Immobili di categoria C, categorie C/2 e C/6",
    details: "Immobili di categoria C Categoria catastale: - C/2 Magazzini e locali di deposito - C/6 Stalle, scuderie, rimesse, autorimesse senza fine di lucro",
    ratePercent: 1.03
    categoryTypes: ["C/2","C/6"]
    context: "Immobili locati"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.85
    categoryTypes: []
    context: "Comodato d'uso gratuito, utilizzo come abitazione principale"
  }
];
