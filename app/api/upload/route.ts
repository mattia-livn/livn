import { NextRequest, NextResponse } from 'next/server'
import { uploadDocument } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Upload API chiamata')
    
    // Debug variabili d'ambiente
    console.log('📋 Env check:')
    console.log('  SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
    console.log('  SUPABASE_ANON:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing')
    
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const userId = formData.get('userId') as string || 'anonymous'
    
    console.log(`📁 Files ricevuti: ${files.length}`)
    console.log(`👤 User ID: ${userId}`)
    
    if (!files || files.length === 0) {
      console.log('❌ Nessun file ricevuto')
      return NextResponse.json(
        { error: 'Nessun file caricato' },
        { status: 400 }
      )
    }
    
    console.log('📤 Inizio upload su Supabase...')
    
    const uploadPromises = files.map((file, index) => {
      console.log(`  File ${index + 1}: ${file.name} (${file.size} bytes)`)
      return uploadDocument(file, userId)
    })
    
    const uploadResults = await Promise.all(uploadPromises)
    
    console.log('✅ Upload completato!')
    console.log('📋 Risultati:', uploadResults)
    
    return NextResponse.json({
      success: true,
      files: uploadResults,
      message: `${files.length} file caricati con successo`
    })
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto'
    const errorStack = error instanceof Error ? error.stack : 'Stack non disponibile'
    
    console.error('❌ Errore durante l\'upload:', error)
    console.error('📋 Stack trace:', errorStack)
    return NextResponse.json(
      { error: `Errore durante l'upload dei file: ${errorMessage}` },
      { status: 500 }
    )
  }
} 