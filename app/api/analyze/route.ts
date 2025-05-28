import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Nessun file da analizzare' },
        { status: 400 }
      )
    }
    
    console.log(`🔍 Analizzando ${files.length} documenti PDF...`)
    
    const properties = []
    
    for (const file of files) {
      console.log(`📄 Analizzando: ${file.name}`)
      
      try {
        // Estrai il testo dal PDF
        const arrayBuffer = await file.arrayBuffer()
        const text = await extractTextFromPDF(arrayBuffer)
        
        console.log(`📝 Testo estratto (${text.length} caratteri)`)
        console.log('🔍 Prime 500 caratteri del testo:')
        console.log(text.substring(0, 500))
        console.log('🔍 Ultime 500 caratteri del testo:')
        console.log(text.substring(Math.max(0, text.length - 500)))
        
        if (text.length > 0) {
          // Analizza il testo con AI
          const extractedProperties = await analyzeTextWithAI(text, file.name)
          const enriched = await enrichPropertiesWithMunicipality(extractedProperties)
          properties.push(...enriched)
        } else {
          console.log('⚠️ Nessun testo estratto dal PDF')
          console.log('📋 Creando proprietà vuota per inserimento manuale')
          properties.push(createEmptyProperty(file.name))
        }
        
      } catch (error) {
        console.error(`❌ Errore analisi ${file.name}:`, error)
        
        // In caso di errore, crea una proprietà vuota
        properties.push(createEmptyProperty(file.name))
      }
    }
    
    console.log(`✅ Analisi completata: ${properties.length} immobili trovati`)
    
    return NextResponse.json({
      success: true,
      properties,
      message: `Analizzati ${files.length} documenti, trovati ${properties.length} immobili`
    })
    
  } catch (error) {
    console.error('Errore durante l\'analisi:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'analisi dei documenti' },
      { status: 500 }
    )
  }
}

// Estrae il testo dal PDF usando pdf-parse-new
async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Import dinamico di pdf-parse-new
    const pdfParse = (await import('pdf-parse-new')).default
    
    const buffer = Buffer.from(arrayBuffer)
    const data = await pdfParse(buffer)
    
    console.log(`📄 PDF info: ${data.numpages} pagine, ${data.text.length} caratteri`)
    
    return data.text.trim()
    
  } catch (error) {
    console.error('Errore estrazione testo PDF:', error)
    return ''
  }
}

// Analizza il testo estratto con OpenAI
async function analyzeTextWithAI(text: string, fileName: string) {
  const openaiKey = process.env.OPENAI_API_KEY
  
  if (!openaiKey || openaiKey.includes('your_')) {
    console.log('⚠️ Chiave OpenAI non configurata, uso analisi pattern-based')
    return analyzeTextWithPatterns(text, fileName)
  }
  
  try {
    console.log('🤖 Chiamata OpenAI API...')
    
    const prompt = `
Analizza il seguente testo estratto da un documento catastale e identifica tutte le proprietà immobiliari.
Per ogni proprietà, estrai:
- Indirizzo completo
- Comune e provincia (es. "Alessandria (AL)")
- Categoria catastale (es. "A/2")
- Rendita catastale in euro
- Quota di possesso (es. "1/2" o "1000/1000" - converti in percentuale: 1/2 = 50%, 1000/1000 = 100%)
- Superficie in metri quadri (se disponibile)
- Numero di vani (se disponibile)
- Foglio, particella e subalterno (se disponibili)

IMPORTANTE:
- NON inventare il codice comune catastale, estrai solo il nome del comune e la provincia.
- La quota di possesso deve essere convertita in percentuale (es. 1/2 = 50%, 1/1 = 100%)
- Per le categorie A (abitazioni) la consistenza è in VANI
- Per le categorie C (commerciali) la consistenza è in METRI QUADRI

Restituisci i dati in formato JSON array, dove ogni oggetto rappresenta una proprietà.
Esempio:
[
  {
    "address": "Via Roma 123",
    "comune": "Alessandria",
    "provincia": "AL",
    "categoriaCatastale": "A/2",
    "renditaCatastale": 1000.00,
    "quotaPossesso": 50,
    "superficie": 85,
    "vani": 4,
    "foglio": "123",
    "particella": "456",
    "subalterno": "1"
  }
]

Testo da analizzare:
${text}
`

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
      console.error('OpenAI API Error:', response.status, errorText)
      throw new Error(`API Error: ${response.status}`)
    }
    
    const data = await response.json()
    const aiResponse = data.choices[0].message.content
    
    console.log('🤖 Risposta OpenAI ricevuta')
    console.log('📋 Dati estratti da OpenAI:', aiResponse)
    
    // Parse della risposta JSON
    const extractedData = JSON.parse(aiResponse)
    
    // Converte in oggetti Property con mapping completo
    return extractedData.map((item: unknown, index: number) => {
      const property = item as Record<string, unknown>
      
      // Converti quota possesso in percentuale
      let quotaPercentuale = 100
      const quotaStr = property.quotaPossesso as string
      if (quotaStr) {
        if (quotaStr.includes('/')) {
          const [numeratore, denominatore] = quotaStr.split('/').map(n => parseInt(n.trim()))
          if (denominatore > 0) {
            quotaPercentuale = Math.round((numeratore / denominatore) * 100)
          }
        } else if (!isNaN(Number(quotaStr))) {
          quotaPercentuale = Number(quotaStr)
        }
      }
      // Ignora qualsiasi campo codiceComune restituito dall'AI
      return {
        id: generateId(),
        address: property.address as string || `Immobile ${index + 1} da ${fileName}`,
        comune: property.comune as string || '',
        provincia: property.provincia as string || '',
        codiceComune: '', // Sarà valorizzato solo dopo il lookup su Supabase
        categoriaCatastale: property.categoriaCatastale as string || '',
        renditaCatastale: Number(property.renditaCatastale) || 0,
        quotaPossesso: quotaPercentuale,
        superficie: Number(property.superficie) || undefined,
        vani: Number(property.vani) || undefined,
        abitazionePrincipale: false,
        locato: false,
        pertinenze: [],
        foglio: property.foglio as string || undefined,
        particella: property.particella as string || undefined,
        subalterno: property.subalterno as string || undefined,
        analisiCompleta: true,
        datiMancanti: []
      }
    })
    
  } catch (error) {
    console.error('❌ Errore analisi OpenAI:', error)
    console.error('❌ Dettagli errore:', error instanceof Error ? error.message : String(error))
    return analyzeTextWithPatterns(text, fileName)
  }
}

// Analisi basata su pattern regex (fallback)
function analyzeTextWithPatterns(text: string, fileName: string) {
  console.log('🔍 Usando analisi pattern-based...')
  
  const properties = []
  
  // Pattern per trovare informazioni catastali
  const patterns = {
    comune: /(?:Comune|COMUNE)[\s:]+([A-Z][A-Za-z\s]+)/gi,
    provincia: /\(([A-Z]{2})\)/g,
    codiceComune: /(?:Codice|CODICE)[\s:]*Comune[\s:]*([A-Z]\d{3})/gi,
    categoria: /(A\/\d+|B\/\d+|C\/\d+|D\/\d+)/gi,
    rendita: /(?:rendita|RENDITA)[\s:]*€?\s*(\d+[.,]\d+)/gi,
    foglio: /(?:foglio|FOGLIO)[\s:]*(\d+)/gi,
    particella: /(?:particella|PARTICELLA)[\s:]*(\d+)/gi,
    subalterno: /(?:sub|SUB|subalterno|SUBALTERNO)[\s:]*(\d+)/gi
  }
  
  // Estrai i dati usando i pattern
  const comuni = Array.from(text.matchAll(patterns.comune)).map(m => m[1].trim())
  const province = Array.from(text.matchAll(patterns.provincia)).map(m => m[1])
  const codiciComune = Array.from(text.matchAll(patterns.codiceComune)).map(m => m[1])
  const categorie = Array.from(text.matchAll(patterns.categoria)).map(m => m[1])
  const rendite = Array.from(text.matchAll(patterns.rendita)).map(m => parseFloat(m[1].replace(',', '.')))
  
  // Crea proprietà basate sui dati trovati
  const numProperties = Math.max(categorie.length, rendite.length, 1)
  
  for (let i = 0; i < numProperties; i++) {
    properties.push({
      id: generateId(),
      address: `Immobile ${i + 1} da ${fileName}`,
      comune: comuni[i] || '',
      provincia: province[i] || '',
      codiceComune: codiciComune[i] || '',
      categoriaCatastale: categorie[i] || '',
      renditaCatastale: rendite[i] || 0,
      quotaPossesso: 100, // Default 100%
      superficie: undefined,
      vani: undefined,
      abitazionePrincipale: false,
      locato: false,
      pertinenze: [],
      foglio: undefined,
      particella: undefined,
      subalterno: undefined,
      analisiCompleta: false,
      datiMancanti: []
    })
  }
  
  return properties.length > 0 ? properties : [createEmptyProperty(fileName)]
}

// Crea una proprietà vuota da completare manualmente
function createEmptyProperty(fileName: string) {
  return {
    id: generateId(),
    address: `Immobile da ${fileName}`,
    comune: '',
    provincia: '',
    codiceComune: '',
    categoriaCatastale: '',
    renditaCatastale: 0,
    quotaPossesso: 100, // Default 100%
    superficie: undefined,
    vani: undefined,
    abitazionePrincipale: false,
    locato: false,
    pertinenze: [],
    foglio: undefined,
    particella: undefined,
    subalterno: undefined,
    analisiCompleta: false,
    datiMancanti: ['abitazionePrincipale', 'locato', 'comune', 'provincia', 'categoriaCatastale', 'renditaCatastale']
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Funzione per normalizzare i nomi dei comuni (case-insensitive, rimuove spazi)
function normalizeComune(str: string) {
  return str.trim().toLowerCase().replace(/\s+/g, '')
}

// Funzione di lookup su Supabase
async function getMunicipalityData(comune: string, provincia: string) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON
  if (!supabaseUrl || !supabaseAnonKey) return null
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Normalizza il nome del comune
  const normalizedComune = normalizeComune(comune)
  const { data, error } = await supabase
    .from('municipalities')
    .select('name, province, codice')
    .ilike('name', normalizedComune)
    .eq('province', provincia.toUpperCase())
    .limit(1)
    .single()
  if (error || !data) return null
  return {
    name: data.name,
    province: data.province,
    codiceComune: data.codice
  }
}

// Dopo aver estratto le proprietà dall'AI, aggiorna ogni proprietà con i dati da municipalities
async function enrichPropertiesWithMunicipality(properties: any[]) {
  const enriched = []
  for (const prop of properties) {
    if (prop.comune && prop.provincia) {
      const municipality = await getMunicipalityData(prop.comune, prop.provincia)
      if (municipality) {
        enriched.push({
          ...prop,
          comune: municipality.name,
          provincia: municipality.province,
          codiceComune: municipality.codiceComune
        })
        continue
      }
    }
    enriched.push(prop)
  }
  return enriched
} 