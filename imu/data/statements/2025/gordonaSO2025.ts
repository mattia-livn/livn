export interface ImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
}

export const imuRatesGordonaSO2025: ImuRateEntry[] = [
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
    ratePercent: 0.86
    categoryTypes: ["D"]
    context: "Esclusa la categoria D/10"
  },
  {
    condition: "Terreni agricoli",
    details: "Ter ni agricoli",
    ratePercent: 0
    categoryTypes: []
    context: "Esenti ai sensi dell’art. 1, comma 758, della legge 27 dicembre 2019, n. 160"
  },
  {
    condition: "Aree fabbricabili",
    details: "A e fabbricabili",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    details: "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    ratePercent: 0.76
    categoryTypes: []
  },
  {
    condition: "Fabbricati appartenenti al gruppo catastale D - Categoria catastale: D/1 Opifici",
    details: "Fabbricati appartenenti al gruppo catastale D - Categoria catastale: - D/1 Opifici",
    ratePercent: 1.06
    categoryTypes: ["D/1"]
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: Ambito di trasformazione ATI 5 Loc. Area Industriale",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: Ambito di trasformazione ATI 5 Loc. A a Industriale",
    ratePercent: 0
    categoryTypes: []
    context: "Ambito di trasformazione ATI 5 Loc. Area Industriale"
    zone: "Ambito di trasformazione ATI 5 Loc. Area Industriale"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: Zona articolo 4.23.4 Mod_Att_Agr modalità di attuazione dell'ambito agricolo speciale riservato alla trasformazione del prodotto zootecnico",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: Zona articolo 4.23.4 Mod_Att_Agr modalit� di attuazione dell'ambito agricolo speciale riservato alla trasformazione del prodotto zootecnico",
    ratePercent: 0
    categoryTypes: []
    context: "Zona articolo 4.23.4 Mod_Att_Agr modalità di attuazione dell'ambito agricolo speciale riservato alla trasformazione del prodotto zootecnico"
    zone: "Zona articolo 4.23.4 Mod_Att_Agr"
  },
  {
    condition: "Fabbricati diversi da residenziali situati in determinate zone: Zona articolo 3.6 area per attrezzature verde attrezzato gioco, sport, parco",
    details: "A e Fabbricabili - Tipologia: Diverse da sidenziali - Situate in determinate zone: Zona articolo 3.6 a e per att zzatu e verde att zzato gioco, sport, parco",
    ratePercent: 0
    categoryTypes: []
    context: "Zona articolo 3.6 area per attrezzature verde attrezzato gioco, sport, parco"
    zone: "Zona articolo 3.6"
  }
];
