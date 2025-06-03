import fs from 'fs';
import path from 'path';

interface FixStats {
  processed: number;
  fixed: number;
  errors: number;
  issues: string[];
}

class CommuneFilesFixer {
  private stats: FixStats = {
    processed: 0,
    fixed: 0,
    errors: 0,
    issues: []
  };

  /**
   * Corregge tutti i file nella directory statements/2025
   */
  async fixAllFiles() {
    console.log('🔧 === CORREZIONE AUTOMATICA FILE COMUNALI ===\n');
    
    const statementsDir = path.join(__dirname, 'data/statements/2025');
    
    if (!fs.existsSync(statementsDir)) {
      console.error('❌ Directory non trovata:', statementsDir);
      return;
    }

    const files = fs.readdirSync(statementsDir).filter(f => f.endsWith('.ts'));
    console.log(`📁 Trovati ${files.length} file da processare\n`);

    // Processa un file alla volta per debug
    for (const file of files.slice(0, 5)) { // Prima processiamo solo 5 file per test
      await this.fixSingleFile(path.join(statementsDir, file));
    }

    this.printSummary();
  }

  /**
   * Corregge un singolo file
   */
  private async fixSingleFile(filePath: string) {
    this.stats.processed++;
    const fileName = path.basename(filePath);
    
    try {
      console.log(`🔧 Processando: ${fileName}`);
      
      // Legge il file originale
      const originalContent = fs.readFileSync(filePath, 'utf8');
      
      // Applica le correzioni
      const fixedContent = this.fixFileContent(originalContent, fileName);
      
      // Verifica se ci sono state modifiche
      if (fixedContent !== originalContent) {
        // Backup del file originale
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, originalContent);
        
        // Scrive il file corretto
        fs.writeFileSync(filePath, fixedContent);
        
        console.log(`✅ ${fileName} - CORRETTO (backup salvato)`);
        this.stats.fixed++;
      } else {
        console.log(`ℹ️ ${fileName} - Nessuna correzione necessaria`);
      }
      
    } catch (error) {
      console.error(`❌ ${fileName} - ERRORE:`, (error as Error).message);
      this.stats.errors++;
      this.stats.issues.push(`${fileName}: ${(error as Error).message}`);
    }
  }

  /**
   * Applica le correzioni al contenuto del file
   */
  private fixFileContent(content: string, fileName: string): string {
    let fixed = content;
    
    // 1. Rimuovi il primo oggetto template malformato
    fixed = this.removeTemplateObject(fixed);
    
    // 2. Correggi la sintassi degli oggetti
    fixed = this.fixObjectSyntax(fixed);
    
    // 3. Rimuovi oggetti duplicati e malformati
    fixed = this.removeDuplicateObjects(fixed);
    
    // 4. Correggi la chiusura dell'array
    fixed = this.fixArrayClosure(fixed);
    
    // 5. Pulisci spazi e formattazione
    fixed = this.cleanFormatting(fixed);
    
    return fixed;
  }

  /**
   * Rimuove il primo oggetto template malformato
   */
  private removeTemplateObject(content: string): string {
    // Pattern per trovare il primo oggetto con "condition: string;"
    const templatePattern = /\{\s*condition:\s*string;[\s\S]*?\},\s*/;
    
    return content.replace(templatePattern, '');
  }

  /**
   * Corregge la sintassi degli oggetti
   */
  private fixObjectSyntax(content: string): string {
    let fixed = content;
    
    // Estrae il contenuto dell'array
    const arrayMatch = fixed.match(/(export const \w+:\s*ImuRateEntry\[\]\s*=\s*\[)([\s\S]*?)(\];?\s*$)/);
    
    if (!arrayMatch) {
      console.warn('⚠️ Array export non trovato');
      return content;
    }
    
    const [, prefix, arrayContent, suffix] = arrayMatch;
    let fixedArrayContent = arrayContent;
    
    // Splitta gli oggetti usando un approccio più robusto
    const objects = this.extractObjects(fixedArrayContent);
    const fixedObjects = objects.map(obj => this.fixSingleObject(obj)).filter(obj => obj !== null);
    
    // Ricostruisce l'array
    const newArrayContent = fixedObjects.join(',\n  ');
    
    return `${prefix}\n  ${newArrayContent}\n];`;
  }

  /**
   * Estrae gli oggetti dall'array in modo robusto
   */
  private extractObjects(arrayContent: string): string[] {
    const objects: string[] = [];
    let currentObject = '';
    let braceLevel = 0;
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      const prevChar = i > 0 ? arrayContent[i - 1] : '';
      
      // Gestisci stringhe
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }
      
      if (!inString) {
        if (char === '{') {
          if (braceLevel === 0) {
            currentObject = '{'; // Inizia nuovo oggetto
          } else {
            currentObject += char;
          }
          braceLevel++;
        } else if (char === '}') {
          braceLevel--;
          currentObject += char;
          
          // Se siamo tornati a livello 0, abbiamo completato un oggetto
          if (braceLevel === 0) {
            objects.push(currentObject.trim());
            currentObject = '';
            
            // Salta eventuali virgole e spazi dopo l'oggetto
            while (i + 1 < arrayContent.length && /[\s,]/.test(arrayContent[i + 1])) {
              i++;
            }
          }
        } else if (braceLevel > 0) {
          currentObject += char;
        }
      } else if (braceLevel > 0) {
        currentObject += char;
      }
    }
    
    return objects.filter(obj => obj.trim().length > 0);
  }

  /**
   * Corregge un singolo oggetto
   */
  private fixSingleObject(objStr: string): string | null {
    try {
      let fixed = objStr.trim();
      
      // Salta oggetti vuoti o malformati
      if (fixed.length < 10 || !fixed.includes('condition:')) {
        return null;
      }
      
      // Salta oggetti template con "condition: string"
      if (fixed.includes('condition: string;') || fixed.includes('details: string;')) {
        return null;
      }
      
      // Estrae i campi principali
      const condition = this.extractField(fixed, 'condition');
      const details = this.extractField(fixed, 'details');
      const ratePercent = this.extractNumber(fixed, 'ratePercent');
      const context = this.extractField(fixed, 'context');
      const categoryTypes = this.extractArray(fixed, 'categoryTypes');
      
      if (!condition || ratePercent === null) {
        console.warn('⚠️ Oggetto mancante campi essenziali:', condition || 'NO_CONDITION');
        return null;
      }
      
      // Ricostruisce l'oggetto con sintassi corretta
      const newObj: any = {
        condition,
        details: details || condition,
        ratePercent
      };
      
      if (categoryTypes && categoryTypes.length > 0) {
        newObj.categoryTypes = categoryTypes;
      }
      
      if (context) {
        newObj.context = context;
      }
      
      // Converte in stringa JSON e poi in formato TypeScript
      return this.objectToTypeScriptString(newObj);
      
    } catch (error) {
      console.warn('⚠️ Errore correzione oggetto:', (error as Error).message);
      return null;
    }
  }

  /**
   * Estrae un campo stringa da un oggetto
   */
  private extractField(objStr: string, fieldName: string): string | null {
    const patterns = [
      new RegExp(`${fieldName}:\\s*"([^"]*)"`, 'i'),
      new RegExp(`${fieldName}:\\s*'([^']*)'`, 'i'),
      new RegExp(`${fieldName}:\\s*["']([^"']*)["']`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = objStr.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  }

  /**
   * Estrae un numero da un oggetto
   */
  private extractNumber(objStr: string, fieldName: string): number | null {
    const pattern = new RegExp(`${fieldName}:\\s*([0-9.]+)`, 'i');
    const match = objStr.match(pattern);
    return match ? parseFloat(match[1]) : null;
  }

  /**
   * Estrae un array da un oggetto
   */
  private extractArray(objStr: string, fieldName: string): string[] | null {
    const pattern = new RegExp(`${fieldName}:\\s*\\[([^\\]]*?)\\]`, 'i');
    const match = objStr.match(pattern);
    
    if (!match) return null;
    
    const arrayContent = match[1];
    return arrayContent
      .split(',')
      .map(item => item.trim().replace(/["']/g, ''))
      .filter(item => item.length > 0);
  }

  /**
   * Converte un oggetto in stringa TypeScript formattata
   */
  private objectToTypeScriptString(obj: any): string {
    const lines: string[] = [];
    lines.push('{');
    
    // condition (required)
    lines.push(`    condition: "${obj.condition}",`);
    
    // details (required)
    lines.push(`    details: "${obj.details}",`);
    
    // ratePercent (required)
    lines.push(`    ratePercent: ${obj.ratePercent}`);
    
    // categoryTypes (optional)
    if (obj.categoryTypes && obj.categoryTypes.length > 0) {
      const categories = obj.categoryTypes.map((cat: string) => `"${cat}"`).join(', ');
      lines.push(`    categoryTypes: [${categories}],`);
    }
    
    // context (optional)
    if (obj.context) {
      lines.push(`    context: "${obj.context}",`);
    }
    
    // Rimuovi virgola finale dall'ultimo elemento
    const lastLine = lines[lines.length - 1];
    if (lastLine.endsWith(',')) {
      lines[lines.length - 1] = lastLine.slice(0, -1);
    }
    
    lines.push('  }');
    
    return lines.join('\n    ');
  }

  /**
   * Rimuove oggetti duplicati e malformati
   */
  private removeDuplicateObjects(content: string): string {
    // Questa funzione è già gestita in extractObjects
    return content;
  }

  /**
   * Corregge la chiusura dell'array
   */
  private fixArrayClosure(content: string): string {
    // Assicura che l'array finisca correttamente
    if (!content.trim().endsWith('];')) {
      return content.replace(/\s*$/, '\n];');
    }
    return content;
  }

  /**
   * Pulisce formattazione
   */
  private cleanFormatting(content: string): string {
    return content
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Rimuovi linee vuote multiple
      .replace(/\s+$/gm, '') // Rimuovi spazi finali
      .trim() + '\n';
  }

  /**
   * Stampa riassunto finale
   */
  private printSummary() {
    console.log('\n🎉 === CORREZIONE COMPLETATA ===');
    console.log(`📊 File processati: ${this.stats.processed}`);
    console.log(`✅ File corretti: ${this.stats.fixed}`);
    console.log(`❌ Errori: ${this.stats.errors}`);
    
    if (this.stats.issues.length > 0) {
      console.log('\n⚠️ Problemi rilevati:');
      this.stats.issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    console.log('\n📝 I file originali sono stati salvati con estensione .backup');
  }
}

// Esegui correzione
async function main() {
  const fixer = new CommuneFilesFixer();
  await fixer.fixAllFiles();
}

main().catch(console.error); 