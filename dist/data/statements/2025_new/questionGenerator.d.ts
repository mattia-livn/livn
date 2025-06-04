export interface RawProperty {
    id: string;
    type: 'fabbricato' | 'terreno';
    category?: string;
    address: string;
    owners: string[];
}
export interface PropertyDetails {
    isMainResidence?: boolean;
    isAppurtenanceOf?: string[];
    ownerIsElderlyOrDisabled?: boolean;
    ownerIsInstitutionalized?: boolean;
    ownerIsAgriculturalEntrepreneur?: boolean;
    isAgriculturalUse?: boolean;
    isBuildable?: boolean;
    atecoCode?: string;
    tenantCompanyAgeMonths?: number;
    tenantIsMigrantSupportOrg?: boolean;
    contractType?: 'canone_concordato' | 'studenti' | 'transitorio' | 'libero' | 'none';
}
export interface Question {
    id: string;
    text: string;
    type: 'boolean' | 'select' | 'number' | 'text' | 'multiselect';
    options?: string[];
    required: boolean;
    dependsOn?: string;
    reason: string;
}
export interface QuestionGroup {
    title: string;
    description: string;
    questions: Question[];
    applicableRates: string[];
}
export declare class TorinIMUQuestionGenerator {
    private rates;
    constructor();
    generateQuestions(property: RawProperty): QuestionGroup[];
    private findPotentialRates;
    private generateBasicQuestions;
    private generateOwnerQuestions;
    private generateUsageQuestions;
    private generateContractQuestions;
    private needsMainResidenceInfo;
    private needsPertinenceInfo;
    private needsBuildabilityInfo;
    private extractAtecoCodesFromRates;
}
export declare function generateQuestionsForProperties(properties: RawProperty[]): Map<string, QuestionGroup[]>;
