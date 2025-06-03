// exampleUsage.ts
import { TorinIMUQuestionGenerator, RawProperty, generateQuestionsForProperties } from './questionGenerator';

// Esempi di immobili dalla visura catastale
const exampleProperties: RawProperty[] = [
  {
    id: 'prop_001',
    type: 'fabbricato',
    category: 'A/2',
    address: 'Via Roma 123, Torino',
    owners: ['Mario Rossi']
  },
  {
    id: 'prop_002', 
    type: 'fabbricato',
    category: 'D/1',
    address: 'Via Milano 45, Torino',
    owners: ['Tech Startup SRL']
  },
  {
    id: 'prop_003',
    type: 'terreno',
    address: 'Località Campagna, Torino',
    owners: ['Giuseppe Verdi']
  },
  {
    id: 'prop_004',
    type: 'fabbricato',
    category: 'C/6',
    address: 'Via Garibaldi 78, Torino',
    owners: ['Anna Bianchi']
  }
];

// Test del generatore
function testQuestionGenerator() {
  console.log('=== TEST GENERATORE DOMANDE IMU TORINO 2025 ===\n');
  
  const generator = new TorinIMUQuestionGenerator();
  
  exampleProperties.forEach(property => {
    console.log(`\n🏠 IMMOBILE: ${property.id}`);
    console.log(`   Tipo: ${property.type}`);
    console.log(`   Categoria: ${property.category || 'N/A'}`);
    console.log(`   Indirizzo: ${property.address}`);
    console.log(`   Proprietario: ${property.owners.join(', ')}`);
    
    const questionGroups = generator.generateQuestions(property);
    
    if (questionGroups.length === 0) {
      console.log('   ❌ Nessuna domanda generata');
      return;
    }
    
    questionGroups.forEach((group, groupIndex) => {
      console.log(`\n   📋 GRUPPO ${groupIndex + 1}: ${group.title}`);
      console.log(`      ${group.description}`);
      console.log(`      Aliquote applicabili: ${group.applicableRates.join(', ')}`);
      
      group.questions.forEach((question, qIndex) => {
        console.log(`\n      ❓ Domanda ${qIndex + 1}: ${question.text}`);
        console.log(`         Tipo: ${question.type}`);
        console.log(`         Obbligatoria: ${question.required ? 'Sì' : 'No'}`);
        if (question.dependsOn) {
          console.log(`         Dipende da: ${question.dependsOn}`);
        }
        if (question.options) {
          console.log(`         Opzioni: ${question.options.join(', ')}`);
        }
        console.log(`         Motivo: ${question.reason}`);
      });
    });
    
    console.log('\n   ' + '─'.repeat(50));
  });
}

// Esegui il test
if (typeof require !== 'undefined' && require.main === module) {
  testQuestionGenerator();
}

// Esempio di utilizzo con batch di immobili
export function exampleBatchProcessing() {
  const questionsMap = generateQuestionsForProperties(exampleProperties);
  
  console.log(`\n=== ELABORAZIONE BATCH ===`);
  console.log(`Generati questionari per ${questionsMap.size} immobili`);
  
  questionsMap.forEach((questionGroups, propertyId) => {
    const totalQuestions = questionGroups.reduce((sum, group) => sum + group.questions.length, 0);
    console.log(`${propertyId}: ${totalQuestions} domande in ${questionGroups.length} gruppi`);
  });
}

export { exampleProperties, testQuestionGenerator }; 