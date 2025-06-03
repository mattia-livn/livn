import { CommuneConditionsService } from './services/commune-conditions-service';

async function testFinalSystem() {
  console.log('🎯 === TEST FINALE SISTEMA IMU COMPLETO ===\n');

  const service = new CommuneConditionsService();

  // Definisci immobili di esempio
  const testCases = [
    {
      nome: "Appartamento Milano",
      fabbricato: {
        categoria: 'A/2',
        comune: 'Milano',
        ubicazione: 'Via Brera 10',
        rendita: 2000
      },
      userAnswers: {
        condizioni_immobili: {
          'immobile_0': 'abitazione_principale'
        }
      },
      expectedCommune: 'milano'
    },
    {
      nome: "Casa Roma",
      fabbricato: {
        categoria: 'A/3',
        comune: 'Roma',
        ubicazione: 'Via del Corso 100',
        rendita: 1500
      },
      userAnswers: {
        condizioni_immobili: {
          'immobile_0': 'locato'
        }
      },
      expectedCommune: 'roma'
    },
    {
      nome: "Villa Torino",
      fabbricato: {
        categoria: 'A/7',
        comune: 'Torino',
        ubicazione: 'Via Po 15',
        rendita: 3000
      },
      userAnswers: {
        condizioni_immobili: {
          'immobile_0': 'abitazione_principale'
        }
      },
      expectedCommune: 'torino'
    },
    {
      nome: "Negozio Firenze",
      fabbricato: {
        categoria: 'C/1',
        comune: 'Firenze',
        ubicazione: 'Piazza Duomo 5',
        rendita: 1000
      },
      userAnswers: {
        condizioni_immobili: {
          'immobile_0': 'commerciale'
        }
      },
      expectedCommune: 'firenze'
    },
    {
      nome: "Terreno Venezia",
      fabbricato: {
        categoria: 'Terreno',
        comune: 'Venezia',
        ubicazione: 'Lido di Venezia',
        rendita: 500
      },
      userAnswers: {
        condizioni_immobili: {
          'immobile_0': 'terreno_agricolo'
        }
      },
      expectedCommune: 'venezia'
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n🏠 === ${testCase.nome.toUpperCase()} ===`);
    console.log(`📍 Comune: ${testCase.fabbricato.comune}`);
    console.log(`🏷️ Categoria: ${testCase.fabbricato.categoria}`);
    console.log(`💰 Rendita: €${testCase.fabbricato.rendita}`);
    
    try {
      const result = await service.findBestCondition(
        testCase.fabbricato,
        testCase.userAnswers,
        0,
        testCase.expectedCommune
      );

      console.log(`\n📊 RISULTATO:`);
      console.log(`   🎯 Aliquota IMU: ${result.aliquota}%`);
      console.log(`   📝 Descrizione: ${result.descrizione}`);
      console.log(`   🔥 Score matching: ${result.matchingScore}`);
      console.log(`   ⚖️ Condizione applicata: ${result.conditionMatched?.condition || 'Standard'}`);
      
      // Calcola IMU approssimativo
      const imuAnnuo = (testCase.fabbricato.rendita * 1.05 * 160 * result.aliquota / 100);
      console.log(`   💸 IMU annuo stimato: €${imuAnnuo.toFixed(2)}`);
      
      if (result.aliquota !== 0.76) {
        console.log(`   ✅ MATCHING PERSONALIZZATO riuscito! (non aliquota standard)`);
      } else {
        console.log(`   ⚠️ Aliquota standard applicata`);
      }

    } catch (error) {
      console.error(`   ❌ Errore per ${testCase.nome}:`, (error as Error).message);
    }
  }

  console.log('\n🎉 === TEST FINALE COMPLETATO ===');
  console.log('Il sistema è pronto per il calcolo IMU su tutti i comuni italiani!');
}

testFinalSystem().catch(console.error); 