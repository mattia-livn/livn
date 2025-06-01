// Esempio pratico di utilizzo del sistema di mappatura catastale

import { FabbricatoCatastale, TerrenoCatastale } from '../types/catasto';
import { CatastoMapper, CatastoFactory } from '../data/catasto-mapper';

/**
 * Esempi di dati catastali reali
 */

// Esempio 1: Abitazione principale a Torino
const fabbricatoTorino: FabbricatoCatastale = {
  comune: "TORINO",
  sezione: "U",
  foglio: "115", 
  particella: "456",
  subalterno: "10",
  indirizzo: "VIA ROMA n. 23 Piano 2",
  zonaCensuaria: "1",
  categoria: "A/2",
  classe: "3",
  consistenza: "5 vani",
  superficieCatastale: "90 m²",
  rendita: "€ 523,45",
  titolarita: "Proprietà per 1/1"
};

// Esempio 2: Terreno agricolo ad Asti
const terrenoAsti: TerrenoCatastale = {
  comune: "ASTI",
  sezione: "C",
  foglio: "122",
  particella: "89", 
  qualita: "Seminativo",
  classe: "3",
  superficie: "3.200 m²",
  redditoDominicale: "€ 15,45",
  redditoAgrario: "€ 12,34",
  titolarita: "Proprietà per 1/1",
  altreInformazioni: "Ultimo frazionamento: 2020"
};

// Esempio 3: Negozio a Milano
const negozioMilano: FabbricatoCatastale = {
  comune: "MILANO",
  foglio: "2035",
  particella: "123",
  subalterno: "2",
  indirizzo: "CORSO BUENOS AIRES n. 45 Piano T",
  zonaCensuaria: "3",
  categoria: "C/1",
  classe: "4", 
  consistenza: "65 m²",
  superficieCatastale: "65 m²",
  rendita: "€ 1.250,00",
  titolarita: "Proprietà per 1/2"
};

/**
 * Funzione di test per dimostrare il funzionamento
 */
export function testCatastoMapping() {
  console.log('🏠 TEST SISTEMA MAPPATURA CATASTALE\n');

  // Test 1: Fabbricato a Torino
  console.log('📍 CASO 1: Abitazione a Torino');
  const datoFabbricato = CatastoFactory.creaFabbricato(fabbricatoTorino);
  const elaborazioneFabbricato = CatastoMapper.elaboraDatiCatastali(datoFabbricato);
  
  console.log('Dati originali:', JSON.stringify(datoFabbricato, null, 2));
  console.log('Informazioni derivate:', JSON.stringify(elaborazioneFabbricato.informazioniDerivate, null, 2));
  console.log('Parametri per matching:', JSON.stringify(elaborazioneFabbricato.parametriPerMatching, null, 2));
  console.log('Condizioni applicabili:', elaborazioneFabbricato.condizioniApplicabili);
  console.log('Errori:', elaborazioneFabbricato.errori);
  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Terreno ad Asti
  console.log('🌾 CASO 2: Terreno agricolo ad Asti');
  const datoTerreno = CatastoFactory.creaTerreno(terrenoAsti);
  const elaborazioneTerreno = CatastoMapper.elaboraDatiCatastali(datoTerreno);
  
  console.log('Dati originali:', JSON.stringify(datoTerreno, null, 2));
  console.log('Informazioni derivate:', JSON.stringify(elaborazioneTerreno.informazioniDerivate, null, 2));
  console.log('Parametri per matching:', JSON.stringify(elaborazioneTerreno.parametriPerMatching, null, 2));
  console.log('Condizioni applicabili:', elaborazioneTerreno.condizioniApplicabili);
  console.log('Errori:', elaborazioneTerreno.errori);
  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Negozio a Milano
  console.log('🏪 CASO 3: Negozio a Milano');
  const datoNegozio = CatastoFactory.creaFabbricato(negozioMilano);
  const elaborazioneNegozio = CatastoMapper.elaboraDatiCatastali(datoNegozio);
  
  console.log('Dati originali:', JSON.stringify(datoNegozio, null, 2));
  console.log('Informazioni derivate:', JSON.stringify(elaborazioneNegozio.informazioniDerivate, null, 2));
  console.log('Parametri per matching:', JSON.stringify(elaborazioneNegozio.parametriPerMatching, null, 2));
  console.log('Condizioni applicabili:', elaborazioneNegozio.condizioniApplicabili);
  console.log('Errori:', elaborazioneNegozio.errori);
  console.log('\n');

  return {
    fabbricato: elaborazioneFabbricato,
    terreno: elaborazioneTerreno,
    negozio: elaborazioneNegozio
  };
}

/**
 * Simulazione di integrazione con il sistema IMU
 */
export function simulaMatchingIMU() {
  console.log('🤖 SIMULAZIONE MATCHING CON CONDIZIONI IMU\n');
  
  const risultati = testCatastoMapping();
  
  // Per ogni elaborazione, mostra come potrebbe funzionare il matching
  Object.entries(risultati).forEach(([tipo, elaborazione]) => {
    console.log(`🔍 MATCHING PER ${tipo.toUpperCase()}:`);
    console.log(`   Comune: ${elaborazione.informazioniDerivate.comuneNormalizzato}`);
    console.log(`   Categoria: ${elaborazione.informazioniDerivate.categoriaAtastale}`);
    console.log(`   Superficie: ${elaborazione.informazioniDerivate.superficie} m²`);
    console.log(`   Condizioni potenziali: ${elaborazione.condizioniApplicabili?.join(', ')}`);
    
    // Simula le domande che l'AI dovrebbe fare
    console.log('   📝 Domande da fare all\'utente:');
    if (elaborazione.informazioniDerivate.categoriaAtastale?.startsWith('A/')) {
      console.log('     - È la sua abitazione principale?');
      console.log('     - L\'immobile è locato o a disposizione?');
    }
    if (elaborazione.informazioniDerivate.categoriaAtastale === 'C/1') {
      console.log('     - Che tipo di attività commerciale si svolge?');
      console.log('     - L\'immobile è locato?');
    }
    if (elaborazione.informazioniDerivate.qualitaTerreno) {
      console.log('     - Il terreno è coltivato?');
      console.log('     - Si trova in zona edificabile?');
    }
    
    console.log('\n');
  });
}

// Esporta le funzioni per l'uso in altri moduli
export { 
  fabbricatoTorino, 
  terrenoAsti, 
  negozioMilano 
}; 