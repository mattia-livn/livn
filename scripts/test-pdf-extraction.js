#!/usr/bin/env node

/**
 * Script per testare l'estrazione del testo PDF con pdfjs-dist
 */

const fs = require('fs')

async function testPDFExtraction() {
  console.log('🧪 Test estrazione testo PDF con pdfjs-dist\n')
  
  try {
    // Crea un file PDF di test semplice (simulato)
    const testContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n174\n%%EOF')
    
    console.log('📤 Test API di analisi...')
    
    // Crea FormData per simulare upload dal browser
    const FormData = require('form-data')
    const formData = new FormData()
    
    // Aggiungi il file di test
    formData.append('files', testContent, {
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

testPDFExtraction() 