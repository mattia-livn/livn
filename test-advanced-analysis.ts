import AdvancedDataAnalyzer from './services/advanced-data-analyzer';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test per l'analisi avanzata dei dati catastali
 */
async function testAdvancedAnalysis() {
  console.log('🧪 Inizio test analisi avanzata...\n');

  const analyzer = new AdvancedDataAnalyzer({
    useOCR: false, // Disabilita OCR per ora nei test
    enableNLP: true,
    autoCorrection: true,
    strictValidation: false
  });

  // Test 1: Creare file di test CSV
  const testCsvContent = `
Comune,Provincia,Foglio,Particella,Subalterno,Categoria,Classe,Consistenza,Rendita
Milano,MI,123,456,1,A/2,3,5.5,1234.56
Milano,MI,123,457,2,A/3,2,4.0,987.65
`.trim();

  const testCsvPath = path.join(__dirname, 'temp-uploads', 'test-visura.csv');
  
  // Assicura che la directory esista
  const tempDir = path.dirname(testCsvPath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  fs.writeFileSync(testCsvPath, testCsvContent);

  try {
    console.log('📄 Test file CSV creato');
    console.log('🔍 Avvio analisi...\n');

    const result = await analyzer.analyzeFile(testCsvPath, 'test-visura.csv');

    console.log('📊 RISULTATI ANALISI:');
    console.log('====================');
    console.log(`✅ Successo: ${result.success}`);
    console.log(`🎯 Confidenza: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`⏱️ Tempo elaborazione: ${result.metadata.processingTime}ms`);
    console.log(`🔧 Tecniche usate: ${result.metadata.techniques.join(', ')}`);
    console.log(`🏠 Immobili trovati: ${result.metadata.totalProperties}`);
    console.log(`   ├─ Fabbricati: ${result.fabbricati.length}`);
    console.log(`   └─ Terreni: ${result.terreni.length}\n`);

    if (result.fabbricati.length > 0) {
      console.log('🏢 FABBRICATI:');
      result.fabbricati.forEach((fab, index) => {
        console.log(`${index + 1}. Fg.${fab.foglio} Part.${fab.particella} Sub.${fab.subalterno}`);
        console.log(`   ├─ Categoria: ${fab.categoria || 'N/A'}`);
        console.log(`   ├─ Classe: ${fab.classe || 'N/A'}`);
        console.log(`   ├─ Consistenza: ${fab.consistenza || 'N/A'}`);
        console.log(`   ├─ Rendita: €${fab.rendita || 'N/A'}`);
        console.log(`   └─ Comune: ${fab.comune || 'N/A'} (${fab.provincia || 'N/A'})`);
      });
      console.log();
    }

    if (result.terreni.length > 0) {
      console.log('🌱 TERRENI:');
      result.terreni.forEach((ter, index) => {
        console.log(`${index + 1}. Fg.${ter.foglio} Part.${ter.particella}`);
        console.log(`   ├─ Qualità: ${ter.qualita || 'N/A'}`);
        console.log(`   ├─ Classe: ${ter.classe || 'N/A'}`);
        console.log(`   ├─ Superficie: ${ter.superficie || 'N/A'}mq`);
        console.log(`   ├─ RD: €${ter.redditoDominicale || 'N/A'}`);
        console.log(`   ├─ RA: €${ter.redditoAgrario || 'N/A'}`);
        console.log(`   └─ Comune: ${ter.comune || 'N/A'} (${ter.provincia || 'N/A'})`);
      });
      console.log();
    }

    console.log('📈 VALUTAZIONE QUALITÀ:');
    console.log(`├─ Completezza dati: ${(result.qualityAssessment.dataCompleteness * 100).toFixed(1)}%`);
    console.log(`├─ Accuratezza: ${(result.qualityAssessment.dataAccuracy * 100).toFixed(1)}%`);
    console.log(`└─ Riconoscimento struttura: ${(result.qualityAssessment.structureRecognition * 100).toFixed(1)}%`);

    if (result.qualityAssessment.missingFields.length > 0) {
      console.log(`❌ Campi mancanti: ${result.qualityAssessment.missingFields.join(', ')}`);
    }

    if (result.qualityAssessment.suggestedActions.length > 0) {
      console.log('💡 Suggerimenti:');
      result.qualityAssessment.suggestedActions.forEach(action => {
        console.log(`   • ${action}`);
      });
    }

    if (result.warnings.length > 0) {
      console.log('\n⚠️ AVVISI:');
      result.warnings.forEach(warning => {
        console.log(`   • ${warning}`);
      });
    }

    if (result.errors.length > 0) {
      console.log('\n❌ ERRORI:');
      result.errors.forEach(error => {
        console.log(`   • ${error}`);
      });
    }

  } catch (error) {
    console.error('❌ Errore durante il test:', error);
  } finally {
    // Pulizia
    if (fs.existsSync(testCsvPath)) {
      fs.unlinkSync(testCsvPath);
      console.log('\n🧹 File di test rimosso');
    }
  }

  console.log('\n✅ Test completato!\n');
}

// Test 2: File di testo simulato
async function testTextAnalysis() {
  console.log('📝 Test analisi file di testo...\n');

  const analyzer = new AdvancedDataAnalyzer({
    useOCR: false,
    enableNLP: true,
    autoCorrection: true
  });

  const testTextContent = `
VISURA CATASTALE
AGENZIA DEL TERRITORIO

Comune: MILANO (MI)
Provincia: MILANO

DATI FABBRICATI:
Foglio 123 Particella 456 Subalterno 1 Categoria A/2 Classe 3 Consistenza 5,5 Rendita € 1.234,56
Foglio 123 Particella 457 Subalterno 2 Categoria A/3 Classe 2 Consistenza 4,0 Rendita € 987,65

DATI TERRENI:
Foglio 200 Particella 100 Qualità SEMINATIVO Classe 2 Superficie Ha 0.12.34 RD € 123,45 RA € 67,89
Foglio 200 Particella 101 Qualità PASCOLO Classe 3 Superficie Ha 0.08.50 RD € 89,12 RA € 45,67

INTESTATARIO:
Cognome: ROSSI
Nome: MARIO
CF: RSSMRA80A01F205X
`.trim();

  const testTextPath = path.join(__dirname, 'temp-uploads', 'test-visura.txt');
  
  // Assicura che la directory esista
  const tempDir = path.dirname(testTextPath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  fs.writeFileSync(testTextPath, testTextContent);

  try {
    const result = await analyzer.analyzeFile(testTextPath, 'test-visura.txt');

    console.log('📊 RISULTATI ANALISI FILE TESTO:');
    console.log('================================');
    console.log(`✅ Successo: ${result.success}`);
    console.log(`🎯 Confidenza: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`🏠 Immobili: ${result.metadata.totalProperties} (${result.fabbricati.length} fabbricati, ${result.terreni.length} terreni)`);
    console.log(`🔧 Tecniche: ${result.metadata.techniques.join(', ')}`);
    
    if (result.metadata.extractedText) {
      console.log(`📄 Testo estratto: ${result.metadata.extractedText.length} caratteri`);
    }

  } catch (error) {
    console.error('❌ Errore durante il test testo:', error);
  } finally {
    // Pulizia
    if (fs.existsSync(testTextPath)) {
      fs.unlinkSync(testTextPath);
    }
  }

  console.log('\n✅ Test file testo completato!\n');
}

// Esegui tutti i test
async function runAllTests() {
  await testAdvancedAnalysis();
  await testTextAnalysis();
}

if (require.main === module) {
  runAllTests().catch(console.error);
}

export { testAdvancedAnalysis, testTextAnalysis }; 