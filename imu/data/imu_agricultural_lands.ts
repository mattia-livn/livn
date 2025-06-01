export interface InputFormulaIMUTerreni {
  RD: number; // Reddito dominicale
  COEFFICIENTE_TERRENI: number; // Coefficiente per terreni (generalmente 135)
  ALIQUOTA: number; // Aliquota comunale (per mille)
  GIORNI_POSSESSO: number; // Giorni di possesso durante l'anno
  QUOTA_POSSESSO: number; // Percentuale di proprietà (1.0 = 100%)
}

export const formulaIMUTerreniAgricoli = {
  tipo: "IMU_terreni_agricoli",
  descrizione: "Calcolo IMU per terreni agricoli",
  formula: "IMU = ((RD × 1,25) × 135) × (ALIQUOTA / 1000) × (GIORNI_POSSESSO / 365) × QUOTA_POSSESSO",
  note: "La rivalutazione del 25% (1,25) e il coefficiente 135 sono stabiliti per legge per i terreni."
};
