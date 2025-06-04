"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAdvancedPDF = processAdvancedPDF;
exports.isPDFScanned = isPDFScanned;
exports.getExtractionTips = getExtractionTips;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
/**
 * Processore PDF avanzato ottimizzato per delibere comunali italiane
 * Combina estrazione testo + tabelle + metadati
 */
async function processAdvancedPDF(fileData) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        let buffer;
        // Converti Blob in Buffer se necessario
        if (fileData instanceof Blob) {
            const arrayBuffer = await fileData.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        }
        else {
            buffer = fileData;
        }
        console.log(`📄 Elaborazione PDF avanzata: ${buffer.length} bytes`);
        // 1. Estrazione con pdf-parse (testo + metadati)
        const pdfData = await (0, pdf_parse_1.default)(buffer, {
            // Opzioni per migliorare l'estrazione
            version: 'v1.10.100', // Usa versione specifica di pdf2json
            max: 0, // Processa tutte le pagine
            pagerender: renderPage, // Custom renderer per delibere
            normalizeWhitespace: true, // Pulisci whitespace
            disableCombineTextItems: false // Migliora il testo combinato
        });
        // 2. Analizza il contenuto per determinare la qualità
        const extractionQuality = analyzeExtractionQuality(pdfData.text);
        // 3. Estrai tabelle se presenti (placeholder - richiederebbe tabula-js)
        const tables = await extractTables(buffer);
        // 4. Costruisci metadati completi
        const metadata = {
            pages: pdfData.numpages,
            title: (_a = pdfData.info) === null || _a === void 0 ? void 0 : _a.Title,
            author: (_b = pdfData.info) === null || _b === void 0 ? void 0 : _b.Author,
            subject: (_c = pdfData.info) === null || _c === void 0 ? void 0 : _c.Subject,
            creator: (_d = pdfData.info) === null || _d === void 0 ? void 0 : _d.Creator,
            producer: (_e = pdfData.info) === null || _e === void 0 ? void 0 : _e.Producer,
            creationDate: ((_f = pdfData.info) === null || _f === void 0 ? void 0 : _f.CreationDate) ? new Date(pdfData.info.CreationDate) : undefined,
            modificationDate: ((_g = pdfData.info) === null || _g === void 0 ? void 0 : _g.ModDate) ? new Date(pdfData.info.ModDate) : undefined,
        };
        console.log(`✅ PDF elaborato: ${pdfData.text.length} caratteri, ${pdfData.numpages} pagine`);
        console.log(`🎯 Qualità estrazione: ${extractionQuality}`);
        return {
            text: pdfData.text,
            tables,
            metadata,
            extractionMethod: 'pdf-parse',
            confidence: extractionQuality
        };
    }
    catch (error) {
        console.error('❌ Errore nell\'elaborazione PDF avanzata:', error);
        // Fallback: tenta estrazione base
        return {
            text: `[ERRORE ESTRAZIONE PDF: ${error instanceof Error ? error.message : 'Errore sconosciuto'}]`,
            tables: [],
            metadata: { pages: 0 },
            extractionMethod: 'fallback',
            confidence: 'low'
        };
    }
}
/**
 * Renderer personalizzato per migliorare l'estrazione da delibere
 */
function renderPage(pageData) {
    // Personalizza l'estrazione per delibere comunali
    // - Identifica intestazioni
    // - Migliora formattazione tabelle
    // - Preserva struttura logica
    let render_options = {
        normalizeWhitespace: false,
        disableCombineTextItems: false
    };
    return pageData.getTextContent(render_options).then((textContent) => {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY) {
                text += item.str;
            }
            else {
                text += '\n' + item.str;
            }
            lastY = item.transform[5];
        }
        // Post-processing specifico per delibere
        text = cleanDeliberaText(text);
        return text;
    });
}
/**
 * Pulisce il testo estratto dalle delibere
 */
function cleanDeliberaText(text) {
    return text
        // Rimuovi caratteri di controllo
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
        // Normalizza spazi multipli
        .replace(/\s+/g, ' ')
        // Migliora formattazione per aliquote (es: "10,6 ‰" o "1,06 %")
        .replace(/(\d+[,.]?\d*)\s*[‰%]/g, '$1‰')
        // Preserva strutture tipiche delle delibere
        .replace(/Art\.\s*(\d+)/gi, 'Articolo $1')
        .replace(/Del\.\s*(\d+)/gi, 'Delibera $1')
        .trim();
}
/**
 * Analizza la qualità dell'estrazione
 */
function analyzeExtractionQuality(text) {
    const indicators = {
        // Lunghezza ragionevole
        hasGoodLength: text.length > 100 && text.length < 100000,
        // Contiene parole chiave delle delibere
        hasDeliberaKeywords: /(?:delibera|giunta|consiglio|comunale|IMU|aliquot)/gi.test(text),
        // Ha struttura logica
        hasStructure: /(?:art|articolo|comma|punto)\.?\s*\d+/gi.test(text),
        // Contiene numeri (aliquote, anni, etc.)
        hasNumbers: /\d+[,.]?\d*\s*[‰%]?/g.test(text),
        // Non è solo garbage
        notGarbage: !/^[\s\n\r\t]*$/.test(text) && !/^[^\w\s]{10,}/.test(text)
    };
    const score = Object.values(indicators).filter(Boolean).length;
    if (score >= 4)
        return 'high';
    if (score >= 2)
        return 'medium';
    return 'low';
}
/**
 * Estrae tabelle dal PDF (placeholder)
 */
async function extractTables(buffer) {
    try {
        // Placeholder per integrazione futura con tabula-js o pdf-table-extractor
        // const tabula = require('tabula-js');
        // return await tabula(buffer);
        console.log('📊 Estrazione tabelle (placeholder attivo)');
        return [];
    }
    catch (error) {
        console.warn('⚠️ Errore nell\'estrazione tabelle:', error);
        return [];
    }
}
/**
 * Funzione di utilità per verificare se un PDF è scansionato
 */
function isPDFScanned(extractedData) {
    const textDensity = extractedData.text.length / extractedData.metadata.pages;
    // Se c'è molto poco testo per pagina, probabilmente è scansionato
    return textDensity < 50;
}
/**
 * Suggerimenti per migliorare l'estrazione
 */
function getExtractionTips(extractedData) {
    const tips = [];
    if (extractedData.confidence === 'low') {
        tips.push('⚠️ Qualità estrazione bassa - considera OCR');
    }
    if (isPDFScanned(extractedData)) {
        tips.push('📷 PDF potrebbe essere scansionato - usa Tesseract OCR');
    }
    if (extractedData.text.length < 100) {
        tips.push('📄 Poco testo estratto - verifica se il PDF è protetto');
    }
    if (extractedData.tables.length === 0) {
        tips.push('📊 Nessuna tabella trovata - prova tabula-js per aliquote');
    }
    return tips;
}
//# sourceMappingURL=advancedPdfProcessor.js.map