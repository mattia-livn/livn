export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesFerraraFE2025: ImuRateEntry[] = [
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
    ratePercent: 0
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 1.02
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.9
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.02
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/7 e D/8 in zona ZLS Emilia Romagna",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Collocazione immobile: In una zona specificamente indicata dal comune: nuove costruzioni alizzate su a e ricomp se nella ZLS Emilia Romagna istituita con DPCM del 10.10.2024 nel rispetto del Piano di sviluppo strategico della Regione Emilia Romagna",
    ratePercent: 0.76
    categoryTypes: ["D/7","D/8"]
    context: "In zona ZLS Emilia Romagna"
    zone: "ZLS Emilia Romagna"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/2",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro",
    ratePercent: 0.9
    categoryTypes: ["D/2"]
    context: "Alberghi e pensioni con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria D/5",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
    context: "Istituto di credito, cambio e assicurazione con fine di lucro"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categorie D/1, D/2, D/3, D/4, D/6, D/7, D/8",
    details: "Fabbricati appartenenti al gruppo catastale D Categoria catastale: - D/1 Opifici - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/7 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' industriale e non suscettibili di destinazione diversa senza radicali trasformazioni - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali",
    ratePercent: 1.06
    categoryTypes: ["D/1","D/2","D/3","D/4","D/6","D/7","D/8"]
  },
  {
    condition: "Abitazione locata o in comodato con contratti specifici",
    details: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici",
    ratePercent: 0.5
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
    context: "Accordi/Patti territoriali"
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.52
    categoryTypes: []
    context: "Assegnati dagli IACP o enti di edilizia residenziale pubblica"
  },
  {
    condition: "Abitazione locata o in comodato con contratto di comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/1 Abitazioni di tipo signorile - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - A/8 Abitazioni in ville - A/9 Castelli, palazzi di eminenti p gi artistici o storici - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purch� l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.9
    categoryTypes: ["A/1","A/2","A/3","A/4","A/5","A/6","A/7","A/8","A/9"]
    context: "Comodato d'uso gratuito"
  }
];
