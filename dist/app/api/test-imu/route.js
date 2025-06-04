"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
const testIntegratedIMU_1 = require("../../../lib/testIntegratedIMU");
async function GET(request) {
    try {
        console.log('🚀 Avvio test IMU via API...');
        // Esegui il test rapido
        const testResult = await (0, testIntegratedIMU_1.quickIMUTest)();
        return server_1.NextResponse.json({
            success: testResult,
            message: testResult ? 'Test IMU completato con successo' : 'Test IMU fallito',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Errore nell\'API test IMU:', error);
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
        const { municipalRate = 10.6 } = body;
        console.log(`🚀 Avvio test IMU con aliquota ${municipalRate}‰...`);
        // Qui potresti implementare un test personalizzato
        // Per ora usa il test rapido
        const testResult = await (0, testIntegratedIMU_1.quickIMUTest)();
        return server_1.NextResponse.json({
            success: testResult,
            municipalRate,
            message: testResult ? 'Test IMU personalizzato completato' : 'Test IMU personalizzato fallito',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Errore nell\'API test IMU POST:', error);
        return server_1.NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Errore sconosciuto',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map