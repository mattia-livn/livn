const fs = require('fs');
const path = require('path');

class ConditionAnalyzer {
  constructor(inputDir, outputFile) {
    this.inputDir = inputDir;
    this.outputFile = outputFile;
    this.conditions = new Set(); // Per evitare duplicati
    this.stats = {
      filesProcessed: 0,
      totalConditions: 0,
      uniqueConditions: 0
    };
  }

  // Estrae le condizioni da un file TypeScript
  extractConditionsFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Regex per trovare tutte le condizioni nel formato: condition: "testo",
      const conditionRegex = /condition:\s*"([^"]+)"/g;
      const conditions = [];
      let match;
      
      while ((match = conditionRegex.exec(content)) !== null) {
        conditions.push(match[1]);
        this.conditions.add(match[1]); // Aggiunge al set globale
      }
      
      return conditions;
    } catch (error) {
      console.error(`❌ Errore leggendo ${filePath}:`, error.message);
      return [];
    }
  }

  // Processa tutti i file .ts nella directory
  processAllFiles() {
    try {
      if (!fs.existsSync(this.inputDir)) {
        console.error(`❌ Directory non trovata: ${this.inputDir}`);
        return;
      }

      const files = fs.readdirSync(this.inputDir)
        .filter(file => file.endsWith('.ts'))
        .sort();

      console.log(`🔍 Trovati ${files.length} file TypeScript da analizzare...`);

      for (const filename of files) {
        const filePath = path.join(this.inputDir, filename);
        const fileConditions = this.extractConditionsFromFile(filePath);
        
        if (fileConditions.length > 0) {
          console.log(`📄 ${filename}: ${fileConditions.length} condizioni`);
          this.stats.totalConditions += fileConditions.length;
        }
        
        this.stats.filesProcessed++;
      }

      this.stats.uniqueConditions = this.conditions.size;

      console.log(`\n📊 Statistiche:`);
      console.log(`   File processati: ${this.stats.filesProcessed}`);
      console.log(`   Condizioni totali: ${this.stats.totalConditions}`);
      console.log(`   Condizioni uniche: ${this.stats.uniqueConditions}`);

    } catch (error) {
      console.error('❌ Errore durante l\'analisi:', error);
    }
  }

  // Salva l'elenco delle condizioni uniche
  saveConditionsList() {
    try {
      const sortedConditions = Array.from(this.conditions).sort();
      
      let output = `# IMU 2025 - Condizioni Uniche Estratte\n\n`;
      output += `Totale condizioni uniche: ${sortedConditions.length}\n`;
      output += `File analizzati: ${this.stats.filesProcessed}\n`;
      output += `Condizioni totali trovate: ${this.stats.totalConditions}\n`;
      output += `Generato il: ${new Date().toLocaleString('it-IT')}\n\n`;
      output += `## Elenco Condizioni:\n\n`;
      
      sortedConditions.forEach((condition, index) => {
        output += `${index + 1}. ${condition}\n`;
      });

      fs.writeFileSync(this.outputFile, output, 'utf-8');
      
      console.log(`\n✅ Elenco condizioni salvato in: ${this.outputFile}`);
      console.log(`📋 Prime 10 condizioni più comuni:`);
      
      sortedConditions.slice(0, 10).forEach((condition, index) => {
        console.log(`   ${index + 1}. ${condition}`);
      });

    } catch (error) {
      console.error('❌ Errore salvando il file:', error);
    }
  }

  // Metodo principale per eseguire l'analisi completa
  analyze() {
    console.log('🚀 Avvio analisi condizioni IMU 2025...\n');
    this.processAllFiles();
    this.saveConditionsList();
    console.log('\n🎉 Analisi completata!');
  }
}

// Esecuzione diretta
if (require.main === module) {
  const inputDir = path.join(__dirname, '../data/statements/2025');
  const outputFile = path.join(__dirname, '../imu_2025_conditions.txt');
  
  const analyzer = new ConditionAnalyzer(inputDir, outputFile);
  analyzer.analyze();
}

module.exports = { ConditionAnalyzer }; 