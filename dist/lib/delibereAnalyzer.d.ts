export interface DeliberaAnalysis {
    municipalityInfo: {
        name: string;
        province: string;
        deliberaNumber?: string;
        year?: number;
    };
    imuRates: {
        standardRate?: number;
        primaryResidence?: number;
        commercialProperties?: number;
        industrialProperties?: number;
        agriculturalLand?: number;
        buildableLand?: number;
    };
    exemptions: string[];
    specialRules: string[];
    categories: {
        category: string;
        coefficient: number;
        specificRate?: number;
    }[];
    analysisConfidence: 'high' | 'medium' | 'low';
    extractedText: string;
    errors?: string[];
}
export declare function analyzeDeliberaFromSupabase(bucketName: string, fileName: string, folderPath?: string): Promise<DeliberaAnalysis>;
export declare function listDelibereInBucket(bucketName?: string, folderPath?: string): Promise<string[]>;
