import express from 'express';
import multer from 'multer';
import path from 'path';
import { UploadServiceAI } from './services/upload-service-ai';

interface SimpleSession {
  id: string;
  extractedData: any;
  userAnswers: Record<string, any>;
  calculationResult?: any;
  status: 'uploaded' | 'questions' | 'calculated';
}

interface CalculationDetail {
  immobile: string;
  tipo: string;
  baseImponibile: number;
  aliquota: number;
  detrazione: number;
  importo: number;
}

class SimpleIMUServer {
  private app = express();
  private uploadServiceAI = new UploadServiceAI();
  private sessions = new Map<string, SimpleSession>();
  private upload = multer({ dest: 'temp-uploads/' });

  constructor() {
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('web'));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      next();
    });
  }

  private setupRoutes() {
    // 1. Upload files e estrai dati
    this.app.post('/api/analyze', this.upload.array('files'), async (req, res) => {
      try {
        console.log('🚀 UPLOAD SEMPLIFICATO - File ricevuti:', req.files?.length);
        
        if (!req.files || req.files.length === 0) {
          return res.json({ success: false, error: 'Nessun file caricato' });
        }

        const multerFiles = req.files as Express.Multer.File[];
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

      } catch (error) {
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
      
      console.log('❓ PROSSIMA DOMANDA:', nextQuestion?.id || 'NESSUNA');

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

      } catch (error) {
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

  private getNextQuestion(session: SimpleSession): any | null {
    const { extractedData, userAnswers } = session;
    
    // CONTROLLO DI SICUREZZA: Se non ci sono fabbricati, non fare domande
    if (!extractedData.fabbricati || extractedData.fabbricati.length === 0) {
      console.log('⚠️ Nessun fabbricato trovato - skip domande');
      return null;
    }
    
    // 1. PRIMA DOMANDA: Abitazione principale
    if (!userAnswers.abitazione_principale) {
      const abitazioni = extractedData.fabbricati.filter((fab: any) => 
        fab.categoria && fab.categoria.startsWith('A/') && fab.categoria !== 'A/10'
      );

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
        options: abitazioni.map((fab: any, index: number) => ({
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
      const possibiliPertinenze = extractedData.fabbricati.filter((fab: any, index: number) => 
        index !== abitazionePrincipaleIndex &&
        fab.comune === abitazionePrincipale.comune &&
        (fab.categoria?.startsWith('C/') || fab.categoria === 'A/10')
      );

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
        options: possibiliPertinenze.map((fab: any) => ({
          value: String(extractedData.fabbricati.indexOf(fab)),
          label: `${fab.categoria} - ${fab.ubicazione || 'Ubicazione non specificata'} (Rendita: €${fab.rendita})`
        }))
      };
    }

    // 3. DOMANDE FINITE
    return null;
  }

  private calculateSimpleIMU(session: SimpleSession) {
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

    const details: CalculationDetail[] = [];
    let totalIMU = 0;

    extractedData.fabbricati.forEach((fab: any, index: number) => {
      const isAbitazionePrincipale = index === abitazionePrincipaleIndex;
      const isPertinenza = pertinenze.includes(String(index));
      
      let aliquota = 0.86; // Aliquota standard
      let detrazione = 0;
      
      if (isAbitazionePrincipale) {
        aliquota = 0; // Abitazione principale esente
        detrazione = 0;
      } else if (isPertinenza) {
        aliquota = 0; // Pertinenze esenti
        detrazione = 0;
      } else {
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
      if (isAbitazionePrincipale) tipo = 'Abitazione principale (ESENTE)';
      else if (isPertinenza) tipo = 'Pertinenza (ESENTE)';

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

  private getMoltiplicatore(categoria: string): number {
    if (!categoria) return 126;
    
    if (categoria.startsWith('A/')) return 126;
    if (categoria.startsWith('B/')) return 176;
    if (categoria.startsWith('C/')) return 126;
    if (categoria.startsWith('D/')) return 63;
    
    return 126;
  }

  private generateSessionId(): string {
    return Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
  }

  public start(port: number = 3000) {
    this.app.listen(port, () => {
      console.log('🚀 SERVER IMU SEMPLIFICATO avviato su http://localhost:' + port);
      console.log('💻 Interfaccia web: http://localhost:' + port);
    });
  }
}

// Avvia server
const server = new SimpleIMUServer();
server.start(3000); 