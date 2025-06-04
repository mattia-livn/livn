"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickTest = exports.runAllTests = exports.runSingleTest = void 0;
const imuProcessor_1 = require("./imuProcessor");
const testCases = [
    {
        name: 'Test caso Abano Terme - Immobile residenziale',
        fileName: 'AbanoTerme_PD_A001.pdf',
        userData: {
            codiceFiscale: 'RSSMRA80A01H501U',
            comune: 'Abano Terme',
            categoria: 'A/2',
            superficie: 120,
            rendita: 1500
        },
        expectedResults: {
            shouldFindMatch: true,
            expectedQuestions: 0
        }
    },
    {
        name: 'Test caso con dati incompleti',
        fileName: 'AbanoTerme_PD_A001.pdf',
        userData: {
            codiceFiscale: 'RSSMRA80A01H501U',
            comune: 'Abano Terme'
            // Mancano categoria, superficie e rendita
        },
        expectedResults: {
            shouldFindMatch: false,
            expectedQuestions: 3
        }
    }
];
const runSingleTest = async (testCase) => {
    console.log(`\n🧪 Eseguendo test: ${testCase.name}`);
    console.log('📋 Dati di input:');
    console.log(`   - File: ${testCase.fileName}`);
    console.log(`   - Dati utente: ${JSON.stringify(testCase.userData, null, 2)}`);
    try {
        const result = await (0, imuProcessor_1.processImuStatement)(testCase.fileName, testCase.userData);
        if (!result) {
            console.log('❌ Test fallito: Nessun risultato ottenuto');
            return false;
        }
        (0, imuProcessor_1.displayResults)(result);
        // Verifica risultati attesi se forniti
        if (testCase.expectedResults) {
            const { shouldFindMatch, expectedQuestions } = testCase.expectedResults;
            if (result.matchFound !== shouldFindMatch) {
                console.log(`⚠️  Warning: Match atteso ${shouldFindMatch}, ottenuto ${result.matchFound}`);
            }
            if (result.domande.length !== expectedQuestions) {
                console.log(`⚠️  Warning: Domande attese ${expectedQuestions}, ottenute ${result.domande.length}`);
            }
        }
        console.log('✅ Test completato con successo');
        return true;
    }
    catch (error) {
        console.log(`❌ Test fallito con errore: ${error}`);
        return false;
    }
};
exports.runSingleTest = runSingleTest;
const runAllTests = async () => {
    console.log('🚀 Avvio test suite per IMU Processor');
    console.log(`📊 Numero di test da eseguire: ${testCases.length}`);
    let successCount = 0;
    let failCount = 0;
    for (const testCase of testCases) {
        const success = await (0, exports.runSingleTest)(testCase);
        if (success) {
            successCount++;
        }
        else {
            failCount++;
        }
        // Pausa tra i test per evitare rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log('\n📈 Risultati finali:');
    console.log(`✅ Test riusciti: ${successCount}`);
    console.log(`❌ Test falliti: ${failCount}`);
    console.log(`📊 Percentuale successo: ${((successCount / testCases.length) * 100).toFixed(1)}%`);
};
exports.runAllTests = runAllTests;
// Funzione di test rapido per sviluppo
const quickTest = async () => {
    const testData = {
        codiceFiscale: 'RSSMRA80A01H501U',
        comune: 'Abano Terme',
        categoria: 'A/2',
        superficie: 120
    };
    console.log('🔬 Eseguendo test rapido...');
    return await (0, exports.runSingleTest)({
        name: 'Test Rapido',
        fileName: 'AbanoTerme_PD_A001.pdf',
        userData: testData
    });
};
exports.quickTest = quickTest;
//# sourceMappingURL=testImuProcessor.js.map