import { NextRequest, NextResponse } from 'next/server';
import { analyzeDeliberaFromSupabase, listDelibereInBucket } from '../../../lib/delibereAnalyzer';

export async function GET(request: NextRequest) {
  try {
    console.log('📋 Richiesta lista delibere nel bucket...');
    
    const url = new URL(request.url);
    const bucketName = url.searchParams.get('bucket') || 'imu';
    const folderPath = url.searchParams.get('folder') || 'statements/2025';
    
    const files = await listDelibereInBucket(bucketName, folderPath);
    
    return NextResponse.json({
      success: true,
      bucket: bucketName,
      folder: folderPath,
      files: files,
      count: files.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Errore nel listare le delibere:', error);
    
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
    const { fileName, bucketName = 'imu', folderPath = 'statements/2025' } = body;
    
    if (!fileName) {
      return NextResponse.json({
        success: false,
        error: 'Nome del file richiesto',
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }
    
    console.log(`🔍 Analisi delibera: ${fileName} dal bucket ${bucketName}/${folderPath}`);
    
    const startTime = Date.now();
    const analysis = await analyzeDeliberaFromSupabase(bucketName, fileName, folderPath);
    const processingTime = Date.now() - startTime;
    
    console.log(`✅ Analisi completata in ${processingTime}ms`);
    console.log(`🏛️ Comune: ${analysis.municipalityInfo.name}`);
    console.log(`📊 Aliquota standard: ${analysis.imuRates.standardRate || 'Non trovata'}`);
    console.log(`🔒 Confidenza: ${analysis.analysisConfidence}`);
    
    return NextResponse.json({
      success: true,
      fileName,
      bucketName,
      folderPath,
      analysis,
      processingTime,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Errore nell\'analisi della delibera:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 