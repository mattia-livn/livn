#!/usr/bin/env node

/**
 * Script per testare un VERO upload di file su Supabase
 */

require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

async function testRealUpload() {
  console.log('🧪 Test VERO upload su Supabase\n')
  
  // Crea un file di test temporaneo
  const testContent = `AGENZIA DELLE ENTRATE
VISURA CATASTALE

Comune: MILANO (MI)
Codice Comune: F205

IMMOBILE TEST:
Foglio: 123
Particella: 456
Subalterno: 1
Categoria: A/2
Rendita Catastale: € 1.250,00
Superficie: 85 mq
Vani: 4
Indirizzo: Via Roma 123, Milano`

  const testFileName = 'test-upload.txt'
  fs.writeFileSync(testFileName, testContent)
  
  try {
    console.log('📤 Test upload tramite API...')
    
    // Crea FormData per simulare upload dal browser
    const FormData = require('form-data')
    const formData = new FormData()
    
    // Aggiungi il file
    formData.append('files', fs.createReadStream(testFileName), {
      filename: testFileName,
      contentType: 'text/plain'
    })
    formData.append('userId', 'test-user')
    
    // Trova il server attivo
    let baseUrl = null
    const ports = [3000, 3001, 3002, 3003, 3004]
    
    for (const port of ports) {
      try {
        const testUrl = `http://localhost:${port}`
        const response = await fetch(testUrl)
        if (response.ok) {
          baseUrl = testUrl
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
    
    console.log(`🔗 Server trovato: ${baseUrl}`)
    
    // Test upload
    const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    })
    
    if (uploadResponse.ok) {
      const result = await uploadResponse.json()
      console.log('✅ Upload riuscito!')
      console.log('📋 Risultato:', JSON.stringify(result, null, 2))
    } else {
      const error = await uploadResponse.text()
      console.log('❌ Errore upload:', uploadResponse.status)
      console.log('📋 Dettagli:', error)
    }
    
  } catch (error) {
    console.error('❌ Errore durante il test:', error.message)
  } finally {
    // Pulisci il file di test
    if (fs.existsSync(testFileName)) {
      fs.unlinkSync(testFileName)
      console.log('🧹 File di test rimosso')
    }
  }
}

// Polyfill per fetch
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch')
}

testRealUpload().catch(console.error) 