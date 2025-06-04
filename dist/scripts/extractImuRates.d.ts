export interface ImuRateEntry {
    condition: string;
    details: string;
    ratePercent: number;
    context?: string;
    categoryTypes?: string[];
    zone?: string;
}
export declare function extractAllImuRates(): Promise<void>;
export declare function extractSingleImuRate(filename: string): Promise<void>;
