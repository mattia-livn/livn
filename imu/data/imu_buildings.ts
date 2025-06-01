export interface IMUFormulaInput {
  RC: number; // Cadastral income (rendita catastale)
  CATEGORY_COEFFICIENT: number; // Coefficient by cadastral category
  RATE: number; // Municipal rate (per mille)
  DAYS_OWNED: number; // Days owned during the year
  OWNERSHIP_SHARE: number; // Ownership percentage (1.0 = 100%)
}

export const imuBuildingsFormula = {
  type: "IMU_buildings",
  description: "IMU calculation for buildings (excluding non-luxury primary residences)",
  formula: "IMU = ((RC × 1.05) × CATEGORY_COEFFICIENT) × (RATE / 1000) × (DAYS_OWNED / 365) × OWNERSHIP_SHARE"
};
