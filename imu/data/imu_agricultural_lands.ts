export interface IMUAgriculturalLandInput {
  RD: number; // Dominical income
  RATE: number; // IMU rate (per mille)
  DAYS_OWNED: number;
  OWNERSHIP_SHARE: number;
}

export const imuAgriculturalLandFormula = {
  type: "IMU_agricultural_land",
  description: "IMU calculation for agricultural land",
  formula: "IMU = ((RD × 1.25) × 135) × (RATE / 1000) × (DAYS_OWNED / 365) × OWNERSHIP_SHARE"
};
