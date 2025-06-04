"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formulaIMUFabbricati = void 0;
exports.formulaIMUFabbricati = {
    tipo: "IMU_fabbricati",
    descrizione: "Calcolo IMU per fabbricati (escluse abitazioni principali non di lusso)",
    formula: "IMU = ((RC × 1,05) × COEFFICIENTE_CATEGORIA) × (ALIQUOTA / 1000) × (GIORNI_POSSESSO / 365) × QUOTA_POSSESSO",
    note: "La rivalutazione del 5% (1,05) è stabilita per legge. I coefficienti variano per categoria catastale."
};
//# sourceMappingURL=imu_buildings.js.map