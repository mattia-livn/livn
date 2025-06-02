const fs = require('fs');
const path = require('path');

const COMMUNES_DIR = '../data/statements/2025';
const ANALYSIS_FILE = '../parametri_decisione_imu_2025.json';

// Mapping dei pattern di analisi per determinare i parametri necessari
const PARAMETER_ANALYZERS = {
  categoriaAtastale: {
    pattern: /[ABCDE]\/?\d{1,2}|categoria\s+catastale|categorie\s+catastali|fabbricati|gruppo\s+catastale|abitazione/gi,
    type: 'required',
    questions: ['Qual è la categoria catastale dell\'immobile?'],
    validationRules: ['Must be valid cadastral category (A/1, A/2, etc.)']
  },
  
  modalitaUtilizzo: {
    pattern: /(abitazione principale|a disposizione|locat[aeo]|comodato|utilizzat[oi]|destinat[oi]|adibito|fabbricati|altri)/gi,
    type: 'required', 
    questions: ['Come viene utilizzato l\'immobile?', 'È la sua abitazione principale?', 'È locato o dato in comodato?'],
    validationRules: ['Must specify usage type']
  },
  
  ubicazione: {
    pattern: /(centro storico|foglio catastale|zona|area|territorio comunale|dentro|fuori|ricadenti|terreni|aree fabbricabili)/gi,
    type: 'conditional',
    questions: ['In quale zona/area del comune si trova l\'immobile?', 'Si trova nel centro storico?', 'Qual è il foglio catastale?'],
    validationRules: ['Must specify location within municipality']
  },
  
  superficie: {
    pattern: /superficie.*?(\d+)\s*(mq|metri|m²)/gi,
    type: 'conditional',
    questions: ['Qual è la superficie dell\'immobile in metri quadri?'],
    validationRules: ['Must be numeric value in square meters'],
    extractLimits: true
  },
  
  caratteristicheSoggetto: {
    pattern: /(ONLUS|handicap|invalidità|età|studenti|parenti|anziani|terzo settore|vulnerabilità)/gi,
    type: 'conditional',
    questions: ['Ha particolari caratteristiche (handicap, invalidità, età)?', 'È una ONLUS o ente del terzo settore?', 'È studente o anziano?'],
    validationRules: ['Must specify if special subject characteristics apply']
  },
  
  tipoContratto: {
    pattern: /(contratto|durata|mesi|canone libero|accordi|patti territoriali|registrato)/gi,
    type: 'conditional',
    questions: ['Che tipo di contratto di locazione/comodato?', 'Qual è la durata del contratto?', 'Il contratto è registrato?'],
    validationRules: ['Must specify contract type and duration']
  },
  
  destinazioneUso: {
    pattern: /(turistico.ricettiva|bed and breakfast|agriturismo|produttiva|commerciale|ATECO|attività)/gi,
    type: 'conditional',
    questions: ['Qual è la destinazione d\'uso specifica?', 'Che tipo di attività vi si svolge?', 'Qual è il codice ATECO?'],
    validationRules: ['Must specify specific use destination']
  },
  
  condizioniSpeciali: {
    pattern: /(inagibile|calamità|esente|vincolo|start.?up|biologica|energia rinnovabile)/gi,
    type: 'conditional',
    questions: ['Ci sono vincoli o esenzioni speciali?', 'L\'immobile è inagibile per calamità?', 'È soggetto a particolari condizioni?'],
    validationRules: ['Must specify if special conditions apply']
  }
};

// Regole specifiche per condizioni standard
const STANDARD_CONDITION_RULES = {
  'terreni agricoli': {
    required: ['categoriaAtastale', 'ubicazione'],
    conditional: ['superficie', 'condizioniSpeciali'],
    additionalQuestions: ['Si tratta di terreno agricolo coltivato?', 'È un terreno edificabile?']
  },
  'aree fabbricabili': {
    required: ['ubicazione'],
    conditional: ['superficie', 'destinazioneUso'],
    additionalQuestions: ['In quale zona urbanistica si trova?', 'Qual è la destinazione urbanistica?']
  },
  'altri fabbricati': {
    required: ['categoriaAtastale', 'modalitaUtilizzo'],
    conditional: ['ubicazione', 'tipoContratto'],
    additionalQuestions: ['È diverso dall\'abitazione principale?', 'Appartiene al gruppo catastale D?']
  },
  'fabbricati': {
    required: ['categoriaAtastale', 'modalitaUtilizzo'],
    conditional: ['ubicazione', 'destinazioneUso'],
    additionalQuestions: ['Che tipo di fabbricato è?', 'A cosa è destinato?']
  },
  'abitazione principale': {
    required: ['categoriaAtastale', 'modalitaUtilizzo'],
    conditional: ['caratteristicheSoggetto'],
    additionalQuestions: ['È effettivamente la sua residenza principale?', 'Ci abita per la maggior parte dell\'anno?']
  }
};

async function enhanceConditionsWithParameters() {
  console.log('🔧 Avvio enhancement MIGLIORATO delle condizioni con parametri necessari...');
  
  try {
    // Legge i dati dell'analisi precedente
    const analysisPath = path.join(__dirname, ANALYSIS_FILE);
    const analysisData = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
    
    // Legge tutti i file .ts nella cartella dei comuni
    const communesPath = path.join(__dirname, COMMUNES_DIR);
    const files = fs.readdirSync(communesPath)
      .filter(file => file.endsWith('.ts'))
      .sort();
    
    console.log(`📁 Trovati ${files.length} file .ts da processare`);
    
    let processedFiles = 0;
    let totalConditionsEnhanced = 0;
    let filesWithErrors = 0;
    let emptyParametersFixed = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(communesPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Estrae il nome del comune dal nome del file
        const communeName = file.replace('.ts', '').replace(/([A-Z]{2}2025)$/, '');
        
        // Trova l'array delle condizioni nel file
        const arrayMatch = content.match(/export const imuRates\w+: ImuRateEntry\[\] = \[([\s\S]*?)\];/);
        if (!arrayMatch) {
          console.warn(`⚠️  Non trovato array condizioni in ${file}`);
          continue;
        }
        
        // Estrae le singole condizioni
        const conditionsText = arrayMatch[1];
        const conditionMatches = conditionsText.match(/\{[\s\S]*?\}/g);
        
        if (!conditionMatches) {
          console.warn(`⚠️  Non trovate condizioni in ${file}`);
          continue;
        }
        
        let enhancedConditions = [];
        
        conditionMatches.forEach((conditionText, index) => {
          try {
            // Estrae il testo della condizione
            const conditionMatch = conditionText.match(/condition:\s*["']([^"']+)["']/);
            if (!conditionMatch) return;
            
            const condition = conditionMatch[1];
            
            // Analizza la condizione per determinare i parametri necessari
            let requiredParameters = analyzeConditionParameters(condition);
            
            // Se non sono stati trovati parametri, usa le regole standard
            if (requiredParameters.required.length === 0 && requiredParameters.conditional.length === 0) {
              requiredParameters = applyStandardRules(condition, communeName);
              if (requiredParameters.required.length > 0 || requiredParameters.conditional.length > 0) {
                emptyParametersFixed++;
              }
            }
            
            // Aggiunge i parametri alla condizione esistente
            const enhancedCondition = addParametersToCondition(conditionText, requiredParameters, communeName);
            enhancedConditions.push(enhancedCondition);
            
            totalConditionsEnhanced++;
            
          } catch (error) {
            console.warn(`⚠️  Errore nel processare condizione ${index + 1} in ${file}: ${error.message}`);
          }
        });
        
        // Ricostruisce il file con le condizioni enhanced
        if (enhancedConditions.length > 0) {
          const newArrayContent = enhancedConditions.join(',\n  ');
          const newContent = content.replace(
            /export const imuRates\w+: ImuRateEntry\[\] = \[([\s\S]*?)\];/,
            `export const ${extractExportName(content)}: ImuRateEntry[] = [\n  ${newArrayContent}\n];`
          );
          
          // Salva il file aggiornato
          fs.writeFileSync(filePath, newContent, 'utf8');
        }
        
        processedFiles++;
        
        // Progress ogni 100 file
        if (processedFiles % 100 === 0) {
          console.log(`📊 Processati ${processedFiles}/${files.length} file (${totalConditionsEnhanced} condizioni enhanced, ${emptyParametersFixed} parametri vuoti corretti)...`);
        }
        
      } catch (error) {
        console.warn(`⚠️  Errore nel processare ${file}: ${error.message}`);
        filesWithErrors++;
      }
    }
    
    console.log(`\n✅ Enhancement MIGLIORATO completato:`);
    console.log(`   📄 File processati: ${processedFiles}`);
    console.log(`   🔧 Condizioni enhanced: ${totalConditionsEnhanced}`);
    console.log(`   🔨 Parametri vuoti corretti: ${emptyParametersFixed}`);
    console.log(`   ❌ File con errori: ${filesWithErrors}`);
    
    // Crea un summary dei parametri più comuni
    await createParametersSummary(totalConditionsEnhanced);
    
    return {
      processedFiles,
      totalConditionsEnhanced,
      filesWithErrors,
      emptyParametersFixed
    };
    
  } catch (error) {
    console.error('❌ Errore durante l\'enhancement:', error);
    throw error;
  }
}

function applyStandardRules(conditionText, communeName) {
  const condition = conditionText.toLowerCase();
  
  // Cerca match con regole standard
  for (const [ruleKey, rule] of Object.entries(STANDARD_CONDITION_RULES)) {
    if (condition.includes(ruleKey)) {
      const requiredParams = {
        required: [],
        conditional: [],
        questions: [],
        validationRules: [],
        extractedValues: {}
      };
      
      // Aggiungi parametri required
      rule.required.forEach(paramName => {
        if (PARAMETER_ANALYZERS[paramName]) {
          const analyzer = PARAMETER_ANALYZERS[paramName];
          requiredParams.required.push({
            name: paramName,
            type: 'required',
            questions: analyzer.questions,
            validationRules: analyzer.validationRules,
            detectedValues: [conditionText]
          });
          requiredParams.questions.push(...analyzer.questions);
          requiredParams.validationRules.push(...analyzer.validationRules);
        }
      });
      
      // Aggiungi parametri conditional
      rule.conditional.forEach(paramName => {
        if (PARAMETER_ANALYZERS[paramName]) {
          const analyzer = PARAMETER_ANALYZERS[paramName];
          requiredParams.conditional.push({
            name: paramName,
            type: 'conditional',
            questions: analyzer.questions,
            validationRules: analyzer.validationRules,
            detectedValues: [conditionText]
          });
          requiredParams.questions.push(...analyzer.questions);
          requiredParams.validationRules.push(...analyzer.validationRules);
        }
      });
      
      // Aggiungi domande specifiche
      if (rule.additionalQuestions) {
        requiredParams.questions.push(...rule.additionalQuestions);
      }
      
      // Rimuovi duplicati
      requiredParams.questions = [...new Set(requiredParams.questions)];
      requiredParams.validationRules = [...new Set(requiredParams.validationRules)];
      
      return requiredParams;
    }
  }
  
  // Se non trova regole specifiche, ritorna parametri vuoti
  return {
    required: [],
    conditional: [],
    questions: [],
    validationRules: [],
    extractedValues: {}
  };
}

function analyzeConditionParameters(conditionText) {
  const requiredParams = {
    required: [],
    conditional: [],
    questions: [],
    validationRules: [],
    extractedValues: {}
  };
  
  // Analizza ogni tipo di parametro
  Object.entries(PARAMETER_ANALYZERS).forEach(([paramName, analyzer]) => {
    const matches = conditionText.match(analyzer.pattern);
    if (matches) {
      const paramInfo = {
        name: paramName,
        type: analyzer.type,
        questions: analyzer.questions,
        validationRules: analyzer.validationRules,
        detectedValues: matches
      };
      
      // Estrae limiti specifici per superficie
      if (paramName === 'superficie' && analyzer.extractLimits) {
        const limitMatch = conditionText.match(/(\d+)\s*(mq|metri|m²)/gi);
        if (limitMatch) {
          paramInfo.limits = limitMatch;
        }
      }
      
      // Estrae categorie catastali specifiche
      if (paramName === 'categoriaAtastale') {
        const catMatches = conditionText.match(/[ABCDE]\/?\d{1,2}/gi);
        if (catMatches) {
          paramInfo.specificCategories = catMatches;
        }
      }
      
      if (analyzer.type === 'required') {
        requiredParams.required.push(paramInfo);
      } else {
        requiredParams.conditional.push(paramInfo);
      }
      
      // Aggiungi domande e regole
      requiredParams.questions.push(...analyzer.questions);
      requiredParams.validationRules.push(...analyzer.validationRules);
    }
  });
  
  // Rimuovi duplicati
  requiredParams.questions = [...new Set(requiredParams.questions)];
  requiredParams.validationRules = [...new Set(requiredParams.validationRules)];
  
  return requiredParams;
}

function addParametersToCondition(conditionText, requiredParameters, communeName) {
  // Trova la posizione dove inserire i nuovi parametri (prima della chiusura della condizione)
  const insertPosition = conditionText.lastIndexOf('}');
  
  // Crea il testo dei parametri da aggiungere
  let parametersText = ',\n    requiredParameters: {\n';
  parametersText += `      required: ${JSON.stringify(requiredParameters.required, null, 6)},\n`;
  parametersText += `      conditional: ${JSON.stringify(requiredParameters.conditional, null, 6)},\n`;
  parametersText += `      questions: ${JSON.stringify(requiredParameters.questions, null, 6)},\n`;
  parametersText += `      validationRules: ${JSON.stringify(requiredParameters.validationRules, null, 6)},\n`;
  parametersText += `      commune: "${communeName}"\n`;
  parametersText += '    }';
  
  // Inserisce i parametri nella condizione
  const enhancedCondition = conditionText.slice(0, insertPosition) + parametersText + '\n  ' + conditionText.slice(insertPosition);
  
  return enhancedCondition;
}

function extractExportName(content) {
  const match = content.match(/export const (imuRates\w+):/);
  return match ? match[1] : 'imuRatesUnknown';
}

async function createParametersSummary(totalConditions) {
  const summary = {
    totalConditionsEnhanced: totalConditions,
    enhancedAt: new Date().toISOString(),
    parameterTypes: Object.keys(PARAMETER_ANALYZERS),
    exampleQuestions: Object.values(PARAMETER_ANALYZERS).flatMap(p => p.questions.slice(0, 1))
  };
  
  const summaryPath = path.join(__dirname, '../enhancement_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
  
  console.log(`📝 Summary enhancement salvato in: ${summaryPath}`);
}

// Esegue lo script se chiamato direttamente
if (require.main === module) {
  enhanceConditionsWithParameters()
    .then(result => {
      console.log(`\n🎉 Enhancement condizioni completato con successo!`);
      console.log(`💡 Ogni condizione ora include i parametri necessari per la verifica`);
      console.log(`🤖 L'AI potrà ora fare le domande specifiche all'utente`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Errore fatale:', error);
      process.exit(1);
    });
}

module.exports = { enhanceConditionsWithParameters }; 