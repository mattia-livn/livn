"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommuneConditionsService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class CommuneConditionsService {
    constructor() {
        this.loadedCommunes = new Map();
        this.communeFileCache = new Map();
        this.buildCommuneFileIndex();
    }
    /**
     * Costruisce l'indice dei file comunali disponibili
     */
    buildCommuneFileIndex() {
        // Correggo path per gestire compilazione TypeScript
        const statementsDir = path_1.default.join(process.cwd(), 'data/statements/2025');
        if (!fs_1.default.existsSync(statementsDir)) {
            console.warn('⚠️ Directory statements non trovata:', statementsDir);
            return;
        }
        const files = fs_1.default.readdirSync(statementsDir);
        for (const file of files) {
            if (file.endsWith('.ts')) {
                // Estrae il nome del comune dal filename (es: ovadaAL2025.ts -> ovada)
                const communeName = this.extractCommuneNameFromFile(file);
                this.communeFileCache.set(communeName.toLowerCase(), file);
            }
        }
        console.log(`📁 Indicizzati ${this.communeFileCache.size} comuni nelle condizioni`);
    }
    /**
     * Estrae il nome del comune dal filename
     */
    extractCommuneNameFromFile(filename) {
        // Rimuove l'estensione e l'anno
        const name = filename.replace('.ts', '').replace('2025', '');
        // Rimuove le sigle provinciali (es: AL, TO, etc.)
        const withoutProvince = name.replace(/[A-Z]{2}$/, '');
        return withoutProvince;
    }
    /**
     * Trova il file del comune più vicino al nome fornito
     */
    findCommuneFile(communeName) {
        const normalizedName = communeName.toLowerCase()
            .replace(/[^a-z]/g, '') // Rimuove caratteri speciali
            .trim();
        // Ricerca esatta
        if (this.communeFileCache.has(normalizedName)) {
            return this.communeFileCache.get(normalizedName);
        }
        // Ricerca parziale (contiene il nome)
        for (const [cachedName, filename] of this.communeFileCache.entries()) {
            if (cachedName.includes(normalizedName) || normalizedName.includes(cachedName)) {
                console.log(`🔍 Match parziale: ${communeName} -> ${cachedName} (${filename})`);
                return filename;
            }
        }
        return null;
    }
    /**
     * Carica le condizioni specifiche di un comune
     */
    async loadCommuneConditions(communeName) {
        const normalizedName = communeName.toLowerCase().replace(/[^a-z]/g, '');
        // Controlla cache
        if (this.loadedCommunes.has(normalizedName)) {
            return this.loadedCommunes.get(normalizedName);
        }
        const filename = this.findCommuneFile(communeName);
        if (!filename) {
            console.warn(`⚠️ File condizioni non trovato per comune: ${communeName}`);
            return [];
        }
        try {
            // Correggo path per gestire compilazione TypeScript
            const filePath = path_1.default.join(process.cwd(), 'data/statements/2025', filename);
            // Legge il file come testo
            const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
            // Estrae i dati usando parsing diretto
            const conditions = this.parseConditionsFromFile(fileContent);
            // Filtra condizioni valide
            const validConditions = conditions.filter(c => c &&
                typeof c === 'object' &&
                typeof c.condition === 'string' &&
                typeof c.ratePercent === 'number' &&
                c.condition !== 'string' && // Filtra l'oggetto template malformato
                c.details !== 'string' &&
                c.condition.length > 5 // Deve avere una descrizione ragionevole
            );
            // Cache e ritorna
            this.loadedCommunes.set(normalizedName, validConditions);
            console.log(`✅ Caricate ${validConditions.length} condizioni valide per ${communeName}`);
            return validConditions;
        }
        catch (error) {
            console.error(`❌ Errore caricamento condizioni ${communeName}:`, error);
            return [];
        }
    }
    /**
     * Estrae i dati dall'file TypeScript
     */
    parseConditionsFromFile(fileContent) {
        try {
            const conditions = [];
            // Nuovo approccio: cerca pattern specifici ignorando la struttura nidificata
            const lines = fileContent.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                // Cerca linee che contengono condition con valore string valido
                if (line.includes('condition:') && line.includes('"') && !line.includes('condition: string;')) {
                    const conditionMatch = line.match(/condition:\s*"([^"]+)"/);
                    if (!conditionMatch)
                        continue;
                    const condition = conditionMatch[1];
                    if (condition.length < 10)
                        continue; // Salta condizioni troppo corte
                    console.log(`🎯 Trovata condition: ${condition}`);
                    // Cerca i campi correlati nelle righe successive (massimo 20 righe dopo)
                    const details = this.findFieldInNextLines(lines, i, 'details', 20);
                    const ratePercent = this.findNumberInNextLines(lines, i, 'ratePercent', 20);
                    const context = this.findFieldInNextLines(lines, i, 'context', 20);
                    const categoryTypes = this.findArrayInNextLines(lines, i, 'categoryTypes', 20);
                    if (ratePercent !== null) {
                        const entry = {
                            condition,
                            details: details || condition,
                            ratePercent,
                            context,
                            categoryTypes,
                            zone: undefined
                        };
                        conditions.push(entry);
                        console.log(`✅ Condizione aggiunta: ${condition} -> ${ratePercent}%`);
                    }
                    else {
                        console.log(`⚠️ Condizione senza ratePercent: ${condition}`);
                    }
                }
            }
            console.log(`🔍 Estratte ${conditions.length} condizioni dal file`);
            return conditions;
        }
        catch (error) {
            console.error('❌ Errore parsing file:', error);
            return [];
        }
    }
    /**
     * Cerca un campo stringa nelle righe successive
     */
    findFieldInNextLines(lines, startIndex, fieldName, maxLines) {
        for (let i = startIndex + 1; i < Math.min(startIndex + maxLines, lines.length); i++) {
            const line = lines[i].trim();
            // Fermati se incontri una nuova condition
            if (line.includes('condition:') && line.includes('"')) {
                break;
            }
            const pattern = new RegExp(`${fieldName}:\\s*"([^"]*)"`, 'i');
            const match = line.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return undefined;
    }
    /**
     * Cerca un numero nelle righe successive
     */
    findNumberInNextLines(lines, startIndex, fieldName, maxLines) {
        for (let i = startIndex + 1; i < Math.min(startIndex + maxLines, lines.length); i++) {
            const line = lines[i].trim();
            // Fermati se incontri una nuova condition
            if (line.includes('condition:') && line.includes('"')) {
                break;
            }
            const pattern = new RegExp(`${fieldName}:\\s*([0-9.]+)`, 'i');
            const match = line.match(pattern);
            if (match) {
                return parseFloat(match[1]);
            }
        }
        return null;
    }
    /**
     * Cerca un array nelle righe successive
     */
    findArrayInNextLines(lines, startIndex, fieldName, maxLines) {
        for (let i = startIndex + 1; i < Math.min(startIndex + maxLines, lines.length); i++) {
            const line = lines[i].trim();
            // Fermati se incontri una nuova condition
            if (line.includes('condition:') && line.includes('"')) {
                break;
            }
            const pattern = new RegExp(`${fieldName}:\\s*\\[([^\\]]*?)\\]`, 'i');
            const match = line.match(pattern);
            if (match) {
                const arrayContent = match[1];
                return arrayContent
                    .split(',')
                    .map(item => item.trim().replace(/["']/g, ''))
                    .filter(item => item.length > 0);
            }
        }
        return undefined;
    }
    /**
     * Trova la migliore condizione applicabile per un immobile
     */
    async findBestCondition(fabbricato, userAnswers, immobileIndex, communeName) {
        const conditions = await this.loadCommuneConditions(communeName);
        if (conditions.length === 0) {
            return {
                aliquota: 0.76, // Aliquota standard nazionale
                descrizione: `Comune ${communeName} - aliquota standard (condizioni non disponibili)`,
                conditionMatched: null,
                matchingScore: 0
            };
        }
        let bestMatch = null;
        let bestScore = 0;
        for (const condition of conditions) {
            const score = this.calculateMatchingScore(condition, fabbricato, userAnswers, immobileIndex);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = condition;
            }
        }
        if (bestMatch) {
            return {
                aliquota: bestMatch.ratePercent,
                descrizione: `${communeName}: ${bestMatch.condition} (${bestMatch.ratePercent}%)`,
                conditionMatched: bestMatch,
                matchingScore: bestScore
            };
        }
        else {
            // Fallback: cerca condizione generica "altri fabbricati"
            const genericCondition = conditions.find(c => c.condition.toLowerCase().includes('altri fabbricati') ||
                c.condition.toLowerCase().includes('altri immobili'));
            if (genericCondition) {
                return {
                    aliquota: genericCondition.ratePercent,
                    descrizione: `${communeName}: ${genericCondition.condition} (${genericCondition.ratePercent}%)`,
                    conditionMatched: genericCondition,
                    matchingScore: 0.5
                };
            }
            return {
                aliquota: 1.06, // Aliquota standard per "altri fabbricati"
                descrizione: `${communeName}: Altri fabbricati (aliquota standard 1.06%)`,
                conditionMatched: null,
                matchingScore: 0
            };
        }
    }
    /**
     * Calcola il punteggio di matching tra una condizione e un immobile
     */
    calculateMatchingScore(condition, fabbricato, userAnswers, immobileIndex) {
        let score = 0;
        const maxScore = 100;
        // 1. Matching categoria catastale (peso 40%)
        if (condition.categoryTypes && condition.categoryTypes.length > 0) {
            const categoriaImmobile = fabbricato.categoria;
            for (const categoria of condition.categoryTypes) {
                if (categoria === categoriaImmobile) {
                    score += 40; // Match esatto
                    break;
                }
                else if (categoria.includes(categoriaImmobile) || categoriaImmobile.includes(categoria)) {
                    score += 20; // Match parziale
                    break;
                }
                else if (categoria === 'D' && categoriaImmobile.startsWith('D/')) {
                    score += 30; // Match gruppo catastale
                    break;
                }
            }
        }
        // 2. Matching modalità utilizzo (peso 30%)
        const modalitaUtente = userAnswers.condizioni_immobili?.[`immobile_${immobileIndex}`];
        if (modalitaUtente && condition.condition) {
            const conditionLower = condition.condition.toLowerCase();
            if (modalitaUtente === 'abitazione_principale' &&
                conditionLower.includes('abitazione principale')) {
                score += 30;
            }
            else if (modalitaUtente === 'locato' &&
                (conditionLower.includes('locat') || conditionLower.includes('affitt'))) {
                score += 30;
            }
            else if (modalitaUtente === 'comodato' &&
                conditionLower.includes('comodato')) {
                score += 30;
            }
            else if (modalitaUtente === 'a_disposizione' &&
                (conditionLower.includes('altri') || conditionLower.includes('diversi'))) {
                score += 15;
            }
        }
        // 3. Matching caratteristiche speciali (peso 20%)
        if (condition.context) {
            const contextLower = condition.context.toLowerCase();
            // Controlla se ci sono caratteristiche speciali dell'utente
            const caratteristicheSpeciali = userAnswers.caratteristicheSpeciali;
            if (caratteristicheSpeciali) {
                if (contextLower.includes('anzian') && caratteristicheSpeciali.includes('anziano')) {
                    score += 20;
                }
                if (contextLower.includes('disabil') && caratteristicheSpeciali.includes('disabile')) {
                    score += 20;
                }
            }
        }
        // 4. Matching terreni vs fabbricati (peso 10%)
        const isTerreno = fabbricato.tipo === 'terreno' || fabbricato.categoria?.startsWith('T');
        const conditionIsTerreno = condition.condition.toLowerCase().includes('terreni') ||
            condition.condition.toLowerCase().includes('agricol');
        if (isTerreno === conditionIsTerreno) {
            score += 10;
        }
        return Math.min(score, maxScore);
    }
    /**
     * Genera domande specifiche basate sulle condizioni del comune
     */
    async generateCommuneSpecificQuestions(extractedData, communeName) {
        const conditions = await this.loadCommuneConditions(communeName);
        const questions = [];
        const askedQuestions = new Set();
        // Analizza ogni immobile per capire quali domande servono
        for (const [index, fabbricato] of extractedData.fabbricati.entries()) {
            const relevantConditions = conditions.filter(condition => this.isConditionRelevantForProperty(condition, fabbricato));
            for (const condition of relevantConditions) {
                if (condition.requiredParameters?.required) {
                    for (const param of condition.requiredParameters.required) {
                        if (param.questions) {
                            for (const question of param.questions) {
                                const questionKey = `${param.name}_${index}`;
                                if (!askedQuestions.has(questionKey)) {
                                    questions.push({
                                        id: questionKey,
                                        question: `Immobile ${index + 1}: ${question}`,
                                        type: 'select',
                                        options: this.getOptionsForParameter(param, condition),
                                        immobileIndex: index,
                                        parameterName: param.name,
                                        relatedCondition: condition.condition
                                    });
                                    askedQuestions.add(questionKey);
                                }
                            }
                        }
                    }
                }
            }
        }
        return questions;
    }
    /**
     * Verifica se una condizione è rilevante per un immobile
     */
    isConditionRelevantForProperty(condition, fabbricato) {
        // Se la condizione specifica categorie, controlla match
        if (condition.categoryTypes && condition.categoryTypes.length > 0) {
            const categoria = fabbricato.categoria;
            return condition.categoryTypes.some(cat => cat === categoria ||
                cat.includes(categoria) ||
                categoria.includes(cat) ||
                (cat === 'D' && categoria.startsWith('D/')));
        }
        // Se non specifica categorie, è genericamente applicabile
        return true;
    }
    /**
     * Genera opzioni per un parametro specifico
     */
    getOptionsForParameter(param, condition) {
        switch (param.name) {
            case 'modalitaUtilizzo':
                return [
                    'abitazione_principale',
                    'locato',
                    'comodato',
                    'a_disposizione',
                    'altro'
                ];
            case 'tipoContratto':
                return [
                    'canone_libero',
                    'canone_concordato',
                    'contratto_temporaneo',
                    'comodato_gratuito'
                ];
            case 'caratteristicheSoggetto':
                return [
                    'normale',
                    'anziano',
                    'disabile',
                    'studente',
                    'onlus'
                ];
            default:
                // Usa i valori rilevati dalla condizione se disponibili
                if (param.detectedValues && param.detectedValues.length > 0) {
                    return param.detectedValues;
                }
                return ['si', 'no', 'non_applicabile'];
        }
    }
    /**
     * Lista dei comuni disponibili
     */
    getAvailableCommunes() {
        return Array.from(this.communeFileCache.keys());
    }
}
exports.CommuneConditionsService = CommuneConditionsService;
