export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesFirenzeFI2025: ImuRateEntry[] = [
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
    condition: "Fabbricati appartenenti al gruppo catastale D in zone soggette ad un alto tasso di abbandono di attività economico-commerciale, utilizzati direttamente dal soggetto passivo",
    details: "- Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: zone individuate con appositi atti dell'amministrazione comunale - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Persona fisica di eta' non superio ad anni: 40 - Tipologia di attivit�: Attivita' innovative - Start up",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
    zone: "zone soggette ad un alto tasso di abbandono di attività economico-commerciale"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D in zone soggette ad un alto tasso di abbandono di attività economico-commerciale, locati",
    details: "- Collocazione immobile: In zone soggette ad un alto tasso di abbandono di attivita' economico-commerciale: zone individuate con appositi atti dell'amministrazione comunale - Fabbricati a disposizione o utilizzati: Immobili locati - Requisiti soggettivi del locatario: Persona fisica di eta' non superio ad anni: 40 - Tipologia di attivit�: Attivita' innovative - Start up",
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "Immobili locati"
    zone: "zone soggette ad un alto tasso di abbandono di attività economico-commerciale"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D/3, utilizzati direttamente dal soggetto passivo per attività di proiezione cinematografica",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D/3, concessi in comodato per attività di proiezione cinematografica",
    details: "- Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Codice ATECO: 59.14.00 - Attivita' di proiezione cinematografica - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
    context: "Immobili concessi in comodato"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D/3, utilizzati direttamente dal soggetto passivo per gestione di teatri, sale da concerto e altre strutture artistiche",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili utilizzati di ttamente dal soggetto passivo - Requisiti soggettivi del soggetto passivo utilizzato : Utilizzato di tto dell' immobile tutti - Codice ATECO: 90.04.00 - Gestione di teatri, sale da concerto e alt struttu artistiche",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
    context: "Immobili utilizzati direttamente dal soggetto passivo"
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D/3, concessi in comodato per gestione di teatri, sale da concerto e altre strutture artistiche",
    details: "Categoria catastale: - D/3 Teatri, cinematografi, sale per concerti e spettacoli e simili con fine di lucro - Fabbricati a disposizione o utilizzati: Immobili concessi in comodato - Codice ATECO: 90.04.00 - Gestione di teatri, sale da concerto e alt struttu artistiche - Con contratto gistrato *Per contratti di locazione di immobili devono intendersi esclusivamente quelli gistrati ai sensi delle vigenti disposizioni di legge.",
    ratePercent: 0.76
    categoryTypes: ["D/3"]
    context: "Immobili concessi in comodato"
  }
];
