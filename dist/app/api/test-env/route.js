"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
async function GET(request) {
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
        return server_1.NextResponse.json({
            success: true,
            environment: envCheck,
            message: 'Test variabili d\'ambiente completato'
        });
    }
    catch (error) {
        console.error('Errore nel test environment:', error);
        return server_1.NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Errore sconosciuto',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map