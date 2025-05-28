#!/usr/bin/env node

/**
 * Script per testare la connessione Supabase
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('🔍 Test connessione Supabase\n')
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log('📋 Configurazione:')
  console.log('URL:', url ? '✅ Configurato' : '❌ Mancante')
  console.log('Anon Key:', anonKey ? '✅ Configurato' : '❌ Mancante')
  console.log('Service Key:', serviceKey ? '✅ Configurato' : '❌ Mancante')
  
  if (!url || !anonKey || !serviceKey) {
    console.log('\n❌ Configurazione incompleta!')
    console.log('💡 Verifica il file .env.local')
    return
  }
  
  try {
    // Test con service key (admin)
    const supabaseAdmin = createClient(url, serviceKey)
    console.log('\n✅ Client Supabase admin creato')
    
    console.log('\n🔗 Test connessione admin...')
    const { data, error } = await supabaseAdmin.storage.listBuckets()
    
    if (error) {
      console.log('❌ Errore connessione:', error.message)
      return
    }
    
    console.log('✅ Connessione admin riuscita!')
    console.log('\n📦 Bucket disponibili:')
    data.forEach(bucket => {
      console.log(`  - ${bucket.name} (${bucket.public ? 'pubblico' : 'privato'})`)
    })
    
    // Verifica bucket specifici
    const requiredBuckets = ['uploads', 'imu']
    console.log('\n🎯 Verifica bucket richiesti:')
    
    requiredBuckets.forEach(bucketName => {
      const exists = data.find(b => b.name === bucketName)
      console.log(`  - ${bucketName}: ${exists ? '✅ Presente' : '❌ Mancante'}`)
    })
    
    // Test accesso al bucket IMU
    if (data.find(b => b.name === 'imu')) {
      console.log('\n📁 Test contenuto bucket IMU...')
      const { data: files, error: filesError } = await supabaseAdmin.storage
        .from('imu')
        .list('statements/2025', { limit: 10 })
      
      if (filesError) {
        console.log('❌ Errore accesso bucket IMU:', filesError.message)
      } else {
        console.log(`✅ Trovati ${files.length} file nel bucket IMU`)
        if (files.length > 0) {
          console.log('   File presenti:')
          files.forEach(file => {
            console.log(`   - ${file.name}`)
          })
        } else {
          console.log('   📝 Bucket vuoto - carica le delibere comunali')
        }
      }
    }
    
    // Test con client normale (anon key)
    console.log('\n👤 Test client normale (anon key)...')
    const supabaseClient = createClient(url, anonKey)
    
    // Test upload simulato
    console.log('\n📤 Test upload simulato...')
    const testFile = new Blob(['test content'], { type: 'text/plain' })
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('uploads')
      .upload(`test/${Date.now()}-test.txt`, testFile)
    
    if (uploadError) {
      console.log('❌ Errore upload:', uploadError.message)
      console.log('💡 Potrebbe essere necessario configurare le policy RLS')
    } else {
      console.log('✅ Upload test riuscito!')
      
      // Rimuovi il file di test
      await supabaseClient.storage
        .from('uploads')
        .remove([uploadData.path])
    }
    
  } catch (error) {
    console.log('❌ Errore:', error.message)
  }
}

testSupabaseConnection() 