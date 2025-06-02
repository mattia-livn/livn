const fs = require('fs');
const path = require('path');

const COMMUNES_DIR = '../data/statements/2025';
const OUTPUT_FILE = '../unique_conditions_2025.txt';

async function extractUniqueConditions() {
  console.log('🔍 Avvio estrazione condizioni uniche dai file .ts dei comuni...');
  
  try {
    // Legge tutti i file .ts nella cartella dei comuni
    const files = fs.readdirSync(path.join(__dirname, COMMUNES_DIR))
      .filter(file => file.endsWith('.ts'))
      .sort();
    
    console.log(`📁 Trovati ${files.length} file .ts da analizzare`);
    
    const allConditions = new Set(); // Uso Set per eliminare automaticamente i duplicati
    let processedFiles = 0;
    let totalConditions = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(__dirname, COMMUNES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Estrae le condizioni dal contenuto del file usando regex
        const conditionMatches = content.match(/condition:\s*["']([^"']+)["']/g);
        
        if (conditionMatches) {
          conditionMatches.forEach(match => {
            // Estrae solo il testo della condizione
            const condition = match.match(/condition:\s*["']([^"']+)["']/)[1];
            allConditions.add(condition.trim());
            totalConditions++;
          });
        }
        
        processedFiles++;
        
        // Log progressivo ogni 100 file
        if (processedFiles % 100 === 0) {
          console.log(`📊 Processati ${processedFiles}/${files.length} file...`);
        }
      } catch (error) {
        console.warn(`⚠️  Errore nel processare ${file}: ${error.message}`);
      }
    }
    
    console.log(`\n✅ Elaborazione completata:`);
    console.log(`   📄 File processati: ${processedFiles}`);
    console.log(`   🔢 Condizioni totali trovate: ${totalConditions}`);
    console.log(`   🎯 Condizioni uniche: ${allConditions.size}`);
    
    // Converte il Set in array e lo ordina alfabeticamente
    const uniqueConditions = Array.from(allConditions).sort();
    
    // Crea il contenuto del file di output
    let output = `# CONDIZIONI UNICHE IMU 2025\n`;
    output += `# Estratte da ${processedFiles} comuni\n`;
    output += `# Data estrazione: ${new Date().toISOString()}\n`;
    output += `# Condizioni totali: ${totalConditions}\n`;
    output += `# Condizioni uniche: ${uniqueConditions.length}\n\n`;
    
    uniqueConditions.forEach((condition, index) => {
      output += `${index + 1}. ${condition}\n`;
    });
    
    // Salva il file
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    fs.writeFileSync(outputPath, output, 'utf8');
    
    console.log(`\n💾 File salvato: ${outputPath}`);
    console.log(`\n📋 Prime 10 condizioni trovate:`);
    uniqueConditions.slice(0, 10).forEach((condition, index) => {
      console.log(`   ${index + 1}. ${condition}`);
    });
    
    if (uniqueConditions.length > 10) {
      console.log(`   ... e altre ${uniqueConditions.length - 10} condizioni`);
    }
    
    return {
      totalFiles: processedFiles,
      totalConditions: totalConditions,
      uniqueConditions: uniqueConditions.length,
      conditions: uniqueConditions
    };
    
  } catch (error) {
    console.error('❌ Errore durante l\'estrazione:', error);
    throw error;
  }
}

// Esegue lo script se chiamato direttamente
if (require.main === module) {
  extractUniqueConditions()
    .then(result => {
      console.log(`\n🎉 Estrazione completata con successo!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Errore fatale:', error);
      process.exit(1);
    });
}

module.exports = { extractUniqueConditions }; 