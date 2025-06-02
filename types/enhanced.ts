// Tipi estesi per includere i parametri necessari per la verifica delle condizioni IMU

export interface ParameterInfo {
  name: string;
  type: 'required' | 'conditional';
  questions: string[];
  validationRules: string[];
  detectedValues: string[];
  limits?: string[]; // per superficie
  specificCategories?: string[]; // per categorie catastali
}

export interface RequiredParameters {
  required: ParameterInfo[];
  conditional: ParameterInfo[];
  questions: string[];
  validationRules: string[];
  commune: string;
}

// Interfaccia estesa che include i parametri necessari
export interface EnhancedImuRateEntry {
  condition: string; // short summary of the use case
  details: string; // original wording from the PDF
  ratePercent: number; // aliquota as percentage
  context?: string; // zone, contract type, or legal reference (optional)
  categoryTypes?: string[]; // optional reference to applicable categories (e.g. ["A/1", "A/8"])
  zone?: string; // optional, specific geographical area if mentioned
  requiredParameters?: RequiredParameters; // parametri necessari per verificare questa condizione
}

// Tipi per i parametri di input dell'utente
export interface UserPropertyInfo {
  categoriaAtastale?: string; // Es: "A/1", "A/2", etc.
  modalitaUtilizzo?: string; // Es: "abitazione principale", "locato", "a disposizione"
  ubicazione?: string; // Es: "centro storico", "zona residenziale"
  superficie?: number; // superficie in mq
  caratteristicheSoggetto?: string[]; // Es: ["handicap"], ["ONLUS"], ["studente"]
  tipoContratto?: string; // Es: "canone libero", "patti territoriali"
  destinazioneUso?: string; // Es: "turistico-ricettiva", "commerciale"
  condizioniSpeciali?: string[]; // Es: ["inagibile"], ["vincolo"], ["start-up"]
  comune: string; // nome del comune
  provincia: string; // sigla provincia
}

// Tipo per il risultato del matching
export interface ConditionMatch {
  condition: EnhancedImuRateEntry;
  matchScore: number; // 0-1, quanto bene matcha la condizione
  missingParameters: string[]; // parametri mancanti per verificare la condizione
  requiredQuestions: string[]; // domande da fare all'utente
}

// Tipo per la risposta del sistema di matching
export interface ImuMatchingResult {
  exactMatches: ConditionMatch[]; // condizioni che matchano perfettamente
  partialMatches: ConditionMatch[]; // condizioni che potrebbero matchare
  requiredQuestions: string[]; // domande da fare per disambiguare
  suggestedRate?: number; // aliquota suggerita se c'è un match chiaro
  commune: string;
  provincia: string;
} 