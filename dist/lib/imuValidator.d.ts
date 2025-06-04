interface CadastralParcel {
    type: 'building' | 'land';
    category: string;
    description: string;
    cadastral_income?: {
        value: number;
        currency: string;
    };
    dominical_income?: {
        value: number;
        currency: string;
    };
    ownership_share: number;
    days_owned: number;
}
interface ValidatedCalculation {
    parcel: CadastralParcel;
    imu: number;
    formula: string;
    reasoning: string;
    isValid: boolean;
    correctedValue?: number;
}
interface ValidationResult {
    totalIMU: number;
    detailedCalculations: ValidatedCalculation[];
    summary: string;
    validationNotes: string[];
    allCalculationsValid: boolean;
}
export declare function calculateDeterministicIMU(parcels: CadastralParcel[], municipalRate: number): number;
export declare function calculateParcelIMU(parcel: CadastralParcel, municipalRate: number): number;
export declare function validateAICalculation(aiResult: any, parcels: CadastralParcel[], municipalRate: number): ValidationResult;
export {};
