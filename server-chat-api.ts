import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { ChatIMUService } from './services/chat-imu-service';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web')));

// Setup multer per upload file
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Inizializza servizio chat
const chatService = new ChatIMUService();

// API Routes

/**
 * Inizia nuova sessione chat
 */
app.post('/api/session/new', (req, res) => {
  try {
    const sessionId = chatService.startNewSession();
    const sessionState = chatService.getSessionState(sessionId);
    
    res.json({
      success: true,
      sessionId,
      state: sessionState
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Ottieni stato sessione
 */
app.get('/api/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionState = chatService.getSessionState(sessionId);
    
    if (!sessionState) {
      return res.status(404).json({
        success: false,
        error: 'Sessione non trovata o scaduta'
      });
    }
    
    res.json({
      success: true,
      state: sessionState
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Upload file
 */
app.post('/api/session/:sessionId/upload', upload.array('files'), async (req, res) => {
  try {
    const { sessionId } = req.params;
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nessun file caricato'
      });
    }

    const fileData = files.map(file => ({
      buffer: file.buffer,
      name: file.originalname,
      mimeType: file.mimetype
    }));

    const messages = await chatService.handleFileUpload(sessionId, fileData);
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Invia messaggio utente
 */
app.post('/api/session/:sessionId/message', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Messaggio mancante'
      });
    }

    const messages = await chatService.handleUserMessage(sessionId, message);
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Esegui azione utente
 */
app.post('/api/session/:sessionId/action', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { action, data } = req.body;
    
    if (!action) {
      return res.status(400).json({
        success: false,
        error: 'Azione mancante'
      });
    }

    const messages = await chatService.handleUserAction(sessionId, action, data);
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Download template CSV
 */
app.get('/api/template/csv', (req, res) => {
  try {
    const template = chatService.getCSVTemplate();
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${template.fileName}"`);
    res.send(template.content);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Download report
 */
app.get('/api/session/:sessionId/report', (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionState = chatService.getSessionState(sessionId);
    
    if (!sessionState) {
      return res.status(404).json({
        success: false,
        error: 'Sessione non trovata'
      });
    }

    // Cerca il messaggio di report
    const reportMessage = sessionState.conversationHistory?.find(msg => 
      msg.metadata?.reportContent
    );
    
    if (!reportMessage?.metadata?.reportContent) {
      return res.status(404).json({
        success: false,
        error: 'Report non disponibile'
      });
    }

    const fileName = reportMessage.metadata.fileName || 'IMU_2025_Report.txt';
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(reportMessage.metadata.reportContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

/**
 * Route principale - serve l'interfaccia chat
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'chat-imu.html'));
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'Chat IMU API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Errore interno del server'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trovato'
  });
});

// Avvia server
app.listen(port, () => {
  console.log(`🚀 Server Chat IMU avviato su http://localhost:${port}`);
  console.log(`💬 Interfaccia web: http://localhost:${port}`);
  console.log(`🔍 Health check: http://localhost:${port}/api/health`);
  console.log(`📄 Template CSV: http://localhost:${port}/api/template/csv`);
});

export default app; 