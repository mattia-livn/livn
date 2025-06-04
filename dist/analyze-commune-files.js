"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CommuneFilesAnalyzer {
    async analyzeStructure() {
        console.log('🔍 === ANALISI STRUTTURA FILE COMUNALI ===\n');
        const statementsDir = path_1.default.join(__dirname, 'data/statements/2025');
        const files = fs_1.default.readdirSync(statementsDir).filter(f => f.endsWith('.ts')).slice(0, 3);
        for (const file of files) {
            await this.analyzeFile(path_1.default.join(statementsDir, file));
        }
    }
    async analyzeFile(filePath) {
        const fileName = path_1.default.basename(filePath);
        console.log(`\n📁 === ${fileName} ===`);
        const content = fs_1.default.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        console.log(`📊 Righe totali: ${lines.length}`);
        // Trova l'interfaccia
        const interfaceLineIndex = lines.findIndex(line => line.includes('export interface ImuRateEntry'));
        if (interfaceLineIndex !== -1) {
            console.log(`✅ Interface trovata alla riga: ${interfaceLineIndex + 1}`);
        }
        else {
            console.log('❌ Interface non trovata');
        }
        // Trova l'export const
        const exportLineIndex = lines.findIndex(line => line.includes('export const') && line.includes('ImuRateEntry[]'));
        if (exportLineIndex !== -1) {
            console.log(`✅ Export array trovato alla riga: ${exportLineIndex + 1}`);
            console.log(`   Contenuto: ${lines[exportLineIndex].trim()}`);
        }
        else {
            console.log('❌ Export array non trovato');
        }
        // Trova primo oggetto malformato
        const firstObjectIndex = this.findFirstMalformedObject(lines);
        if (firstObjectIndex !== -1) {
            console.log(`⚠️ Primo oggetto malformato alla riga: ${firstObjectIndex + 1}`);
            console.log(`   Contenuto: ${lines[firstObjectIndex].trim()}`);
            // Mostra le prossime 5 righe
            console.log('   Prossime righe:');
            for (let i = firstObjectIndex + 1; i < Math.min(firstObjectIndex + 6, lines.length); i++) {
                console.log(`     ${i + 1}: ${lines[i].trim()}`);
            }
        }
        else {
            console.log('✅ Nessun oggetto malformato trovato');
        }
        // Trova primi oggetti validi
        const validObjects = this.findValidObjects(lines);
        console.log(`✅ Oggetti validi trovati: ${validObjects.length}`);
        if (validObjects.length > 0) {
            console.log(`   Primo oggetto valido alla riga: ${validObjects[0].startLine + 1}`);
            console.log(`   Condition: ${validObjects[0].condition}`);
            console.log(`   RatePercent: ${validObjects[0].ratePercent}`);
        }
        // Verifica chiusura array
        const arrayCloseIndex = lines.findIndex(line => line.trim() === '];');
        if (arrayCloseIndex !== -1) {
            console.log(`✅ Chiusura array alla riga: ${arrayCloseIndex + 1}`);
        }
        else {
            console.log('❌ Chiusura array non trovata');
        }
    }
    findFirstMalformedObject(lines) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.includes('condition: string;') || line.includes('details: string;')) {
                return i;
            }
        }
        return -1;
    }
    findValidObjects(lines) {
        const validObjects = [];
        let inObject = false;
        let currentObject = '';
        let startLine = -1;
        let braceLevel = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Salta oggetti malformati
            if (line.includes('condition: string;') || line.includes('details: string;')) {
                continue;
            }
            if (line.includes('{')) {
                if (!inObject) {
                    inObject = true;
                    startLine = i;
                    currentObject = '';
                    braceLevel = 0;
                }
                braceLevel += (line.match(/\{/g) || []).length;
            }
            if (inObject) {
                currentObject += line + '\n';
                braceLevel -= (line.match(/\}/g) || []).length;
                if (braceLevel <= 0 && line.includes('}')) {
                    // Fine oggetto, analizza
                    const condition = this.extractCondition(currentObject);
                    const ratePercent = this.extractRatePercent(currentObject);
                    if (condition && ratePercent !== null && condition !== 'string') {
                        validObjects.push({ startLine, condition, ratePercent });
                    }
                    inObject = false;
                    // Limita a primi 3 oggetti validi per analisi
                    if (validObjects.length >= 3)
                        break;
                }
            }
        }
        return validObjects;
    }
    extractCondition(objectStr) {
        const match = objectStr.match(/condition:\s*["']([^"']+)["']/);
        return match ? match[1] : null;
    }
    extractRatePercent(objectStr) {
        const match = objectStr.match(/ratePercent:\s*([0-9.]+)/);
        return match ? parseFloat(match[1]) : null;
    }
}
// Esegui analisi
async function main() {
    const analyzer = new CommuneFilesAnalyzer();
    await analyzer.analyzeStructure();
}
main().catch(console.error);
//# sourceMappingURL=analyze-commune-files.js.map