interface TestCase {
    name: string;
    fileName: string;
    userData: {
        codiceFiscale?: string;
        comune?: string;
        categoria?: string;
        superficie?: number;
        rendita?: number;
    };
    expectedResults?: {
        shouldFindMatch: boolean;
        expectedQuestions: number;
    };
}
export declare const runSingleTest: (testCase: TestCase) => Promise<boolean>;
export declare const runAllTests: () => Promise<void>;
export declare const quickTest: () => Promise<boolean>;
export {};
