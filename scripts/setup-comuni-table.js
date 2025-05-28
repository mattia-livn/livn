#!/usr/bin/env node

/**
 * Script per creare la tabella comuni su Supabase
 * e inserire i dati iniziali
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Carica variabili d'ambiente
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variabili d\'ambiente Supabase mancanti')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Dati iniziali dei comuni (aggiungeremo altri comuni man mano)
const comuniIniziali = [
  { nome: 'ALESSANDRIA', provincia: 'AL', codice_comune: 'A182' },
  { nome: 'MILANO', provincia: 'MI', codice_comune: 'F205' },
  { nome: 'ROMA', provincia: 'RM', codice_comune: 'H501' },
  { nome: 'TORINO', provincia: 'TO', codice_comune: 'L219' },
  { nome: 'NAPOLI', provincia: 'NA', codice_comune: 'F839' },
  { nome: 'GENOVA', provincia: 'GE', codice_comune: 'D969' },
  { nome: 'BOLOGNA', provincia: 'BO', codice_comune: 'A944' },
  { nome: 'FIRENZE', provincia: 'FI', codice_comune: 'D612' },
  { nome: 'VENEZIA', provincia: 'VE', codice_comune: 'L736' },
  { nome: 'PALERMO', provincia: 'PA', codice_comune: 'G273' }
]

async function setupComuniTable() {
  console.log('🏗️ Setup tabella comuni su Supabase...\n')
  
  try {
    // 1. Crea la tabella comuni (se non esiste)
    console.log('📋 Creazione tabella comuni...')
    
    const { error: createError } = await supabase.rpc('create_comuni_table', {})
    
    if (createError && !createError.message.includes('already exists')) {
      console.error('❌ Errore creazione tabella:', createError)
      
      // Prova con SQL diretto
      console.log('🔄 Tentativo con SQL diretto...')
      const { error: sqlError } = await supabase
        .from('comuni')
        .select('*')
        .limit(1)
      
      if (sqlError && sqlError.code === 'PGRST116') {
        console.log('📝 Tabella non esiste, la creiamo manualmente...')
        // La tabella non esiste, dobbiamo crearla tramite dashboard o SQL
        console.log(`
📋 Crea questa tabella manualmente su Supabase Dashboard:

CREATE TABLE comuni (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  provincia VARCHAR(2) NOT NULL,
  codice_comune VARCHAR(4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(nome, provincia)
);

-- Indici per performance
CREATE INDEX idx_comuni_nome ON comuni(nome);
CREATE INDEX idx_comuni_codice ON comuni(codice_comune);
        `)
        return
      }
    }
    
    console.log('✅ Tabella comuni pronta')
    
    // 2. Inserisci i dati iniziali
    console.log('📝 Inserimento dati iniziali...')
    
    for (const comune of comuniIniziali) {
      const { error: insertError } = await supabase
        .from('comuni')
        .upsert(comune, { 
          onConflict: 'nome,provincia',
          ignoreDuplicates: false 
        })
      
      if (insertError) {
        console.log(`⚠️ Errore inserimento ${comune.nome}:`, insertError.message)
      } else {
        console.log(`✅ ${comune.nome} (${comune.provincia}) → ${comune.codice_comune}`)
      }
    }
    
    // 3. Verifica i dati inseriti
    console.log('\n📊 Verifica dati inseriti:')
    const { data: comuni, error: selectError } = await supabase
      .from('comuni')
      .select('*')
      .order('nome')
    
    if (selectError) {
      console.error('❌ Errore lettura comuni:', selectError)
    } else {
      console.log(`📋 Totale comuni: ${comuni.length}`)
      comuni.forEach(c => {
        console.log(`   ${c.nome} (${c.provincia}) → ${c.codice_comune}`)
      })
    }
    
    console.log('\n✅ Setup completato!')
    console.log('💡 Ora puoi aggiungere altri comuni tramite dashboard o API')
    
  } catch (error) {
    console.error('❌ Errore generale:', error)
  }
}

// Esegui setup
setupComuniTable() 