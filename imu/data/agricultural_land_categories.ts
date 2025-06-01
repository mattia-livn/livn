export interface AgriculturalLandCategory {
    code: string;
    quality: string;
    description: string;
    notes?: string;
  }
  
  export const agriculturalLandCategories: AgriculturalLandCategory[] = [
    // Common land qualities
    { code: "TA", quality: "Arable land", description: "Land used for cultivation of crops" },
    { code: "TU", quality: "Grassland", description: "Natural or improved pasture for grazing animals" },
    { code: "TP", quality: "Permanent pasture", description: "Pasture not plowed for at least 5 years" },
    { code: "TL", quality: "Woodland", description: "Land with spontaneous or planted forest cover" },
    { code: "TB", quality: "Bushland", description: "Land covered with bushes, shrubs, or low trees" },
    { code: "TM", quality: "Meadow", description: "Land used for hay or forage production" },
    { code: "TC", quality: "Vineyard", description: "Land cultivated with vines for grape production" },
    { code: "TO", quality: "Olive grove", description: "Land cultivated with olive trees" },
    { code: "TF", quality: "Fruit orchard", description: "Land cultivated with various fruit trees" },
    { code: "TG", quality: "Garden", description: "Land used for horticulture or small-scale crops" },
    { code: "TZ", quality: "Unproductive land", description: "Land not used for productive agricultural purposes", notes: "Usually not subject to IMU or with very low RD" },
    { code: "TQ", quality: "Quarry or peat land", description: "Land used for extraction purposes", notes: "Check local IMU applicability" },
    { code: "TS", quality: "Fish farming area", description: "Land used for aquaculture" },
    { code: "TT", quality: "Nursery land", description: "Land for plant nursery or intensive cultivation" }
  ];