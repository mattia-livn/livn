const fs = require('fs');
const path = require('path');

const CONDITIONS_FILE = '../unique_conditions_2025.txt';
const OUTPUT_FILE = '../parametri_decisione_imu_2025.json';

// Definisco le categorie di parametri da ricercare
const PARAMETER_PATTERNS = {
  // Categoria catastale
  categoriaAtastale: {
    pattern: /[ABCDE]\/?\d{1,2}|A\/\d{1,2}|B\/\d{1,2}|C\/\d{1,2}|D\/\d{1,2}|E\/\d{1,2}/gi,
    description: "Categorie catastali (A/1, A/2, etc.)"
  },
  
  // Tipologia di utilizzo
  utilizzo: {
    pattern: /(abitazione principale|a disposizione|locata?|comodato|utilizzat[oi]|destinat[oi]|adibito)/gi,
    description: "Modalità di utilizzo dell'immobile"
  },
  
  // Superficie
  superficie: {
    pattern: /superficie.*?(\d+)\s*(mq|metri|m²)/gi,
    description: "Limiti di superficie in metri quadri"
  },
  
  // Ubicazione geografica
  ubicazione: {
    pattern: /(centro storico|foglio catastale|zona|area|territorio comunale|dentro|fuori|ricadenti)/gi,
    description: "Ubicazione geografica specifica"
  },
  
  // Soggetto proprietario/beneficiario
  soggetto: {
    pattern: /(ONLUS|handicap|invalidità|età|studenti|parenti|anziani|terzo settore|vulnerabilità)/gi,
    description: "Caratteristiche del soggetto proprietario o beneficiario"
  },
  
  // Tipo di contratto
  contratto: {
    pattern: /(contratto|durata|mesi|canone libero|accordi|patti territoriali|registrato)/gi,
    description: "Tipologia e durata del contratto"
  },
  
  // Destinazione d'uso
  destinazione: {
    pattern: /(turistico.ricettiva|bed and breakfast|agriturismo|produttiva|commerciale|ATECO|attività)/gi,
    description: "Destinazione d'uso specifica"
  },
  
  // Condizioni speciali
  condizioniSpeciali: {
    pattern: /(inagibile|calamità|esente|vincolo|start.up|biologica|energia rinnovabile)/gi,
    description: "Condizioni speciali o esenzioni"
  }
};

async function analyzeConditionParameters() {
  console.log('🔍 Avvio analisi parametri delle condizioni IMU...');
  
  try {
    // Legge il file delle condizioni
    const filePath = path.join(__dirname, CONDITIONS_FILE);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Estrae solo le righe con le condizioni (che iniziano con numeri)
    const conditionLines = content.split('\n').filter(line => /^\d+\./.test(line));
    
    console.log(`📋 Analizzando ${conditionLines.length} condizioni...`);
    
    const analysisResults = {
      totalConditions: conditionLines.length,
      analyzedAt: new Date().toISOString(),
      parameterFrequency: {},
      uniqueValues: {},
      conditionsByParameter: {},
      summary: {
        mostCommonParameters: [],
        categoriesCatastali: new Set(),
        tipologieUtilizzo: new Set(),
        superficiLimiti: new Set(),
        ubicazioniSpecifiche: new Set(),
        soggettiSpeciali: new Set(),
        tipologieContratto: new Set(),
        destinazioniUso: new Set(),
        condizioniSpeciali: new Set()
      }
    };
    
    // Inizializza le strutture dati
    Object.keys(PARAMETER_PATTERNS).forEach(param => {
      analysisResults.parameterFrequency[param] = 0;
      analysisResults.uniqueValues[param] = new Set();
      analysisResults.conditionsByParameter[param] = [];
    });
    
    // Analizza ogni condizione
    conditionLines.forEach((line, index) => {
      const conditionText = line.substring(line.indexOf('.') + 1).trim();
      
      // Analizza ogni tipo di parametro
      Object.entries(PARAMETER_PATTERNS).forEach(([paramName, paramConfig]) => {
        const matches = conditionText.match(paramConfig.pattern);
        if (matches) {
          analysisResults.parameterFrequency[paramName]++;
          matches.forEach(match => {
            analysisResults.uniqueValues[paramName].add(match.toLowerCase());
          });
          analysisResults.conditionsByParameter[paramName].push({
            conditionNumber: index + 1,
            condition: conditionText,
            matches: matches
          });
        }
      });
      
      // Analisi specifica per categorie catastali
      const categorieMatches = conditionText.match(/[ABCDE]\/?\d{1,2}/gi);
      if (categorieMatches) {
        categorieMatches.forEach(cat => analysisResults.summary.categoriesCatastali.add(cat.toUpperCase()));
      }
      
      // Analisi superfici
      const superficieMatches = conditionText.match(/(\d+)\s*(mq|metri|m²)/gi);
      if (superficieMatches) {
        superficieMatches.forEach(sup => analysisResults.summary.superficiLimiti.add(sup));
      }
      
      // Progress ogni 100 condizioni
      if ((index + 1) % 100 === 0) {
        console.log(`📊 Analizzate ${index + 1}/${conditionLines.length} condizioni...`);
      }
    });
    
    // Converte i Set in array per la serializzazione JSON
    Object.keys(analysisResults.uniqueValues).forEach(param => {
      analysisResults.uniqueValues[param] = Array.from(analysisResults.uniqueValues[param]).sort();
    });
    
    Object.keys(analysisResults.summary).forEach(key => {
      if (analysisResults.summary[key] instanceof Set) {
        analysisResults.summary[key] = Array.from(analysisResults.summary[key]).sort();
      }
    });
    
    // Calcola i parametri più comuni
    analysisResults.summary.mostCommonParameters = Object.entries(analysisResults.parameterFrequency)
      .sort(([,a], [,b]) => b - a)
      .map(([param, freq]) => ({
        parameter: param,
        frequency: freq,
        percentage: ((freq / conditionLines.length) * 100).toFixed(1),
        description: PARAMETER_PATTERNS[param].description
      }));
    
    // Salva i risultati
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    fs.writeFileSync(outputPath, JSON.stringify(analysisResults, null, 2), 'utf8');
    
    console.log(`\n✅ Analisi completata:`);
    console.log(`   📄 Condizioni analizzate: ${conditionLines.length}`);
    console.log(`   📊 Parametri identificati: ${Object.keys(PARAMETER_PATTERNS).length}`);
    console.log(`   💾 Risultati salvati in: ${outputPath}`);
    
    console.log(`\n📈 Parametri più frequenti:`);
    analysisResults.summary.mostCommonParameters.slice(0, 5).forEach(param => {
      console.log(`   ${param.parameter}: ${param.frequency} volte (${param.percentage}%)`);
    });
    
    console.log(`\n📋 Categorie catastali identificate: ${analysisResults.summary.categoriesCatastali.length}`);
    console.log(`   ${analysisResults.summary.categoriesCatastali.slice(0, 10).join(', ')}${analysisResults.summary.categoriesCatastali.length > 10 ? '...' : ''}`);
    
    return analysisResults;
    
  } catch (error) {
    console.error('❌ Errore durante l\'analisi:', error);
    throw error;
  }
}

// Funzione per creare un riepilogo delle informazioni necessarie
function createRequiredInfoSummary(analysisResults) {
  const requiredInfo = {
    informazioniObbligatorie: [
      "Categoria catastale dell'immobile",
      "Modalità di utilizzo (abitazione principale, locato, a disposizione, etc.)",
      "Ubicazione (indirizzo completo, foglio catastale, zona)"
    ],
    informazioniCondiziongali: [
      "Superficie (se richiesta da condizioni specifiche)",
      "Caratteristiche del proprietario/beneficiario",
      "Dettagli del contratto di locazione/comodato",
      "Destinazione d'uso specifica",
      "Presenza di condizioni speciali (vincoli, inagibilità, etc.)"
    ],
    parametriDecisionali: analysisResults.summary.mostCommonParameters
  };
  
  return requiredInfo;
}

// Esegue lo script se chiamato direttamente
if (require.main === module) {
  analyzeConditionParameters()
    .then(results => {
      const summary = createRequiredInfoSummary(results);
      console.log(`\n📝 Riepilogo informazioni necessarie salvato`);
      console.log(`🎉 Analisi parametri completata con successo!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Errore fatale:', error);
      process.exit(1);
    });
}

module.exports = { analyzeConditionParameters, createRequiredInfoSummary }; 