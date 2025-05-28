#!/usr/bin/env node

/**
 * Script per testare pdf-parse-new
 */

const fs = require('fs')

async function testPdfParseNew() {
  console.log('🧪 Test pdf-parse-new\n')
  
  try {
    // Test con un file PDF semplice (creiamo un buffer di test)
    const testPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000207 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n299\n%%EOF')
    
    console.log('📤 Test API di analisi con pdf-parse-new...')
    
    // Crea FormData per simulare upload dal browser
    const FormData = require('form-data')
    const formData = new FormData()
    
    // Aggiungi il file di test
    formData.append('files', testPdfBuffer, {
      filename: 'test.pdf',
      contentType: 'application/pdf'
    })
    
    // Test API
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ API risponde correttamente')
      console.log('📋 Risultato:', JSON.stringify(result, null, 2))
    } else {
      const error = await response.text()
      console.log('❌ Errore API:', response.status, error)
    }
    
  } catch (error) {
    console.error('❌ Errore test:', error.message)
  }
}

testPdfParseNew() 