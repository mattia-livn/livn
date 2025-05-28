#!/usr/bin/env node

/**
 * Script per testare l'intero workflow dell'applicazione
 */

const fs = require('fs')
const path = require('path')

async function testWorkflow() {
  console.log('🧪 Test workflow completo Livn\n')
  
  // Trova la porta corretta
  let baseUrl = null
  const ports = [3000, 3001, 3002, 3003]
  
  console.log('🔍 Ricerca server attivo...')
  for (const port of ports) {
    try {
      const testUrl = `http://localhost:${port}`
      const response = await fetch(testUrl)
      if (response.ok) {
        baseUrl = testUrl
        console.log(`✅ Server trovato su ${baseUrl}`)
        break
      }
    } catch (error) {
      // Continua con la prossima porta
    }
  }
  
  if (!baseUrl) {
    console.log('❌ Nessun server attivo trovato')
    console.log('💡 Avvia il server con: npm run dev')
    return
  }
  
  // Test 1: Verifica che il server sia attivo
  console.log('1️⃣ Verifica server...')
  try {
    const response = await fetch(baseUrl)
    if (response.ok) {
      console.log('✅ Server attivo su', baseUrl)
    } else {
      console.log('⚠️ Server risponde ma con errore:', response.status)
    }
  } catch (error) {
    console.log('❌ Server non raggiungibile su', baseUrl)
    console.log('💡 Prova con http://localhost:3001, 3002 o 3003')
    return
  }
  
  // Test 2: Verifica API di upload
  console.log('\n2️⃣ Test API upload...')
  try {
    const formData = new FormData()
    // Crea un file di test vuoto
    const testFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    formData.append('files', testFile)
    
    const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (uploadResponse.ok) {
      console.log('✅ API upload funzionante')
    } else {
      console.log('❌ Errore API upload:', uploadResponse.status)
    }
  } catch (error) {
    console.log('❌ Errore test upload:', error.message)
  }
  
  // Test 3: Verifica API di analisi
  console.log('\n3️⃣ Test API analisi...')
  try {
    const formData = new FormData()
    const testFile = new File(['AGENZIA DELLE ENTRATE\nComune: Milano\nCategoria: A/2'], 'test.pdf', { type: 'application/pdf' })
    formData.append('files', testFile)
    
    const analyzeResponse = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      body: formData
    })
    
    if (analyzeResponse.ok) {
      const result = await analyzeResponse.json()
      console.log('✅ API analisi funzionante')
      console.log(`   Immobili trovati: ${result.properties?.length || 0}`)
    } else {
      console.log('❌ Errore API analisi:', analyzeResponse.status)
    }
  } catch (error) {
    console.log('❌ Errore test analisi:', error.message)
  }
  
  // Test 4: Verifica API calcolo
  console.log('\n4️⃣ Test API calcolo...')
  try {
    const testProperty = {
      id: 'test-1',
      address: 'Via Roma 123, Milano',
      comune: 'Milano',
      provincia: 'MI',
      codiceComune: 'F205',
      categoriaCatastale: 'A/2',
      renditaCatastale: 1250,
      quotaPossesso: 100,
      abitazionePrincipale: true,
      locato: false,
      pertinenze: []
    }
    
    const calculateResponse = await fetch(`${baseUrl}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties: [testProperty] })
    })
    
    if (calculateResponse.ok) {
      const result = await calculateResponse.json()
      console.log('✅ API calcolo funzionante')
      console.log(`   IMU calcolata: €${result.calculations?.[0]?.importoFinale || 'N/A'}`)
    } else {
      console.log('❌ Errore API calcolo:', calculateResponse.status)
    }
  } catch (error) {
    console.log('❌ Errore test calcolo:', error.message)
  }
  
  console.log('\n�� Test completato!')
  console.log('💡 Ora puoi caricare un PDF reale nell\'applicazione web')
}

// Polyfill per fetch in Node.js
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch')
  global.FormData = require('form-data')
  global.File = class File {
    constructor(content, name, options = {}) {
      this.content = content
      this.name = name
      this.type = options.type || 'application/octet-stream'
    }
  }
}

testWorkflow().catch(console.error) 