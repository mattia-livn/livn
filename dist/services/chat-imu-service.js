"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatIMUService = void 0;
const upload_service_1 = require("./upload-service");
const upload_service_ai_1 = require("./upload-service-ai");
class ChatIMUService {
    constructor() {
        this.sessions = new Map();
        this.sessionTimeout = 60 * 60 * 1000; // 1 ora
        this.uploadService = new upload_service_1.UploadService({
            maxFileSize: 10,
            cleanupAfterMs: 60 * 60 * 1000 // 1 ora
        });
        this.uploadServiceAI = new upload_service_ai_1.UploadServiceAI();
        // Cleanup sessioni scadute ogni 10 minuti
        setInterval(() => this.cleanupExpiredSessions(), 10 * 60 * 1000);
    }
    /**
     * Inizia una nuova sessione chat
     */
    startNewSession() {
        const sessionId = this.generateSessionId();
        const session = {
            id: sessionId,
            phase: 'welcome',
            startedAt: new Date(),
            lastActivity: new Date(),
            userResponses: {},
            conversationHistory: [
                {
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: this.getWelcomeMessage(),
                    type: 'text'
                }
            ]
        };
        this.sessions.set(sessionId, session);
        return sessionId;
    }
    /**
     * Gestisce upload di file
     */
    async handleFileUpload(sessionId, files) {
        var _a;
        const session = this.getSession(sessionId);
        if (!session)
            throw new Error('Sessione non trovata');
        this.updateLastActivity(session);
        const messages = [];
        // Messaggio utente
        const fileNames = files.map(f => f.name).join(', ');
        messages.push({
            id: this.generateMessageId(),
            timestamp: new Date(),
            sender: 'user',
            content: `Ho caricato ${files.length} file: ${fileNames}`,
            type: 'file_upload',
            metadata: { fileCount: files.length, fileNames }
        });
        try {
            console.log(`🚀 === ELABORAZIONE FILE AI (${files.length} files) ===`);
            // 🤖 Imposta callback per feedback progressivo
            const progressMessages = [];
            this.uploadServiceAI.setProgressCallback((message) => {
                const progressMessage = {
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: `💬 ${message}`,
                    type: 'text',
                    metadata: { isProgress: true }
                };
                progressMessages.push(progressMessage);
                // Aggiungi subito alla sessione per il feedback in tempo reale
                session.conversationHistory.push(progressMessage);
            });
            // 🤖 USA IL NUOVO SERVIZIO AI con feedback
            const aiResult = await this.uploadServiceAI.processFiles(files);
            // Aggiungi tutti i messaggi di progresso
            messages.push(...progressMessages);
            if (aiResult.success && aiResult.fabbricati.length + aiResult.terreni.length > 0) {
                // Converti in formato compatibile
                const compatibleResult = {
                    success: true,
                    fabbricati: aiResult.fabbricati,
                    terreni: aiResult.terreni,
                    errors: aiResult.errors,
                    metadata: {
                        fileName: fileNames,
                        fileType: 'AI-extracted',
                        parsedAt: new Date(),
                        totalProperties: aiResult.fabbricati.length + aiResult.terreni.length
                    }
                };
                session.extractedData = compatibleResult;
                session.phase = 'analysis';
                // Messaggio AI con analisi dettagliata
                const totalProperties = aiResult.fabbricati.length + aiResult.terreni.length;
                let analysisContent = `🎉 **Analisi completata con successo!**\n\n`;
                analysisContent += `📊 **Risultati estrazione AI:**\n`;
                analysisContent += `• 🏠 Fabbricati trovati: ${aiResult.fabbricati.length}\n`;
                analysisContent += `• 🌱 Terreni trovati: ${aiResult.terreni.length}\n`;
                analysisContent += `• 🎯 Confidenza: ${(_a = aiResult.confidence) === null || _a === void 0 ? void 0 : _a.toFixed(1)}%\n\n`;
                if (aiResult.fabbricati.length > 0) {
                    analysisContent += `**🏠 Dettagli Fabbricati:**\n`;
                    aiResult.fabbricati.forEach((fab, i) => {
                        var _a, _b;
                        analysisContent += `${i + 1}. Foglio ${fab.foglio}, Particella ${fab.particella}`;
                        if (fab.subalterno)
                            analysisContent += `, Sub ${fab.subalterno}`;
                        if (fab.categoria)
                            analysisContent += ` - Categoria ${fab.categoria}`;
                        if (fab.rendita > 0)
                            analysisContent += ` (€${fab.rendita})`;
                        // Mostra titolarità se presente
                        if ((_a = fab.proprietario) === null || _a === void 0 ? void 0 : _a.titolarita)
                            analysisContent += ` - ${fab.proprietario.titolarita}`;
                        if ((_b = fab.proprietario) === null || _b === void 0 ? void 0 : _b.quota) {
                            analysisContent += ` ${fab.proprietario.quota.numeratore}/${fab.proprietario.quota.denominatore}`;
                        }
                        analysisContent += `\n`;
                    });
                    analysisContent += `\n`;
                }
                if (aiResult.terreni.length > 0) {
                    analysisContent += `**🌱 Dettagli Terreni:**\n`;
                    aiResult.terreni.forEach((ter, i) => {
                        var _a, _b;
                        analysisContent += `${i + 1}. Foglio ${ter.foglio}, Particella ${ter.particella}`;
                        if (ter.qualita)
                            analysisContent += ` - ${ter.qualita}`;
                        if (ter.superficie > 0)
                            analysisContent += ` (${ter.superficie} mq)`;
                        // Mostra titolarità se presente
                        if ((_a = ter.proprietario) === null || _a === void 0 ? void 0 : _a.titolarita)
                            analysisContent += ` - ${ter.proprietario.titolarita}`;
                        if ((_b = ter.proprietario) === null || _b === void 0 ? void 0 : _b.quota) {
                            analysisContent += ` ${ter.proprietario.quota.numeratore}/${ter.proprietario.quota.denominatore}`;
                        }
                        analysisContent += `\n`;
                    });
                    analysisContent += `\n`;
                }
                if (aiResult.warnings.length > 0) {
                    analysisContent += `⚠️ **Avvisi:**\n`;
                    aiResult.warnings.forEach(warning => {
                        analysisContent += `• ${warning}\n`;
                    });
                    analysisContent += `\n`;
                }
                analysisContent += `✅ **I dati sono corretti?** Puoi procedere al calcolo IMU 2025.`;
                messages.push({
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: analysisContent,
                    type: 'data_analysis',
                    metadata: {
                        totalProperties,
                        fabbricati: aiResult.fabbricati.length,
                        terreni: aiResult.terreni.length,
                        confidence: aiResult.confidence
                    }
                });
            }
            else {
                let errorContent = `❌ **Estrazione dati non riuscita**\n\n`;
                errorContent += `Purtroppo non sono riuscito a estrarre dati catastali dai file caricati.\n\n`;
                if (aiResult.errors.length > 0) {
                    errorContent += `**Errori:**\n`;
                    aiResult.errors.forEach(error => {
                        errorContent += `• ${error}\n`;
                    });
                    errorContent += `\n`;
                }
                errorContent += `**Cosa puoi fare:**\n`;
                errorContent += `• Assicurati che i file siano visure catastali valide\n`;
                errorContent += `• Prova con file in formato PDF\n`;
                errorContent += `• Carica file con dati più chiari e leggibili\n`;
                errorContent += `• Inserisci i dati manualmente`;
                messages.push({
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: errorContent,
                    type: 'text'
                });
            }
        }
        catch (error) {
            console.error('❌ Errore durante elaborazione AI:', error);
            messages.push({
                id: this.generateMessageId(),
                timestamp: new Date(),
                sender: 'ai',
                content: `❌ **Errore durante l'elaborazione**\n\n${error.message}\n\nRiprova caricando i file o inserisci i dati manualmente.`,
                type: 'text'
            });
        }
        // Aggiungi alla cronologia (escludendo quelli già aggiunti del feedback progressivo)
        const nonProgressMessages = messages.filter(msg => { var _a; return !((_a = msg.metadata) === null || _a === void 0 ? void 0 : _a.isProgress); });
        session.conversationHistory.push(...nonProgressMessages);
        return messages;
    }
    /**
     * Gestisce risposta utente
     */
    async handleUserMessage(sessionId, message) {
        const session = this.getSession(sessionId);
        if (!session)
            throw new Error('Sessione non trovata');
        this.updateLastActivity(session);
        const messages = [];
        // Messaggio utente
        messages.push({
            id: this.generateMessageId(),
            timestamp: new Date(),
            sender: 'user',
            content: message,
            type: 'text'
        });
        // Risposta AI basata sulla fase
        const aiResponse = await this.generateAIResponse(session, message);
        messages.push(aiResponse);
        // Aggiungi alla cronologia
        session.conversationHistory.push(...messages);
        return messages;
    }
    /**
     * Gestisce azione utente (bottoni)
     */
    async handleUserAction(sessionId, action, data) {
        const session = this.getSession(sessionId);
        if (!session)
            throw new Error('Sessione non trovata');
        this.updateLastActivity(session);
        const messages = [];
        switch (action) {
            case 'proceed_to_questions':
            case 'start_questionnaire':
                session.phase = 'questions';
                messages.push(...await this.startQuestionnaire(session));
                break;
            case 'answer_question':
                messages.push(...await this.handleQuestionAnswer(session, data));
                break;
            case 'proceed_to_calculation':
                session.phase = 'calculation';
                messages.push(...await this.performCalculation(session));
                break;
            case 'generate_report':
                session.phase = 'report';
                messages.push(...await this.generateReport(session));
                break;
            default:
                messages.push({
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: `Azione "${action}" non riconosciuta. Prova con le opzioni disponibili.`,
                    type: 'text'
                });
        }
        // Aggiungi alla cronologia
        session.conversationHistory.push(...messages);
        return messages;
    }
    /**
     * Ottiene lo stato della sessione
     */
    getSessionState(sessionId) {
        const session = this.getSession(sessionId);
        if (!session)
            return null;
        return {
            id: session.id,
            phase: session.phase,
            startedAt: session.startedAt,
            lastActivity: session.lastActivity,
            extractedData: session.extractedData,
            conversationHistory: session.conversationHistory
        };
    }
    /**
     * Ottiene template CSV
     */
    getCSVTemplate() {
        return this.uploadService.generateTemplate();
    }
    // Metodi privati
    generateSessionId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return null;
        // Controlla scadenza
        if (Date.now() - session.lastActivity.getTime() > this.sessionTimeout) {
            this.sessions.delete(sessionId);
            return null;
        }
        return session;
    }
    updateLastActivity(session) {
        session.lastActivity = new Date();
    }
    cleanupExpiredSessions() {
        const now = Date.now();
        let cleaned = 0;
        for (const [sessionId, session] of this.sessions) {
            if (now - session.lastActivity.getTime() > this.sessionTimeout) {
                this.sessions.delete(sessionId);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            console.log(`🧹 Chat sessions cleanup: ${cleaned} sessioni rimosse`);
        }
    }
    getWelcomeMessage() {
        return `Ciao! Sono il tuo assistente per il calcolo dell'IMU 2025. 👋

**Posso aiutarti a:**
📄 Analizzare le tue visure catastali
🧮 Calcolare l'IMU dovuta
📋 Identificare detrazioni e agevolazioni  
📑 Generare un report dettagliato

**Per iniziare, carica le tue visure catastali!**`;
    }
    /**
     * Genera messaggio di analisi dei dati
     */
    generateAnalysisMessage(data) {
        let message = `📊 **Analisi Completata**\n\n`;
        // Informazioni sui dati estratti
        message += `🏠 **Immobili trovati**: ${data.metadata.totalProperties}\n`;
        message += `├─ Fabbricati: ${data.fabbricati.length}\n`;
        message += `└─ Terreni: ${data.terreni.length}\n\n`;
        // Errori se presenti
        if (data.errors.length > 0) {
            message += `⚠️ **Avvisi**:\n`;
            data.errors.forEach(error => {
                message += `• ${error}\n`;
            });
            message += '\n';
        }
        // Dettagli sui fabbricati
        if (data.fabbricati.length > 0) {
            message += `🏢 **Fabbricati**:\n`;
            data.fabbricati.forEach((fab, index) => {
                var _a;
                message += `${index + 1}. Fg.${fab.foglio} Part.${fab.particella}`;
                if (fab.subalterno)
                    message += ` Sub.${fab.subalterno}`;
                if (fab.categoria)
                    message += ` - Cat.${fab.categoria}`;
                if (fab.rendita > 0)
                    message += ` - Rendita: €${fab.rendita.toFixed(2)}`;
                if ((_a = fab.proprietario) === null || _a === void 0 ? void 0 : _a.titolarita)
                    message += ` - ${fab.proprietario.titolarita}`;
                message += `\n`;
            });
            message += '\n';
        }
        // Dettagli sui terreni
        if (data.terreni.length > 0) {
            message += `🌱 **Terreni**:\n`;
            data.terreni.forEach((ter, index) => {
                var _a;
                message += `${index + 1}. Fg.${ter.foglio} Part.${ter.particella}`;
                if (ter.qualita)
                    message += ` - ${ter.qualita}`;
                if (ter.superficie > 0)
                    message += ` - Sup: ${ter.superficie.toFixed(0)}mq`;
                if (ter.redditoDominicale > 0)
                    message += ` - RD: €${ter.redditoDominicale.toFixed(2)}`;
                if ((_a = ter.proprietario) === null || _a === void 0 ? void 0 : _a.titolarita)
                    message += ` - ${ter.proprietario.titolarita}`;
                message += `\n`;
            });
            message += '\n';
        }
        message += '✅ I dati sono pronti per il calcolo dell\'IMU.\n';
        message += 'Vuoi procedere con il questionario per completare le informazioni mancanti?';
        return message;
    }
    async generateAIResponse(session, message) {
        // Logica di risposta intelligente basata sulla fase
        let response;
        if (session.phase === 'welcome') {
            response = "Per iniziare, carica le tue visure catastali! Trascina i file o usa il pulsante di upload. 📁";
        }
        else if (session.phase === 'analysis') {
            response = "Perfetto! I dati sono stati analizzati. Ora possiamo procedere con le domande per calcolare l'IMU.";
        }
        else if (session.phase === 'questions') {
            response = "Rispondi alle domande usando i pulsanti, così posso calcolare correttamente la tua IMU.";
        }
        else if (session.phase === 'calculation') {
            response = "Il calcolo è in corso... Sto elaborando tutti i dati per fornirti il risultato più accurato!";
        }
        else {
            response = "Come posso aiutarti? Usa i pulsanti disponibili per navigare tra le opzioni.";
        }
        return {
            id: this.generateMessageId(),
            timestamp: new Date(),
            sender: 'ai',
            content: response,
            type: 'text'
        };
    }
    async startQuestionnaire(session) {
        const questions = this.generateQuestionsForData(session.extractedData);
        if (questions.length === 0) {
            return this.performCalculation(session);
        }
        const firstQuestion = questions[0];
        const message = this.formatQuestion(firstQuestion, session.extractedData);
        return [{
                id: this.generateMessageId(),
                timestamp: new Date(),
                sender: 'ai',
                content: message,
                type: 'action_buttons',
                metadata: { questionId: firstQuestion.id, questions }
            }];
    }
    generateQuestionsForData(data) {
        const questions = [];
        // Filtra solo i fabbricati di categoria A (abitazioni) per la residenza principale
        const fabbricatiAbitazioni = data.fabbricati.filter((fab, originalIndex) => {
            // Categoria A per abitazioni: A/1, A/2, A/3, A/4, A/5, A/6, A/7, A/8, A/9, A/11
            return fab.categoria && fab.categoria.startsWith('A/') && !fab.categoria.includes('A/10');
        });
        // Domanda sulla residenza principale se ci sono fabbricati abitativi
        if (fabbricatiAbitazioni.length > 1) {
            // Mantieni gli indici originali per la mappatura corretta
            const originalIndices = data.fabbricati.map((fab, index) => {
                if (fab.categoria && fab.categoria.startsWith('A/') && !fab.categoria.includes('A/10')) {
                    return index;
                }
                return null;
            }).filter(index => index !== null);
            questions.push({
                id: 'residenza_principale',
                text: '🏠 Qual è la tua residenza principale?',
                type: 'select',
                options: fabbricatiAbitazioni.map((fab, i) => ({
                    value: originalIndices[i].toString(),
                    label: `${fab.ubicazione} - ${fab.comune} (${fab.categoria})`
                })),
                required: true
            });
        }
        else if (fabbricatiAbitazioni.length === 1) {
            // Se c'è solo un'abitazione, segnala automaticamente come residenza principale
            const originalIndex = data.fabbricati.findIndex(fab => fab.categoria && fab.categoria.startsWith('A/') && !fab.categoria.includes('A/10'));
            questions.push({
                id: 'residenza_principale',
                text: `🏠 Confermi che la tua residenza principale è:\n**${fabbricatiAbitazioni[0].ubicazione} - ${fabbricatiAbitazioni[0].comune} (${fabbricatiAbitazioni[0].categoria})**?`,
                type: 'select',
                options: [
                    { value: originalIndex.toString(), label: 'Sì, è la mia residenza principale' },
                    { value: 'no', label: 'No, non è la mia residenza principale' }
                ],
                required: true
            });
        }
        // Domanda su esenzioni/agevolazioni
        questions.push({
            id: 'agevolazioni',
            text: '💰 Hai diritto ad agevolazioni particolari?',
            type: 'multiselect',
            options: [
                { value: 'prima_casa', label: 'Prima casa' },
                { value: 'over_65', label: 'Over 65 anni' },
                { value: 'disabile', label: 'Disabilità' },
                { value: 'terreni_montani', label: 'Terreni montani' },
                { value: 'nessuna', label: 'Nessuna agevolazione' }
            ],
            required: true
        });
        return questions;
    }
    formatQuestion(question, data) {
        let message = question.text + '\n\n';
        if (question.options) {
            message += '**Opzioni disponibili:**\n';
            question.options.forEach((option, i) => {
                message += `${i + 1}. ${option.label}\n`;
            });
        }
        return message;
    }
    async handleQuestionAnswer(session, data) {
        session.userResponses[data.questionId] = data.answer;
        // Determina se ci sono altre domande
        const allQuestions = this.generateQuestionsForData(session.extractedData);
        const answeredQuestions = Object.keys(session.userResponses);
        const remainingQuestions = allQuestions.filter(q => !answeredQuestions.includes(q.id));
        if (remainingQuestions.length > 0) {
            // Prossima domanda
            const nextQuestion = remainingQuestions[0];
            const message = this.formatQuestion(nextQuestion, session.extractedData);
            return [{
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: message,
                    type: 'action_buttons',
                    metadata: { questionId: nextQuestion.id, questions: allQuestions }
                }];
        }
        else {
            // Tutte le domande completate
            return this.performCalculation(session);
        }
    }
    async performCalculation(session) {
        const calculation = await this.calculateIMU(session.extractedData, session.userResponses);
        session.calculationResult = calculation;
        const message = this.formatCalculationResult(calculation);
        return [{
                id: this.generateMessageId(),
                timestamp: new Date(),
                sender: 'ai',
                content: message,
                type: 'calculation',
                metadata: { calculation }
            }];
    }
    async calculateIMU(data, userResponses) {
        // Simulazione calcolo IMU (in realtà qui ci andrebbe la logica vera)
        const details = [];
        let totalIMU = 0;
        // Calcola fabbricati
        for (const [index, fabbricato] of data.fabbricati.entries()) {
            const isPrimaCasa = userResponses.residenza_principale == index.toString();
            const baseImponibile = fabbricato.rendita * 1.05 * this.getMoltiplicatoreCatastale(fabbricato.categoria);
            const aliquota = isPrimaCasa ? 0.4 : 0.76; // %
            const detrazione = isPrimaCasa ? 200 : 0;
            const importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
            details.push({
                immobile: fabbricato.ubicazione,
                categoria: fabbricato.categoria,
                baseImponibile,
                aliquota,
                detrazione,
                importo,
                note: isPrimaCasa ? 'Abitazione principale' : undefined
            });
            totalIMU += importo;
        }
        // Calcola terreni
        for (const terreno of data.terreni) {
            const baseImponibile = terreno.redditoDominicale * 1.25 * 135;
            const aliquota = 0.76;
            const detrazione = 0;
            const importo = baseImponibile * aliquota / 100;
            details.push({
                immobile: `Terreno ${terreno.qualita}`,
                categoria: terreno.qualita,
                baseImponibile,
                aliquota,
                detrazione,
                importo
            });
            totalIMU += importo;
        }
        const acconto = totalIMU / 2;
        const saldo = totalIMU - acconto;
        return {
            totalIMU,
            acconto,
            saldo,
            details,
            logic: [
                '✅ Rivalutazione catastale applicata (+5% fabbricati, +25% terreni)',
                '✅ Moltiplicatori catastali aggiornati 2025',
                userResponses.residenza_principale !== undefined ? '✅ Detrazione prima casa applicata' : '',
                '✅ Aliquote standard applicate (verificare quelle comunali)'
            ].filter(Boolean),
            scadenze: [
                { data: '16/06/2025', descrizione: 'Acconto IMU', importo: acconto },
                { data: '16/12/2025', descrizione: 'Saldo IMU', importo: saldo }
            ],
            agevolazioni: userResponses.agevolazioni ? userResponses.agevolazioni.split(',') : [],
            warnings: [
                'Verificare le aliquote specifiche del tuo comune',
                'Le agevolazioni potrebbero variare per comune',
                totalIMU < 12 ? 'Importo sotto la soglia minima di versamento' : ''
            ].filter(Boolean)
        };
    }
    getMoltiplicatoreCatastale(categoria) {
        const moltiplicatori = {
            'A/1': 176, 'A/8': 176, 'A/9': 176,
            'A/2': 126, 'A/3': 126, 'A/4': 126, 'A/5': 126, 'A/6': 126, 'A/7': 126,
            'A/10': 63, 'A/11': 63,
            'B/1': 176, 'B/2': 176, 'B/3': 176, 'B/4': 176, 'B/5': 176, 'B/6': 176, 'B/7': 176, 'B/8': 176,
            'C/1': 63, 'C/2': 140, 'C/3': 140, 'C/4': 140, 'C/5': 140,
            'C/6': 53, 'C/7': 53,
            'D/1': 80, 'D/2': 80, 'D/3': 80, 'D/4': 80, 'D/5': 80,
            'D/6': 80, 'D/7': 80, 'D/8': 80, 'D/9': 80, 'D/10': 80,
            'F/1': 0, 'F/2': 0, 'F/3': 0, 'F/4': 0, 'F/5': 0
        };
        return moltiplicatori[categoria] || 126;
    }
    formatCalculationResult(calculation) {
        let message = `✅ **Calcolo IMU 2025 completato!**\n\n`;
        message += `💰 **Totale IMU: €${calculation.totalIMU.toFixed(2)}**\n\n`;
        message += `**📊 Dettaglio per immobile:**\n`;
        calculation.details.forEach((detail, i) => {
            message += `${i + 1}. ${detail.immobile}\n`;
            message += `   Base: €${detail.baseImponibile.toFixed(2)} | Aliquota: ${detail.aliquota}%`;
            if (detail.detrazione > 0) {
                message += ` | Detrazione: €${detail.detrazione}`;
            }
            message += `\n   **IMU: €${detail.importo.toFixed(2)}**\n\n`;
        });
        message += `**📅 Scadenze:**\n`;
        calculation.scadenze.forEach(scadenza => {
            message += `• ${scadenza.data}: ${scadenza.descrizione} - €${scadenza.importo.toFixed(2)}\n`;
        });
        if (calculation.warnings.length > 0) {
            message += `\n**⚠️ Note importanti:**\n`;
            calculation.warnings.forEach(warning => {
                message += `• ${warning}\n`;
            });
        }
        return message;
    }
    async generateReport(session) {
        if (!session.calculationResult) {
            return [{
                    id: this.generateMessageId(),
                    timestamp: new Date(),
                    sender: 'ai',
                    content: 'Errore: nessun calcolo disponibile per generare il report.',
                    type: 'text'
                }];
        }
        // Simula generazione report
        const reportContent = this.generateReportContent(session);
        return [{
                id: this.generateMessageId(),
                timestamp: new Date(),
                sender: 'ai',
                content: `📑 **Report IMU 2025 generato!**\n\nIl report include:\n• Dati catastali analizzati\n• Calcoli dettagliati\n• Normativa applicata\n• Scadenze e raccomandazioni\n\n**Il download inizierà automaticamente.**`,
                type: 'text',
                metadata: {
                    reportContent,
                    fileName: `IMU_2025_Report_${session.id}.txt`
                }
            }];
    }
    generateReportContent(session) {
        const calc = session.calculationResult;
        const data = session.extractedData;
        let content = `REPORT IMU 2025\n`;
        content += `================\n\n`;
        content += `Generato il: ${new Date().toLocaleString('it-IT')}\n`;
        content += `Sessione: ${session.id}\n\n`;
        content += `DATI CATASTALI ANALIZZATI:\n`;
        content += `- Fabbricati: ${data.fabbricati.length}\n`;
        content += `- Terreni: ${data.terreni.length}\n\n`;
        content += `CALCOLO IMU:\n`;
        content += `- Totale: €${calc.totalIMU.toFixed(2)}\n`;
        content += `- Acconto: €${calc.acconto.toFixed(2)}\n`;
        content += `- Saldo: €${calc.saldo.toFixed(2)}\n\n`;
        content += `LOGICA APPLICATA:\n`;
        calc.logic.forEach(logic => {
            content += `- ${logic}\n`;
        });
        return content;
    }
}
exports.ChatIMUService = ChatIMUService;
//# sourceMappingURL=chat-imu-service.js.map