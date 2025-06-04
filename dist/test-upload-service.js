"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const upload_service_1 = require("./services/upload-service");
async function testUploadService() {
    var _a, _b, _c;
    console.log('📤 TEST UPLOAD SERVICE SENZA STORAGE PERSISTENTE');
    console.log('='.repeat(60));
    // Configura servizio con directory temp locale
    const uploadService = new upload_service_1.UploadService({
        tempDir: path.join(__dirname, 'temp-test'),
        maxFileSize: 5, // 5MB per test
        cleanupAfterMs: 60 * 1000 // 1 minuto per test
    });
    try {
        // Test 1: Download template CSV
        console.log('\n📄 1️⃣ Test generazione template');
        const template = uploadService.generateTemplate();
        console.log(`✅ Template generato:
   📄 Nome file: ${template.fileName}
   📏 Dimensione: ${template.content.length} caratteri
   🔍 Preview: ${template.content.split('\n')[0].slice(0, 50)}...`);
        // Test 2: Upload e processing CSV valido
        console.log('\n🏠 2️⃣ Test upload file CSV valido');
        const csvTest = `tipo,comune,provincia,foglio,particella,subalterno,categoria,classe,consistenza,superficie,rendita,qualita,reddito_dominicale,reddito_agrario,ubicazione,zona,piano,interno,codice_catastale,sezione,sezione_urbana
fabbricato,Roma,RM,100,200,1,A/2,3,5.5,90,1500.00,,,,"Via del Corso 1","Zona 1",3,"int. A",H501,,
terreno,Roma,RM,101,201,,,2,,3000,,SEMINATIVO,200.00,150.00,"Località Campagna",,,,H501,B,`;
        const csvBuffer = Buffer.from(csvTest, 'utf8');
        try {
            const sessionId = await uploadService.processUpload(csvBuffer, 'test-immobili.csv', 'text/csv');
            console.log(`✅ Upload processato con successo!
   🆔 Session ID: ${sessionId}
   📊 Dimensione: ${csvBuffer.length} bytes`);
            // Recupera risultati
            const session = uploadService.getSessionResult(sessionId);
            if (session && session.result) {
                console.log(`
📊 Risultati parsing:
   ✅ Successo: ${session.result.success}
   🏠 Fabbricati: ${session.result.fabbricati.length}
   🌾 Terreni: ${session.result.terreni.length}
   ❌ Errori: ${session.result.errors.length}
   📅 Processato: ${session.uploadedAt.toLocaleString('it-IT')}
   ⏰ Scade: ${session.expiresAt.toLocaleString('it-IT')}`);
                if (session.result.fabbricati.length > 0) {
                    const fab = session.result.fabbricati[0];
                    console.log(`\n🏠 Primo fabbricato estratto:
   📍 ${fab.comune} (${fab.provincia})
   🗂️  Fg.${fab.foglio} Part.${fab.particella} Sub.${fab.subalterno}
   🏷️  Cat.${fab.categoria} Cl.${fab.classe}
   💰 Rendita: €${fab.rendita}`);
                }
                if (session.result.terreni.length > 0) {
                    const ter = session.result.terreni[0];
                    console.log(`\n🌾 Primo terreno estratto:
   📍 ${ter.comune} (${ter.provincia})
   🗂️  Fg.${ter.foglio} Part.${ter.particella}
   🌱 Qual.${ter.qualita} Cl.${ter.classe}
   💰 RD: €${ter.redditoDominicale}, RA: €${ter.redditoAgrario}`);
                }
            }
        }
        catch (error) {
            console.log(`❌ Errore upload: ${error.message}`);
        }
        // Test 3: File troppo grande
        console.log('\n🚫 3️⃣ Test file troppo grande');
        try {
            const bigBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB
            const sessionId = await uploadService.processUpload(bigBuffer, 'file-troppo-grande.csv', 'text/csv');
            console.log('❌ ERRORE: Non dovrebbe accettare file troppo grandi!');
        }
        catch (error) {
            console.log(`✅ Errore atteso: ${error.message}`);
        }
        // Test 4: Tipo file non supportato
        console.log('\n🚫 4️⃣ Test tipo file non supportato');
        try {
            const invalidBuffer = Buffer.from('contenuto test', 'utf8');
            const sessionId = await uploadService.processUpload(invalidBuffer, 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            console.log('❌ ERRORE: Non dovrebbe accettare file .docx!');
        }
        catch (error) {
            console.log(`✅ Errore atteso: ${error.message}`);
        }
        // Test 5: CSV malformato
        console.log('\n⚠️  5️⃣ Test CSV malformato');
        try {
            const badCsv = `tipo,comune
fabbricato`; // CSV incompleto
            const badBuffer = Buffer.from(badCsv, 'utf8');
            const sessionId = await uploadService.processUpload(badBuffer, 'csv-malformato.csv', 'text/csv');
            const session = uploadService.getSessionResult(sessionId);
            if (session) {
                console.log(`📊 Risultato CSV malformato:
   ✅ Successo: ${((_a = session.result) === null || _a === void 0 ? void 0 : _a.success) || false}
   ❌ Errori: ${((_b = session.result) === null || _b === void 0 ? void 0 : _b.errors.length) || 0}`);
                if ((_c = session.result) === null || _c === void 0 ? void 0 : _c.errors.length) {
                    console.log('   Errori rilevati:');
                    session.result.errors.forEach((err, i) => {
                        console.log(`   ${i + 1}. ${err}`);
                    });
                }
            }
        }
        catch (error) {
            console.log(`❌ Errore CSV malformato: ${error.message}`);
        }
        // Test 6: Statistiche del servizio
        console.log('\n📈 6️⃣ Statistiche del servizio');
        const stats = uploadService.getStats();
        console.log(`📊 Statistiche:
   🔄 Sessioni attive: ${stats.activeSessions}
   ✅ Completate oggi: ${stats.completedToday}
   ❌ Errori oggi: ${stats.errorsToday}
   💾 Temp dir: ${stats.tempDirSize} KB`);
        // Test 7: Verifica che i file temporanei siano stati cancellati
        console.log('\n🧹 7️⃣ Verifica cancellazione file temporanei');
        const tempDir = path.join(__dirname, 'temp-test');
        if (fs.existsSync(tempDir)) {
            const files = fs.readdirSync(tempDir);
            console.log(`📁 File nella directory temp: ${files.length}`);
            if (files.length > 0) {
                console.log('   File trovati:');
                files.forEach(file => console.log(`   - ${file}`));
            }
            else {
                console.log('✅ Directory temp vuota - file cancellati correttamente!');
            }
        }
        else {
            console.log('✅ Directory temp non esiste - tutto pulito!');
        }
        // Test 8: Sessione inesistente
        console.log('\n🔍 8️⃣ Test sessione inesistente');
        const fakeSession = uploadService.getSessionResult('fake-session-id');
        console.log(`📊 Sessione fake: ${fakeSession ? 'TROVATA (errore!)' : 'Non trovata (corretto)'}`);
        console.log('\n💡 9️⃣ Vantaggi di questo approccio');
        console.log(`
🎯 VANTAGGI UPLOAD SERVICE SENZA STORAGE PERSISTENTE:

✅ PRIVACY E SICUREZZA:
   • File cancellati immediatamente dopo processing
   • Nessun dato sensibile conservato a lungo termine
   • Conformità GDPR automatica

✅ COSTI:
   • Zero costi di storage cloud
   • Solo processing temporaneo in memoria
   • Scalabilità senza costi aggiuntivi

✅ PERFORMANCE:
   • Processing veloce senza I/O di rete
   • Cleanup automatico ogni 5 minuti
   • Gestione memoria ottimizzata

✅ SEMPLICITÀ:
   • Nessuna configurazione cloud storage
   • Deploy semplificato
   • Zero dipendenze esterne

🔄 FLUSSO:
   1. Upload file → Buffer in memoria
   2. Validazione immediata
   3. Parsing e estrazione dati
   4. Cancellazione file temporaneo
   5. Conservazione solo dati estratti (30 min)
   6. Cleanup automatico sessioni scadute

📋 QUESTO È SUFFICIENTE PER IMU 2025!
   Gli utenti ottengono i dati catastali estratti
   senza compromettere privacy o sostenere costi extra.
`);
    }
    finally {
        // Cleanup e shutdown
        uploadService.cleanup();
        uploadService.shutdown();
        // Rimuovi directory test
        const tempDir = path.join(__dirname, 'temp-test');
        if (fs.existsSync(tempDir)) {
            try {
                fs.rmSync(tempDir, { recursive: true, force: true });
                console.log('\n🧹 Directory test rimossa');
            }
            catch (error) {
                console.warn('⚠️  Impossibile rimuovere directory test:', error);
            }
        }
    }
}
testUploadService()
    .then(() => console.log('\n✅ Test upload service completato'))
    .catch(error => console.error('\n❌ Test fallito:', error));
//# sourceMappingURL=test-upload-service.js.map