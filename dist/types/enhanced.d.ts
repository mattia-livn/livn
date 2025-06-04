export interface ParameterInfo {
    name: string;
    type: 'required' | 'conditional';
    questions: string[];
    validationRules: string[];
    detectedValues: string[];
    limits?: string[];
    specificCategories?: string[];
}
export interface RequiredParameters {
    required: ParameterInfo[];
    conditional: ParameterInfo[];
    questions: string[];
    validationRules: string[];
    commune: string;
}
export interface EnhancedImuRateEntry {
    condition: string;
    details: string;
    ratePercent: number;
    context?: string;
    categoryTypes?: string[];
    zone?: string;
    requiredParameters?: RequiredParameters;
}
export interface UserPropertyInfo {
    categoriaAtastale?: string;
    modalitaUtilizzo?: string;
    ubicazione?: string;
    superficie?: number;
    caratteristicheSoggetto?: string[];
    tipoContratto?: string;
    destinazioneUso?: string;
    condizioniSpeciali?: string[];
    comune: string;
    provincia: string;
}
export interface ConditionMatch {
    condition: EnhancedImuRateEntry;
    matchScore: number;
    missingParameters: string[];
    requiredQuestions: string[];
}
export interface ImuMatchingResult {
    exactMatches: ConditionMatch[];
    partialMatches: ConditionMatch[];
    requiredQuestions: string[];
    suggestedRate?: number;
    commune: string;
    provincia: string;
}
