export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesAlbengaSV2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.6
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0
    categoryTypes: []
    context: "NO"
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
    ratePercent: 1.135
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 1.135
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A10 e altre specifiche categorie",
    details: "Immobili di categoria A10, Categoria catastale: - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /8 Magazzini sotterranei per depositi di derrate - /2 Case di cura ed ospedali senza fine di lucro - A/10 Uffici e studi privati - /5 Scuole e laboratori scientifici - /4 Uffici pubblici - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /3 Prigioni e riformatori",
    ratePercent: 1.035
    categoryTypes: ["A/10"]
  },
  {
    condition: "Immobili di categoria C/1 Negozi e botteghe",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe",
    ratePercent: 0.96
    categoryTypes: ["C/1"]
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.935
    categoryTypes: []
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2",
    details: "Abitazione locata o in comodato - Tipo contratto: Locazione ai sensi dell'art. 2,",
    ratePercent: 1.035
    categoryTypes: []
    context: "comma 3, della Legge n.431/1998 e s.m.i. - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale."
  },
  {
    condition: "Immobili di categoria C/3, C/4, C/5",
    details: "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro - C/5 Stabilimenti balneari e di acque curative senza fine di lucro",
    ratePercent: 0.96
    categoryTypes: ["C/3","C/4","C/5"]
  },
  {
    condition: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al secondo grado in linea tta e collaterale - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 1.035
    categoryTypes: []
  }
];
