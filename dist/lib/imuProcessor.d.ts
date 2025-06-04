interface UserData {
    codiceFiscale?: string;
    comune?: string;
    categoria?: string;
    superficie?: number;
    rendita?: number;
    [key: string]: any;
}
interface AnalysisResult {
    datiRaccolti: any;
    domande: string[];
    matchFound: boolean;
    reasoning: string;
}
export declare const processImuStatement: (fileName: string, userData: UserData) => Promise<AnalysisResult | null>;
export declare const displayResults: (result: AnalysisResult) => void;
export {};
