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

/**
 * Servizio di upload semplificato che usa solo AI extraction
 */
export class UploadServiceAI {
  private aiExtractor: AIExtractionService;
  private tempDir: string;

  constructor() {
    this.aiExtractor = new AIExtractionService();
    this.tempDir = path.join(__dirname, '..', 'temp-uploads');
    
    // Crea directory temporanea se non esiste
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Processa file multipli usando AI extraction
   */
  async processFiles(files: FileData[]): Promise<UploadResult> {
    console.log('🚀 === INIZIO PROCESSO UPLOAD AI ===');
    console.log(`📁 File ricevuti: ${files.length}`);

    try {
      // Salva file temporaneamente per debug
      await this.saveTemporaryFiles(files);
      
      // Usa AI extraction per processare tutti i file
      console.log('🤖 === ESTRAZIONE AI ===');
      const aiResult = await this.aiExtractor.extractFromMultipleFiles(files);
      
      console.log('🤖 === RISULTATO ESTRAZIONE AI ===');
      console.log(`✅ Successo: ${aiResult.success}`);
      console.log(`🎯 Confidenza: ${aiResult.confidence.toFixed(1)}%`);
      console.log(`🏠 Fabbricati: ${aiResult.fabbricati.length}`);
      console.log(`🌱 Terreni: ${aiResult.terreni.length}`);
      console.log(`⚠️ Errori: ${aiResult.errors.length}`);
      console.log(`🟡 Warning: ${aiResult.warnings.length}`);

      if (aiResult.fabbricati.length > 0) {
        console.log('🏠 === DETTAGLI FABBRICATI TROVATI ===');
        aiResult.fabbricati.forEach((fab, index) => {
          console.log(`  Fabbricato ${index + 1}:`);
          console.log(`    ├─ Foglio: ${fab.foglio}`);
          console.log(`    ├─ Particella: ${fab.particella}`);
          console.log(`    ├─ Subalterno: ${fab.subalterno}`);
          console.log(`    ├─ Categoria: ${fab.categoria}`);
          console.log(`    ├─ Rendita: €${fab.rendita}`);
          console.log(`    └─ Comune: ${fab.comune}`);
        });
      }

      if (aiResult.terreni.length > 0) {
        console.log('🌱 === DETTAGLI TERRENI TROVATI ===');
        aiResult.terreni.forEach((ter, index) => {
          console.log(`  Terreno ${index + 1}:`);
          console.log(`    ├─ Foglio: ${ter.foglio}`);
          console.log(`    ├─ Particella: ${ter.particella}`);
          console.log(`    ├─ Qualità: ${ter.qualita}`);
          console.log(`    ├─ Superficie: ${ter.superficie} mq`);
          console.log(`    └─ Comune: ${ter.comune}`);
        });
      }

      const totalImmobili = aiResult.fabbricati.length + aiResult.terreni.length;
      
      return {
        success: aiResult.success && totalImmobili > 0,
        message: totalImmobili > 0 
          ? `✅ Estrazione AI completata: ${aiResult.fabbricati.length} fabbricati, ${aiResult.terreni.length} terreni (confidenza: ${aiResult.confidence.toFixed(1)}%)`
          : `⚠️ Nessun immobile estratto dai file caricati`,
        fabbricati: aiResult.fabbricati,
        terreni: aiResult.terreni,
        errors: aiResult.errors,
        warnings: aiResult.warnings,
        confidence: aiResult.confidence
      };

    } catch (error) {
      console.error('❌ Errore durante processamento AI:', error);
      
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