/**
 * Script per validare e verificare codici fiscali
 */

// Validazione completa del codice fiscale italiano
function validateCodiceFiscale(cf) {
  if (!cf || typeof cf !== 'string') {
    return { valid: false, error: 'Codice fiscale non fornito' };
  }

  // Rimuovi spazi e converti in maiuscolo
  cf = cf.replace(/\s/g, '').toUpperCase();

  // Verifica lunghezza
  if (cf.length !== 16) {
    return { valid: false, error: `Lunghezza errata: ${cf.length} caratteri invece di 16` };
  }

  // Verifica formato base
  const formatRegex = /^[A-Z]{6}[0-9]{2}[A-EHLMPR-T][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
  if (!formatRegex.test(cf)) {
    return { valid: false, error: 'Formato non valido' };
  }

  // Verifica carattere di controllo
  const evenMap = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
    'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
    'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };

  const oddMap = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const char = cf[i];
    if (i % 2 === 0) {
      // Posizione dispari (1, 3, 5...)
      sum += oddMap[char];
    } else {
      // Posizione pari (2, 4, 6...)
      sum += evenMap[char];
    }
  }

  const expectedCheckChar = String.fromCharCode(65 + (sum % 26));
  const actualCheckChar = cf[15];

  if (expectedCheckChar !== actualCheckChar) {
    return {
      valid: false,
      error: `Carattere di controllo errato: trovato '${actualCheckChar}', dovrebbe essere '${expectedCheckChar}'`
    };
  }

  return { valid: true, error: null };
}

// Estrai informazioni dal codice fiscale
function parseCodiceFiscale(cf) {
  if (!cf || cf.length !== 16) return null;

  cf = cf.toUpperCase();

  const info = {
    cognome: cf.substring(0, 3),
    nome: cf.substring(3, 6),
    anno: cf.substring(6, 8),
    mese: cf[8],
    giorno: cf.substring(9, 11),
    comune: cf.substring(11, 15),
    controllo: cf[15]
  };

  // Decodifica mese
  const mesiMap = {
    'A': 'Gennaio', 'B': 'Febbraio', 'C': 'Marzo', 'D': 'Aprile',
    'E': 'Maggio', 'H': 'Giugno', 'L': 'Luglio', 'M': 'Agosto',
    'P': 'Settembre', 'R': 'Ottobre', 'S': 'Novembre', 'T': 'Dicembre'
  };

  // Decodifica anno (assumendo 1900-2099)
  const annoInt = parseInt(info.anno);
  const annoCompleto = annoInt > 30 ? 1900 + annoInt : 2000 + annoInt;

  // Decodifica giorno e sesso
  const giornoInt = parseInt(info.giorno);
  const sesso = giornoInt > 40 ? 'F' : 'M';
  const giornoReale = giornoInt > 40 ? giornoInt - 40 : giornoInt;

  return {
    ...info,
    meseNome: mesiMap[info.mese] || 'Sconosciuto',
    annoCompleto,
    giornoReale,
    sesso,
    dataNascita: `${giornoReale}/${Object.keys(mesiMap).indexOf(info.mese) + 1}/${annoCompleto}`
  };
}

// Test del codice fiscale dell'utente
function testUserCodiceFiscale() {
  const testCF = 'MTTPCC94S01H727X';
  
  console.log('🔍 Validazione Codice Fiscale\n');
  console.log(`📄 Codice Fiscale: ${testCF}`);
  
  // Validazione
  const validation = validateCodiceFiscale(testCF);
  console.log('\n✅ Validazione:');
  console.log(`🎯 Valido: ${validation.valid ? '✅ SÌ' : '❌ NO'}`);
  if (!validation.valid) {
    console.log(`❌ Errore: ${validation.error}`);
  }
  
  // Parsing informazioni
  if (validation.valid) {
    const info = parseCodiceFiscale(testCF);
    console.log('\n📊 Informazioni estratte:');
    console.log(`👤 Codice Cognome: ${info.cognome}`);
    console.log(`📝 Codice Nome: ${info.nome}`);
    console.log(`🎂 Data di nascita: ${info.dataNascita}`);
    console.log(`⚤ Sesso: ${info.sesso}`);
    console.log(`🏛️ Codice Comune: ${info.comune}`);
    console.log(`🔒 Carattere controllo: ${info.controllo}`);
  }
  
  // Test formati alternativi
  console.log('\n🔧 Test formati alternativi:');
  
  const formats = [
    testCF,
    testCF.toLowerCase(),
    testCF.replace(/(.{4})/g, '$1 ').trim(), // Con spazi ogni 4 caratteri
    testCF.substring(0, 15) + testCF.substring(15).toLowerCase(), // Solo controllo minuscolo
  ];
  
  formats.forEach((format, index) => {
    const val = validateCodiceFiscale(format);
    console.log(`   ${index + 1}. "${format}" → ${val.valid ? '✅' : '❌'}`);
  });
  
  return validation.valid;
}

// Test con altri CF di esempio
function testSampleCF() {
  console.log('\n🧪 Test codici fiscali di esempio:');
  
  const samples = [
    'RSSMRA80A01H501Z', // Esempio comune
    'BNCSFN85D20F205K', // Altro esempio
    'MTTPCC94S01H727X'  // Il nostro (corretto)
  ];
  
  samples.forEach((cf, index) => {
    const validation = validateCodiceFiscale(cf);
    console.log(`   ${index + 1}. ${cf} → ${validation.valid ? '✅' : '❌'} ${validation.error || ''}`);
  });
}

// Esegui tutti i test
function runValidation() {
  console.log('🚀 Validazione Codice Fiscale\n');
  
  const isValid = testUserCodiceFiscale();
  testSampleCF();
  
  console.log('\n💡 Conclusioni:');
  if (isValid) {
    console.log('✅ Il codice fiscale è formalmente corretto');
    console.log('❓ L\'errore dell\'API potrebbe essere dovuto a:');
    console.log('   1. CF non presente nel database dell\'Agenzia delle Entrate');
    console.log('   2. Validazione interna diversa dell\'API');
    console.log('   3. Errore temporaneo del servizio');
    console.log('   4. Limitazioni del token di test');
  } else {
    console.log('❌ Il codice fiscale ha errori di formato');
    console.log('🔧 Correggere prima di procedere');
  }
}

// Esegui se chiamato direttamente
if (require.main === module) {
  runValidation();
}

module.exports = { validateCodiceFiscale, parseCodiceFiscale }; 