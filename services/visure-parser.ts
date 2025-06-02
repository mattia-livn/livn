import * as fs from 'fs';
import * as path from 'path';
import { FabbricatoCatastaleAPI, TerrenoCatastaleAPI, ProprietarioCatastale } from './catasto-service';

export interface VisuraParsingResult {
  success: boolean;
  errors: string[];
  fabbricati: FabbricatoCatastaleAPI[];
  terreni: TerrenoCatastaleAPI[];
  metadata: {
    fileName: string;
    fileType: string;
    parsedAt: Date;
    totalProperties: number;
  };
}

export interface VisuraUploadOptions {
  maxFileSize?: number; // MB
  allowedTypes?: string[];
  extractImagesFromPDF?: boolean;
}

export class VisureParser {
  private readonly defaultOptions: Required<VisuraUploadOptions> = {
    maxFileSize: 10, // 10MB
    allowedTypes: ['application/pdf', 'text/plain', 'text/csv', 'application/vnd.ms-excel'],
    extractImagesFromPDF: false
  };

  constructor(private options: VisuraUploadOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Parsa una visura catastale da file
   */
  async parseVisura(filePath: string, fileName: string): Promise<VisuraParsingResult> {
    const result: VisuraParsingResult = {
      success: false,
      errors: [],
      fabbricati: [],
      terreni: [],
      metadata: {
        fileName,
        fileType: path.extname(fileName).toLowerCase(),
        parsedAt: new Date(),
        totalProperties: 0
      }
    };

    try {
      // Verifica esistenza file
      if (!fs.existsSync(filePath)) {
        result.errors.push('File non trovato');
        return result;
      }

      // Verifica dimensione file
      const stats = fs.statSync(filePath);
      const fileSizeMB = stats.size / (1024 * 1024);
      
      if (fileSizeMB > this.options.maxFileSize!) {
        result.errors.push(`File troppo grande: ${fileSizeMB.toFixed(2)}MB (max: ${this.options.maxFileSize}MB)`);
        return result;
      }

      // Parse basato sul tipo di file
      const fileExtension = path.extname(fileName).toLowerCase();
      
      switch (fileExtension) {
        case '.pdf':
          await this.parsePDFVisura(filePath, result);
          break;
        case '.txt':
          await this.parseTextVisura(filePath, result);
          break;
        case '.csv':
          await this.parseCSVVisura(filePath, result);
          break;
        default:
          result.errors.push(`Tipo di file non supportato: ${fileExtension}`);
          return result;
      }

      result.metadata.totalProperties = result.fabbricati.length + result.terreni.length;
      result.success = result.errors.length === 0 && result.metadata.totalProperties > 0;

      if (result.metadata.totalProperties === 0 && result.errors.length === 0) {
        result.errors.push('Nessun immobile trovato nel file');
      }

    } catch (error) {
      result.errors.push(`Errore durante il parsing: ${(error as Error).message}`);
    }

    return result;
  }

  /**
   * Parsa visura PDF (richiede OCR o estrazione testo)
   */
  private async parsePDFVisura(filePath: string, result: VisuraParsingResult): Promise<void> {
    // Per ora implementiamo una versione base che cerca pattern testuali
    // In futuro si può integrare con pdf2pic + OCR o pdf-parse
    
    try {
      // Simulazione parsing PDF - in realtà servirebbe una libreria come pdf-parse
      result.errors.push('Parsing PDF non ancora implementato. Usa il formato TXT o CSV per ora.');
      
      // TODO: Implementare con pdf-parse o simile:
      // const pdfParse = require('pdf-parse');
      // const dataBuffer = fs.readFileSync(filePath);
      // const pdfData = await pdfParse(dataBuffer);
      // this.parseTextContent(pdfData.text, result);
      
    } catch (error) {
      result.errors.push(`Errore parsing PDF: ${(error as Error).message}`);
    }
  }

  /**
   * Parsa visura in formato testo
   */
  private async parseTextVisura(filePath: string, result: VisuraParsingResult): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.parseTextContent(content, result);
    } catch (error) {
      result.errors.push(`Errore lettura file testo: ${(error as Error).message}`);
    }
  }

  /**
   * Parsa visura in formato CSV
   */
  private async parseCSVVisura(filePath: string, result: VisuraParsingResult): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.parseCSVContent(content, result);
    } catch (error) {
      result.errors.push(`Errore parsing CSV: ${(error as Error).message}`);
    }
  }

  /**
   * Estrae dati da contenuto testuale di visura
   */
  private parseTextContent(content: string, result: VisuraParsingResult): void {
    const lines = content.split('\n').map(line => line.trim());
    
    // Pattern migliorati per riconoscere dati catastali
    const patterns = {
      // Fabbricati: pattern più flessibili per catturare subalterno e titolarità
      fabbricato: /(?:Fg\.?|Foglio)\s*(\d+).*?(?:Part\.?|Particella|P\.)\s*(\d+).*?(?:Sub\.?|Subalterno|S\.)\s*(\d+).*?(?:Cat\.?|Categoria)\s*([\w\/\-]+).*?(?:Cl\.?|Classe)\s*(\w+).*?(?:Cons\.?|Consistenza)\s*([\d,]+).*?(?:Rendita|€)\s*([\d.,]+)/i,
      
      // Pattern per fabbricati senza subalterno esplicito
      fabbricatoNoSub: /(?:Fg\.?|Foglio)\s*(\d+).*?(?:Part\.?|Particella|P\.)\s*(\d+).*?(?:Cat\.?|Categoria)\s*([\w\/\-]+).*?(?:Cl\.?|Classe)\s*(\w+).*?(?:Cons\.?|Consistenza)\s*([\d,]+).*?(?:Rendita|€)\s*([\d.,]+)/i,
      
      // Terreni: pattern migliorato
      terreno: /(?:Fg\.?|Foglio)\s*(\d+).*?(?:Part\.?|Particella|P\.)\s*(\d+).*?(?:Qual\.?|Qualità)\s*(\w+).*?(?:Cl\.?|Classe)\s*(\w+).*?(?:Sup\.?|Superficie).*?([\d.,]+).*?(?:RD|Reddito.*?Dominicale).*?([\d.,]+).*?(?:RA|Reddito.*?Agrario).*?([\d.,]+)/i,
      
      // Dati intestatario migliorati
      intestatario: /(?:COGNOME|Cognome|DENOMINAZIONE)\s*[:\s]*([A-Z\s]+).*?(?:NOME|Nome)\s*[:\s]*([A-Z\s]+).*?(?:CF|Codice.*?Fiscale|C\.F\.)\s*[:\s]*([A-Z0-9]{16})/i,
      
      // Pattern per titolarità
      titolarita: /(?:TITOLARITÀ|Titolarità|DIRITTO)\s*[:\s]*([A-Z\s]+)/i,
      
      // Pattern per quota
      quota: /(?:QUOTA|Quota)\s*[:\s]*(\d+)\/(\d+)|(?:per\s+intero)/i,
      
      // Comune e provincia
      ubicazione: /(?:Comune|COMUNE)\s*[:\s]*([A-Z\s]+).*?(?:Provincia|PROVINCIA)\s*[:\s]*\(?([A-Z]{2})\)?/i
    };

    let proprietarioCorrente: ProprietarioCatastale | null = null;
    let comuneCorrente = '';
    let provinciaCorrente = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Cerca intestatario
      const matchIntestatario = line.match(patterns.intestatario);
      if (matchIntestatario) {
        const [, cognome, nome, cf] = matchIntestatario;
        
        // Cerca titolarità nelle righe vicine
        let titolaritaTrovata = 'Proprietà';
        let quotaTrovata = { numeratore: 1, denominatore: 1 };
        
        for (let j = Math.max(0, i-2); j <= Math.min(lines.length-1, i+2); j++) {
          const matchTitolarita = lines[j].match(patterns.titolarita);
          if (matchTitolarita) {
            titolaritaTrovata = matchTitolarita[1].trim();
          }
          
          const matchQuota = lines[j].match(patterns.quota);
          if (matchQuota) {
            if (matchQuota[0].includes('per intero')) {
              quotaTrovata = { numeratore: 1, denominatore: 1 };
            } else {
              quotaTrovata = {
                numeratore: parseInt(matchQuota[1]),
                denominatore: parseInt(matchQuota[2])
              };
            }
          }
        }
        
        proprietarioCorrente = {
          denominazione: `${nome.trim()} ${cognome.trim()}`,
          codiceFiscale: cf.trim(),
          titolarita: titolaritaTrovata,
          quota: quotaTrovata
        };
      }

      // Cerca ubicazione
      const matchUbicazione = line.match(patterns.ubicazione);
      if (matchUbicazione) {
        comuneCorrente = matchUbicazione[1].trim();
        provinciaCorrente = matchUbicazione[2].trim();
      }

      // Cerca fabbricati (con subalterno)
      const matchFabbricato = line.match(patterns.fabbricato);
      if (matchFabbricato && proprietarioCorrente) {
        const [, foglio, particella, subalterno, categoria, classe, consistenza, rendita] = matchFabbricato;
        
        const fabbricato: FabbricatoCatastaleAPI = {
          comune: comuneCorrente,
          provincia: provinciaCorrente,
          codiceCatastale: '', // Da dedurre dal comune
          sezione: null,
          sezioneUrbana: null,
          foglio: parseInt(foglio),
          particella: parseInt(particella),
          subalterno: parseInt(subalterno),
          categoria: categoria.trim(),
          classe: classe.trim(),
          consistenza: parseFloat(consistenza.replace(',', '.')),
          superficie: 0, // Non sempre presente nelle visure
          rendita: this.parseRendita(rendita),
          zona: '',
          ubicazione: `${comuneCorrente} (${provinciaCorrente})`,
          piano: '',
          interno: '',
          proprietario: { ...proprietarioCorrente },
          dataAggiornamento: new Date(),
          idImmobile: `${foglio}-${particella}-${subalterno}`
        };
        
        result.fabbricati.push(fabbricato);
      }
      
      // Cerca fabbricati senza subalterno esplicito
      const matchFabbricatoNoSub = line.match(patterns.fabbricatoNoSub);
      if (matchFabbricatoNoSub && proprietarioCorrente && !matchFabbricato) {
        const [, foglio, particella, categoria, classe, consistenza, rendita] = matchFabbricatoNoSub;
        
        const fabbricato: FabbricatoCatastaleAPI = {
          comune: comuneCorrente,
          provincia: provinciaCorrente,
          codiceCatastale: '',
          sezione: null,
          sezioneUrbana: null,
          foglio: parseInt(foglio),
          particella: parseInt(particella),
          subalterno: 0, // Nessun subalterno trovato
          categoria: categoria.trim(),
          classe: classe.trim(),
          consistenza: parseFloat(consistenza.replace(',', '.')),
          superficie: 0,
          rendita: this.parseRendita(rendita),
          zona: '',
          ubicazione: `${comuneCorrente} (${provinciaCorrente})`,
          piano: '',
          interno: '',
          proprietario: { ...proprietarioCorrente },
          dataAggiornamento: new Date(),
          idImmobile: `${foglio}-${particella}-0`
        };
        
        result.fabbricati.push(fabbricato);
      }

      // Cerca terreni
      const matchTerreno = line.match(patterns.terreno);
      if (matchTerreno && proprietarioCorrente) {
        const [, foglio, particella, qualita, classe, superficie, redditoDominicale, redditoAgrario] = matchTerreno;
        
        const terreno: TerrenoCatastaleAPI = {
          comune: comuneCorrente,
          provincia: provinciaCorrente,
          codiceCatastale: '',
          sezione: null,
          foglio: parseInt(foglio),
          particella: parseInt(particella),
          qualita: qualita.trim(),
          classe: classe.trim(),
          superficie: parseFloat(superficie.replace(',', '.')),
          redditoDominicale: this.parseRendita(redditoDominicale),
          redditoAgrario: this.parseRendita(redditoAgrario),
          ubicazione: `${comuneCorrente} (${provinciaCorrente})`,
          proprietario: { ...proprietarioCorrente },
          dataAggiornamento: new Date(),
          idImmobile: `${foglio}-${particella}`
        };
        
        result.terreni.push(terreno);
      }
    }
  }

  /**
   * Helper per parsare le rendite in formato monetario
   */
  private parseRendita(rendita: string): number {
    // Rimuove caratteri non numerici eccetto virgole e punti
    const cleanRendita = rendita.replace(/[^0-9.,]/g, '');
    
    // Gestisce formati come "1.234,56" o "1234.56"
    if (cleanRendita.includes(',')) {
      // Formato italiano: "1.234,56"
      const parts = cleanRendita.split(',');
      const integerPart = parts[0].replace(/\./g, ''); // Rimuove separatori di migliaia
      const decimalPart = parts[1] || '00';
      return parseFloat(`${integerPart}.${decimalPart}`);
    } else {
      // Formato inglese o senza decimali
      return parseFloat(cleanRendita) || 0;
    }
  }

  /**
   * Parsa contenuto CSV con formato predefinito
   */
  private parseCSVContent(content: string, result: VisuraParsingResult): void {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length < 2) {
      result.errors.push('File CSV vuoto o formato non valido');
      return;
    }

    const header = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Verifica presenza colonne obbligatorie
    const requiredColumns = ['tipo', 'comune', 'provincia', 'foglio', 'particella'];
    const missingColumns = requiredColumns.filter(col => !header.includes(col));
    
    if (missingColumns.length > 0) {
      result.errors.push(`Colonne mancanti nel CSV: ${missingColumns.join(', ')}`);
      return;
    }

    // Proprietario di default (andrà richiesto all'utente)
    const proprietarioDefault: ProprietarioCatastale = {
      denominazione: 'Da specificare',
      codiceFiscale: 'DA_SPECIFICARE',
      titolarita: 'Proprietà',
      quota: { numeratore: 1, denominatore: 1 }
    };

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      
      if (values.length !== header.length) {
        result.errors.push(`Riga ${i + 1}: numero di colonne non corrispondente`);
        continue;
      }

      const row: Record<string, string> = {};
      header.forEach((col, idx) => {
        row[col] = values[idx];
      });

      try {
        if (row.tipo?.toLowerCase() === 'fabbricato' || row.tipo?.toLowerCase() === 'f') {
          const fabbricato: FabbricatoCatastaleAPI = {
            comune: row.comune,
            provincia: row.provincia,
            codiceCatastale: row.codice_catastale || '',
            sezione: row.sezione || null,
            sezioneUrbana: row.sezione_urbana || null,
            foglio: parseInt(row.foglio),
            particella: parseInt(row.particella),
            subalterno: parseInt(row.subalterno || '0'),
            categoria: row.categoria || '',
            classe: row.classe || '',
            consistenza: parseFloat(row.consistenza || '0'),
            superficie: parseFloat(row.superficie || '0'),
            rendita: parseFloat(row.rendita || '0'),
            zona: row.zona || '',
            ubicazione: row.ubicazione || `${row.comune} (${row.provincia})`,
            piano: row.piano || '',
            interno: row.interno || '',
            proprietario: { ...proprietarioDefault },
            dataAggiornamento: new Date(),
            idImmobile: `${row.foglio}-${row.particella}-${row.subalterno || '0'}`
          };
          
          result.fabbricati.push(fabbricato);
          
        } else if (row.tipo?.toLowerCase() === 'terreno' || row.tipo?.toLowerCase() === 't') {
          const terreno: TerrenoCatastaleAPI = {
            comune: row.comune,
            provincia: row.provincia,
            codiceCatastale: row.codice_catastale || '',
            sezione: row.sezione || null,
            foglio: parseInt(row.foglio),
            particella: parseInt(row.particella),
            subalterno: row.subalterno ? parseInt(row.subalterno) : undefined,
            qualita: row.qualita || '',
            classe: row.classe || '',
            superficie: parseFloat(row.superficie || '0'),
            redditoDominicale: parseFloat(row.reddito_dominicale || '0'),
            redditoAgrario: parseFloat(row.reddito_agrario || '0'),
            ubicazione: row.ubicazione || `${row.comune} (${row.provincia})`,
            proprietario: { ...proprietarioDefault },
            dataAggiornamento: new Date(),
            idImmobile: `${row.foglio}-${row.particella}${row.subalterno ? '-' + row.subalterno : ''}`
          };
          
          result.terreni.push(terreno);
        }
      } catch (error) {
        result.errors.push(`Riga ${i + 1}: errore parsing dati - ${(error as Error).message}`);
      }
    }
  }

  /**
   * Genera template CSV per l'utente
   */
  generateCSVTemplate(): string {
    const headers = [
      'tipo', // fabbricato o terreno
      'comune',
      'provincia', 
      'foglio',
      'particella',
      'subalterno', // solo per fabbricati
      'categoria', // solo per fabbricati (A/2, C/1, ecc.)
      'classe',
      'consistenza', // vani per fabbricati
      'superficie', // mq
      'rendita', // euro per fabbricati
      'qualita', // solo per terreni
      'reddito_dominicale', // euro per terreni
      'reddito_agrario', // euro per terreni
      'ubicazione',
      'zona',
      'piano', // solo per fabbricati
      'interno', // solo per fabbricati
      'codice_catastale',
      'sezione',
      'sezione_urbana'
    ];

    const exampleRows = [
      [
        'fabbricato',
        'Milano',
        'MI',
        '123',
        '456',
        '1',
        'A/2',
        '3',
        '5.5',
        '85',
        '1234.56',
        '',
        '',
        '',
        'Via Roma 1',
        'Zona 1',
        '2',
        'int. 5',
        'F205',
        '',
        ''
      ],
      [
        'terreno',
        'Milano',
        'MI', 
        '124',
        '789',
        '',
        '',
        '2',
        '',
        '5000',
        '',
        'SEMINATIVO',
        '123.45',
        '67.89',
        'Via Campagna sn',
        '',
        '',
        '',
        'F205',
        'A',
        ''
      ]
    ];

    const csv = [headers.join(',')];
    exampleRows.forEach(row => csv.push(row.join(',')));
    
    return csv.join('\n');
  }

  /**
   * Valida i dati estratti
   */
  validateExtractedData(data: VisuraParsingResult): string[] {
    const errors: string[] = [];

    // Validazione fabbricati
    data.fabbricati.forEach((fab, idx) => {
      if (!fab.comune) errors.push(`Fabbricato ${idx + 1}: comune mancante`);
      if (!fab.provincia) errors.push(`Fabbricato ${idx + 1}: provincia mancante`);
      if (!fab.foglio || fab.foglio <= 0) errors.push(`Fabbricato ${idx + 1}: foglio non valido`);
      if (!fab.particella || fab.particella <= 0) errors.push(`Fabbricato ${idx + 1}: particella non valida`);
      if (!fab.categoria) errors.push(`Fabbricato ${idx + 1}: categoria mancante`);
      if (!fab.rendita || fab.rendita <= 0) errors.push(`Fabbricato ${idx + 1}: rendita non valida`);
    });

    // Validazione terreni
    data.terreni.forEach((ter, idx) => {
      if (!ter.comune) errors.push(`Terreno ${idx + 1}: comune mancante`);
      if (!ter.provincia) errors.push(`Terreno ${idx + 1}: provincia mancante`);
      if (!ter.foglio || ter.foglio <= 0) errors.push(`Terreno ${idx + 1}: foglio non valido`);
      if (!ter.particella || ter.particella <= 0) errors.push(`Terreno ${idx + 1}: particella non valida`);
      if (!ter.qualita) errors.push(`Terreno ${idx + 1}: qualità mancante`);
      if (!ter.redditoDominicale || ter.redditoDominicale <= 0) errors.push(`Terreno ${idx + 1}: reddito dominicale non valido`);
    });

    return errors;
  }
} 