#!/usr/bin/env node

/**
 * Script per testare l'analisi AI dei PDF con OpenAI
 */

require('dotenv').config({ path: '.env.local' })

// Simula l'analisi di un testo catastale
async function testOpenAIAnalysis() {
  console.log('🧪 Test analisi AI PDF con OpenAI\n')
  
  // Testo di esempio di un documento catastale
  const sampleText = `
AGENZIA DELLE ENTRATE
VISURA CATASTALE

Comune: MILANO (MI)
Codice Comune: F205

IMMOBILE 1:
Foglio: 123
Particella: 456
Subalterno: 1
Categoria: A/2
Rendita Catastale: € 1.250,00
Superficie: 85 mq
Vani: 4
Indirizzo: Via Roma 123, Milano

IMMOBILE 2:
Foglio: 124
Particella: 789
Subalterno: 2
Categoria: C/6
Rendita Catastale: € 150,00
Superficie: 15 mq
Indirizzo: Via Roma 123, Milano (Box auto)
  `
  
  const openaiKey = process.env.OPENAI_API_KEY
  
  console.log('📋 Configurazione AI:')
  console.log('OpenAI:', openaiKey ? '✅ Configurato' : '❌ Mancante')
  
  if (!openaiKey || openaiKey.includes('your_')) {
    console.log('\n⚠️ Chiave OpenAI non configurata')
    console.log('💡 Configura OPENAI_API_KEY nel .env.local')
    return
  }
  
  try {
    console.log('\n🤖 Chiamata OpenAI API...')
    
    const prompt = `
Analizza questo documento catastale italiano e estrai TUTTE le informazioni sugli immobili presenti.
Per ogni immobile trovato, estrai:

- Indirizzo completo
- Comune e provincia  
- Codice comune (se presente)
- Categoria catastale (A/1, A/2, A/3, etc.)
- Rendita catastale in euro
- Superficie in mq (se presente)
- Numero vani (se presente)
- Foglio, particella, subalterno

IMPORTANTE: 
- Restituisci TUTTI gli immobili trovati nel documento
- Se un dato non è presente, non inventarlo
- Usa il formato JSON richiesto

Documento:
${sampleText}

Rispondi SOLO con un array JSON valido nel formato:
[
  {
    "address": "Via Roma 123, Milano",
    "comune": "Milano", 
    "provincia": "MI",
    "codiceComune": "F205",
    "categoriaCatastale": "A/2",
    "renditaCatastale": 1250.00,
    "superficie": 85,
    "vani": 4,
    "foglio": "123",
    "particella": "456", 
    "subalterno": "1"
  }
]`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 2000
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    const aiResponse = data.choices[0].message.content
    
    console.log('✅ Risposta AI ricevuta')
    console.log('\n📄 Risposta completa:')
    console.log(aiResponse)
    
    try {
      const extractedData = JSON.parse(aiResponse)
      console.log('\n🎯 Dati estratti:')
      console.log(`   Immobili trovati: ${extractedData.length}`)
      
      extractedData.forEach((property, index) => {
        console.log(`\n   Immobile ${index + 1}:`)
        console.log(`     - Indirizzo: ${property.address}`)
        console.log(`     - Comune: ${property.comune} (${property.provincia})`)
        console.log(`     - Categoria: ${property.categoriaCatastale}`)
        console.log(`     - Rendita: €${property.renditaCatastale}`)
        console.log(`     - Superficie: ${property.superficie} mq`)
        console.log(`     - Vani: ${property.vani}`)
      })
      
    } catch (parseError) {
      console.log('❌ Errore parsing JSON:', parseError.message)
      console.log('💡 La risposta AI non è un JSON valido')
    }
    
  } catch (error) {
    console.error('❌ Errore:', error.message)
  }
}

testOpenAIAnalysis() 