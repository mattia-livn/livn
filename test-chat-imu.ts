import * as fs from 'fs';
import * as path from 'path';
import { ChatIMUService } from './services/chat-imu-service';

async function testChatIMUService() {
  console.log('💬 TEST CHAT IMU SERVICE - CONVERSAZIONE COMPLETA');
  console.log('=' .repeat(60));

  const chatService = new ChatIMUService();

  try {
    // 1. Inizia nuova sessione
    console.log('\n🚀 1️⃣ Avvio nuova sessione chat');
    const sessionId = chatService.startNewSession();
    console.log(`✅ Sessione creata: ${sessionId}`);

    // Ottieni stato iniziale
    const initialState = chatService.getSessionState(sessionId);
    console.log(`📋 Fase iniziale: ${initialState?.phase}`);
    console.log(`💬 Messaggio di benvenuto: ${initialState?.conversationHistory?.[0]?.content.slice(0, 50)}...`);

    // 2. Simula upload file CSV
    console.log('\n📤 2️⃣ Simulazione upload file visure');
    
    const csvContent = `tipo,comune,provincia,foglio,particella,subalterno,categoria,classe,consistenza,superficie,rendita,qualita,reddito_dominicale,reddito_agrario,ubicazione,zona,piano,interno,codice_catastale,sezione,sezione_urbana
fabbricato,Milano,MI,123,456,1,A/2,3,5.5,90,1234.56,,,,"Via Roma 1","Zona 1",2,"int. A",F205,,
fabbricato,Milano,MI,124,789,2,C/1,2,1,,890.00,,,,"Via Verdi 10","Zona 2",1,"",F205,,
terreno,Milano,MI,125,101,,,2,,5000,,SEMINATIVO,123.45,89.10,"Località Campagna",,,,F205,A,`;

    const files = [
      {
        buffer: Buffer.from(csvContent, 'utf8'),
        name: 'visure-test.csv',
        mimeType: 'text/csv'
      }
    ];

    const uploadMessages = await chatService.handleFileUpload(sessionId, files);
    console.log(`✅ Upload processato, ${uploadMessages.length} messaggi generati:`);
    
    uploadMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
      if (msg.metadata) {
        console.log(`      Metadata: ${JSON.stringify(msg.metadata)}`);
      }
    });

    // 3. Controlla stato dopo upload
    console.log('\n🔍 3️⃣ Stato dopo upload');
    const postUploadState = chatService.getSessionState(sessionId);
    console.log(`📋 Fase corrente: ${postUploadState?.phase}`);
    console.log(`💬 Totale messaggi: ${postUploadState?.conversationHistory?.length || 0}`);

    // 4. Simula risposta utente
    console.log('\n💬 4️⃣ Simulazione risposta utente');
    const userMessage = "I dati sembrano corretti, procediamo";
    const userMessages = await chatService.handleUserMessage(sessionId, userMessage);
    
    console.log(`✅ Risposta utente processata:`);
    userMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
    });

    // 5. Simula azione "procedi alle domande"
    console.log('\n❓ 5️⃣ Avvio questionario');
    const questionMessages = await chatService.handleUserAction(sessionId, 'proceed_to_questions');
    
    console.log(`✅ Questionario avviato:`);
    questionMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
      if (msg.metadata?.questionId) {
        console.log(`      Domanda ID: ${msg.metadata.questionId}`);
      }
    });

    // 6. Simula risposta alla prima domanda (residenza principale)
    console.log('\n🏠 6️⃣ Risposta domanda residenza');
    const answerData = {
      questionId: 'residenza_principale',
      answer: '0' // Prima opzione (Via Roma 1)
    };
    
    const answerMessages = await chatService.handleUserAction(sessionId, 'answer_question', answerData);
    
    console.log(`✅ Risposta registrata:`);
    answerMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
    });

    // 7. Simula risposta alla seconda domanda (agevolazioni)
    console.log('\n💰 7️⃣ Risposta domanda agevolazioni');
    const agevolazioniData = {
      questionId: 'agevolazioni',
      answer: 'prima_casa'
    };
    
    const agevolazioniMessages = await chatService.handleUserAction(sessionId, 'answer_question', agevolazioniData);
    
    console.log(`✅ Agevolazioni registrate:`);
    agevolazioniMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
    });

    // 8. A questo punto dovrebbe partire automaticamente il calcolo
    console.log('\n🧮 8️⃣ Verifica calcolo automatico');
    const finalState = chatService.getSessionState(sessionId);
    console.log(`📋 Fase finale: ${finalState?.phase}`);
    
    // Cerca messaggio di calcolo nella cronologia
    const calculationMessage = finalState?.conversationHistory?.find(msg => 
      msg.type === 'calculation' && msg.sender === 'ai'
    );
    
    if (calculationMessage) {
      console.log(`✅ Calcolo IMU completato!`);
      console.log(`💰 Risultato: ${calculationMessage.content.slice(0, 200)}...`);
      
      if (calculationMessage.metadata?.calculation) {
        const calc = calculationMessage.metadata.calculation;
        console.log(`\n📊 Dettagli calcolo:`);
        console.log(`   💰 IMU Totale: €${calc.totalIMU?.toFixed(2)}`);
        console.log(`   🏠 Immobili calcolati: ${calc.details?.length}`);
        console.log(`   📅 Scadenze: ${calc.scadenze?.length}`);
      }
    }

    // 9. Simula generazione report
    console.log('\n📑 9️⃣ Generazione report PDF');
    const reportMessages = await chatService.handleUserAction(sessionId, 'generate_report');
    
    console.log(`✅ Report generato:`);
    reportMessages.forEach((msg, i) => {
      console.log(`   ${i + 1}. [${msg.sender.toUpperCase()}] ${msg.content.slice(0, 80)}...`);
      if (msg.metadata?.reportContent) {
        console.log(`      📄 Dimensione report: ${msg.metadata.reportContent.length} caratteri`);
        console.log(`      📁 Nome file: ${msg.metadata.fileName}`);
      }
    });

    // 10. Statistiche finali
    console.log('\n📈 🔟 Statistiche sessione completa');
    const stats = chatService.getSessionState(sessionId);
    if (stats && stats.startedAt && stats.conversationHistory) {
      console.log(`📊 Statistiche conversazione:`);
      console.log(`   ⏱️  Durata: ${Date.now() - stats.startedAt.getTime()}ms`);
      console.log(`   💬 Messaggi totali: ${stats.conversationHistory.length}`);
      console.log(`   📝 Fasi attraversate: welcome → analysis → questions → calculation → report`);
      
      const messagesByType = stats.conversationHistory.reduce((acc, msg) => {
        acc[msg.type] = (acc[msg.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log(`   📋 Messaggi per tipo:`);
      Object.entries(messagesByType).forEach(([type, count]) => {
        console.log(`      ${type}: ${count}`);
      });

      const messagesBySender = stats.conversationHistory.reduce((acc, msg) => {
        acc[msg.sender] = (acc[msg.sender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log(`   👥 Messaggi per mittente:`);
      Object.entries(messagesBySender).forEach(([sender, count]) => {
        console.log(`      ${sender}: ${count}`);
      });
    }

    // 11. Test template CSV
    console.log('\n📄 1️⃣1️⃣ Test template CSV');
    const template = chatService.getCSVTemplate();
    console.log(`✅ Template generato:`);
    console.log(`   📁 Nome: ${template.fileName}`);
    console.log(`   📏 Dimensione: ${template.content.length} caratteri`);
    console.log(`   🔍 Header: ${template.content.split('\n')[0]}`);

    console.log('\n🎯 VANTAGGI INTERFACCIA CONVERSAZIONALE:');
    console.log(`
✅ USER EXPERIENCE:
   • Interfaccia familiare tipo ChatGPT
   • Guida step-by-step automatica
   • Feedback immediato su ogni azione
   • Spiegazioni chiare della logica applicata

✅ PROCESSO SEMPLIFICATO:
   • Upload → Analisi → Domande → Calcolo → Report
   • Nessun form complesso da compilare
   • Domande contestuali basate sui dati
   • Validazione automatica input

✅ TRASPARENZA:
   • Ogni passaggio spiegato
   • Logica di calcolo mostrata
   • Avvertenze e raccomandazioni
   • Report dettagliato scaricabile

✅ FLESSIBILITÀ:
   • Correzioni in tempo reale
   • Modifica dati se necessario
   • Ripetizione calcolo con nuovi parametri
   • Sessioni persistent per 1 ora

💡 QUESTA È L'EVOLUZIONE DELL'IMU 2025!
   Da form complessi a conversazione naturale
   Da calcoli manuali a assistente intelligente
   Da risultati secchi a spiegazioni dettagliate
`);

  } catch (error) {
    console.error('\n❌ Errore durante il test:', error);
  }
}

testChatIMUService()
  .then(() => console.log('\n✅ Test chat IMU service completato'))
  .catch(error => console.error('\n❌ Test fallito:', error)); 