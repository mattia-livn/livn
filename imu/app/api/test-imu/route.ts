import { NextRequest, NextResponse } from 'next/server';
import { quickIMUTest } from '../../../lib/testIntegratedIMU';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Avvio test IMU via API...');
    
    // Esegui il test rapido
    const testResult = await quickIMUTest();
    
    return NextResponse.json({
      success: testResult,
      message: testResult ? 'Test IMU completato con successo' : 'Test IMU fallito',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Errore nell\'API test IMU:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { municipalRate = 10.6 } = body;
    
    console.log(`🚀 Avvio test IMU con aliquota ${municipalRate}‰...`);
    
    // Qui potresti implementare un test personalizzato
    // Per ora usa il test rapido
    const testResult = await quickIMUTest();
    
    return NextResponse.json({
      success: testResult,
      municipalRate,
      message: testResult ? 'Test IMU personalizzato completato' : 'Test IMU personalizzato fallito',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Errore nell\'API test IMU POST:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 