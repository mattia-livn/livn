interface CadastralData {
    owner_tax_code: string;
    municipality: {
        name: string;
        province: string;
        istat_code: string;
    };
    parcels: Array<{
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
        [key: string]: any;
    }>;
}
interface IMUCalculationResult {
    totalIMU: number;
    detailedCalculations: Array<{
        parcel: any;
        imu: number;
        formula: string;
        reasoning: string;
    }>;
    summary: string;
    questions?: string[];
}
export declare const calculateIMUWithAI: (cadastralData: CadastralData, municipalRate?: number) => Promise<IMUCalculationResult>;
export declare const displayIMUResults: (result: IMUCalculationResult) => void;
export {};
