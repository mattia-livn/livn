export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCasalgrandeRE2025: ImuRateEntry[] = [
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
    ratePercent: 0.1
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 1.03
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
    condition: "Fabbricati appartenenti al gruppo catastale D con specifiche categorie",
    details: "Categoria catastale: - D/2 Alberghi e pensioni con fine di lucro - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - D/4 Case di cura ed ospedali con fine di lucro - D/6 Fabbricati e locali per esercizi sportivi con fine di lucro - D/9 Edifici galleggianti o sospesi assicurati a punti fissi del suolo, ponti privati soggetti a pedaggio",
    ratePercent: 0.91
    categoryTypes: ["D/2","D/3","D/4","D/6","D/9"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.8
    categoryTypes: []
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalità",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2, comma 3, della Legge n.431/1998 e s.m.i.",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 5, comma 1, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione a studenti ai sensi dell'art. 5, comma 2, della Legge n. 431/1998 e s.m.i.",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfare particolari esigenze abitative",
    details: "Abitazione locata o in comodato - Tipo contratto: Accordi/Patti territoriali per soddisfa particolari esigenze abitative come definiti nel golamento",
    ratePercent: 0.5
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C - Negozi e botteghe, Laboratori per arti e mestieri",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.91
    categoryTypes: ["C/1","C/3"]
  },
  {
    condition: "Immobili di categoria - Scuole e laboratori scientifici",
    details: "Immobili di categoria Categoria catastale: - /5 Scuole e laboratori scientifici - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Codice ATECO: 85.10.00 - Istruzione di grado p paratorio: scuole dell'infanzia, scuole speciali collegate a quelle primarie",
    ratePercent: 0.46
    categoryTypes: ["/5"]
  }
];
