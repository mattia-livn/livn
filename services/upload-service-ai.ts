import { AIExtractionService } from './ai-extraction-service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface FileData {
  buffer: Buffer;
  name: string;
  mimeType: string;
}

interface UploadResult {
  success: boolean;
  message: string;
  fabbricati: any[];
  terreni: any[];
  errors: string[];
  warnings: string[];
  confidence?: number;
}

// Nuovo tipo per feedback progressivo
export type ProgressCallback = (message: string) => void;

/**
 * Servizio di upload semplificato che usa solo AI extraction
 */
export class UploadServiceAI {
  private aiExtractor: AIExtractionService;
  private tempDir: string;
  private progressCallback?: ProgressCallback;

  constructor() {
    this.aiExtractor = new AIExtractionService();
    this.tempDir = path.join(__dirname, '..', 'temp-uploads');
    
    // Crea directory temporanea se non esiste
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Imposta callback per feedback progressivo
   */
  setProgressCallback(callback: ProgressCallback): void {
    this.progressCallback = callback;
  }

  /**
   * Invia messaggio di progresso
   */
  private sendProgress(message: string): void {
    if (this.progressCallback) {
      this.progressCallback(message);
    }
    console.log(`📢 ${message}`);
  }

  /**
   * Processa file multipli usando AI extraction con feedback progressivo
   */
  async processFiles(files: FileData[]): Promise<UploadResult> {
    this.sendProgress('🚀 Analisi iniziata...');
    console.log('🚀 === INIZIO PROCESSO UPLOAD AI ===');
    console.log(`📁 File ricevuti: ${files.length}`);

    try {
      // Salva file temporaneamente per debug
      this.sendProgress(`📁 Preparazione di ${files.length} file...`);
      await this.saveTemporaryFiles(files);
      
      // Processa file uno per uno con feedback
      let allFabbricati: any[] = [];
      let allTerreni: any[] = [];
      let allErrors: string[] = [];
      let allWarnings: string[] = [];
      let totalConfidence = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.sendProgress(`🔍 Analisi file ${i + 1}/${files.length}: ${file.name}...`);
        
        // Usa AI extraction per processare il singolo file
        const aiResult = await this.aiExtractor.extractFromMultipleFiles([file]);
        
        allFabbricati.push(...aiResult.fabbricati);
        allTerreni.push(...aiResult.terreni);
        allErrors.push(...aiResult.errors);
        allWarnings.push(...aiResult.warnings);
        totalConfidence += aiResult.confidence;

        if (aiResult.fabbricati.length + aiResult.terreni.length > 0) {
          this.sendProgress(`✅ Trovati ${aiResult.fabbricati.length + aiResult.terreni.length} immobili in ${file.name}`);
        } else {
          this.sendProgress(`⚠️ Nessun immobile trovato in ${file.name}`);
        }
      }

      const avgConfidence = files.length > 0 ? totalConfidence / files.length : 0;
      const totalImmobili = allFabbricati.length + allTerreni.length;
      
      this.sendProgress(`🎯 Analisi completata: ${totalImmobili} immobili trovati (confidenza: ${avgConfidence.toFixed(1)}%)`);
      
      console.log('🤖 === RISULTATO ESTRAZIONE AI ===');
      console.log(`✅ Successo: ${totalImmobili > 0}`);
      console.log(`🎯 Confidenza: ${avgConfidence.toFixed(1)}%`);
      console.log(`🏠 Fabbricati: ${allFabbricati.length}`);
      console.log(`🌱 Terreni: ${allTerreni.length}`);
      console.log(`⚠️ Errori: ${allErrors.length}`);
      console.log(`🟡 Warning: ${allWarnings.length}`);

      if (allFabbricati.length > 0) {
        console.log('🏠 === DETTAGLI FABBRICATI TROVATI ===');
        allFabbricati.forEach((fab, index) => {
          console.log(`  Fabbricato ${index + 1}:`);
          console.log(`    ├─ Foglio: ${fab.foglio}`);
          console.log(`    ├─ Particella: ${fab.particella}`);
          console.log(`    ├─ Subalterno: ${fab.subalterno || 'N/A'}`);
          console.log(`    ├─ Categoria: ${fab.categoria}`);
          console.log(`    ├─ Rendita: €${fab.rendita}`);
          console.log(`    ├─ Titolarità: ${fab.proprietario?.titolarita || 'N/A'}`);
          console.log(`    └─ Comune: ${fab.comune}`);
        });
      }

      if (allTerreni.length > 0) {
        console.log('🌱 === DETTAGLI TERRENI TROVATI ===');
        allTerreni.forEach((ter, index) => {
          console.log(`  Terreno ${index + 1}:`);
          console.log(`    ├─ Foglio: ${ter.foglio}`);
          console.log(`    ├─ Particella: ${ter.particella}`);
          console.log(`    ├─ Qualità: ${ter.qualita}`);
          console.log(`    ├─ Superficie: ${ter.superficie} mq`);
          console.log(`    ├─ Titolarità: ${ter.proprietario?.titolarita || 'N/A'}`);
          console.log(`    └─ Comune: ${ter.comune}`);
        });
      }
      
      return {
        success: totalImmobili > 0,
        message: totalImmobili > 0 
          ? `✅ Estrazione AI completata: ${allFabbricati.length} fabbricati, ${allTerreni.length} terreni (confidenza: ${avgConfidence.toFixed(1)}%)`
          : `⚠️ Nessun immobile estratto dai file caricati`,
        fabbricati: allFabbricati,
        terreni: allTerreni,
        errors: allErrors,
        warnings: allWarnings,
        confidence: avgConfidence
      };

    } catch (error) {
      console.error('❌ Errore durante processamento AI:', error);
      this.sendProgress(`❌ Errore durante l'analisi: ${(error as Error).message}`);
      
      return {
        success: false,
        message: `❌ Errore estrazione AI: ${(error as Error).message}`,
        fabbricati: [],
        terreni: [],
        errors: [`Errore estrazione AI: ${(error as Error).message}`],
        warnings: []
      };
    }
  }

  /**
   * Salva file temporaneamente per debug
   */
  private async saveTemporaryFiles(files: FileData[]): Promise<string[]> {
    const savedPaths: string[] = [];
    
    for (const file of files) {
      const tempFileName = `${uuidv4()}_${file.name}`;
      const tempFilePath = path.join(this.tempDir, tempFileName);
      
      try {
        fs.writeFileSync(tempFilePath, file.buffer);
        savedPaths.push(tempFilePath);
        
        console.log(`💾 File salvato temporaneamente: ${tempFilePath}`);
        console.log(`📁 Nome file: ${file.name}`);
        console.log(`📊 Dimensione: ${file.buffer.length} bytes`);
        console.log(`🏷️ Tipo MIME: ${file.mimeType}`);
        
      } catch (error) {
        console.error(`❌ Errore salvando file temporaneo ${file.name}:`, error);
      }
    }
    
    return savedPaths;
  }

  /**
   * Pulisce file temporanei
   */
  private cleanupTempFiles(filePaths: string[]): void {
    for (const filePath of filePaths) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ File temporaneo eliminato: ${filePath}`);
        }
      } catch (error) {
        console.error(`❌ Errore eliminando file temporaneo ${filePath}:`, error);
      }
    }
  }
} 