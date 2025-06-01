export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesCorianoRN2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.52
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.52
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
    ratePercent: 0.99
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
    condition: "Fabbricati appartenenti al gruppo catastale D, categoria catastale D/5",
    details: "Categoria catastale: - D/5 Istituto di c dito, cambio e assicurazione con fine di lucro",
    ratePercent: 1.06
    categoryTypes: ["D/5"]
  },
  {
    condition: "Terreni agricoli ricadenti nei fogli catastali interamente esenti",
    details: "FOGLI INTERAMENTE ESENTI IMU:3-4-13-14-15-22-23-24-25-26-33-34-35-36-37-41-42-43-48",
    ratePercent: 0
    categoryTypes: []
    zone: "Fogli catastali: 3, 4, 13, 14, 15, 22, 23, 24, 25, 26, 33, 34, 35, 36, 37, 41, 42, 43, 48"
  },
  {
    condition: "Terreni agricoli ricadenti nei fogli catastali parzialmente esenti",
    details: "FOGLI PARZIALMENTE ESENTI IMU:Fg.n.5: part. da n.2 a n.14, da n.31 a n.46,da n.59 a n.76,da n.78 a n.92,da n.95 a n.103,part. n.109,da n.111 a n.115,da n.117 a n.121,da n.124 a n.126.Fg.n.11: part. dal n.93 al n.102 e part. n.107.Fg.n.12: part. n.78 in avanti.Fg n.16: part. da n.1 a n.30,da n.32 a n.42,da n.97 a n.114,n.125 e 126,da n.130 a n.137,n.142 e n.143,da n.153 a n.156.Fg.n.21: part. da n.29 a n.49,da n.65 a n.99,n.101,da n.103 a n.106.Fg.n.44: part. da n.1 a n.49-da n.52 in avanti",
    ratePercent: 0
    categoryTypes: []
    zone: "Fogli catastali: 5, 11, 12, 16, 21, 44"
  },
  {
    condition: "Immobili di categoria C",
    details: "Immobili di categoria C Categoria catastale: - C/1 Negozi e botteghe - C/3 Laboratori per arti e mestieri - C/4 Fabbricati e locali per esercizi sportivi senza fine di lucro",
    ratePercent: 0.99
    categoryTypes: ["C/1","C/3","C/4"]
  }
];
