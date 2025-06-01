import { readFileSync } from 'fs';
import { join } from 'path';
import { calculateIMUWithAI, displayIMUResults } from './imuCalculator';

interface TestScenario {
  name: string;
  description: string;
  municipalRate: number;
  expectedTotalRange?: { min: number; max: number };
}

const testScenarios: TestScenario[] = [
  {
    name: 'Scenario Standard Alessandria',
    description: 'Calcolo IMU standard per Alessandria con aliquota tipica',
    municipalRate: 10.6, // per mille
    expectedTotalRange: { min: 200, max: 800 }
  },
  {
    name: 'Scenario Aliquota Alta',
    description: 'Test con aliquota comunale più alta',
    municipalRate: 12.0, // per mille
    expectedTotalRange: { min: 250, max: 900 }
  },
  {
    name: 'Scenario Aliquota Minima',
    description: 'Test con aliquota comunale minima',
    municipalRate: 8.6, // per mille
    expectedTotalRange: { min: 150, max: 650 }
  }
];

export const loadTestData = () => {
  try {
    const dataPath = join(process.cwd(), 'data', 'test_data.json');
    const rawData = readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Errore nel caricamento dei dati di test:', error);
    return null;
  }
};

export const runIntegratedIMUTest = async (scenario: TestScenario) => {
  console.log(`\n🏗️ === ${scenario.name} ===`);
  console.log(`📄 ${scenario.description}`);
  console.log(`🏛️ Aliquota comunale: ${scenario.municipalRate}‰`);
  
  try {
    // Carica i dati di test
    const cadastralData = loadTestData();
    
    if (!cadastralData) {
      console.log('❌ Impossibile caricare i dati di test');
      return false;
    }

    console.log('\n📋 Dati catastali caricati:');
    console.log(`👤 Contribuente: ${cadastralData.owner_tax_code}`);
    console.log(`🏘️ Comune: ${cadastralData.municipality.name} (${cadastralData.municipality.province})`);
    console.log(`📦 Particelle: ${cadastralData.parcels.length}`);
    
    // Lista breve delle particelle
    cadastralData.parcels.forEach((parcel: any, index: number) => {
      console.log(`   ${index + 1}. ${parcel.type} - ${parcel.category}: ${parcel.description}`);
    });

    // Esegui il calcolo IMU con AI
    console.log('\n🤖 Avvio calcolo IMU con AI...');
    const startTime = Date.now();
    
    const result = await calculateIMUWithAI(cadastralData, scenario.municipalRate);
    
    const endTime = Date.now();
    console.log(`⏱️ Calcolo completato in ${endTime - startTime}ms`);

    // Mostra i risultati
    displayIMUResults(result);

    // Valutazione del risultato
    if (scenario.expectedTotalRange) {
      const { min, max } = scenario.expectedTotalRange;
      if (result.totalIMU >= min && result.totalIMU <= max) {
        console.log(`✅ Risultato nel range atteso (€${min}-€${max})`);
      } else {
        console.log(`⚠️ Risultato fuori range: €${result.totalIMU.toFixed(2)} (atteso €${min}-€${max})`);
      }
    }

    // Verifica che tutti i calcoli siano stati eseguiti
    const expectedParcels = cadastralData.parcels.length;
    const calculatedParcels = result.detailedCalculations.length;
    
    if (calculatedParcels === expectedParcels) {
      console.log(`✅ Tutte le ${expectedParcels} particelle sono state calcolate`);
    } else {
      console.log(`⚠️ Calcolate ${calculatedParcels}/${expectedParcels} particelle`);
    }

    console.log('✅ Test completato con successo');
    return true;

  } catch (error) {
    console.log(`❌ Test fallito: ${error}`);
    return false;
  }
};

export const runAllIntegratedTests = async () => {
  console.log('🚀 === SUITE TEST INTEGRATI IMU ===');
  console.log(`📊 Numero di scenari: ${testScenarios.length}`);
  
  let successCount = 0;
  let failCount = 0;

  for (const scenario of testScenarios) {
    const success = await runIntegratedIMUTest(scenario);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Pausa tra i test per evitare rate limiting
    console.log('\n⏸️ Pausa di 3 secondi...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n📈 === RISULTATI FINALI ===');
  console.log(`✅ Test riusciti: ${successCount}`);
  console.log(`❌ Test falliti: ${failCount}`);
  console.log(`📊 Percentuale successo: ${((successCount / testScenarios.length) * 100).toFixed(1)}%`);
  
  return { successCount, failCount, total: testScenarios.length };
};

// Test rapido per sviluppo
export const quickIMUTest = async () => {
  console.log('🔬 === TEST RAPIDO IMU ===');
  
  // Verifica che le chiavi API siano configurate prima di iniziare
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEY non configurata. Configura il file .env prima di eseguire i test.');
    return false;
  }
  
  return await runIntegratedIMUTest(testScenarios[0]);
}; 