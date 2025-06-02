import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envCheck = {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '✅ Configurata' : '❌ Mancante',
      SUPABASE_URL: process.env.SUPABASE_URL ? '✅ Configurata' : '❌ Mancante',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? '✅ Configurata' : '❌ Mancante',
      OPENAI_KEY_LENGTH: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };

    console.log('🔍 Environment check:', envCheck);

    return NextResponse.json({
      success: true,
      environment: envCheck,
      message: 'Test variabili d\'ambiente completato'
    });

  } catch (error) {
    console.error('Errore nel test environment:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 