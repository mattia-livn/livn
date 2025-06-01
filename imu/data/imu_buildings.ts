export interface InputFormulaIMU {
  RC: number; // Rendita catastale
  COEFFICIENTE_CATEGORIA: number; // Coefficiente per categoria catastale
  ALIQUOTA: number; // Aliquota comunale (per mille)
  GIORNI_POSSESSO: number; // Giorni di possesso durante l'anno
  QUOTA_POSSESSO: number; // Percentuale di proprietà (1.0 = 100%)
}

export const formulaIMUFabbricati = {
  tipo: "IMU_fabbricati",
  descrizione: "Calcolo IMU per fabbricati (escluse abitazioni principali non di lusso)",
  formula: "IMU = ((RC × 1,05) × COEFFICIENTE_CATEGORIA) × (ALIQUOTA / 1000) × (GIORNI_POSSESSO / 365) × QUOTA_POSSESSO",
  note: "La rivalutazione del 5% (1,05) è stabilita per legge. I coefficienti variano per categoria catastale."
};
