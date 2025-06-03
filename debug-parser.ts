import fs from 'fs';
import path from 'path';

function debugParser() {
  console.log('🔍 === DEBUG PARSER CONDIZIONI ===\n');
  
  const filePath = path.join(__dirname, 'data/statements/2025/abanoTermePD2025.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log(`📄 File: ${path.basename(filePath)}`);
  console.log(`📊 Righe totali: ${lines.length}`);
  console.log('');
  
  // Simula il parsing linea per linea
  let currentObject: any = {};
  let insideObject = false;
  let braceLevel = 0;
  let objectCount = 0;
  let validObjectCount = 0;
  
  for (let i = 0; i < lines.length && objectCount < 5; i++) {
    const line = lines[i].trim();
    
    // Salta linee vuote, commenti e template
    if (!line || line.startsWith('//') || line.startsWith('*') || 
        line.includes('condition: string;') || line.includes('details: string;')) {
      continue;
    }
    
    // Rileva inizio oggetto
    if (line.includes('{') && !insideObject) {
      insideObject = true;
      currentObject = {};
      braceLevel = 0;
      objectCount++;
      console.log(`\n🏁 OGGETTO ${objectCount} - Inizio riga ${i + 1}: ${line}`);
    }
    
    if (insideObject) {
      // Conta parentesi graffe
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceLevel += openBraces - closeBraces;
      
      console.log(`   Riga ${i + 1} (braces: ${braceLevel}): ${line.substring(0, 80)}`);
      
      // Cerca campi
      if (line.includes('condition:')) {
        const match = line.match(/condition:\s*"([^"]*)"/);
        if (match) {
          currentObject.condition = match[1];
          console.log(`     ✅ CONDITION: ${match[1]}`);
        }
      }
      
      if (line.includes('ratePercent:')) {
        const match = line.match(/ratePercent:\s*([0-9.]+)/);
        if (match) {
          currentObject.ratePercent = parseFloat(match[1]);
          console.log(`     ✅ RATE: ${match[1]}`);
        }
      }
      
      if (line.includes('details:')) {
        const match = line.match(/details:\s*"([^"]*)"/);
        if (match) {
          currentObject.details = match[1];
          console.log(`     ✅ DETAILS: ${match[1]}`);
        }
      }
      
      if (line.includes('categoryTypes:')) {
        const match = line.match(/categoryTypes:\s*\[([^\]]*)\]/);
        if (match) {
          currentObject.categoryTypes = match[1];
          console.log(`     ✅ CATEGORIES: ${match[1]}`);
        }
      }
      
      // Fine oggetto
      if (braceLevel <= 0 && line.includes('}')) {
        console.log(`🏁 OGGETTO ${objectCount} - Fine riga ${i + 1}`);
        console.log(`   Oggetto estratto:`, currentObject);
        
        // Valida oggetto
        const isValid = currentObject.condition && 
                       typeof currentObject.condition === 'string' && 
                       currentObject.condition.length > 5 &&
                       currentObject.condition !== 'string' &&
                       currentObject.ratePercent !== undefined &&
                       typeof currentObject.ratePercent === 'number';
        
        if (isValid) {
          validObjectCount++;
          console.log(`   ✅ OGGETTO VALIDO!`);
        } else {
          console.log(`   ❌ Oggetto non valido:`);
          console.log(`      - condition: ${currentObject.condition} (valid: ${!!currentObject.condition})`);
          console.log(`      - ratePercent: ${currentObject.ratePercent} (valid: ${typeof currentObject.ratePercent === 'number'})`);
        }
        
        // Reset
        insideObject = false;
        currentObject = {};
      }
    }
  }
  
  console.log(`\n📊 RISULTATO FINALE:`);
  console.log(`   Oggetti processati: ${objectCount}`);
  console.log(`   Oggetti validi: ${validObjectCount}`);
}

debugParser(); 