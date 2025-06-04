export interface ImuRateCondition {
    description: string;
    predicate: string;
}
export interface ImuRateEntry {
    label: string;
    ratePercent: number;
    categoryTypes?: string[];
    officialDescription: string;
    conditions: ImuRateCondition[];
}
export declare const imuRatesPonteBN2025: ImuRateEntry[];
