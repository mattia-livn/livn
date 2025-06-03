"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carica variabili d'ambiente da .env.local (correggo path per compilazione)
const envPath = path_1.default.join(process.cwd(), '.env.local');
dotenv_1.default.config({ path: envPath });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const upload_service_ai_1 = require("./services/upload-service-ai");
const commune_conditions_service_1 = require("./services/commune-conditions-service");
const fs = __importStar(require("fs"));
class LivnAPIServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.uploadServiceAI = new upload_service_ai_1.UploadServiceAI();
        this.communeConditionsService = new commune_conditions_service_1.CommuneConditionsService();
        this.sessions = new Map();
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            limits: { fileSize: 50 * 1024 * 1024 } // 50MB
        });
        this.setupMiddleware();
        this.setupRoutes();
        this.setupProgressCallback();
        this.ensureTempDirectory();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(process.cwd(), 'web')));
        // CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            }
            else {
                next();
            }
        });
    }
    setupProgressCallback() {
        // Setup callback globale per feedback progressivo
        this.uploadServiceAI.setProgressCallback((message) => {
            // Trova la sessione attiva e aggiorna progress
            for (const [sessionId, session] of this.sessions) {
                if (session.status === 'analyzing') {
                    session.progress.push({
                        message,
                        timestamp: new Date()
                    });
                }
            }
        });
    }
    setupRoutes() {
        // Home page (correggo path per compilazione)
        this.app.get('/', (req, res) => {
            res.sendFile(path_1.default.join(process.cwd(), 'web', 'index.html'));
        });
        // API Routes
        this.app.post('/api/analyze', this.upload.array('files'), this.handleAnalyze.bind(this));
        this.app.get('/api/progress/:sessionId', this.handleGetProgress.bind(this));
        this.app.post('/api/questions/:sessionId', this.handleQuestions.bind(this));
        this.app.post('/api/calculate/:sessionId', this.handleCalculate.bind(this));
        this.app.get('/api/report/:sessionId', this.handleGetReport.bind(this));
        this.app.post('/api/report/:sessionId/pdf', this.handleGeneratePDF.bind(this));
        this.app.get('/api/report/:sessionId/download', this.handleDownloadPDF.bind(this));
        // Health check
        this.app.get('/api/health', (req, res) => {
            res.json({ status: 'ok', timestamp: new Date() });
        });
    }
    ensureTempDirectory() {
        // Correggo path per compilazione
        const tempDir = path_1.default.join(process.cwd(), 'temp-uploads');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
            console.log('📁 Cartella temp-uploads creata');
        }
    }
    /**
     * Step 4: Analizza i file caricati
     */
    async handleAnalyze(req, res) {
        try {
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Nessun file caricato'
                });
            }
            // Crea nuova sessione
            const sessionId = this.generateSessionId();
            const session = {
                id: sessionId,
                files: files.map(file => ({
                    name: file.originalname,
                    size: file.size,
                    buffer: file.buffer,
                    mimeType: file.mimetype
                })),
                progress: [{
                        message: '🚀 Analisi iniziata...',
                        timestamp: new Date()
                    }],
                status: 'analyzing',
                createdAt: new Date()
            };
            this.sessions.set(sessionId, session);
            // Avvia analisi in background
            this.performAnalysis(sessionId);
            res.json({
                success: true,
                sessionId,
                message: 'Analisi avviata'
            });
        }
        catch (error) {
            console.error('❌ Errore in handleAnalyze:', error);
            res.status(500).json({
                success: false,
                error: 'Errore interno del server'
            });
        }
    }
    /**
     * Esegue l'analisi dei file
     */
    async performAnalysis(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        try {
            // Prepara i file per il servizio AI
            const filesForAI = session.files.map(file => ({
                buffer: file.buffer,
                name: file.name,
                mimeType: file.mimeType
            }));
            // Analizza con AI
            const result = await this.uploadServiceAI.processFiles(filesForAI);
            if (result.success) {
                session.extractedData = {
                    fabbricati: result.fabbricati,
                    terreni: result.terreni,
                    confidence: result.confidence,
                    warnings: result.warnings,
                    errors: result.errors
                };
                session.status = 'completed';
                session.progress.push({
                    message: '✅ Analisi completata con successo!',
                    timestamp: new Date()
                });
            }
            else {
                session.status = 'error';
                session.progress.push({
                    message: '❌ Errore durante l\'analisi',
                    timestamp: new Date()
                });
            }
        }
        catch (error) {
            console.error('❌ Errore durante analisi:', error);
            session.status = 'error';
            session.progress.push({
                message: `❌ Errore: ${error.message}`,
                timestamp: new Date()
            });
        }
    }
    /**
     * Step 5: Ottieni progresso analisi
     */
    handleGetProgress(req, res) {
        const sessionId = req.params.sessionId;
        const session = this.sessions.get(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Sessione non trovata'
            });
        }
        res.json({
            success: true,
            status: session.status,
            progress: session.progress,
            data: session.status === 'completed' ? session.extractedData : null
        });
    }
    /**
     * Step 7-9: Gestisce le domande dell'utente
     */
    async handleQuestions(req, res) {
        const sessionId = req.params.sessionId;
        const session = this.sessions.get(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Sessione non trovata'
            });
        }
        if (!session.extractedData) {
            return res.status(400).json({
                success: false,
                error: 'Dati non ancora estratti'
            });
        }
        try {
            const { answers } = req.body;
            session.userAnswers = { ...session.userAnswers, ...answers };
            // Genera le domande in base ai dati estratti (ora async)
            const questions = await this.generateQuestions(session.extractedData, session.userAnswers || {});
            res.json({
                success: true,
                questions,
                isComplete: questions.length === 0
            });
        }
        catch (error) {
            console.error('❌ Errore in handleQuestions:', error);
            res.status(500).json({
                success: false,
                error: 'Errore interno del server'
            });
        }
    }
    /**
     * Step 10-12: Calcola IMU
     */
    async handleCalculate(req, res) {
        const sessionId = req.params.sessionId;
        const session = this.sessions.get(sessionId);
        if (!session || !session.extractedData || !session.userAnswers) {
            return res.status(400).json({
                success: false,
                error: 'Dati incompleti per il calcolo'
            });
        }
        try {
            const calculation = await this.calculateIMU(session.extractedData, session.userAnswers);
            session.calculationResult = calculation;
            res.json({
                success: true,
                calculation
            });
        }
        catch (error) {
            console.error('❌ Errore in handleCalculate:', error);
            res.status(500).json({
                success: false,
                error: 'Errore durante il calcolo'
            });
        }
    }
    /**
     * Step 13: Ottieni report
     */
    handleGetReport(req, res) {
        const sessionId = req.params.sessionId;
        const session = this.sessions.get(sessionId);
        if (!session || !session.calculationResult) {
            return res.status(400).json({
                success: false,
                error: 'Calcolo non ancora completato'
            });
        }
        const report = this.generateReport(session);
        res.json({
            success: true,
            report
        });
    }
    /**
     * Step 14-15: Genera e scarica PDF
     */
    async handleGeneratePDF(req, res) {
        const sessionId = req.params.sessionId;
        const session = this.sessions.get(sessionId);
        if (!session || !session.calculationResult) {
            return res.status(400).json({
                success: false,
                error: 'Calcolo non ancora completato'
            });
        }
        try {
            console.log('📄 === GENERAZIONE PDF ===');
            const pdfBuffer = await this.generatePDFReport(session);
            const fileName = `report_imu_${sessionId}.pdf`;
            // Salva il PDF temporaneamente
            const tempPath = path_1.default.join(process.cwd(), 'temp-uploads', fileName);
            fs.writeFileSync(tempPath, pdfBuffer);
            console.log(`✅ PDF generato: ${fileName}`);
            res.json({
                success: true,
                message: 'PDF generato con successo',
                downloadUrl: `/api/report/${sessionId}/download`,
                fileName
            });
        }
        catch (error) {
            console.error('❌ Errore generazione PDF:', error);
            res.status(500).json({
                success: false,
                error: 'Errore durante la generazione del PDF'
            });
        }
    }
    /**
     * Download del PDF generato
     */
    handleDownloadPDF(req, res) {
        const sessionId = req.params.sessionId;
        const fileName = `report_imu_${sessionId}.pdf`;
        const filePath = path_1.default.join(process.cwd(), 'temp-uploads', fileName);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: 'File PDF non trovato'
            });
        }
        res.download(filePath, `Report_IMU_${new Date().getFullYear()}.pdf`, (err) => {
            if (err) {
                console.error('❌ Errore download PDF:', err);
            }
            else {
                console.log('✅ PDF scaricato con successo');
                // Rimuovi il file temporaneo dopo il download
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log('🗑️ File temporaneo rimosso');
                    }
                }, 5000);
            }
        });
    }
    /**
     * Genera il PDF del report usando Puppeteer
     */
    async generatePDFReport(session) {
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        try {
            const page = await browser.newPage();
            // Template HTML per il PDF
            const htmlContent = this.generateReportHTML(session);
            await page.setContent(htmlContent, { waitUntil: 'load' });
            // Genera PDF
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '15mm',
                    bottom: '20mm',
                    left: '15mm'
                }
            });
            return Buffer.from(pdfBuffer);
        }
        finally {
            await browser.close();
        }
    }
    /**
     * Genera template HTML per il PDF
     */
    generateReportHTML(session) {
        const { calculationResult } = session;
        const isEsente = calculationResult.totalIMU === 0;
        return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Calcolo IMU 2025</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #0066cc; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .logo { 
            font-size: 28px; 
            font-weight: bold; 
            color: #0066cc; 
            margin-bottom: 10px; 
        }
        .summary { 
            background: ${isEsente ? '#d4edda' : '#f8f9fa'}; 
            border: 2px solid ${isEsente ? '#28a745' : '#dee2e6'}; 
            border-radius: 8px; 
            padding: 20px; 
            margin-bottom: 30px; 
        }
        .summary h2 { 
            color: ${isEsente ? '#155724' : '#495057'}; 
            margin-top: 0; 
        }
        .total-amount { 
            font-size: 36px; 
            font-weight: bold; 
            color: ${isEsente ? '#28a745' : '#dc3545'}; 
            text-align: center; 
            margin: 15px 0; 
        }
        .esente-badge {
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            display: inline-block;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px; 
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
        }
        th { 
            background-color: #f8f9fa; 
            font-weight: bold; 
        }
        .esente { 
            background-color: #d4edda !important; 
            color: #155724; 
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 12px; 
            color: #666; 
        }
        .normativa {
            background: #e7f3ff;
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin: 20px 0;
        }
        .normativa ul {
            margin: 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">📊 LIVN - Calcolo IMU 2025</div>
        <p>Report dettagliato del calcolo dell'Imposta Municipale Unica</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('it-IT')}</p>
    </div>

    <div class="summary">
        <h2>${isEsente ? '✅ NESSUN PAGAMENTO DOVUTO' : '💰 Riepilogo IMU 2025'}</h2>
        <div class="total-amount">
            ${isEsente ? 'ESENTE' : `€ ${calculationResult.totalIMU.toFixed(2)}`}
        </div>
        ${isEsente ?
            '<p style="text-align: center; color: #155724; font-weight: bold;">I tuoi immobili sono esenti da IMU secondo la normativa vigente</p>' :
            `<p><strong>Acconto (16/06/2025):</strong> € ${calculationResult.acconto.toFixed(2)}</p>
           <p><strong>Saldo (16/12/2025):</strong> € ${calculationResult.saldo.toFixed(2)}</p>`}
    </div>

    <h3>📋 Dettaglio per Immobile</h3>
    <table>
        <thead>
            <tr>
                <th>Immobile</th>
                <th>Categoria</th>
                <th>Base Imponibile</th>
                <th>Tipo</th>
                <th>IMU</th>
            </tr>
        </thead>
        <tbody>
            ${calculationResult.details.map(detail => `
                <tr class="${detail.importo === 0 ? 'esente' : ''}">
                    <td>${detail.immobile}</td>
                    <td>${detail.categoria}</td>
                    <td>€ ${detail.baseImponibile.toFixed(2)}</td>
                    <td>
                        ${detail.tipo}
                        ${detail.importo === 0 ? '<span class="esente-badge">ESENTE</span>' : ''}
                    </td>
                    <td><strong>${detail.importo === 0 ? 'ESENTE' : `€ ${detail.importo.toFixed(2)}`}</strong></td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <h3>📅 Scadenze di Pagamento</h3>
    <table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Descrizione</th>
                <th>Importo</th>
            </tr>
        </thead>
        <tbody>
            ${calculationResult.scadenze.map(scadenza => `
                <tr>
                    <td>${scadenza.data}</td>
                    <td>${scadenza.descrizione}</td>
                    <td><strong>${scadenza.importo === 0 ? 'ESENTE' : `€ ${scadenza.importo.toFixed(2)}`}</strong></td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="normativa">
        <h3>⚖️ Normativa Applicata</h3>
        <ul>
            ${calculationResult.normativa.map(norma => `<li>${norma}</li>`).join('')}
        </ul>
    </div>

    <div class="footer">
        <p><strong>Note importanti:</strong></p>
        <ul>
            <li>Questo calcolo è basato sui dati catastali forniti e la normativa IMU 2025</li>
            <li>Per abitazione principale si intende l'immobile dove si ha residenza e dimora abituale</li>
            <li>Le pertinenze dell'abitazione principale sono esenti (max una per categoria C/2, C/6, C/7)</li>
            <li>È sempre consigliabile verificare con il proprio commercialista o il Comune di competenza</li>
        </ul>
        <p style="text-align: center; margin-top: 30px;">
            <strong>Generato da LIVN - Sistema di Calcolo IMU</strong><br>
            <em>www.livn.it</em>
        </p>
    </div>
</body>
</html>`;
    }
    /**
     * Genera domande basate sui dati estratti
     */
    async generateQuestions(extractedData, userAnswers) {
        console.log('🤔 === GENERAZIONE DOMANDE RIVISTA ===');
        console.log('📊 Fabbricati disponibili:', extractedData.fabbricati?.length || 0);
        console.log('🏠 Categorie trovate:', extractedData.fabbricati?.map((f) => f.categoria) || []);
        console.log('👤 Risposte utente esistenti:', Object.keys(userAnswers || {}));
        console.log('📋 Contenuto userAnswers:', JSON.stringify(userAnswers, null, 2));
        const questions = [];
        // STEP 1: Domanda abitazione principale
        if (!userAnswers.abitazione_principale) {
            const abitazioni = extractedData.fabbricati?.filter((fab, index) => fab.categoria?.startsWith('A/') && fab.categoria !== 'A/10') || [];
            if (abitazioni.length > 0) {
                console.log('🏠 Abitazioni filtrate (A/ esclusa A/10):', abitazioni.length);
                questions.push({
                    id: 'abitazione_principale',
                    type: 'select',
                    title: '🏠 Qual è la tua abitazione principale?',
                    description: 'Seleziona quale immobile costituisce la tua abitazione principale (residenza) oppure scegli "Nessuna" se vivi in affitto',
                    options: [
                        ...abitazioni.map((hab, originalIndex) => {
                            const index = extractedData.fabbricati.findIndex((f) => f === hab);
                            return {
                                value: index.toString(),
                                label: `🏠 ${hab.ubicazione || 'N/D'} - ${hab.categoria} - ${hab.comune}`
                            };
                        }),
                        { value: 'nessuna', label: '❌ Nessuna - Non ho abitazione principale (vivo in affitto o altrove)' }
                    ],
                    required: true
                });
                console.log('✅ Aggiunta domanda abitazione principale');
            }
        }
        // STEP 2: Pertinenze (solo se abitazione principale != 'nessuna')
        if (userAnswers.abitazione_principale &&
            userAnswers.abitazione_principale !== 'nessuna' &&
            userAnswers.pertinenze === undefined) {
            const abitazionePrincipaleIndex = parseInt(userAnswers.abitazione_principale);
            const abitazionePrincipale = extractedData.fabbricati[abitazionePrincipaleIndex];
            if (abitazionePrincipale) {
                // Raggruppa per comune e trova potenziali pertinenze
                const immobiliPerComune = {};
                extractedData.fabbricati.forEach((fab, index) => {
                    const comune = fab.comune || 'N/D';
                    if (!immobiliPerComune[comune]) {
                        immobiliPerComune[comune] = { abitazioni: [], pertinenze: [] };
                    }
                    if (fab.categoria?.startsWith('A/') && fab.categoria !== 'A/10') {
                        immobiliPerComune[comune].abitazioni.push({ ...fab, index });
                    }
                    else if (fab.categoria?.startsWith('C/') || fab.categoria === 'A/10') {
                        immobiliPerComune[comune].pertinenze.push({ ...fab, index });
                    }
                });
                console.log('🚪 Immobili per comune per pertinenze:');
                Object.entries(immobiliPerComune).forEach(([comune, dati]) => {
                    console.log(`  ${comune}: ${dati.abitazioni.length} abitazioni, ${dati.pertinenze.length} potenziali pertinenze`);
                });
                // Crea la domanda per il collegamento delle pertinenze
                const abitazioniOptions = [];
                Object.entries(immobiliPerComune).forEach(([comune, dati]) => {
                    dati.abitazioni.forEach(abitazione => {
                        const pertinenze = dati.pertinenze.filter(p => p.index !== abitazione.index);
                        if (pertinenze.length > 0) {
                            abitazioniOptions.push({
                                id: `abitazione_${abitazione.index}`,
                                label: `🏠 ${abitazione.ubicazione} - ${abitazione.categoria} (${comune})`,
                                pertinenze: pertinenze.map(p => ({
                                    value: p.index.toString(),
                                    label: `🚪 ${p.ubicazione} - ${p.categoria}`
                                }))
                            });
                        }
                    });
                });
                if (abitazioniOptions.length > 0) {
                    questions.push({
                        id: 'pertinenze',
                        type: 'object',
                        title: '🚪 Collegamento Pertinenze',
                        description: 'Indica quali immobili sono pertinenze delle tue abitazioni',
                        fields: abitazioniOptions.map(abitazione => ({
                            id: abitazione.id,
                            label: abitazione.label,
                            type: 'multi-select',
                            options: abitazione.pertinenze,
                            required: false
                        })),
                        required: false
                    });
                    console.log(`✅ Aggiunta domanda pertinenze con ${abitazioniOptions.length} abitazioni`);
                }
                else {
                    // Nessuna pertinenza disponibile, imposta pertinenze come oggetto vuoto
                    userAnswers.pertinenze = {};
                }
            }
        }
        // Se abitazione principale è "nessuna", salta le pertinenze e imposta automaticamente
        if (userAnswers.abitazione_principale === 'nessuna' && userAnswers.pertinenze === undefined) {
            console.log('ℹ️ Abitazione principale = "nessuna" - Salto pertinenze');
            userAnswers.pertinenze = {}; // Imposta pertinenze vuote per continuare
        }
        // STEP 3: Condizioni degli immobili (SEMPRE necessario per aliquote corrette)
        if (!userAnswers.condizioni_immobili) {
            console.log('🤔 STEP 3: Generazione domande condizioni immobili...');
            // Estrai indici pertinenze da oggetto complesso (compatibilità frontend)
            const pertinenzaIndices = [];
            if (userAnswers.pertinenze && typeof userAnswers.pertinenze === 'object') {
                Object.values(userAnswers.pertinenze).forEach((pertinenze) => {
                    if (Array.isArray(pertinenze)) {
                        pertinenze.forEach((index) => {
                            pertinenzaIndices.push(parseInt(index));
                        });
                    }
                });
            }
            // Solo se ci sono immobili su cui fare domande
            const immobiliDaAnalizzare = extractedData.fabbricati?.filter((fab, index) => {
                // Escludi abitazione principale (se presente) e pertinenze
                const isAbitazionePrincipale = userAnswers.abitazione_principale &&
                    userAnswers.abitazione_principale !== 'nessuna' &&
                    userAnswers.abitazione_principale === index.toString();
                const isPertinenza = pertinenzaIndices.includes(index);
                return !isAbitazionePrincipale && !isPertinenza;
            }) || [];
            console.log(`🏠 Immobili da analizzare per condizioni: ${immobiliDaAnalizzare.length}`);
            if (immobiliDaAnalizzare.length > 0) {
                questions.push({
                    id: 'condizioni_immobili',
                    type: 'object',
                    title: '🏠 Condizione di utilizzo degli immobili',
                    description: 'Per calcolare correttamente l\'IMU secondo le aliquote specifiche del comune, devo sapere come sono utilizzati i tuoi immobili.',
                    fields: extractedData.fabbricati.map((fab, index) => {
                        const isAbitazionePrincipale = userAnswers.abitazione_principale &&
                            userAnswers.abitazione_principale !== 'nessuna' &&
                            userAnswers.abitazione_principale === index.toString();
                        const isPertinenza = pertinenzaIndices.includes(index);
                        // Salta abitazione principale e pertinenze
                        if (isAbitazionePrincipale || isPertinenza) {
                            return null;
                        }
                        return {
                            id: `immobile_${index}`,
                            type: 'select',
                            label: `${fab.ubicazione || `Immobile ${index + 1}`} (${fab.categoria})`,
                            required: true,
                            options: fab.categoria?.startsWith('A/') ? [
                                { value: 'libero', label: '🏠 Libero (non utilizzato)' },
                                { value: 'locato', label: '💰 Locato (con contratto registrato)' },
                                { value: 'locato_parenti', label: '👨‍👩‍👧‍👦 Dato in comodato a parenti' },
                                { value: 'comodato', label: '🤝 Dato in comodato ad altri' },
                                { value: 'uso_proprio', label: '✋ Uso proprio saltuario' }
                            ] : [
                                { value: 'libero', label: '📦 Libero (non utilizzato)' },
                                { value: 'locato', label: '💰 Locato' },
                                { value: 'uso_proprio', label: '✋ Uso proprio' },
                                { value: 'startup', label: '🚀 Utilizzato da startup innovativa' }
                            ]
                        };
                    }).filter((field) => field !== null)
                });
                console.log(`✅ Aggiunta domanda condizioni per ${immobiliDaAnalizzare.length} immobili`);
            }
        }
        // STEP 4: Domande specifiche del comune (NUOVO!)
        const comunePrincipale = extractedData.fabbricati?.[0]?.comune || '';
        if (comunePrincipale && userAnswers.condizioni_immobili && !userAnswers.domande_specifiche_comune) {
            console.log(`🏛️ STEP 4: Generazione domande specifiche per comune: ${comunePrincipale}`);
            try {
                const domandeSpecifiche = await this.communeConditionsService.generateCommuneSpecificQuestions(extractedData, comunePrincipale);
                if (domandeSpecifiche.length > 0) {
                    console.log(`✅ Generate ${domandeSpecifiche.length} domande specifiche per ${comunePrincipale}`);
                    questions.push({
                        id: 'domande_specifiche_comune',
                        type: 'object',
                        title: `🏛️ Domande specifiche per ${comunePrincipale}`,
                        description: `Il comune di ${comunePrincipale} prevede condizioni particolari per il calcolo dell'IMU. Rispondi alle seguenti domande per ottenere il calcolo più preciso.`,
                        fields: domandeSpecifiche.map(domanda => ({
                            id: domanda.id,
                            type: domanda.type || 'select',
                            label: domanda.question,
                            options: domanda.options || [],
                            required: false,
                            metadata: {
                                immobileIndex: domanda.immobileIndex,
                                parameterName: domanda.parameterName,
                                relatedCondition: domanda.relatedCondition
                            }
                        })),
                        required: false
                    });
                }
                else {
                    console.log(`ℹ️ Nessuna domanda specifica per ${comunePrincipale}`);
                    userAnswers.domande_specifiche_comune = {}; // Imposta vuoto per continuare
                }
            }
            catch (error) {
                console.error(`❌ Errore generazione domande specifiche per ${comunePrincipale}:`, error);
                userAnswers.domande_specifiche_comune = {}; // Fallback: imposta vuoto
            }
        }
        console.log('🤔 === RISULTATO GENERAZIONE RIVISTA ===');
        console.log(`📝 Domande generate: ${questions.length}`);
        if (questions.length === 0) {
            console.log(`✅ QUESTIONARIO COMPLETATO - Nessuna domanda rimanente`);
        }
        return questions;
    }
    /**
     * Calcola IMU usando file comunali
     */
    async calculateIMU(extractedData, userAnswers) {
        console.log('💰 === CALCOLO IMU CON CONDIZIONI COMUNALI DINAMICHE ===');
        console.log('🏠 Abitazione principale index:', userAnswers.abitazione_principale);
        console.log('🚪 Pertinenze raw:', userAnswers.pertinenze);
        const details = [];
        let totalIMU = 0;
        // Estrai indici pertinenze da oggetto complesso (compatibilità frontend)
        const pertinenzaIndices = [];
        if (userAnswers.pertinenze && typeof userAnswers.pertinenze === 'object') {
            Object.values(userAnswers.pertinenze).forEach((pertinenze) => {
                if (Array.isArray(pertinenze)) {
                    pertinenze.forEach((index) => {
                        pertinenzaIndices.push(parseInt(index));
                    });
                }
            });
        }
        console.log('🚪 Pertinenze indices processati:', pertinenzaIndices);
        // Determina il comune principale per le aliquote
        const comunePrincipale = extractedData.fabbricati?.[0]?.comune?.toLowerCase() || 'standard';
        console.log('🏛️ Comune rilevato per aliquote:', comunePrincipale);
        for (const [index, fabbricato] of extractedData.fabbricati.entries()) {
            // Se abitazione_principale è "nessuna", nessun immobile è prima casa
            const isPrimaCasa = userAnswers.abitazione_principale !== 'nessuna' &&
                userAnswers.abitazione_principale === index.toString();
            const isPertinenza = pertinenzaIndices.includes(index);
            // Categorie di lusso soggette a IMU anche se abitazione principale
            const categorieDetrazione = ['A/1', 'A/8', 'A/9'];
            const isLusso = categorieDetrazione.includes(fabbricato.categoria);
            const baseImponibile = fabbricato.rendita * 1.05 * this.getMoltiplicatore(fabbricato.categoria);
            let aliquota = 0;
            let detrazione = 0;
            let importo = 0;
            let tipoCalculazione = '';
            if (isPrimaCasa && !isLusso) {
                // Abitazione principale non di lusso: ESENTE
                aliquota = 0;
                detrazione = 0;
                importo = 0;
                tipoCalculazione = 'Abitazione principale (ESENTE)';
            }
            else if (isPrimaCasa && isLusso) {
                // Abitazione principale di lusso: usa condizioni specifiche del comune
                try {
                    const conditionResult = await this.communeConditionsService.findBestCondition(fabbricato, userAnswers, index, comunePrincipale);
                    aliquota = conditionResult.aliquota;
                    detrazione = 200; // Detrazione standard per abitazione principale di lusso
                    importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
                    tipoCalculazione = `Abitazione principale di lusso - ${conditionResult.descrizione}`;
                }
                catch (error) {
                    console.error('❌ Errore caricamento condizioni per abitazione principale di lusso:', error);
                    aliquota = 0.4;
                    detrazione = 200;
                    importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
                    tipoCalculazione = 'Abitazione principale di lusso (fallback)';
                }
            }
            else if (isPertinenza && userAnswers.abitazione_principale !== 'nessuna') {
                // Pertinenza dell'abitazione principale: ESENTE (solo se c'è abitazione principale)
                aliquota = 0;
                detrazione = 0;
                importo = 0;
                tipoCalculazione = 'Pertinenza abitazione principale (ESENTE)';
            }
            else {
                // Altri immobili: applica condizioni specifiche del comune
                try {
                    const conditionResult = await this.communeConditionsService.findBestCondition(fabbricato, userAnswers, index, comunePrincipale);
                    aliquota = conditionResult.aliquota;
                    detrazione = 0;
                    importo = baseImponibile * aliquota / 100;
                    tipoCalculazione = conditionResult.descrizione;
                    console.log(`🎯 Match trovato per immobile ${index}: ${conditionResult.descrizione} (score: ${conditionResult.matchingScore})`);
                }
                catch (error) {
                    console.error(`❌ Errore caricamento condizioni per immobile ${index}:`, error);
                    aliquota = 1.06;
                    detrazione = 0;
                    importo = baseImponibile * aliquota / 100;
                    tipoCalculazione = 'Altri fabbricati (fallback standard)';
                }
            }
            console.log(`💰 Immobile ${index}: ${fabbricato.categoria} - ${tipoCalculazione} - IMU: €${importo.toFixed(2)}`);
            details.push({
                immobile: `${fabbricato.ubicazione || 'N/D'} - ${fabbricato.categoria}`,
                categoria: fabbricato.categoria,
                baseImponibile,
                aliquota: aliquota,
                detrazione,
                importo,
                tipo: tipoCalculazione
            });
            totalIMU += importo;
        }
        console.log(`💰 Totale IMU calcolato con condizioni dinamiche: €${totalIMU.toFixed(2)}`);
        // Aggiorna le scadenze solo se c'è IMU da pagare
        const scadenze = totalIMU > 0 ? [
            { data: '16/06/2025', descrizione: 'Acconto IMU', importo: totalIMU / 2 },
            { data: '16/12/2025', descrizione: 'Saldo IMU', importo: totalIMU / 2 }
        ] : [
            { data: 'N/A', descrizione: 'Nessun pagamento dovuto', importo: 0 }
        ];
        const normativa = [
            '✅ Rivalutazione catastale applicata (+5%)',
            '✅ Moltiplicatori catastali 2025',
            `🏛️ Condizioni specifiche Comune di ${comunePrincipale.toUpperCase()} (Delibera 2025)`,
            userAnswers.abitazione_principale === 'nessuna'
                ? '🏠 Nessuna abitazione principale dichiarata'
                : '✅ Abitazione principale non di lusso: ESENTE da IMU',
            userAnswers.abitazione_principale === 'nessuna'
                ? '🚪 Nessuna pertinenza esentabile (no abitazione principale)'
                : '✅ Pertinenze abitazione principale: ESENTI da IMU',
            '⚖️ Normativa: art. 1, comma 741, lett. b, legge 160/2019',
            `📊 Sistema di matching automatico delle condizioni comunali attivo`
        ];
        return {
            totalIMU,
            acconto: totalIMU / 2,
            saldo: totalIMU / 2,
            details,
            scadenze,
            normativa
        };
    }
    /**
     * Genera report finale
     */
    generateReport(session) {
        return {
            sessionId: session.id,
            generatedAt: new Date(),
            datiEstratti: {
                fabbricati: session.extractedData?.fabbricati?.length || 0,
                terreni: session.extractedData?.terreni?.length || 0,
                confidence: session.extractedData?.confidence
            },
            calcolo: session.calculationResult,
            files: session.files.map(f => ({ name: f.name, size: f.size }))
        };
    }
    getMoltiplicatore(categoria) {
        const moltiplicatori = {
            'A/1': 176, 'A/8': 176, 'A/9': 176,
            'A/2': 126, 'A/3': 126, 'A/4': 126, 'A/5': 126, 'A/6': 126, 'A/7': 126,
            'A/10': 63, 'A/11': 63,
            'C/1': 63, 'C/2': 140, 'C/3': 140, 'C/4': 140, 'C/5': 140,
            'C/6': 53, 'C/7': 53
        };
        return moltiplicatori[categoria] || 126;
    }
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`🚀 Livn API Server avviato su http://localhost:${port}`);
            console.log(`💻 Interfaccia web: http://localhost:${port}`);
            console.log(`🔍 Health check: http://localhost:${port}/api/health`);
        });
    }
}
// Avvia server
const server = new LivnAPIServer();
server.start(3000);
