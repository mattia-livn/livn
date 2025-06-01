export interface IMUBuildableLandInput {
  MARKET_VALUE: number; // Market value at Jan 1st
  RATE: number; // IMU rate (per mille)
  DAYS_OWNED: number;
  OWNERSHIP_SHARE: number;
}

export const imuBuildableLandFormula = {
  type: "IMU_buildable_land",
  description: "IMU calculation for buildable land (development areas)",
  formula: "IMU = (MARKET_VALUE × (RATE / 1000)) × (DAYS_OWNED / 365) × OWNERSHIP_SHARE"
};
