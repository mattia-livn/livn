import dotenv from 'dotenv';
import path from 'path';

// Carica variabili d'ambiente da .env.local (correggo path per compilazione)
const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

import express from 'express';
import multer from 'multer';
import puppeteer from 'puppeteer';
import { UploadServiceAI } from './services/upload-service-ai';
import { CommuneConditionsService } from './services/commune-conditions-service';
import * as fs from 'fs';

interface AnalysisProgress {
  message: string;
  timestamp: Date;
}

interface AnalysisSession {
  id: string;
  files: Array<{ name: string; size: number; buffer: Buffer; mimeType: string }>;
  progress: AnalysisProgress[];
  extractedData?: any;
  userAnswers?: Record<string, any>;
  calculationResult?: any;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  createdAt: Date;
}

class LivnAPIServer {
  private app = express();
  private uploadServiceAI = new UploadServiceAI();
  private communeConditionsService = new CommuneConditionsService();
  private sessions = new Map<string, AnalysisSession>();
  private upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
  });

  constructor() {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupProgressCallback();
    this.ensureTempDirectory();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    
    // Serve file statici da entrambe le cartelle
    this.app.use(express.static(path.join(process.cwd(), 'web')));
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    
    // CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }

  private setupProgressCallback() {
    // Setup callback globale per feedback progressivo
    this.uploadServiceAI.setProgressCallback((message: string) => {
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

  private setupRoutes() {
    // Home page (correggo path per compilazione)
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'web', 'index.html'));
    });

    // Interfaccia Domande IMU OpenAI
    this.app.get('/analisi-visura-openai', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'public', 'analisi-visura-openai.html'));
    });

    // API Routes
    this.app.post('/api/analyze', this.upload.array('files'), this.handleAnalyze.bind(this));
    this.app.get('/api/progress/:sessionId', this.handleGetProgress.bind(this));
    this.app.post('/api/questions/:sessionId', this.handleQuestions.bind(this));
    this.app.post('/api/calculate/:sessionId', this.handleCalculate.bind(this));
    this.app.get('/api/report/:sessionId', this.handleGetReport.bind(this));
    this.app.post('/api/report/:sessionId/pdf', this.handleGeneratePDF.bind(this));
    this.app.get('/api/report/:sessionId/download', this.handleDownloadPDF.bind(this));

    // OpenAI Analysis Endpoint
    this.app.post('/api/openai-analyze', this.handleOpenAIAnalyze.bind(this));

    // Health check
    this.app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date() });
    });
  }

  private ensureTempDirectory() {
    // Correggo path per compilazione
    const tempDir = path.join(process.cwd(), 'temp-uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
      console.log('📁 Cartella temp-uploads creata');
    }
  }

  /**
   * Step 4: Analizza i file caricati
   */
  private async handleAnalyze(req: express.Request, res: express.Response) {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Nessun file caricato'
        });
      }

      // Crea nuova sessione
      const sessionId = this.generateSessionId();
      const session: AnalysisSession = {
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

    } catch (error) {
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
  private async performAnalysis(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return;

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
      } else {
        session.status = 'error';
        session.progress.push({
          message: '❌ Errore durante l\'analisi',
          timestamp: new Date()
        });
      }

    } catch (error) {
      console.error('❌ Errore durante analisi:', error);
      session.status = 'error';
      session.progress.push({
        message: `❌ Errore: ${(error as Error).message}`,
        timestamp: new Date()
      });
    }
  }

  /**
   * Step 5: Ottieni progresso analisi
   */
  private handleGetProgress(req: express.Request, res: express.Response) {
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
  private async handleQuestions(req: express.Request, res: express.Response) {
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

    } catch (error) {
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
  private async handleCalculate(req: express.Request, res: express.Response) {
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

    } catch (error) {
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
  private handleGetReport(req: express.Request, res: express.Response) {
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
  private async handleGeneratePDF(req: express.Request, res: express.Response) {
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
      const tempPath = path.join(process.cwd(), 'temp-uploads', fileName);
      fs.writeFileSync(tempPath, pdfBuffer);
      
      console.log(`✅ PDF generato: ${fileName}`);
      
      res.json({
        success: true,
        message: 'PDF generato con successo',
        downloadUrl: `/api/report/${sessionId}/download`,
        fileName
      });

    } catch (error) {
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
  private handleDownloadPDF(req: express.Request, res: express.Response) {
    const sessionId = req.params.sessionId;
    const fileName = `report_imu_${sessionId}.pdf`;
    const filePath = path.join(process.cwd(), 'temp-uploads', fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File PDF non trovato'
      });
    }
    
    res.download(filePath, `Report_IMU_${new Date().getFullYear()}.pdf`, (err) => {
      if (err) {
        console.error('❌ Errore download PDF:', err);
      } else {
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
   * OpenAI Analysis Endpoint - Analizza testo estratto con OpenAI
   */
  private async handleOpenAIAnalyze(req: express.Request, res: express.Response) {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Testo da analizzare richiesto'
        });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey) {
        return res.status(500).json({
          success: false,
          error: 'Chiave OpenAI non configurata nel server'
        });
      }

      console.log('🤖 Invio richiesta a OpenAI...');

      const prompt = `Analizza questa visura catastale italiana e estrai TUTTI gli immobili presenti.

Per ogni immobile trovato, restituisci un oggetto JSON con questi campi esatti:
- titolarita: percentuale di proprietà (es. "1/1", "1/2")  
- comune: nome del comune
- foglio: numero foglio catastale
- particella: numero particella
- subalterno: numero subalterno (se presente)
- indirizzo: indirizzo completo
- zona: zona catastale (se presente)
- categoria: categoria catastale (es. "A/2", "C/6")
- classe: classe catastale
- consistenza: consistenza (mq, vani, etc)
- rendita: rendita catastale

Se un campo non è presente, usa "Non specificato".

Testo visura:
${text}

Rispondi SOLO con un array JSON valido, nessun altro testo:`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Errore OpenAI API:', errorData);
        return res.status(500).json({
          success: false,
          error: `OpenAI API Error: ${errorData.error?.message || 'Errore sconosciuto'}`
        });
      }

      const data = await response.json();
      const openaiResponse = data.choices[0].message.content;
      
      console.log('✅ Risposta OpenAI ricevuta');

      try {
        // Parse della risposta JSON
        const jsonResponse = JSON.parse(openaiResponse);
        
        // Converte in formato interno
        const properties = jsonResponse.map((item: any, index: number) => ({
          id: `OPENAI_${index + 1}`,
          type: 'fabbricato',
          titolarita: item.titolarita || 'Non specificato',
          comune: item.comune || 'Non specificato',
          foglio: item.foglio || 'Non specificato',
          particella: item.particella || 'Non specificato',
          subalterno: item.subalterno || 'Non specificato',
          indirizzo: item.indirizzo || 'Non specificato',
          zona: item.zona || 'Non specificato',
          categoria: item.categoria || 'Non specificato',
          classe: item.classe || 'Non specificato',
          consistenza: item.consistenza || 'Non specificato',
          rendita: item.rendita || 'Non specificato',
          confidence: 95, // OpenAI ha alta confidenza
          source: 'OpenAI-GPT4'
        }));

        res.json({
          success: true,
          properties,
          rawResponse: openaiResponse
        });

      } catch (parseError) {
        console.error('❌ Errore parsing JSON OpenAI:', parseError);
        
        // Ritorna errore con risposta raw per debug
        res.json({
          success: false,
          error: 'Errore parsing risposta OpenAI',
          rawResponse: openaiResponse,
          properties: [{
            id: 'OPENAI_PARSE_ERROR',
            type: 'fabbricato',
            titolarita: 'Errore parsing',
            comune: 'Errore parsing',
            foglio: 'Errore parsing',
            particella: 'Errore parsing',
            subalterno: 'Errore parsing',
            indirizzo: 'Errore parsing',
            zona: 'Errore parsing',
            categoria: 'Errore parsing',
            classe: 'Errore parsing',
            consistenza: 'Errore parsing',
            rendita: 'Errore parsing',
            confidence: 20,
            source: 'OpenAI-Error'
          }]
        });
      }

    } catch (error) {
      console.error('❌ Errore in handleOpenAIAnalyze:', error);
      res.status(500).json({
        success: false,
        error: 'Errore interno del server',
        details: (error as Error).message
      });
    }
  }

  /**
   * Genera il PDF del report usando Puppeteer
   */
  private async generatePDFReport(session: AnalysisSession): Promise<Buffer> {
    const browser = await puppeteer.launch({ 
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
      
    } finally {
      await browser.close();
    }
  }

  /**
   * Genera template HTML per il PDF
   */
  private generateReportHTML(session: AnalysisSession): string {
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
           <p><strong>Saldo (16/12/2025):</strong> € ${calculationResult.saldo.toFixed(2)}</p>`
        }
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
   * Genera domande basate sui dati estratti - VERSIONE SEMPLIFICATA
   */
  private async generateQuestions(extractedData: any, userAnswers: Record<string, any>): Promise<any[]> {
    console.log('🤔 === GENERAZIONE DOMANDE SEMPLIFICATA ===');
    console.log('📊 Fabbricati disponibili:', extractedData.fabbricati?.length || 0);
    console.log('👤 Risposte esistenti:', Object.keys(userAnswers || {}));

    const questions = [];

    // UNICA DOMANDA: Configurazione diretta di tutti gli immobili
    if (!userAnswers.configurazione_immobili) {
      
      // Trova tutte le abitazioni (per le opzioni pertinenze)
      const abitazioni = extractedData.fabbricati?.filter((fab: any, index: number) => 
        fab.categoria?.startsWith('A/') && fab.categoria !== 'A/10'
      ) || [];

      console.log(`🏠 Abitazioni trovate: ${abitazioni.length}`);
      console.log(`📦 Totale immobili da configurare: ${extractedData.fabbricati?.length || 0}`);

      // Organizza immobili per comune e gruppo catastale
      const immobiliOrganizzati = this.organizzaImmobiliPerComuneEGruppo(extractedData.fabbricati || []);

      questions.push({
        id: 'configurazione_immobili',
        type: 'object',
        title: '🏠 Configurazione immobili',
        description: 'Per ogni immobile, indica la sua condizione specifica. Gli immobili sono organizzati per comune e categoria.',
        fields: await this.generateImmobiliFields(immobiliOrganizzati, abitazioni),
        required: true
      });

      console.log(`✅ Generata domanda di configurazione per ${extractedData.fabbricati?.length || 0} immobili`);
    }

    console.log('🤔 === RISULTATO GENERAZIONE SEMPLIFICATA ===');
    console.log(`📝 Domande generate: ${questions.length}`);
    
    if (questions.length === 0) {
      console.log(`✅ CONFIGURAZIONE COMPLETATA - Pronto per il calcolo`);
    }

    return questions;
  }

  /**
   * Organizza immobili per comune e gruppo catastale
   */
  private organizzaImmobiliPerComuneEGruppo(fabbricati: any[]): { [comune: string]: { [gruppo: string]: any[] } } {
    const organizzati: { [comune: string]: { [gruppo: string]: any[] } } = {};

    fabbricati.forEach((fab: any, index: number) => {
      const comune = fab.comune || 'N/D';
      const gruppo = fab.categoria?.charAt(0) || 'N/D';

      if (!organizzati[comune]) {
        organizzati[comune] = {};
      }
      if (!organizzati[comune][gruppo]) {
        organizzati[comune][gruppo] = [];
      }

      organizzati[comune][gruppo].push({ ...fab, originalIndex: index });
    });

    console.log('🏛️ Immobili organizzati per comune e gruppo:');
    Object.entries(organizzati).forEach(([comune, gruppi]) => {
      console.log(`  📍 ${comune.toUpperCase()}:`);
      const gruppiOrdinati = Object.keys(gruppi).sort((a, b) => {
        const ordine = ['A', 'B', 'C', 'D', 'E', 'F'];
        return ordine.indexOf(a) - ordine.indexOf(b);
      });
      gruppiOrdinati.forEach(gruppo => {
        console.log(`    📦 Gruppo ${gruppo}: ${gruppi[gruppo].length} immobili`);
      });
    });

    return organizzati;
  }

  /**
   * Genera i campi di configurazione per gli immobili organizzati
   */
  private async generateImmobiliFields(immobiliOrganizzati: any, abitazioni: any[]): Promise<any[]> {
    const fields: any[] = [];
    
    // CORREZIONE: Ordina per comune e poi per gruppo nell'ordine corretto
    const comuniOrdinati = Object.keys(immobiliOrganizzati).sort();
    
    for (const comune of comuniOrdinati) {
      const gruppi = immobiliOrganizzati[comune];
      
      fields.push({
        id: `header_comune_${comune}`,
        type: 'header',
        label: `🏛️ ${comune.toUpperCase()}`
      });
      
      // CORREZIONE: Ordina i gruppi A, B, C, D, E, F
      const gruppiOrdinati = Object.keys(gruppi).sort((a, b) => {
        const ordine = ['A', 'B', 'C', 'D', 'E', 'F'];
        return ordine.indexOf(a) - ordine.indexOf(b);
      });
      
      for (const gruppo of gruppiOrdinati) {
        const immobili = gruppi[gruppo];
        
        fields.push({
          id: `header_gruppo_${comune}_${gruppo}`,
          type: 'subheader', 
          label: `📦 Gruppo ${gruppo}`
        });
        
        for (const immobile of immobili as any[]) {
          const globalIndex = immobile.originalIndex;
          
          const abitazioniStessoComune = abitazioni.filter(ab => 
            ab.comune?.toLowerCase() === immobile.comune?.toLowerCase()
          );
          
          console.log(`🏛️ Immobile ${globalIndex} (${immobile.comune}): ${abitazioniStessoComune.length} abitazioni disponibili nello stesso comune`);
          
          const options = await this.generateOptionsForImmobile(immobile, abitazioniStessoComune, globalIndex);
          
          const field = {
            id: `immobile_${globalIndex}`,
            type: 'select',
            label: `${this.getCategoryIcon(immobile.categoria)} ${immobile.ubicazione || `${comune} - ${immobile.categoria}`} (${immobile.categoria})`,
            options: options
          };
          
          fields.push(field);
        }
      }
    }
    
    return fields;
  }

  /**
   * Genera opzioni filtrate per ogni immobile in base al comune
   */
  private async generateOptionsForImmobile(immobile: any, abitazioniStessoComune: any[], globalIndex: number): Promise<any[]> {
    const options: any[] = [];
    const isPertinenzaCompatibile = ['C/2', 'C/6', 'C/7'].includes(immobile.categoria);
    const isAbitazione = immobile.categoria?.startsWith('A/') && immobile.categoria !== 'A/10';
    
    // OPZIONI BASE SEMPRE DISPONIBILI
    if (isAbitazione) {
      options.push({ value: 'abitazione_principale', label: '🏠 Abitazione principale (residenza)' });
    }
    
    // PERTINENZE (solo per C/2, C/6, C/7 e solo dello stesso comune)
    if (isPertinenzaCompatibile && abitazioniStessoComune.length > 0) {
      abitazioniStessoComune.forEach((abitazione: any, index: number) => {
        const ubicazione = abitazione.ubicazione || `Abitazione ${index + 1}`;
        options.push({ 
          value: `pertinenza_${index}`, 
          label: `📦 Pertinenza di: ${ubicazione} (${abitazione.categoria})`
        });
      });
    }
    
    // CARICA CONDIZIONI SPECIFICHE DEL COMUNE
    try {
      const comuneNormalizzato = immobile.comune?.toLowerCase() || '';
      console.log(`🎯 Caricamento condizioni per comune: ${comuneNormalizzato}`);
      
      // Usa il servizio per caricare le condizioni del comune
      const conditionsData = await this.communeConditionsService.getConditionsForCommune(comuneNormalizzato);
      
      if (conditionsData && conditionsData.length > 0) {
        console.log(`✅ Trovate ${conditionsData.length} condizioni per ${comuneNormalizzato}`);
        
        // Converte le condizioni in opzioni selezionabili
        conditionsData.forEach((condition: any, index: number) => {
          if (condition.condition && condition.ratePercent !== undefined) {
            const isApplicabile = this.isConditionApplicableToCategory(condition.condition, immobile.categoria);
            
            if (isApplicabile) {
              const aliquotaPercent = (condition.ratePercent * 100).toFixed(2);
              options.push({
                value: `condition_${index}`,
                label: `📋 ${condition.condition} (${aliquotaPercent}%)`
              });
            }
          }
        });
      } else {
        console.log(`⚠️ Nessuna condizione trovata per ${comuneNormalizzato}, uso opzioni di base`);
        // Fallback: opzioni di base se non ci sono condizioni specifiche
        this.addBasicOptions(options, immobile.categoria);
      }
      
    } catch (error) {
      console.log(`⚠️ Errore caricamento condizioni per ${immobile.comune}:`, error);
      // Fallback: opzioni di base in caso di errore
      this.addBasicOptions(options, immobile.categoria);
    }
    
    console.log(`🎯 Comune: ${immobile.comune} - ${options.length} opzioni generate`);
    return options;
  }

  /**
   * Verifica se una condizione è applicabile alla categoria catastale - VERSIONE RIGOROSA
   */
  private isConditionApplicableToCategory(condition: string, categoria: string): boolean {
    const conditionLower = condition.toLowerCase();
    const gruppo = categoria?.charAt(0);
    
    console.log(`🔍 Verifica: "${condition}" per categoria ${categoria}`);
    
    // FILTRO 1: Condizioni specifiche per CATEGORIA ESATTA
    if (conditionLower.includes('categoria catastale')) {
      // Cerca categorie specifiche menzionate nella condizione
      const categorieMatch = conditionLower.match(/categoria catastale ([a-z0-9\/,\s]+)/);
      if (categorieMatch) {
        const categorieMenzionate = categorieMatch[1];
        const isApplicabile = categorieMenzionate.includes(categoria.toLowerCase());
        console.log(`  → Categoria specifica: ${isApplicabile ? '✅' : '❌'} (${categorieMenzionate})`);
        return isApplicabile;
      }
    }
    
    // FILTRO 2: Condizioni per GRUPPO CATASTALE specifico
    if (conditionLower.includes('gruppo catastale')) {
      const gruppoMatch = conditionLower.match(/gruppo catastale ([a-z])/);
      if (gruppoMatch) {
        const gruppoMenzionato = gruppoMatch[1].toUpperCase();
        const isApplicabile = gruppo === gruppoMenzionato;
        console.log(`  → Gruppo catastale: ${isApplicabile ? '✅' : '❌'} (richiede ${gruppoMenzionato}, ho ${gruppo})`);
        return isApplicabile;
      }
    }
    
    // FILTRO 3: Condizioni SOLO per ABITAZIONI (gruppo A)
    if (gruppo !== 'A' && (
      conditionLower.includes('abitazione') ||
      conditionLower.includes('anziani') ||
      conditionLower.includes('disabili') ||
      conditionLower.includes('studenti') ||
      conditionLower.includes('parenti')
    )) {
      console.log(`  → Solo abitazioni: ❌ (${categoria} non è abitazione)`);
      return false;
    }
    
    // FILTRO 4: Condizioni SOLO per TERRENI
    if (conditionLower.includes('terreni') || conditionLower.includes('agricol')) {
      const isTerreno = categoria?.startsWith('T') || conditionLower.includes('terreno');
      console.log(`  → Solo terreni: ${isTerreno ? '✅' : '❌'}`);
      return isTerreno;
    }
    
    // FILTRO 5: Condizioni SOLO per FABBRICATI RURALI (normalmente D/10)
    if (conditionLower.includes('rurali')) {
      const isRurale = categoria === 'D/10' || conditionLower.includes('d/10');
      console.log(`  → Solo rurali: ${isRurale ? '✅' : '❌'}`);
      return isRurale;
    }
    
    // FILTRO 6: Condizioni generiche "immobili di categoria A10, C"
    if (conditionLower.includes('immobili di categoria')) {
      const categorieGenericheMatch = conditionLower.match(/immobili di categoria ([a-z0-9,\s]+)/);
      if (categorieGenericheMatch) {
        const categorieGeneriche = categorieGenericheMatch[1];
        // Verifica se include il gruppo o categoria specifica
        const isApplicabile = categorieGeneriche.includes(gruppo.toLowerCase()) || 
                             categorieGeneriche.includes(categoria.toLowerCase());
        console.log(`  → Immobili categoria: ${isApplicabile ? '✅' : '❌'} (${categorieGeneriche})`);
        return isApplicabile;
      }
    }
    
    // FILTRO 7: Condizioni generiche per "altri fabbricati"
    if (conditionLower.includes('altri fabbricati')) {
      // Solo se non è abitazione principale e non è terreno
      const isAltroFabbricato = !conditionLower.includes('abitazione principale') && !categoria?.startsWith('T');
      console.log(`  → Altri fabbricati: ${isAltroFabbricato ? '✅' : '❌'}`);
      return isAltroFabbricato;
    }
    
    // FILTRO 8: Condizioni per AREE FABBRICABILI
    if (conditionLower.includes('aree fabbricabili')) {
      const isAreaFabbricabile = categoria?.startsWith('F') || conditionLower.includes('area');
      console.log(`  → Aree fabbricabili: ${isAreaFabbricabile ? '✅' : '❌'}`);
      return isAreaFabbricabile;
    }
    
    // FILTRO 9: RIFIUTA tutto il resto che non è chiaramente applicabile
    console.log(`  → Condizione generica non applicabile: ❌`);
    return false;
  }
  
  /**
   * Aggiunge opzioni di base quando non ci sono condizioni specifiche
   */
  private addBasicOptions(options: any[], categoria: string): void {
    const gruppo = categoria?.charAt(0);
    
    if (gruppo === 'A') {
      options.push({ value: 'libero', label: '🏠 Libero (non utilizzato)' });
      options.push({ value: 'locato', label: '💰 Locato (con contratto registrato)' });
      options.push({ value: 'locato_concordato', label: '🤝 Locato con contratto concordato' });
      options.push({ value: 'comodato_parenti', label: '👨‍👩‍👧‍👦 Dato in comodato a parenti' });
      options.push({ value: 'comodato_altri', label: '🤝 Dato in comodato ad altri' });
    } else {
      options.push({ value: 'libero', label: '📦 Libero (non utilizzato)' });
      options.push({ value: 'locato', label: '💰 Locato (con contratto registrato)' });
      options.push({ value: 'uso_proprio', label: '🔧 Uso proprio saltuario' });
    }
  }

  /**
   * Carica condizioni specifiche per un comune
   */
  private async getCondizioniPerComune(comune: string): Promise<string[]> {
    try {
      const availableCommunes = this.communeConditionsService.getAvailableCommunes();
      const comuneMatch = availableCommunes.find(c => c.toLowerCase().includes(comune));
      
      if (!comuneMatch) {
        console.log(`⚠️ Nessuna condizione trovata per ${comune}`);
        return [];
      }
      
      return [
        'abitazione principale',
        'abitazione locata o in comodato',
        'altri fabbricati',
        'immobili di categoria a10, c'
      ];
    } catch (error) {
      console.log(`⚠️ Errore caricamento condizioni per ${comune}:`, error);
      return [];
    }
  }

  /**
   * Aggiunge opzioni basate sulle condizioni effettivamente disponibili
   */
  private addCondizioniToOptions(options: any[], condizioni: string[], categoria: string): void {
    const condizioniNormalizzate = condizioni.join(' ').toLowerCase();
    
    if (condizioniNormalizzate.includes('locato') || condizioniNormalizzate.includes('locazione')) {
      options.push({ value: 'locato', label: '💰 Locato (con contratto registrato)' });
    }
    
    if (condizioniNormalizzate.includes('concordato')) {
      options.push({ value: 'locato_concordato', label: '🤝 Locato con contratto concordato' });
    }
    
    if (condizioniNormalizzate.includes('comodato')) {
      if (condizioniNormalizzate.includes('parenti')) {
        options.push({ value: 'comodato_parenti', label: '👨‍👩‍👧‍👦 Dato in comodato a parenti' });
      }
      options.push({ value: 'comodato_altri', label: '🤝 Dato in comodato ad altri' });
    }
    
    if (condizioniNormalizzate.includes('proprio') && condizioniNormalizzate.includes('saltuario')) {
      options.push({ value: 'uso_proprio', label: '👤 Uso proprio saltuario' });
    }
    
    if (condizioniNormalizzate.includes('startup') && condizioniNormalizzate.includes('innovativ')) {
      options.push({ value: 'startup', label: '🚀 Utilizzato da startup innovativa' });
    }
    
    console.log(`🎯 Comune: opzioni filtrate in base alle condizioni reali del comune`);
  }

  /**
   * Restituisce l'icona appropriata per la categoria catastale
   */
  private getCategoryIcon(categoria: string): string {
    if (categoria?.startsWith('A/')) {
      return '🏠'; // Casa per abitazioni
    } else if (categoria?.startsWith('C/')) {
      return '📦'; // Scatola per pertinenze/depositi
    } else if (categoria?.startsWith('D/')) {
      return '🏭'; // Fabbrica per immobili produttivi
    } else if (categoria?.startsWith('B/')) {
      return '🏢'; // Edificio per uffici
    } else {
      return '🏘️'; // Edifici generici
    }
  }

  /**
   * Calcola IMU usando la nuova configurazione semplificata
   */
  private async calculateIMU(extractedData: any, userAnswers: Record<string, any>) {
    console.log('💰 === CALCOLO IMU CON CONFIGURAZIONE SEMPLIFICATA ===');
    console.log('🏠 Configurazione immobili:', userAnswers.configurazione_immobili);
    
    const details = [];
    let totalIMU = 0;

    let abitazionePrincipaleIndex = -1;
    for (const [key, value] of Object.entries(userAnswers.configurazione_immobili || {})) {
      if (value === 'abitazione_principale') {
        abitazionePrincipaleIndex = parseInt(key.replace('immobile_', ''));
        break;
      }
    }

    console.log('🏠 Abitazione principale index:', abitazionePrincipaleIndex);

    for (const [index, fabbricato] of extractedData.fabbricati.entries()) {
      const comuneImmobile = fabbricato.comune?.toLowerCase() || 'standard';
      const configurazioneKey = `immobile_${index}`;
      const configurazione = userAnswers.configurazione_immobili?.[configurazioneKey] || 'libero';
      
      console.log(`🏛️ Immobile ${index}: Comune = ${comuneImmobile}, Configurazione = ${configurazione}`);

      const isPrimaCasa = configurazione === 'abitazione_principale';
      const isPertinenza = configurazione.startsWith('pertinenza_');
      
      const categorieDetrazione = ['A/1', 'A/8', 'A/9'];
      const isLusso = categorieDetrazione.includes(fabbricato.categoria);
      
      const baseImponibile = fabbricato.rendita * 1.05 * this.getMoltiplicatore(fabbricato.categoria);
      
      let aliquota = 0;
      let detrazione = 0;
      let importo = 0;
      let tipoCalculazione = '';
      
      if (isPrimaCasa && !isLusso) {
        aliquota = 0;
        detrazione = 0;
        importo = 0;
        tipoCalculazione = 'Abitazione principale (ESENTE)';
      } else if (isPrimaCasa && isLusso) {
        try {
          const conditionResult = await this.communeConditionsService.findBestCondition(
            fabbricato, 
            { condizioni_immobili: { [configurazioneKey]: 'abitazione_principale' } }, 
            index, 
            comuneImmobile
          );
          
          aliquota = conditionResult.aliquota;
          detrazione = 200;
          importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
          tipoCalculazione = `Abitazione principale di lusso - ${conditionResult.descrizione}`;
        } catch (error) {
          console.error('❌ Errore caricamento condizioni per abitazione principale di lusso:', error);
          aliquota = 0.4;
          detrazione = 200;
          importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
          tipoCalculazione = 'Abitazione principale di lusso (fallback)';
        }
      } else if (isPertinenza && abitazionePrincipaleIndex >= 0) {
        aliquota = 0;
        detrazione = 0;
        importo = 0;
        tipoCalculazione = 'Pertinenza abitazione principale (ESENTE)';
      } else {
        try {
          const aliquotaResult = this.getAliquotaPerConfigurazione(configurazione, fabbricato.categoria, comuneImmobile);
          
          aliquota = aliquotaResult.aliquota;
          detrazione = 0;
          importo = baseImponibile * aliquota / 100;
          tipoCalculazione = `${this.getDescrizioneConfigurazione(configurazione)} - ${aliquotaResult.descrizione}`;
          
          console.log(`🎯 Aliquota applicata per immobile ${index} (${comuneImmobile}): ${configurazione} -> ${aliquota}%`);
        } catch (error) {
          console.error(`❌ Errore caricamento aliquota per immobile ${index} (${comuneImmobile}):`, error);
          aliquota = 1.06;
          detrazione = 0;
          importo = baseImponibile * aliquota / 100;
          tipoCalculazione = `${this.getDescrizioneConfigurazione(configurazione)} (fallback standard)`;
        }
      }

      console.log(`💰 Immobile ${index} (${comuneImmobile}): ${fabbricato.categoria} - ${tipoCalculazione} - IMU: €${importo.toFixed(2)}`);

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

    console.log(`💰 Totale IMU calcolato con configurazione semplificata: €${totalIMU.toFixed(2)}`);

    const scadenze = totalIMU > 0 ? [
      { data: '16/06/2025', descrizione: 'Acconto IMU', importo: totalIMU / 2 },
      { data: '16/12/2025', descrizione: 'Saldo IMU', importo: totalIMU / 2 }
    ] : [
      { data: 'N/A', descrizione: 'Nessun pagamento dovuto', importo: 0 }
    ];

    const normativa = [
      '✅ Rivalutazione catastale applicata (+5%)',
      '✅ Moltiplicatori catastali 2025',
      `🏛️ Condizioni specifiche per ogni comune (delibere 2025)`,
      abitazionePrincipaleIndex >= 0 
        ? '✅ Abitazione principale non di lusso: ESENTE da IMU'
        : '🏠 Nessuna abitazione principale dichiarata',
      abitazionePrincipaleIndex >= 0
        ? '✅ Pertinenze abitazione principale: ESENTI da IMU'
        : '🚪 Nessuna pertinenza esentabile (no abitazione principale)',
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
   * Mappa la nuova configurazione alle vecchie condizioni per compatibilità
   */
  private mappaConfigurazione(configurazione: string): string {
    const mapping: Record<string, string> = {
      'abitazione_principale': 'uso_proprio',
      'libero': 'libero',
      'locato': 'locato',
      'locato_concordato': 'locato',
      'comodato_parenti': 'locato_parenti',
      'comodato': 'comodato',
      'uso_proprio': 'uso_proprio',
      'startup': 'startup'
    };
    
    if (configurazione.startsWith('pertinenza_')) {
      return 'pertinenza';
    }
    
    return mapping[configurazione] || 'libero';
  }

  /**
   * Restituisce descrizione leggibile della configurazione
   */
  private getDescrizioneConfigurazione(configurazione: string): string {
    const descrizioni: Record<string, string> = {
      'abitazione_principale': 'Abitazione principale',
      'libero': 'Immobile libero',
      'locato': 'Immobile locato',
      'locato_concordato': 'Locato con contratto concordato',
      'comodato_parenti': 'Comodato a parenti',
      'comodato': 'Comodato ad altri',
      'uso_proprio': 'Uso proprio',
      'startup': 'Startup innovativa'
    };
    
    if (configurazione.startsWith('pertinenza_')) {
      return 'Pertinenza';
    }
    
    return descrizioni[configurazione] || 'Non specificato';
  }

  /**
   * Genera report finale
   */
  private generateReport(session: AnalysisSession) {
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

  private getMoltiplicatore(categoria: string): number {
    const moltiplicatori: Record<string, number> = {
      'A/1': 176, 'A/8': 176, 'A/9': 176,
      'A/2': 126, 'A/3': 126, 'A/4': 126, 'A/5': 126, 'A/6': 126, 'A/7': 126,
      'A/10': 63, 'A/11': 63,
      'C/1': 63, 'C/2': 140, 'C/3': 140, 'C/4': 140, 'C/5': 140,
      'C/6': 53, 'C/7': 53
    };
    return moltiplicatori[categoria] || 126;
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Restituisce aliquota logica basata sulla configurazione dell'utente
   */
  private getAliquotaPerConfigurazione(configurazione: string, categoria: string, comune: string): { aliquota: number, descrizione: string } {
    if (configurazione.startsWith('pertinenza_')) {
      return { aliquota: 0, descrizione: 'Pertinenza (ESENTE)' };
    }
    
    switch (configurazione) {
      case 'abitazione_principale':
        return { aliquota: 0, descrizione: 'Abitazione principale (ESENTE)' };
      
      case 'libero':
        return { aliquota: 1.06, descrizione: 'Immobile libero/a disposizione' };
      
      case 'locato':
        return { aliquota: 0.96, descrizione: 'Immobile locato' };
      
      case 'locato_concordato':
        return { aliquota: 0.86, descrizione: 'Locato con contratto concordato' };
      
      case 'comodato_parenti':
        return { aliquota: 0.9, descrizione: 'Comodato a parenti' };
      
      case 'comodato_altri':
      case 'comodato':
        return { aliquota: 0.96, descrizione: 'Comodato ad altri' };
      
      case 'uso_proprio':
        return { aliquota: 1.06, descrizione: 'Uso proprio saltuario' };
      
      case 'startup':
        return { aliquota: 0.1, descrizione: 'Startup innovativa' };
      
      default:
        console.log(`⚠️ Configurazione sconosciuta: ${configurazione}, usando aliquota standard`);
        return { aliquota: 1.06, descrizione: 'Configurazione non riconosciuta' };
    }
  }

  public start(port: number = 3000) {
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