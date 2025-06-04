"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
// Mappe per convertire condition patterns a condizioni standard
const conditionMappings = {
    // Abitazione principale patterns
    'abitazione principale': [
        {
            description: "L'entità è un fabbricato",
            predicate: "entity.type === 'fabbricato'"
        },
        {
            description: "L'entità è stata indicata come abitazione principale",
            predicate: "entity.isMainResidence === true"
        }
    ],
    // Anziani/disabili patterns
    'anziani o disabili': [
        {
            description: "L'immobile è posseduto da un anziano o disabile",
            predicate: "entity.ownerIsElderlyOrDisabled === true"
        }
    ],
    // Fabbricati rurali patterns
    'rurali ad uso strumentale': [
        {
            description: "Il fabbricato è utilizzato per attività agricola",
            predicate: "entity.isAgriculturalUse === true"
        },
        {
            description: "Il proprietario è un coltivatore diretto o imprenditore agricolo",
            predicate: "entity.ownerIsAgriculturalEntrepreneur === true"
        }
    ],
    // Terreni agricoli patterns
    'terreni agricoli': [
        {
            description: "È un terreno agricolo",
            predicate: "entity.type === 'terreno' && entity.isAgricultural === true"
        }
    ],
    // Aree fabbricabili patterns
    'aree fabbricabili': [
        {
            description: "Il terreno è edificabile secondo PRG o catasto",
            predicate: "entity.isBuildable === true"
        }
    ],
    // Altri fabbricati patterns
    'altri fabbricati': [
        {
            description: "Non è abitazione principale",
            predicate: "entity.isMainResidence !== true"
        },
        {
            description: "Non è del gruppo D",
            predicate: "!entity.category?.startsWith('D')"
        }
    ]
};
function mapConditionToPredicates(condition, categoryTypes) {
    const lowerCondition = condition.toLowerCase();
    let conditions = [];
    // Aggiungi condizione categoria se specificata
    if (categoryTypes && categoryTypes.length > 0) {
        // Filtra categorie specifiche (non "D" generico)
        const specificCategories = categoryTypes.filter(cat => cat.length > 1);
        if (specificCategories.length > 0) {
            conditions.push({
                description: `L'entità ha categoria ${specificCategories.join(' o ')}`,
                predicate: `[${specificCategories.map(c => `'${c}'`).join(',')}].includes(entity.category)`
            });
        }
    }
    // Mappa le condizioni comuni
    for (const [pattern, predicates] of Object.entries(conditionMappings)) {
        if (lowerCondition.includes(pattern)) {
            conditions.push(...predicates);
            break;
        }
    }
    // Se non abbiamo trovato condizioni specifiche, aggiungi una generica
    if (conditions.length === 0) {
        conditions.push({
            description: "Condizione applicabile in base al regolamento comunale",
            predicate: "true // Da specificare in base alle condizioni locali"
        });
    }
    return conditions;
}
function convertRate(oldRate) {
    return {
        label: oldRate.condition,
        ratePercent: oldRate.ratePercent / 1000, // Converti da per mille a decimale
        categoryTypes: oldRate.categoryTypes,
        officialDescription: oldRate.details,
        conditions: mapConditionToPredicates(oldRate.condition, oldRate.categoryTypes)
    };
}
function extractCommuneInfo(filename) {
    // Estrai nome comune e provincia dal filename
    // Formato: comunePROVINCIA2025.ts
    const baseName = filename.replace('.ts', '').replace('2025', '');
    // Trova le ultime 2 lettere maiuscole (provincia)
    const provinceMatch = baseName.match(/([A-Z]{2})$/);
    const province = provinceMatch ? provinceMatch[1] : 'XX';
    // Il resto è il nome del comune
    const commune = baseName.replace(province, '');
    return { commune, province };
}
// Parsing robusto che estrae i dati essenziali usando regex
function parseRatesFromContent(content) {
    const rates = [];
    // Trova tutti i blocchi che contengono rate entries
    const ratePattern = /\{\s*condition:\s*"([^"]+)"\s*,\s*details:\s*"([^"]+)"\s*,\s*ratePercent:\s*([0-9.]+)(?:\s*,\s*categoryTypes:\s*(\[[^\]]*\]))?(?:\s*,\s*context:\s*"([^"]*)")?/g;
    let match;
    while ((match = ratePattern.exec(content)) !== null) {
        const [, condition, details, ratePercentStr, categoryTypesStr, context] = match;
        let categoryTypes = [];
        if (categoryTypesStr) {
            try {
                // Estrai le categorie dall'array string
                const cleanCategoryStr = categoryTypesStr.replace(/'/g, '"');
                categoryTypes = JSON.parse(cleanCategoryStr);
            }
            catch (e) {
                // Se non riesce, prova a estrarre manualmente
                const categoryMatches = categoryTypesStr.match(/"([^"]+)"/g);
                if (categoryMatches) {
                    categoryTypes = categoryMatches.map(m => m.replace(/"/g, ''));
                }
            }
        }
        rates.push({
            condition: condition.trim(),
            details: details.trim(),
            ratePercent: parseFloat(ratePercentStr),
            categoryTypes: categoryTypes.length > 0 ? categoryTypes : undefined,
            context: context === null || context === void 0 ? void 0 : context.trim()
        });
    }
    return rates;
}
async function processFile(filePath) {
    try {
        console.log(`📄 Elaborando: ${filePath}`);
        const content = await fs_1.promises.readFile(filePath, 'utf8');
        // Parsing robusto del contenuto
        const oldRates = parseRatesFromContent(content);
        if (oldRates.length === 0) {
            console.log(`⚠️  Nessuna rate trovata in ${filePath}`);
            return;
        }
        const filename = filePath.split('/').pop();
        const { commune, province } = extractCommuneInfo(filename);
        // Converti al nuovo formato
        const newRates = oldRates.map(convertRate);
        // Genera il nuovo contenuto del file
        const newContent = `// ${filename}
// Migrato automaticamente dal formato legacy

export interface ImuRateCondition {
  description: string;
  predicate: string;
}

export interface ImuRateEntry {
  label: string;
  ratePercent: number;
  categoryTypes?: string[];
  officialDescription: string;
  conditions: ImuRateCondition[];
}

export const imuRates${commune.charAt(0).toUpperCase()}${commune.slice(1)}${province}2025: ImuRateEntry[] = ${JSON.stringify(newRates, null, 2)};
`;
        // Salva nella directory di destinazione
        const newDir = 'data/statements/2025_migrated';
        await fs_1.promises.mkdir(newDir, { recursive: true });
        const newFilePath = (0, path_1.join)(newDir, filename);
        await fs_1.promises.writeFile(newFilePath, newContent, 'utf8');
        console.log(`✅ Migrato: ${filename} -> ${newFilePath}`);
        console.log(`   📊 ${oldRates.length} aliquote convertite`);
    }
    catch (error) {
        console.error(`❌ Errore elaborando ${filePath}:`, error);
    }
}
async function migrateAllFiles() {
    const sourceDir = 'data/statements/2025';
    try {
        const files = await fs_1.promises.readdir(sourceDir);
        const tsFiles = files
            .filter(f => f.endsWith('.ts') && !f.endsWith('.backup')); // Rimuovo .slice(0, 10) per migrare TUTTI i file
        console.log(`🚀 Iniziando migrazione di ${tsFiles.length} file...`);
        let processed = 0;
        let errors = 0;
        for (const file of tsFiles) {
            const filePath = (0, path_1.join)(sourceDir, file);
            try {
                await processFile(filePath);
                processed++;
            }
            catch (error) {
                console.error(`❌ Errore con ${file}:`, error);
                errors++;
            }
            // Progress update ogni 100 file
            if ((processed + errors) % 100 === 0) {
                console.log(`📈 Progresso: ${processed + errors}/${tsFiles.length} file elaborati`);
            }
        }
        console.log(`\n🎉 Migrazione completata!`);
        console.log(`✅ File elaborati con successo: ${processed}`);
        console.log(`❌ File con errori: ${errors}`);
        console.log(`📁 File salvati in: data/statements/2025_migrated/`);
    }
    catch (error) {
        console.error('❌ Errore durante la migrazione:', error);
    }
}
// Esegui la migrazione
if (require.main === module) {
    migrateAllFiles();
}
//# sourceMappingURL=migrate-statements-to-new-format.js.map