import { VisuraParsingResult } from './visure-parser';
export interface ChatSession {
    id: string;
    phase: 'welcome' | 'upload' | 'analysis' | 'questions' | 'calculation' | 'report';
    startedAt: Date;
    lastActivity: Date;
    uploadSession?: string;
    extractedData?: VisuraParsingResult;
    userResponses: Record<string, any>;
    calculationResult?: IMUCalculationResult;
    conversationHistory: ChatMessage[];
}
export interface ChatMessage {
    id: string;
    timestamp: Date;
    sender: 'ai' | 'user';
    content: string;
    type: 'text' | 'file_upload' | 'data_analysis' | 'calculation' | 'action_buttons';
    metadata?: Record<string, any>;
}
export interface IMUCalculationResult {
    totalIMU: number;
    acconto: number;
    saldo: number;
    details: Array<{
        immobile: string;
        categoria: string;
        baseImponibile: number;
        aliquota: number;
        detrazione: number;
        importo: number;
        note?: string;
    }>;
    logic: string[];
    scadenze: Array<{
        data: string;
        descrizione: string;
        importo: number;
    }>;
    agevolazioni: string[];
    warnings: string[];
}
export interface QuestionDefinition {
    id: string;
    text: string;
    type: 'select' | 'input' | 'boolean' | 'multiselect';
    options?: Array<{
        value: string;
        label: string;
    }>;
    required: boolean;
    condition?: (data: any, responses: Record<string, any>) => boolean;
    validation?: (value: any) => string | null;
}
export declare class ChatIMUService {
    private readonly uploadService;
    private readonly uploadServiceAI;
    private readonly sessions;
    private readonly sessionTimeout;
    constructor();
    /**
     * Inizia una nuova sessione chat
     */
    startNewSession(): string;
    /**
     * Gestisce upload di file
     */
    handleFileUpload(sessionId: string, files: Array<{
        buffer: Buffer;
        name: string;
        mimeType: string;
    }>): Promise<ChatMessage[]>;
    /**
     * Gestisce risposta utente
     */
    handleUserMessage(sessionId: string, message: string): Promise<ChatMessage[]>;
    /**
     * Gestisce azione utente (bottoni)
     */
    handleUserAction(sessionId: string, action: string, data?: any): Promise<ChatMessage[]>;
    /**
     * Ottiene lo stato della sessione
     */
    getSessionState(sessionId: string): Partial<ChatSession> | null;
    /**
     * Ottiene template CSV
     */
    getCSVTemplate(): {
        content: string;
        fileName: string;
    };
    private generateSessionId;
    private generateMessageId;
    private getSession;
    private updateLastActivity;
    private cleanupExpiredSessions;
    private getWelcomeMessage;
    /**
     * Genera messaggio di analisi dei dati
     */
    private generateAnalysisMessage;
    private generateAIResponse;
    private startQuestionnaire;
    private generateQuestionsForData;
    private formatQuestion;
    private handleQuestionAnswer;
    private performCalculation;
    private calculateIMU;
    private getMoltiplicatoreCatastale;
    private formatCalculationResult;
    private generateReport;
    private generateReportContent;
}
