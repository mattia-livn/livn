import { CommuneConditionsService } from './services/commune-conditions-service';

async function testCommuneConditionsService() {
  console.log('🧪 === TEST SERVIZIO CONDIZIONI COMUNALI ===\n');

  const service = new CommuneConditionsService();

  // Test 1: Lista comuni disponibili
  console.log('📋 Test 1: Lista comuni disponibili');
  const availableCommunes = service.getAvailableCommunes();
  console.log(`✅ Comuni caricati: ${availableCommunes.length}`);
  console.log('Primi 10 comuni:', availableCommunes.slice(0, 10));
  console.log('');

  // Test 2: Test con un immobile di esempio (AbanoTerme - uno dei file corretti)
  console.log('🏠 Test 2: Matching condizioni per Abano Terme (file corretto)');
  const testFabbricato = {
    categoria: 'A/2',
    comune: 'Abano Terme',
    ubicazione: 'Via Roma 1',
    rendita: 1000
  };

  const testUserAnswers = {
    condizioni_immobili: {
      'immobile_0': 'locato'
    }
  };

  try {
    const result = await service.findBestCondition(
      testFabbricato,
      testUserAnswers,
      0,
      'abanoterme'
    );

    console.log('✅ Risultato matching:');
    console.log(`   Aliquota: ${result.aliquota}%`);
    console.log(`   Descrizione: ${result.descrizione}`);
    console.log(`   Score: ${result.matchingScore}`);
    console.log(`   Condizione matched: ${result.conditionMatched?.condition || 'Nessuna'}`);
  } catch (error) {
    console.error('❌ Errore nel matching:', error);
  }
  console.log('');

  // Test 3: Test con Abbadia Lariana (altro file corretto)
  console.log('🏠 Test 3: Test con Abbadia Lariana (file corretto)');
  try {
    const result = await service.findBestCondition(
      testFabbricato,
      testUserAnswers,
      0,
      'abbadialariana'
    );

    console.log('✅ Risultato per Abbadia Lariana:');
    console.log(`   Aliquota: ${result.aliquota}%`);
    console.log(`   Descrizione: ${result.descrizione}`);
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  console.log('');

  // Test 4: Test matching parziale nome comune
  console.log('🏠 Test 4: Test con Abbasanta (file corretto)');
  try {
    const result = await service.findBestCondition(
      testFabbricato,
      testUserAnswers,
      0,
      'abbasanta'
    );

    console.log('✅ Risultato per Abbasanta:');
    console.log(`   Aliquota: ${result.aliquota}%`);
    console.log(`   Descrizione: ${result.descrizione}`);
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  console.log('');

  // Test 5: Test generazione domande specifiche
  console.log('❓ Test 5: Generazione domande specifiche');
  const extractedData = {
    fabbricati: [
      {
        categoria: 'A/2',
        comune: 'Abano Terme',
        ubicazione: 'Via Roma 1',
        rendita: 1000
      },
      {
        categoria: 'D/10',
        comune: 'Abano Terme',
        ubicazione: 'Via Milano 5',
        rendita: 500
      }
    ]
  };

  try {
    const questions = await service.generateCommuneSpecificQuestions(
      extractedData,
      'abanoterme'
    );

    console.log(`✅ Generate ${questions.length} domande specifiche:`);
    questions.forEach((q, i) => {
      console.log(`   ${i + 1}. ${q.question} (${q.parameterName})`);
    });
  } catch (error) {
    console.error('❌ Errore generazione domande:', error);
  }

  console.log('\n🎉 Test completato!');
}

// Esegui test
testCommuneConditionsService().catch(console.error); 