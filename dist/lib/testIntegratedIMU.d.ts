interface TestScenario {
    name: string;
    description: string;
    municipalRate: number;
    expectedTotalRange?: {
        min: number;
        max: number;
    };
}
export declare const loadTestData: () => any;
export declare const runIntegratedIMUTest: (scenario: TestScenario) => Promise<boolean>;
export declare const runAllIntegratedTests: () => Promise<{
    successCount: number;
    failCount: number;
    total: number;
}>;
export declare const quickIMUTest: () => Promise<boolean>;
export {};
