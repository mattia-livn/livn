export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesThieneVI2025: ImuRateEntry[] = [
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
    ratePercent: 0.04
    categoryTypes: ["D/10"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    details: "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    ratePercent: 0.89
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.64
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
    ratePercent: 0.97
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/8",
    details: "Categoria catastale: - D/8 Fabbricati costruiti o adattati per le speciali esigenze di un'attivita' commerciale e non suscettibili di destinazione diversa senza radicali trasformazioni - Superficie: Non inferio a Mq 1500 MQ",
    ratePercent: 1.06
    categoryTypes: ["D/8"]
  },
  {
    condition: "Abitazione locata o in comodato",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi diverse da quella di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purché l'affittuario/comodatario la utilizzi come abitazione principale.",
    ratePercent: 0.65
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria A/10",
    details: "Immobili di categoria A10 Categoria catastale: - A/10 Uffici e studi privati",
    ratePercent: 0.89
    categoryTypes: ["A/10"]
  },
  {
    condition: "Immobili di categoria B",
    details: "Immobili di categoria Categoria catastale: - /1 Collegi e convitti, educandati; ricoveri; orfanotrofi; ospizi; conventi; seminari; caserme - /2 Case di cura ed ospedali senza fine di lucro - /3 Prigioni e riformatori - /4 Uffici pubblici",
    ratePercent: 0.89
    categoryTypes: ["B/1","B/2","B/3","B/4"]
  },
  {
    condition: "Immobili di categoria B, continuazione",
    details: "- /5 Scuole e laboratori scientifici - /6 iblioteche, pinacoteche, musei, gallerie, accademie che non hanno sede in edifici della categoria A/9 - /7 Cappelle ed oratori non destinati all'esercizio pubblico del culto - /8 Magazzini sotterranei per depositi di derrate",
    ratePercent: 0.89
    categoryTypes: ["B/5","B/6","B/7","B/8"]
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/3",
    details: "Immobili di categoria C Categoria catastale: - C/3 Laboratori per arti e mestieri",
    ratePercent: 0.89
    categoryTypes: ["C/3"]
  },
  {
    condition: "Abitazione a disposizione",
    details: "Abitazione a disposizione - Abitazioni non locate e non concesse in comodato - Periodo non coperto da contratti purché la condizione di immobile a disposizione persista da almeno: 24 - Utilizzo/Inutilizzo: Sprovvisti di utenze di fornitura attive di acqua, luce e gas",
    ratePercent: 1.06
    categoryTypes: []
  },
  {
    condition: "Alloggi regolarmente assegnati dagli IACP o dagli enti di edilizia residenziale pubblica",
    details: "Alloggi golarmente assegnati dagli IACP o dagli enti di edilizia sidenziale pubblica aventi le stesse finalit�",
    ratePercent: 0.65
    categoryTypes: []
  },
  {
    condition: "Immobili di categoria C, categoria catastale C/1",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe",
    ratePercent: 0.89
    categoryTypes: ["C/1"]
  }
];
