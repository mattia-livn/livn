"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SafeCommuneFilesFixer {
    constructor() {
        this.stats = {
            processed: 0,
            fixed: 0,
            errors: 0,
            issues: []
        };
    }
    async fixAllFiles() {
        console.log('🔧 === CORREZIONE SICURA FILE COMUNALI ===\n');
        const statementsDir = path_1.default.join(__dirname, 'data/statements/2025');
        const files = fs_1.default.readdirSync(statementsDir).filter(f => f.endsWith('.ts'));
        console.log(`📁 Trovati ${files.length} file da processare\n`);
        // Processa tutti i file ora che sappiamo che funziona
        console.log('⚠️ ATTENZIONE: Processando TUTTI i file. Questo potrebbe richiedere alcuni minuti...\n');
        for (const file of files) {
            await this.fixSingleFile(path_1.default.join(statementsDir, file));
            // Pausa ogni 100 file per evitare sovraccarichi
            if (this.stats.processed % 100 === 0) {
                console.log(`📊 Progresso: ${this.stats.processed}/${files.length} (${Math.round(this.stats.processed / files.length * 100)}%)`);
            }
        }
        this.printSummary();
    }
    async fixSingleFile(filePath) {
        this.stats.processed++;
        const fileName = path_1.default.basename(filePath);
        try {
            console.log(`🔧 Processando: ${fileName}`);
            const originalContent = fs_1.default.readFileSync(filePath, 'utf8');
            const lines = originalContent.split('\n');
            // Applica correzioni conservative
            const fixedLines = this.applyConservativeFixes(lines, fileName);
            const fixedContent = fixedLines.join('\n');
            if (fixedContent !== originalContent) {
                // Backup del file originale
                const backupPath = filePath + '.backup';
                fs_1.default.writeFileSync(backupPath, originalContent);
                // Scrive il file corretto
                fs_1.default.writeFileSync(filePath, fixedContent);
                console.log(`✅ ${fileName} - CORRETTO (backup salvato)`);
                this.stats.fixed++;
            }
            else {
                console.log(`ℹ️ ${fileName} - Nessuna correzione necessaria`);
            }
        }
        catch (error) {
            console.error(`❌ ${fileName} - ERRORE:`, error.message);
            this.stats.errors++;
            this.stats.issues.push(`${fileName}: ${error.message}`);
        }
    }
    applyConservativeFixes(lines, fileName) {
        const fixedLines = [...lines];
        // 1. Rimuovi il primo oggetto template malformato dall'array
        const { startIndex, endIndex } = this.findFirstMalformedObjectInArray(fixedLines);
        if (startIndex !== -1 && endIndex !== -1) {
            console.log(`   🗑️ Rimuovo oggetto malformato righe ${startIndex + 1}-${endIndex + 1}`);
            fixedLines.splice(startIndex, endIndex - startIndex + 1);
        }
        // 2. Correggi sintassi degli oggetti (aggiungi virgole mancanti)
        this.fixObjectSyntax(fixedLines);
        return fixedLines;
    }
    findFirstMalformedObjectInArray(lines) {
        const arrayStartIndex = lines.findIndex(line => line.includes('export const') && line.includes('ImuRateEntry[]') && line.includes('['));
        if (arrayStartIndex === -1) {
            return { startIndex: -1, endIndex: -1 };
        }
        // Cerca il primo oggetto con "condition: string;" DOPO l'inizio dell'array
        let braceLevel = 0;
        let objectStart = -1;
        let foundMalformed = false;
        for (let i = arrayStartIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.includes('{')) {
                if (braceLevel === 0) {
                    objectStart = i;
                }
                braceLevel++;
            }
            if (objectStart !== -1 && (line.includes('condition: string;') || line.includes('details: string;'))) {
                foundMalformed = true;
            }
            if (line.includes('}')) {
                braceLevel--;
                if (braceLevel === 0 && foundMalformed) {
                    // Cerca la virgola dopo l'oggetto
                    let endIndex = i;
                    if (i + 1 < lines.length && lines[i + 1].trim() === ',') {
                        endIndex = i + 1;
                    }
                    else if (line.includes('},')) {
                        endIndex = i;
                    }
                    return { startIndex: objectStart, endIndex };
                }
                if (braceLevel === 0) {
                    // Reset per il prossimo oggetto
                    objectStart = -1;
                    foundMalformed = false;
                }
            }
        }
        return { startIndex: -1, endIndex: -1 };
    }
    fixObjectSyntax(lines) {
        let insideObject = false;
        let braceLevel = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            // Salta linee vuote e commenti
            if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
                continue;
            }
            // Traccia se siamo dentro un oggetto
            if (trimmed.includes('{')) {
                if (braceLevel === 0) {
                    insideObject = true;
                }
                braceLevel += (trimmed.match(/\{/g) || []).length;
            }
            if (trimmed.includes('}')) {
                braceLevel -= (trimmed.match(/\}/g) || []).length;
                if (braceLevel === 0) {
                    insideObject = false;
                }
            }
            // Applica correzioni solo dentro oggetti
            if (insideObject && braceLevel > 0) {
                lines[i] = this.fixLineObjectSyntax(line, i, lines);
            }
        }
    }
    fixLineObjectSyntax(line, lineIndex, allLines) {
        let fixed = line;
        const trimmed = line.trim();
        // Salta certe linee
        if (!trimmed || trimmed.includes('{') || trimmed.includes('}') ||
            trimmed.startsWith('//') || trimmed.includes('requiredParameters')) {
            return fixed;
        }
        // Aggiungi virgola se manca dopo campi specifici
        if (this.shouldHaveComma(trimmed) && !trimmed.endsWith(',') && !trimmed.endsWith(';')) {
            // Verifica che la prossima linea non sia chiusura o virgola
            const nextLine = lineIndex + 1 < allLines.length ? allLines[lineIndex + 1].trim() : '';
            if (!nextLine.startsWith('}') && nextLine !== ',' && !nextLine.startsWith(',')) {
                fixed = fixed.replace(/\s*$/, ',');
                console.log(`     ✏️  Aggiunta virgola: ${trimmed}`);
            }
        }
        return fixed;
    }
    shouldHaveComma(line) {
        const trimmed = line.trim();
        // Campi che dovrebbero avere virgola
        const fieldPatterns = [
            /^condition:\s*".*"$/,
            /^details:\s*".*"$/,
            /^ratePercent:\s*[0-9.]+$/,
            /^context:\s*".*"$/,
            /^categoryTypes:\s*\[.*\]$/,
            /^zone:\s*".*"$/
        ];
        return fieldPatterns.some(pattern => pattern.test(trimmed));
    }
    printSummary() {
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
    const fixer = new SafeCommuneFilesFixer();
    await fixer.fixAllFiles();
}
main().catch(console.error);
//# sourceMappingURL=fix-commune-files-safe.js.map