export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesOzzanoDellemiliaBO2025: ImuRateEntry[] = [
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
    ratePercent: 0.1
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
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati direttamente dal soggetto passivo per attività produttiva e/o commerciale",
    details: "- Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.96
    categoryTypes: ["D"]
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    details: "- Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro",
    ratePercent: 0.96
    categoryTypes: ["D"]
  },
  {
    condition: "Terreni agricoli esenti",
    details: "- Collocazione: Ricadenti nei fogli catastali n.: fogli catastali: FOGLI CATASTALI TUTTI I MAPPALI: N. 37 – N. 38 – DAL N. 40 AL N. 58 – N. 60 – N. 68; FOGLIO CATASTALE N. 32, LIMITATAMENTE AI MAPPALI: N. 34 –N. 40 –N. 48 – DAL N. 103 AL N. 119 – DAL N. 121 AL N. 132 – N. 144 – N. 145 – N. 152 – DAL N. 325 AL N. 329; FOGLIO CATASTALE N. 59, LIMITATAMENTE AI MAPPALI: DAL N. 1 AL N. 5 – N. 7;",
    ratePercent: 0
    categoryTypes: []
    zone: "FOGLI CATASTALI TUTTI I MAPPALI: N. 37 – N. 38 – DAL N. 40 AL N. 58 – N. 60 – N. 68; FOGLIO CATASTALE N. 32, LIMITATAMENTE AI MAPPALI: N. 34 –N. 40 –N. 48 – DAL N. 103 AL N. 119 – DAL N. 121 AL N. 132 – N. 144 – N. 145 – N. 152 – DAL N. 325 AL N. 329; FOGLIO CATASTALE N. 59, LIMITATAMENTE AI MAPPALI: DAL N. 1 AL N. 5 – N. 7;"
  },
  {
    condition: "Altri fabbricati di categoria A10, C utilizzati per attività produttiva e/o commerciale",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni",
    ratePercent: 0.96
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Altri fabbricati di categoria A10, C utilizzati per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro",
    ratePercent: 0.96
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Altri fabbricati di categoria A10, C locati o concessi in comodato per attività produttiva e/o commerciale",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato - Destinazione d'uso: Utilizzato per attivita' produttiva e/o commerciale o per l'esercizio di arti e professioni - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge. - Limitatamente ad un solo immobile.",
    ratePercent: 0.96
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Altri fabbricati di categoria A10, C locati o concessi in comodato per scopi istituzionali o di pubblica utilità, senza fine di lucro",
    details: "Immobili di categoria A10, , C - Fabbricati a disposizione o utilizzati: Immobili locati o concessi in comodato - Destinazione d'uso: Utilizzati per scopi istituzionali o di pubblica utilita', senza fine di lucro - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge. - Limitatamente ad un solo immobile.",
    ratePercent: 0.96
    categoryTypes: ["A10","C"]
  },
  {
    condition: "Abitazione locata o in comodato con contratto registrato, utilizzata come abitazione principale",
    details: "Abitazione locata o in comodato - Tipo contratto: Comodato d'uso gratuito Categoria catastale: - A/2 Abitazioni di tipo civile - A/3 Abitazioni di tipo economico - A/4 Abitazioni di tipo popola - A/5 Abitazioni di tipo ultrapopola - A/6 Abitazioni di tipo rurale - A/7 Abitazioni in villini - Con contratto gistrato - Condizioni locatario/comodatario: Pa nti - Sino al primo grado ipotesi di cui all'art. 1, comma 747, lett. c, della legge n. 160 del 2019 - Destinazione d'uso: Purchè l'affittuario/comodatario la utilizzi come abitazione principale. - Limitatamente ad un solo immobile.",
    ratePercent: 0.86
    categoryTypes: ["A/2","A/3","A/4","A/5","A/6","A/7"]
  }
];
