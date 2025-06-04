"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
const delibereAnalyzer_1 = require("../../../lib/delibereAnalyzer");
async function GET(request) {
    try {
        console.log('📋 Richiesta lista delibere nel bucket...');
        const url = new URL(request.url);
        const bucketName = url.searchParams.get('bucket') || 'imu';
        const folderPath = url.searchParams.get('folder') || 'statements/2025';
        const files = await (0, delibereAnalyzer_1.listDelibereInBucket)(bucketName, folderPath);
        return server_1.NextResponse.json({
            success: true,
            bucket: bucketName,
            folder: folderPath,
            files: files,
            count: files.length,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Errore nel listare le delibere:', error);
        return server_1.NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Errore sconosciuto',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { fileName, bucketName = 'imu', folderPath = 'statements/2025' } = body;
        if (!fileName) {
            return server_1.NextResponse.json({
                success: false,
                error: 'Nome del file richiesto',
                timestamp: new Date().toISOString()
            }, { status: 400 });
        }
        console.log(`🔍 Analisi delibera: ${fileName} dal bucket ${bucketName}/${folderPath}`);
        const startTime = Date.now();
        const analysis = await (0, delibereAnalyzer_1.analyzeDeliberaFromSupabase)(bucketName, fileName, folderPath);
        const processingTime = Date.now() - startTime;
        console.log(`✅ Analisi completata in ${processingTime}ms`);
        console.log(`🏛️ Comune: ${analysis.municipalityInfo.name}`);
        console.log(`📊 Aliquota standard: ${analysis.imuRates.standardRate || 'Non trovata'}`);
        console.log(`🔒 Confidenza: ${analysis.analysisConfidence}`);
        return server_1.NextResponse.json({
            success: true,
            fileName,
            bucketName,
            folderPath,
            analysis,
            processingTime,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Errore nell\'analisi della delibera:', error);
        return server_1.NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Errore sconosciuto',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map