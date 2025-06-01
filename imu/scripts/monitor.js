const fs = require('fs');
const path = require('path');
const { ConditionAnalyzer } = require('./analyzeConditions');

class ProgressMonitor {
  constructor(inputDir, outputFile, logFile) {
    this.inputDir = inputDir;
    this.outputFile = outputFile;
    this.logFile = logFile;
    this.previousCount = 0;
    this.startTime = Date.now();
  }

  getCurrentStats() {
    const tsFiles = fs.readdirSync(this.inputDir)
      .filter(file => file.endsWith('.ts'))
      .length;
    
    return {
      processedFiles: tsFiles,
      timestamp: new Date().toLocaleString('it-IT'),
      elapsed: Math.round((Date.now() - this.startTime) / 1000)
    };
  }

  estimateProgress() {
    const totalPdfs = 7018; // Numero totale dal log
    const stats = this.getCurrentStats();
    const rate = stats.processedFiles / (stats.elapsed || 1); // File per secondo
    const remaining = totalPdfs - stats.processedFiles;
    const etaSeconds = remaining / rate;
    
    return {
      ...stats,
      totalFiles: totalPdfs,
      progressPercent: ((stats.processedFiles / totalPdfs) * 100).toFixed(2),
      filesPerSecond: rate.toFixed(3),
      etaMinutes: Math.round(etaSeconds / 60),
      etaHours: Math.round(etaSeconds / 3600)
    };
  }

  displayProgress() {
    const progress = this.estimateProgress();
    
    console.clear();
    console.log('🚀 IMU 2025 - Monitor Processo AI');
    console.log('═'.repeat(50));
    console.log(`📊 Progresso: ${progress.processedFiles}/${progress.totalFiles} file (${progress.progressPercent}%)`);
    console.log(`⏱️  Tempo trascorso: ${Math.floor(progress.elapsed / 60)}m ${progress.elapsed % 60}s`);
    console.log(`🔄 Velocità: ${progress.filesPerSecond} file/s`);
    
    if (progress.progressPercent > 0) {
      console.log(`⏳ Tempo stimato rimanente: ${progress.etaHours}h ${progress.etaMinutes % 60}m`);
    }
    
    console.log(`🕐 Ultimo aggiornamento: ${progress.timestamp}`);
    console.log('─'.repeat(50));

    // Progress bar
    const barLength = 40;
    const filledLength = Math.round((progress.progressPercent / 100) * barLength);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    console.log(`[${bar}] ${progress.progressPercent}%`);
    
    // Se ci sono nuovi file, aggiorna l'analisi delle condizioni
    if (progress.processedFiles > this.previousCount) {
      this.previousCount = progress.processedFiles;
      this.updateConditionsAnalysis();
    }
  }

  updateConditionsAnalysis() {
    try {
      const analyzer = new ConditionAnalyzer(this.inputDir, this.outputFile);
      analyzer.processAllFiles();
      
      console.log('\n📝 Condizioni uniche aggiornate:');
      console.log(`   Total files: ${analyzer.stats.filesProcessed}`);
      console.log(`   Total conditions: ${analyzer.stats.totalConditions}`);
      console.log(`   Unique conditions: ${analyzer.stats.uniqueConditions}`);
      
      // Salva il file aggiornato
      analyzer.saveConditionsList();
      
    } catch (error) {
      console.log('⚠️ Errore aggiornando analisi condizioni:', error.message);
    }
  }

  getLogTail() {
    try {
      if (fs.existsSync(this.logFile)) {
        const content = fs.readFileSync(this.logFile, 'utf-8');
        const lines = content.split('\n').slice(-5); // Ultime 5 righe
        return lines.filter(line => line.trim()).join('\n');
      }
    } catch (error) {
      return 'Errore leggendo il log';
    }
    return 'Log non disponibile';
  }

  start(intervalSeconds = 30) {
    console.log(`🎯 Avvio monitoraggio ogni ${intervalSeconds} secondi...`);
    console.log('Premi Ctrl+C per fermare\n');
    
    // Prima visualizzazione
    this.displayProgress();
    
    // Aggiornamento periodico
    const interval = setInterval(() => {
      this.displayProgress();
      
      // Mostra ultime righe del log
      console.log('\n📋 Ultime attività dal log:');
      console.log(this.getLogTail());
      console.log('\n' + '═'.repeat(50));
      
    }, intervalSeconds * 1000);
    
    // Gestione Ctrl+C
    process.on('SIGINT', () => {
      clearInterval(interval);
      console.log('\n\n👋 Monitoraggio fermato. Processo AI continua in background.');
      process.exit(0);
    });
  }
}

// Esecuzione diretta
if (require.main === module) {
  const inputDir = path.join(__dirname, '../data/statements/2025');
  const outputFile = path.join(__dirname, '../imu_2025_conditions.txt');
  const logFile = path.join(__dirname, 'extraction_v2.log');
  
  const monitor = new ProgressMonitor(inputDir, outputFile, logFile);
  
  // Controlla se c'è un argomento per l'intervallo
  const interval = process.argv[2] ? parseInt(process.argv[2]) : 30;
  monitor.start(interval);
}

module.exports = { ProgressMonitor }; 