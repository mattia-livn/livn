"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commune_conditions_service_1 = require("./services/commune-conditions-service");
class MockLivnAPIServer {
    constructor() {
        this.communeConditionsService = new commune_conditions_service_1.CommuneConditionsService();
    }
    async generateQuestions(extractedData, userAnswers) {
        var _a, _b, _c;
        console.log('🤔 === GENERAZIONE DOMANDE MOCK ===');
        const questions = [];
        // Step 1: Abitazione principale
        if (!userAnswers.abitazione_principale) {
            const abitazioni = ((_a = extractedData.fabbricati) === null || _a === void 0 ? void 0 : _a.filter((fab) => { var _a; return ((_a = fab.categoria) === null || _a === void 0 ? void 0 : _a.startsWith('A/')) && fab.categoria !== 'A/10'; })) || [];
            if (abitazioni.length > 0) {
                questions.push({
                    id: 'abitazione_principale',
                    type: 'select',
                    title: '🏠 Qual è la tua abitazione principale?',
                    options: [
                        ...abitazioni.map((hab, index) => ({
                            value: index.toString(),
                            label: `🏠 ${hab.ubicazione} - ${hab.categoria} - ${hab.comune}`
                        })),
                        { value: 'nessuna', label: '❌ Nessuna abitazione principale' }
                    ]
                });
            }
        }
        // Step 4: Domande specifiche del comune
        const comunePrincipale = ((_c = (_b = extractedData.fabbricati) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.comune) || '';
        if (comunePrincipale && userAnswers.condizioni_immobili && !userAnswers.domande_specifiche_comune) {
            console.log(`🏛️ Generazione domande specifiche per: ${comunePrincipale}`);
            try {
                const domandeSpecifiche = await this.communeConditionsService.generateCommuneSpecificQuestions(extractedData, comunePrincipale);
                if (domandeSpecifiche.length > 0) {
                    questions.push({
                        id: 'domande_specifiche_comune',
                        type: 'object',
                        title: `🏛️ Domande specifiche per ${comunePrincipale}`,
                        fields: domandeSpecifiche
                    });
                }
            }
            catch (error) {
                console.error(`❌ Errore domande specifiche:`, error);
            }
        }
        return questions;
    }
    getMoltiplicatore(categoria) {
        const moltiplicatori = {
            'A/1': 176, 'A/8': 176, 'A/9': 176,
            'A/2': 126, 'A/3': 126, 'A/4': 126, 'A/5': 126, 'A/6': 126, 'A/7': 126,
            'A/10': 63, 'A/11': 63,
            'C/1': 63, 'C/2': 140, 'C/3': 140, 'C/4': 140, 'C/5': 140,
            'C/6': 53, 'C/7': 53
        };
        return moltiplicatori[categoria] || 126;
    }
    async calculateIMU(extractedData, userAnswers) {
        var _a, _b, _c;
        console.log('💰 === CALCOLO IMU END-TO-END ===');
        const details = [];
        let totalIMU = 0;
        // Determina il comune principale
        const comunePrincipale = ((_c = (_b = (_a = extractedData.fabbricati) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.comune) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || 'standard';
        console.log('🏛️ Comune per aliquote:', comunePrincipale);
        for (const [index, fabbricato] of extractedData.fabbricati.entries()) {
            const isPrimaCasa = userAnswers.abitazione_principale === index.toString();
            const categorieDetrazione = ['A/1', 'A/8', 'A/9'];
            const isLusso = categorieDetrazione.includes(fabbricato.categoria);
            const baseImponibile = fabbricato.rendita * 1.05 * this.getMoltiplicatore(fabbricato.categoria);
            let aliquota = 0;
            let detrazione = 0;
            let importo = 0;
            let tipoCalculazione = '';
            if (isPrimaCasa && !isLusso) {
                // Abitazione principale non di lusso: ESENTE
                aliquota = 0;
                importo = 0;
                tipoCalculazione = 'Abitazione principale (ESENTE)';
            }
            else {
                // Altri immobili: usa condizioni del comune
                try {
                    const conditionResult = await this.communeConditionsService.findBestCondition(fabbricato, userAnswers, index, comunePrincipale);
                    aliquota = conditionResult.aliquota;
                    if (isPrimaCasa && isLusso) {
                        detrazione = 200;
                        importo = Math.max(0, (baseImponibile * aliquota / 100) - detrazione);
                        tipoCalculazione = `Abitazione principale di lusso - ${conditionResult.descrizione}`;
                    }
                    else {
                        importo = baseImponibile * aliquota / 100;
                        tipoCalculazione = conditionResult.descrizione;
                    }
                    console.log(`🎯 Condizione applicata: ${conditionResult.descrizione} (score: ${conditionResult.matchingScore})`);
                }
                catch (error) {
                    console.error(`❌ Errore condizioni:`, error);
                    aliquota = 1.06;
                    importo = baseImponibile * aliquota / 100;
                    tipoCalculazione = 'Fallback standard';
                }
            }
            details.push({
                immobile: `${fabbricato.ubicazione} - ${fabbricato.categoria}`,
                categoria: fabbricato.categoria,
                baseImponibile,
                aliquota,
                detrazione,
                importo,
                tipo: tipoCalculazione
            });
            totalIMU += importo;
        }
        return {
            totalIMU,
            acconto: totalIMU / 2,
            saldo: totalIMU / 2,
            details
        };
    }
}
async function testIntegrationEndToEnd() {
    var _a, _b;
    console.log('🚀 === TEST INTEGRAZIONE END-TO-END ===\n');
    const server = new MockLivnAPIServer();
    // Test 1: Scenario completo con Milano
    console.log('📋 TEST 1: Scenario completo Milano\n');
    const extractedDataMilano = {
        fabbricati: [
            {
                categoria: 'A/2',
                comune: 'Milano',
                ubicazione: 'Via Brera 10',
                rendita: 2000
            },
            {
                categoria: 'A/3',
                comune: 'Milano',
                ubicazione: 'Via Montenapoleone 5',
                rendita: 1500
            },
            {
                categoria: 'C/2',
                comune: 'Milano',
                ubicazione: 'Box Via Brera',
                rendita: 300
            }
        ]
    };
    // Step 1: Genera domande iniziali
    let userAnswers = {};
    let questions = await server.generateQuestions(extractedDataMilano, userAnswers);
    console.log(`🤔 Domande generate (step 1): ${questions.length}`);
    console.log('Prima domanda:', (_a = questions[0]) === null || _a === void 0 ? void 0 : _a.title);
    // Step 2: Risponde abitazione principale
    userAnswers.abitazione_principale = '0'; // Prima casa
    questions = await server.generateQuestions(extractedDataMilano, userAnswers);
    console.log(`🤔 Domande generate (step 2): ${questions.length}`);
    // Step 3: Imposta condizioni immobili
    userAnswers.condizioni_immobili = {
        'immobile_1': 'locato' // Seconda casa locata
    };
    // Step 4: Genera domande specifiche del comune
    questions = await server.generateQuestions(extractedDataMilano, userAnswers);
    console.log(`🤔 Domande specifiche Milano: ${questions.length}`);
    if (questions.length > 0) {
        console.log('Domanda specifica:', (_b = questions[0]) === null || _b === void 0 ? void 0 : _b.title);
    }
    // Step 5: Calcola IMU finale
    userAnswers.domande_specifiche_comune = {}; // Simula completamento
    const risultato = await server.calculateIMU(extractedDataMilano, userAnswers);
    console.log('\n💰 === RISULTATO FINALE ===');
    console.log(`Totale IMU: €${risultato.totalIMU.toFixed(2)}`);
    console.log(`Acconto: €${risultato.acconto.toFixed(2)}`);
    console.log(`Saldo: €${risultato.saldo.toFixed(2)}`);
    console.log('\n📊 Dettaglio per immobile:');
    risultato.details.forEach((detail, i) => {
        console.log(`${i + 1}. ${detail.immobile}`);
        console.log(`   - Categoria: ${detail.categoria}`);
        console.log(`   - Base imponibile: €${detail.baseImponibile.toFixed(2)}`);
        console.log(`   - Aliquota: ${detail.aliquota}%`);
        console.log(`   - IMU: €${detail.importo.toFixed(2)}`);
        console.log(`   - Tipo: ${detail.tipo}`);
    });
    // Test 2: Verifica che le condizioni comunali vengano effettivamente utilizzate
    console.log('\n\n📋 TEST 2: Verifica utilizzo condizioni dinamiche\n');
    const verificaPersonalizzazione = risultato.details.some((detail) => !detail.tipo.includes('fallback') &&
        !detail.tipo.includes('standard') &&
        detail.aliquota !== 1.06 &&
        detail.aliquota !== 0.76);
    if (verificaPersonalizzazione) {
        console.log('✅ SUCCESSO: Il sistema utilizza condizioni personalizzate del comune!');
    }
    else {
        console.log('⚠️ ATTENZIONE: Il sistema sta ancora usando aliquote standard');
    }
    // Test 3: Verifica performance
    console.log('\n📋 TEST 3: Test performance\n');
    const startTime = Date.now();
    await server.calculateIMU(extractedDataMilano, userAnswers);
    const endTime = Date.now();
    console.log(`⚡ Tempo calcolo: ${endTime - startTime}ms`);
    if (endTime - startTime < 1000) {
        console.log('✅ Performance accettabile (<1s)');
    }
    else {
        console.log('⚠️ Performance da ottimizzare (>1s)');
    }
    console.log('\n🎉 === TEST INTEGRAZIONE COMPLETATO ===');
}
testIntegrationEndToEnd().catch(console.error);
//# sourceMappingURL=test-integration-end-to-end.js.map