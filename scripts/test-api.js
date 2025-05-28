#!/usr/bin/env node

/**
 * Script di test per verificare le API di Livn
 * Uso: node scripts/test-api.js
 */

const BASE_URL = 'http://localhost:3000'

async function testAPI(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    if (body) {
      options.body = JSON.stringify(body)
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    const data = await response.json()
    
    console.log(`✅ ${method} ${endpoint}:`, response.status)
    if (!response.ok) {
      console.log('   Error:', data.error)
    }
    
    return { success: response.ok, data }
  } catch (error) {
    console.log(`❌ ${method} ${endpoint}:`, error.message)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log('🧪 Test API Livn\n')
  
  // Test calcolo IMU con dati mock
  const mockProperties = [
    {
      id: 'test-1',
      address: 'Via Roma 123, Milano',
      comune: 'Milano',
      provincia: 'MI',
      codiceComune: 'F205',
      categoriaCatastale: 'A/2',
      renditaCatastale: 1200,
      superficie: 85,
      foglio: '123',
      particella: '456',
      subalterno: '1',
      abitazionePrincipale: true,
      locato: false,
      quotaPossesso: 100,
      pertinenze: [],
      analisiCompleta: true,
      datiMancanti: []
    }
  ]
  
  console.log('📊 Test calcolo IMU...')
  const calcResult = await testAPI('/api/calculate', 'POST', { 
    properties: mockProperties 
  })
  
  if (calcResult.success) {
    console.log('   Totale IMU:', calcResult.data.totalIMU, '€')
    console.log('   Immobili calcolati:', calcResult.data.calculations.length)
    console.log('   Errori di validazione:', calcResult.data.errors.length)
    
    if (calcResult.data.errors.length > 0) {
      console.log('   Dettagli errori:')
      calcResult.data.errors.forEach(error => {
        console.log(`     - ${error.address}: ${error.errors.join(', ')}`)
      })
    }
    
    if (calcResult.data.calculations.length > 0) {
      console.log('   Dettagli calcolo primo immobile:')
      const calc = calcResult.data.calculations[0]
      console.log(`     - Rendita rivalutata: €${calc.renditaRivalutata}`)
      console.log(`     - Base imponibile: €${calc.baseImponibile}`)
      console.log(`     - Aliquota: ${calc.aliquotaApplicata}%`)
      console.log(`     - Importo lordo: €${calc.importoLordo}`)
      console.log(`     - Detrazione: €${calc.detrazione}`)
      console.log(`     - Importo finale: €${calc.importoFinale}`)
    }
  }
  
  console.log('\n🎯 Test completati!')
  console.log('\nPer testare completamente:')
  console.log('1. Apri http://localhost:3000')
  console.log('2. Carica un documento PDF')
  console.log('3. Completa il wizard')
  console.log('4. Verifica il calcolo IMU')
}

// Verifica che il server sia in esecuzione
fetch(`${BASE_URL}/api/calculate`)
  .then(() => runTests())
  .catch(() => {
    console.log('❌ Server non raggiungibile su http://localhost:3000')
    console.log('💡 Avvia il server con: npm run dev')
  }) 