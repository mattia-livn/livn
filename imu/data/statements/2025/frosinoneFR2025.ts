export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesFrosinoneFR2025: ImuRateEntry[] = [
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
    details: "Ter ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicemb 2019, n. 160"
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
    condition: "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Ciamarra,Via de Gasperi, Via Fi nze, Piazza Gramsci, Via ragaglia, Via Angeloni, Piazza Valchera, Via/Piazza Garibaldi, Via Minghetti,Via Plebiscito,Via attisti,Viale Roma,Via Fosse Ardeatine,Piazza Risorgimento,Via Sella ,Via/Piazza Paleario, - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni"
    zone: "Via Ciamarra, Via de Gasperi, Via Firenze, Piazza Gramsci, Via Bragaglia, Via Angeloni, Piazza Valchera, Via/Piazza Garibaldi, Via Minghetti, Via Plebiscito, Via Battisti, Viale Roma, Via Fosse Ardeatine, Piazza Risorgimento, Via Sella, Via/Piazza Paleario"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Via Giordano runo, Via Alighieri, Largo Amendola, Piazza Cairoli, Via Cavour, Via Cip sso, Via Colle Campagiorni, Via Forma, Via Guglielmi, Piazza IV Novemb , Largo San Silverio, Via Lecce, Via Maccari, Vicolo Moccia, Vicolo Paglia ruciate, - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni"
    zone: "Via Giordano Bruno, Via Alighieri, Largo Amendola, Piazza Cairoli, Via Cavour, Via Cipresso, Via Colle Campagiorni, Via Forma, Via Guglielmi, Piazza IV Novembre, Largo San Silverio, Via Lecce, Via Maccari, Vicolo Moccia, Vicolo Paglia Ruciate"
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe in specifiche zone",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - Collocazione immobile: In una zona specificamente indicata dal comune: Piazza Diamanti, Piazza Vittorio Veneto, Via Rattazzi, Corso della Repubblica, Via Ricciotti, Via San Gerardo Maiella, Via XX Settemb , Via Ferra lli, Via righindi, Via Marconi. - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato o utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    ratePercent: 0.86
    categoryTypes: ["C/1"]
    context: "Utilizzato per attività produttiva e/o commerciale o per l'esercizio di arti e professioni"
    zone: "Piazza Diamanti, Piazza Vittorio Veneto, Via Rattazzi, Corso della Repubblica, Via Ricciotti, Via San Gerardo Maiella, Via XX Settembre, Via Ferrarelli, Via Brighindi, Via Marconi"
  }
];
