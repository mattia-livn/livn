"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload_service_ai_1 = require("./services/upload-service-ai");
class SimpleIMUServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.uploadServiceAI = new upload_service_ai_1.UploadServiceAI();
        this.sessions = new Map();
        this.upload = (0, multer_1.default)({ dest: 'temp-uploads/' });
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('web'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
    }
    setupRoutes() {
        // 1. Upload files e estrai dati
        this.app.post('/api/analyze', this.upload.array('files'), async (req, res) => {
            var _a;
            try {
                console.log('🚀 UPLOAD SEMPLIFICATO - File ricevuti:', (_a = req.files) === null || _a === void 0 ? void 0 : _a.length);
                if (!req.files || req.files.length === 0) {
                    return res.json({ success: false, error: 'Nessun file caricato' });
                }
                const multerFiles = req.files;
                const sessionId = this.generateSessionId();
                // Converti file Multer nel formato richiesto dal servizio AI
                const files = multerFiles.map(file => ({
                    buffer: require('fs').readFileSync(file.path),
                    name: file.originalname,
                    mimeType: file.mimetype
                }));
                // Estrai dati con AI
                const extractedData = await this.uploadServiceAI.processFiles(files);
                // Salva sessione
                this.sessions.set(sessionId, {
                    id: sessionId,
                    extractedData,
                    userAnswers: {},
                    status: 'uploaded'
                });
                console.log('✅ SESSIONE CREATA:', sessionId, '- Immobili trovati:', extractedData.fabbricati.length);
                res.json({
                    success: true,
                    sessionId,
                    extractedData
                });
            }
            catch (error) {
                console.error('❌ Errore upload:', error);
                res.json({ success: false, error: 'Errore durante l\'analisi' });
            }
        });
        // 2. Ottieni la prossima domanda
        this.app.get('/api/questions/:sessionId', (req, res) => {
            const session = this.sessions.get(req.params.sessionId);
            if (!session) {
                return res.json({ success: false, error: 'Sessione non trovata' });
            }
            const nextQuestion = this.getNextQuestion(session);
            console.log('❓ PROSSIMA DOMANDA:', (nextQuestion === null || nextQuestion === void 0 ? void 0 : nextQuestion.id) || 'NESSUNA');
            res.json({
                success: true,
                question: nextQuestion,
                hasMore: !!nextQuestion
            });
        });
        // 3. Invia risposta
        this.app.post('/api/answer/:sessionId', (req, res) => {
            const session = this.sessions.get(req.params.sessionId);
            if (!session) {
                return res.json({ success: false, error: 'Sessione non trovata' });
            }
            const { questionId, answer } = req.body;
            session.userAnswers[questionId] = answer;
            console.log('💬 RISPOSTA RICEVUTA:', questionId, '=', answer);
            res.json({ success: true });
        });
        // 4. Calcola IMU
        this.app.post('/api/calculate/:sessionId', async (req, res) => {
            const session = this.sessions.get(req.params.sessionId);
            if (!session) {
                return res.json({ success: false, error: 'Sessione non trovata' });
            }
            try {
                const calculation = this.calculateSimpleIMU(session);
                session.calculationResult = calculation;
                session.status = 'calculated';
                console.log('💰 CALCOLO COMPLETATO - Totale IMU:', calculation.totalIMU);
                res.json({
                    success: true,
                    calculation
                });
            }
            catch (error) {
                console.error('❌ Errore calcolo:', error);
                res.json({ success: false, error: 'Errore durante il calcolo' });
            }
        });
        // Health check
        this.app.get('/api/health', (req, res) => {
            res.json({ success: true, message: 'Server OK' });
        });
    }
    // ===== LOGICA SEMPLIFICATA =====
    getNextQuestion(session) {
        const { extractedData, userAnswers } = session;
        // CONTROLLO DI SICUREZZA: Se non ci sono fabbricati, non fare domande
        if (!extractedData.fabbricati || extractedData.fabbricati.length === 0) {
            console.log('⚠️ Nessun fabbricato trovato - skip domande');
            return null;
        }
        // 1. PRIMA DOMANDA: Abitazione principale
        if (!userAnswers.abitazione_principale) {
            const abitazioni = extractedData.fabbricati.filter((fab) => fab.categoria && fab.categoria.startsWith('A/') && fab.categoria !== 'A/10');
            if (abitazioni.length === 0) {
                // Nessuna abitazione, termina le domande
                console.log('⚠️ Nessuna abitazione trovata - skip domande');
                return null;
            }
            return {
                id: 'abitazione_principale',
                title: '🏠 Qual è la tua abitazione principale?',
                description: 'Seleziona l\'immobile che utilizzi come residenza principale',
                type: 'select',
                required: true,
                options: abitazioni.map((fab, index) => ({
                    value: String(extractedData.fabbricati.indexOf(fab)),
                    label: `${fab.categoria} - ${fab.ubicazione || 'Ubicazione non specificata'} - ${fab.comune} (Rendita: €${fab.rendita})`
                }))
            };
        }
        // 2. SECONDA DOMANDA: Pertinenze (solo se c'è un'abitazione principale valida)
        if (userAnswers.abitazione_principale && userAnswers.abitazione_principale !== 'null' && !userAnswers.pertinenze) {
            const abitazionePrincipaleIndex = parseInt(userAnswers.abitazione_principale);
            const abitazionePrincipale = extractedData.fabbricati[abitazionePrincipaleIndex];
            if (!abitazionePrincipale) {
                // Indice non valido, termina
                return null;
            }
            // Trova possibili pertinenze nello stesso comune
            const possibiliPertinenze = extractedData.fabbricati.filter((fab, index) => {
                var _a;
                return index !== abitazionePrincipaleIndex &&
                    fab.comune === abitazionePrincipale.comune &&
                    (((_a = fab.categoria) === null || _a === void 0 ? void 0 : _a.startsWith('C/')) || fab.categoria === 'A/10');
            });
            if (possibiliPertinenze.length === 0) {
                // Nessuna pertinenza, termina
                return null;
            }
            return {
                id: 'pertinenze',
                title: '🚪 Pertinenze dell\'abitazione principale',
                description: `Seleziona eventuali pertinenze della tua abitazione principale in ${abitazionePrincipale.comune}`,
                type: 'multiselect',
                required: false,
                options: possibiliPertinenze.map((fab) => ({
                    value: String(extractedData.fabbricati.indexOf(fab)),
                    label: `${fab.categoria} - ${fab.ubicazione || 'Ubicazione non specificata'} (Rendita: €${fab.rendita})`
                }))
            };
        }
        // 3. DOMANDE FINITE
        return null;
    }
    calculateSimpleIMU(session) {
        const { extractedData, userAnswers } = session;
        console.log('💰 === CALCOLO IMU SEMPLIFICATO ===');
        // CONTROLLO DI SICUREZZA: Se non ci sono fabbricati
        if (!extractedData.fabbricati || extractedData.fabbricati.length === 0) {
            console.log('⚠️ Nessun fabbricato per calcolo IMU');
            return {
                totalIMU: 0,
                acconto: 0,
                saldo: 0,
                details: [],
                normativa: ['Nessun immobile da valutare']
            };
        }
        const abitazionePrincipaleIndex = userAnswers.abitazione_principale ? parseInt(userAnswers.abitazione_principale) : null;
        const pertinenze = userAnswers.pertinenze || [];
        console.log('🏠 Abitazione principale:', abitazionePrincipaleIndex);
        console.log('🚪 Pertinenze:', pertinenze);
        const details = [];
        let totalIMU = 0;
        extractedData.fabbricati.forEach((fab, index) => {
            const isAbitazionePrincipale = index === abitazionePrincipaleIndex;
            const isPertinenza = pertinenze.includes(String(index));
            let aliquota = 0.86; // Aliquota standard
            let detrazione = 0;
            if (isAbitazionePrincipale) {
                aliquota = 0; // Abitazione principale esente
                detrazione = 0;
            }
            else if (isPertinenza) {
                aliquota = 0; // Pertinenze esenti
                detrazione = 0;
            }
            else {
                // Altri immobili
                aliquota = 0.86;
                detrazione = 0;
            }
            const rendita = fab.rendita || 0;
            const moltiplicatore = this.getMoltiplicatore(fab.categoria);
            const baseImponibile = rendita * moltiplicatore;
            const imposte = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
            totalIMU += imposte;
            let tipo = 'Altro immobile';
            if (isAbitazionePrincipale)
                tipo = 'Abitazione principale (ESENTE)';
            else if (isPertinenza)
                tipo = 'Pertinenza (ESENTE)';
            details.push({
                immobile: `${fab.categoria} - ${fab.ubicazione || fab.comune}`,
                tipo,
                baseImponibile,
                aliquota,
                detrazione,
                importo: imposte
            });
            console.log(`💰 Immobile ${index}: ${fab.categoria} - ${tipo} - IMU: €${imposte.toFixed(2)}`);
        });
        const acconto = totalIMU / 2;
        const saldo = totalIMU - acconto;
        console.log(`💰 TOTALE IMU: €${totalIMU.toFixed(2)}`);
        return {
            totalIMU,
            acconto,
            saldo,
            details,
            normativa: [
                'Abitazione principale: esente da IMU (art. 13 D.L. 201/2011)',
                'Pertinenze abitazione principale: esenti da IMU (max 1 per categoria C/2, C/6, C/7)',
                'Altri immobili: aliquota standard 0,86%',
                'Moltiplicatori catastali: A/ = 126, B/ = 176, C/ = 126, D/ = 63'
            ]
        };
    }
    getMoltiplicatore(categoria) {
        if (!categoria)
            return 126;
        if (categoria.startsWith('A/'))
            return 126;
        if (categoria.startsWith('B/'))
            return 176;
        if (categoria.startsWith('C/'))
            return 126;
        if (categoria.startsWith('D/'))
            return 63;
        return 126;
    }
    generateSessionId() {
        return Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
    }
    start(port = 3000) {
        this.app.listen(port, () => {
            console.log('🚀 SERVER IMU SEMPLIFICATO avviato su http://localhost:' + port);
            console.log('💻 Interfaccia web: http://localhost:' + port);
        });
    }
}
// Avvia server
const server = new SimpleIMUServer();
server.start(3000);
//# sourceMappingURL=server-api-simple.js.map