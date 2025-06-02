const fs = require('fs');
const path = require('path');

const ANALYSIS_FILE = '../parametri_decisione_imu_2025.json';
const OUTPUT_FILE = '../informazioni_necessarie_imu_2025.md';

async function createInfoRequirementsSummary() {
  console.log('📝 Creazione riepilogo informazioni necessarie per IMU...');
  
  try {
    // Legge i risultati dell'analisi
    const analysisPath = path.join(__dirname, ANALYSIS_FILE);
    const analysisData = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
    
    // Crea il contenuto del riepilogo
    let summary = `# INFORMAZIONI NECESSARIE PER CALCOLO IMU 2025\n\n`;
    summary += `*Basato sull'analisi di ${analysisData.totalConditions} condizioni uniche estratte dalle delibere comunali*\n\n`;
    summary += `**Data analisi:** ${new Date(analysisData.analyzedAt).toLocaleDateString('it-IT')}\n\n`;
    
    summary += `## 📋 INFORMAZIONI OBBLIGATORIE\n\n`;
    summary += `Per determinare la corretta applicazione dell'IMU, sono **sempre necessarie** le seguenti informazioni:\n\n`;
    
    summary += `### 1. 🏠 CATEGORIA CATASTALE\n`;
    summary += `**Frequenza nelle condizioni:** ${analysisData.parameterFrequency.categoriaAtastale} su ${analysisData.totalConditions} (${((analysisData.parameterFrequency.categoriaAtastale/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
    summary += `**Categorie identificate:** ${analysisData.uniqueValues.categoriaAtastale.length}\n`;
    summary += `\`\`\`\n${analysisData.uniqueValues.categoriaAtastale.map(cat => cat.toUpperCase()).join(', ')}\n\`\`\`\n\n`;
    
    summary += `### 2. 🏘️ MODALITÀ DI UTILIZZO\n`;
    summary += `**Frequenza nelle condizioni:** ${analysisData.parameterFrequency.utilizzo} su ${analysisData.totalConditions} (${((analysisData.parameterFrequency.utilizzo/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
    summary += `**Modalità principali:**\n`;
    analysisData.uniqueValues.utilizzo.forEach(utilizzo => {
      summary += `- ${utilizzo.charAt(0).toUpperCase() + utilizzo.slice(1)}\n`;
    });
    summary += `\n`;
    
    summary += `### 3. 📍 UBICAZIONE\n`;
    summary += `**Frequenza nelle condizioni:** ${analysisData.parameterFrequency.ubicazione} su ${analysisData.totalConditions} (${((analysisData.parameterFrequency.ubicazione/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
    summary += `**Criteri geografici:**\n`;
    analysisData.uniqueValues.ubicazione.forEach(ubi => {
      summary += `- ${ubi.charAt(0).toUpperCase() + ubi.slice(1)}\n`;
    });
    summary += `\n`;
    
    summary += `## 📊 INFORMAZIONI CONDIZIONALI\n\n`;
    summary += `Le seguenti informazioni sono richieste **solo in specifiche circostanze**:\n\n`;
    
    if (analysisData.parameterFrequency.contratto > 0) {
      summary += `### 📄 CONTRATTI E LOCAZIONI\n`;
      summary += `**Frequenza:** ${analysisData.parameterFrequency.contratto} condizioni (${((analysisData.parameterFrequency.contratto/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
      summary += `**Dettagli richiesti:**\n`;
      analysisData.uniqueValues.contratto.forEach(contratto => {
        summary += `- ${contratto.charAt(0).toUpperCase() + contratto.slice(1)}\n`;
      });
      summary += `\n`;
    }
    
    if (analysisData.parameterFrequency.soggetto > 0) {
      summary += `### 👥 CARATTERISTICHE DEL SOGGETTO\n`;
      summary += `**Frequenza:** ${analysisData.parameterFrequency.soggetto} condizioni (${((analysisData.parameterFrequency.soggetto/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
      summary += `**Soggetti speciali:**\n`;
      analysisData.uniqueValues.soggetto.forEach(soggetto => {
        summary += `- ${soggetto.charAt(0).toUpperCase() + soggetto.slice(1)}\n`;
      });
      summary += `\n`;
    }
    
    if (analysisData.parameterFrequency.destinazione > 0) {
      summary += `### 🎯 DESTINAZIONE D'USO\n`;
      summary += `**Frequenza:** ${analysisData.parameterFrequency.destinazione} condizioni (${((analysisData.parameterFrequency.destinazione/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
      summary += `**Destinazioni specifiche:**\n`;
      analysisData.uniqueValues.destinazione.forEach(dest => {
        summary += `- ${dest.charAt(0).toUpperCase() + dest.slice(1)}\n`;
      });
      summary += `\n`;
    }
    
    if (analysisData.parameterFrequency.superficie > 0) {
      summary += `### 📐 SUPERFICIE\n`;
      summary += `**Frequenza:** ${analysisData.parameterFrequency.superficie} condizioni (${((analysisData.parameterFrequency.superficie/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
      summary += `**Limiti identificati:**\n`;
      analysisData.uniqueValues.superficie.forEach(sup => {
        summary += `- ${sup}\n`;
      });
      summary += `\n`;
    }
    
    if (analysisData.parameterFrequency.condizioniSpeciali > 0) {
      summary += `### ⚡ CONDIZIONI SPECIALI\n`;
      summary += `**Frequenza:** ${analysisData.parameterFrequency.condizioniSpeciali} condizioni (${((analysisData.parameterFrequency.condizioniSpeciali/analysisData.totalConditions)*100).toFixed(1)}%)\n\n`;
      summary += `**Condizioni particolari:**\n`;
      analysisData.uniqueValues.condizioniSpeciali.forEach(cond => {
        summary += `- ${cond.charAt(0).toUpperCase() + cond.slice(1)}\n`;
      });
      summary += `\n`;
    }
    
    summary += `## 🎯 ALGORITMO DI DECISIONE\n\n`;
    summary += `Per determinare la condizione IMU applicabile, seguire questo ordine di priorità:\n\n`;
    summary += `1. **Verifica categoria catastale** (obbligatorio)\n`;
    summary += `2. **Determina modalità di utilizzo** (obbligatorio)\n`;
    summary += `3. **Controlla ubicazione specifica** (se rilevante)\n`;
    summary += `4. **Verifica caratteristiche del soggetto** (se applicabile)\n`;
    summary += `5. **Controlla tipo di contratto** (per immobili locati)\n`;
    summary += `6. **Verifica destinazione d'uso** (per usi speciali)\n`;
    summary += `7. **Controlla superficie** (se richiesta)\n`;
    summary += `8. **Verifica condizioni speciali** (esenzioni/agevolazioni)\n\n`;
    
    summary += `## 📈 STATISTICHE PARAMETRI\n\n`;
    summary += `| Parametro | Frequenza | Percentuale | Priorità |\n`;
    summary += `|-----------|-----------|-------------|----------|\n`;
    
    const sortedParams = Object.entries(analysisData.parameterFrequency)
      .sort(([,a], [,b]) => b - a);
    
    sortedParams.forEach(([param, freq], index) => {
      const percentage = ((freq/analysisData.totalConditions)*100).toFixed(1);
      const priority = index < 3 ? 'Alta' : index < 6 ? 'Media' : 'Bassa';
      const paramNames = {
        categoriaAtastale: 'Categoria Catastale',
        utilizzo: 'Modalità Utilizzo',
        contratto: 'Tipo Contratto',
        soggetto: 'Caratteristiche Soggetto',
        ubicazione: 'Ubicazione',
        destinazione: 'Destinazione d\'uso',
        superficie: 'Superficie',
        condizioniSpeciali: 'Condizioni Speciali'
      };
      summary += `| ${paramNames[param]} | ${freq} | ${percentage}% | ${priority} |\n`;
    });
    
    summary += `\n---\n\n`;
    summary += `*Questo documento è generato automaticamente dall'analisi delle delibere comunali IMU 2025*\n`;
    
    // Salva il file
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    fs.writeFileSync(outputPath, summary, 'utf8');
    
    console.log(`✅ Riepilogo creato con successo!`);
    console.log(`📄 File salvato: ${outputPath}`);
    console.log(`📊 Parametri analizzati: ${Object.keys(analysisData.parameterFrequency).length}`);
    console.log(`🎯 Priorità identificate: Alta (3), Media (3), Bassa (2)`);
    
    return {
      outputPath,
      parametersCount: Object.keys(analysisData.parameterFrequency).length,
      topParameters: sortedParams.slice(0, 3)
    };
    
  } catch (error) {
    console.error('❌ Errore durante la creazione del riepilogo:', error);
    throw error;
  }
}

// Esegue lo script se chiamato direttamente
if (require.main === module) {
  createInfoRequirementsSummary()
    .then(result => {
      console.log(`\n🎉 Riepilogo informazioni necessarie completato!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Errore fatale:', error);
      process.exit(1);
    });
}

module.exports = { createInfoRequirementsSummary }; 