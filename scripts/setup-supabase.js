#!/usr/bin/env node

/**
 * Script per configurare i bucket Supabase
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function setupSupabase() {
  console.log('🚀 Setup Supabase per Livn\n')
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !serviceKey) {
    console.log('❌ Configurazione incompleta!')
    console.log('💡 Assicurati di aver configurato:')
    console.log('   - NEXT_PUBLIC_SUPABASE_URL')
    console.log('   - SUPABASE_SERVICE_ROLE_KEY')
    return
  }
  
  try {
    // Usa la service key per operazioni admin
    const supabase = createClient(url, serviceKey)
    console.log('✅ Client Supabase admin creato')
    
    // Crea bucket uploads (privato)
    console.log('\n📦 Creazione bucket "uploads"...')
    const { data: uploadsData, error: uploadsError } = await supabase.storage
      .createBucket('uploads', {
        public: false,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      })
    
    if (uploadsError && !uploadsError.message.includes('already exists')) {
      console.log('❌ Errore creazione bucket uploads:', uploadsError.message)
    } else {
      console.log('✅ Bucket "uploads" creato/esistente')
    }
    
    // Crea bucket imu (pubblico)
    console.log('\n📦 Creazione bucket "imu"...')
    const { data: imuData, error: imuError } = await supabase.storage
      .createBucket('imu', {
        public: true,
        allowedMimeTypes: ['application/pdf']
      })
    
    if (imuError && !imuError.message.includes('already exists')) {
      console.log('❌ Errore creazione bucket imu:', imuError.message)
    } else {
      console.log('✅ Bucket "imu" creato/esistente')
    }
    
    // Crea la cartella statements/2025 nel bucket imu
    console.log('\n📁 Creazione struttura cartelle...')
    const { data: folderData, error: folderError } = await supabase.storage
      .from('imu')
      .upload('statements/2025/.gitkeep', new Blob([''], { type: 'text/plain' }))
    
    if (folderError && !folderError.message.includes('already exists')) {
      console.log('❌ Errore creazione cartella:', folderError.message)
    } else {
      console.log('✅ Struttura cartelle creata')
    }
    
    console.log('\n🎉 Setup completato!')
    console.log('\n📋 Prossimi passi:')
    console.log('1. Carica le delibere comunali nel bucket "imu/statements/2025/"')
    console.log('2. Formato nome file: NomeComune_SiglaProvincia_CodiceComune.pdf')
    console.log('3. Esempio: Milano_MI_F205.pdf')
    
    // Test finale
    console.log('\n🔍 Verifica finale...')
    const { data: buckets } = await supabase.storage.listBuckets()
    const hasUploads = buckets.find(b => b.name === 'uploads')
    const hasImu = buckets.find(b => b.name === 'imu')
    
    console.log(`   - uploads: ${hasUploads ? '✅' : '❌'}`)
    console.log(`   - imu: ${hasImu ? '✅' : '❌'}`)
    
  } catch (error) {
    console.log('❌ Errore:', error.message)
  }
}

setupSupabase() 