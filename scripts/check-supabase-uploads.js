#!/usr/bin/env node

/**
 * Script per verificare il contenuto del bucket uploads su Supabase
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function checkUploads() {
  console.log('🔍 Verifica bucket uploads su Supabase\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('❌ Variabili d\'ambiente mancanti')
    return
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  try {
    console.log('📦 Controllo bucket uploads...')
    
    const { data: files, error } = await supabase.storage
      .from('uploads')
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      })
    
    if (error) {
      console.error('❌ Errore:', error.message)
      return
    }
    
    console.log(`📁 File trovati: ${files.length}`)
    
    if (files.length === 0) {
      console.log('📭 Bucket vuoto - nessun file caricato')
    } else {
      console.log('\n📋 File presenti:')
      files.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.name} (${file.metadata?.size || 'N/A'} bytes)`)
        console.log(`     Creato: ${file.created_at}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Errore durante la verifica:', error.message)
  }
}

checkUploads().catch(console.error) 