export interface InputFormulaIMUAreeFabbricabili {
  VALORE_VENALE: number; // Valore venale del terreno (euro per mq)
  SUPERFICIE: number; // Superficie in metri quadrati
  ALIQUOTA: number; // Aliquota comunale (per mille)
  GIORNI_POSSESSO: number; // Giorni di possesso durante l'anno
  QUOTA_POSSESSO: number; // Percentuale di proprietà (1.0 = 100%)
}

export const formulaIMUAreeFabbricabili = {
  tipo: "IMU_aree_fabbricabili",
  descrizione: "Calcolo IMU per aree edificabili",
  formula: "IMU = (VALORE_VENALE × SUPERFICIE) × (ALIQUOTA / 1000) × (GIORNI_POSSESSO / 365) × QUOTA_POSSESSO",
  note: "Il valore venale deve essere determinato al 1° gennaio dell'anno di imposizione secondo i valori di mercato."
};
