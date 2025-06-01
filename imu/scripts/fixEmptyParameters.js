const fs = require('fs');
const path = require('path');

const COMMUNES_DIR = '../data/statements/2025';

// Regole specifiche per condizioni standard
const STANDARD_CONDITION_RULES = {
  'terreni agricoli': {
    required: [
      {
        name: 'categoriaAtastale',
        type: 'required',
        questions: ['Qual è la categoria catastale del terreno?'],
        validationRules: ['Must be valid cadastral category for agricultural land'],
        detectedValues: ['terreni agricoli']
      },
      {
        name: 'ubicazione',
        type: 'required',
        questions: ['In quale zona del comune si trova il terreno?', 'Qual è l\'ubicazione specifica?'],
        validationRules: ['Must specify location within municipality'],
        detectedValues: ['terreni agricoli']
      }
    ],
    conditional: [
      {
        name: 'superficie',
        type: 'conditional',
        questions: ['Qual è la superficie del terreno in metri quadri?'],
        validationRules: ['Must be numeric value in square meters'],
        detectedValues: ['terreni agricoli']
      },
      {
        name: 'condizioniSpeciali',
        type: 'conditional',
        questions: ['Il terreno è soggetto a particolari vincoli?', 'È un terreno coltivato?'],
        validationRules: ['Must specify if special conditions apply'],
        detectedValues: ['terreni agricoli']
      }
    ],
    additionalQuestions: ['Si tratta di terreno agricolo coltivato?', 'È un terreno edificabile?']
  },
  'aree fabbricabili': {
    required: [
      {
        name: 'ubicazione',
        type: 'required',
        questions: ['In quale zona urbanistica si trova l\'area?', 'Qual è la destinazione urbanistica?'],
        validationRules: ['Must specify urban zone and destination'],
        detectedValues: ['aree fabbricabili']
      }
    ],
    conditional: [
      {
        name: 'superficie',
        type: 'conditional',
        questions: ['Qual è la superficie dell\'area in metri quadri?'],
        validationRules: ['Must be numeric value in square meters'],
        detectedValues: ['aree fabbricabili']
      },
      {
        name: 'destinazioneUso',
        type: 'conditional',
        questions: ['Qual è la destinazione d\'uso prevista?', 'Che tipo di costruzione è consentita?'],
        validationRules: ['Must specify intended use destination'],
        detectedValues: ['aree fabbricabili']
      }
    ],
    additionalQuestions: ['In quale zona urbanistica si trova?', 'Ha già ottenuto permessi edilizi?']
  },
  'altri fabbricati': {
    required: [
      {
        name: 'categoriaAtastale',
        type: 'required',
        questions: ['Qual è la categoria catastale dell\'immobile?'],
        validationRules: ['Must be valid cadastral category'],
        detectedValues: ['altri fabbricati']
      },
      {
        name: 'modalitaUtilizzo',
        type: 'required',
        questions: ['Come viene utilizzato l\'immobile?', 'È locato o a disposizione?'],
        validationRules: ['Must specify usage type'],
        detectedValues: ['altri fabbricati']
      }
    ],
    conditional: [
      {
        name: 'ubicazione',
        type: 'conditional',
        questions: ['In quale zona si trova l\'immobile?'],
        validationRules: ['Must specify location'],
        detectedValues: ['altri fabbricati']
      },
      {
        name: 'tipoContratto',
        type: 'conditional',
        questions: ['Se locato, che tipo di contratto?', 'Qual è la durata del contratto?'],
        validationRules: ['Must specify contract type if rented'],
        detectedValues: ['altri fabbricati']
      }
    ],
    additionalQuestions: ['È diverso dall\'abitazione principale?', 'Appartiene al gruppo catastale D?']
  }
};

async function fixEmptyParameters() {
  console.log('🔨 Avvio correzione parametri vuoti...');
  
  try {
    const communesPath = path.join(__dirname, COMMUNES_DIR);
    const files = fs.readdirSync(communesPath)
      .filter(file => file.endsWith('.ts'))
      .sort();
    
    console.log(`📁 Trovati ${files.length} file da controllare`);
    
    let processedFiles = 0;
    let emptyParametersFixed = 0;
    let totalConditionsChecked = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(communesPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let wasModified = false;
        
        const communeName = file.replace('.ts', '').replace(/([A-Z]{2}2025)$/, '');
        
        // Trova tutte le condizioni con parametri vuoti
        const conditionMatches = content.match(/\{[\s\S]*?\}/g);
        if (!conditionMatches) continue;
        
        let newConditions = [];
        
        conditionMatches.forEach((conditionText, index) => {
          totalConditionsChecked++;
          
          // Verifica se ha parametri vuoti
          const hasEmptyParams = conditionText.includes('required: []') && 
                                 conditionText.includes('conditional: []') &&
                                 conditionText.includes('questions: []');
          
          if (hasEmptyParams) {
            // Estrae il condition text
            const conditionMatch = conditionText.match(/condition:\s*["']([^"']+)["']/);
            if (conditionMatch) {
              const condition = conditionMatch[1].toLowerCase();
              
              // Trova la regola appropriata
              let ruleApplied = false;
              for (const [ruleKey, rule] of Object.entries(STANDARD_CONDITION_RULES)) {
                if (condition.includes(ruleKey)) {
                  console.log(`🔧 Correggendo: "${conditionMatch[1]}" in ${file}`);
                  
                  // Crea i nuovi parametri
                  const newParams = {
                    required: rule.required,
                    conditional: rule.conditional,
                    questions: [
                      ...rule.required.flatMap(p => p.questions),
                      ...rule.conditional.flatMap(p => p.questions),
                      ...(rule.additionalQuestions || [])
                    ],
                    validationRules: [
                      ...rule.required.flatMap(p => p.validationRules),
                      ...rule.conditional.flatMap(p => p.validationRules)
                    ],
                    commune: communeName
                  };
                  
                  // Rimuovi duplicati
                  newParams.questions = [...new Set(newParams.questions)];
                  newParams.validationRules = [...new Set(newParams.validationRules)];
                  
                  // Sostituisce i parametri vuoti
                  let newConditionText = conditionText.replace(
                    /requiredParameters:\s*\{[\s\S]*?\}/,
                    `requiredParameters: ${JSON.stringify(newParams, null, 6).replace(/\n/g, '\n      ')}`
                  );
                  
                  newConditions.push(newConditionText);
                  emptyParametersFixed++;
                  wasModified = true;
                  ruleApplied = true;
                  break;
                }
              }
              
              if (!ruleApplied) {
                newConditions.push(conditionText);
              }
            } else {
              newConditions.push(conditionText);
            }
          } else {
            newConditions.push(conditionText);
          }
        });
        
        // Se il file è stato modificato, salvalo
        if (wasModified) {
          const arrayMatch = content.match(/(export const imuRates\w+: ImuRateEntry\[\] = \[)([\s\S]*?)(\];)/);
          if (arrayMatch) {
            const newArrayContent = newConditions.join(',\n  ');
            const newContent = content.replace(
              /(export const imuRates\w+: ImuRateEntry\[\] = \[)([\s\S]*?)(\];)/,
              `${arrayMatch[1]}\n  ${newArrayContent}\n${arrayMatch[3]}`
            );
            
            fs.writeFileSync(filePath, newContent, 'utf8');
          }
        }
        
        processedFiles++;
        
        if (processedFiles % 100 === 0) {
          console.log(`📊 Controllati ${processedFiles}/${files.length} file (${emptyParametersFixed} parametri corretti)...`);
        }
        
      } catch (error) {
        console.warn(`⚠️  Errore nel processare ${file}: ${error.message}`);
      }
    }
    
    console.log(`\n✅ Correzione completata:`);
    console.log(`   📄 File controllati: ${processedFiles}`);
    console.log(`   🔍 Condizioni controllate: ${totalConditionsChecked}`);
    console.log(`   🔨 Parametri vuoti corretti: ${emptyParametersFixed}`);
    
    return {
      processedFiles,
      totalConditionsChecked,
      emptyParametersFixed
    };
    
  } catch (error) {
    console.error('❌ Errore durante la correzione:', error);
    throw error;
  }
}

// Esegue lo script se chiamato direttamente
if (require.main === module) {
  fixEmptyParameters()
    .then(result => {
      console.log(`\n🎉 Correzione parametri vuoti completata!`);
      console.log(`🔧 ${result.emptyParametersFixed} condizioni sono state corrette`);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Errore fatale:', error);
      process.exit(1);
    });
}

module.exports = { fixEmptyParameters }; 