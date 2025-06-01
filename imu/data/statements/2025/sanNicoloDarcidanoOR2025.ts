export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesSanNicoloDarcidanoOR2025: ImuRateEntry[] = [
  {
    condition: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    details: "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    ratePercent: 0.3
    categoryTypes: ["A/1","A/8","A/9"]
  },
  {
    condition: "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    details: "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    ratePercent: 0.3
    categoryTypes: []
    context: "di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019"
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
    ratePercent: 0.76
    categoryTypes: ["D"]
    context: "esclusa la categoria catastale D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.6
    categoryTypes: []
  },
  {
    condition: "Fabbricati diverse da residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: zona D’comparto D2.1 parte,commerciale-di zionale in viale dei Platani;zona D’comparto D2.2 artigianale, produzione e vendita in di zione Uras;",
    ratePercent: 0.46
    categoryTypes: []
    context: "Diverse da residenziali"
    zone: "zona D’comparto D2.1 parte, commerciale-direzionale in viale dei Platani; zona D’comparto D2.2 artigianale, produzione e vendita in direzione Uras"
  },
  {
    condition: "Fabbricati residenziali situate in determinate zone",
    details: "A e Fabbricabili - Tipologia: Residenziali - Situate in determinate zone: zona C’comparto C1.1 di espansione sidenziale in loc. ‘Sa Mimosa’; zona C’comparto C1.2 di espansione sidenziale in di zione Terralba; zona C’comparto C1.8 di espansione sidenziale in di zione Uras; zona C’comparto C1.11 parte di espansione sidenziale, tra via Oristano e via Papa Luciani; zona C’comparto C1.12 di espansione sidenziale in via La Malfa; zona C’comparto C1.13 di espansione sid.le tra via La Malfa e V.le Repubblica; comparti C1.4 e C1.11.",
    ratePercent: 0.46
    categoryTypes: []
    context: "Residenziali"
    zone: "zona C’comparto C1.1 di espansione residenziale in loc. ‘Sa Mimosa’; zona C’comparto C1.2 di espansione residenziale in direzione Terralba; zona C’comparto C1.8 di espansione residenziale in direzione Uras; zona C’comparto C1.11 parte di espansione residenziale, tra via Oristano e via Papa Luciani; zona C’comparto C1.12 di espansione residenziale in via La Malfa; zona C’comparto C1.13 di espansione residenziale tra via La Malfa e V.le Repubblica; comparti C1.4 e C1.11."
  }
];
