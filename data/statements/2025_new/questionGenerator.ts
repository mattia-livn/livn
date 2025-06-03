import { imuRatesTorinoTO2025, ImuRateEntry } from './torinoTO2025';

// Immobile grezzo dalla visura catastale
export interface RawProperty {
  id: string;
  type: 'fabbricato' | 'terreno';
  category?: string; // categoria catastale (A/1, D/3, etc.)
  address: string;
  owners: string[];
  // Altri dati base dalla visura...
}

// Informazioni aggiuntive che dobbiamo raccogliere
export interface PropertyDetails {
  // Informazioni base
  isMainResidence?: boolean;
  isAppurtenanceOf?: string[]; // ID degli immobili di cui è pertinenza
  
  // Informazioni proprietario
  ownerIsElderlyOrDisabled?: boolean;
  ownerIsInstitutionalized?: boolean;
  ownerIsAgriculturalEntrepreneur?: boolean;
  
  // Informazioni uso immobile
  isAgriculturalUse?: boolean;
  isBuildable?: boolean; // per terreni
  
  // Informazioni attività economica
  atecoCode?: string;
  tenantCompanyAgeMonths?: number;
  tenantIsMigrantSupportOrg?: boolean;
  
  // Informazioni contratti locazione
  contractType?: 'canone_concordato' | 'studenti' | 'transitorio' | 'libero' | 'none';
}

export interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'select' | 'number' | 'text' | 'multiselect';
  options?: string[];
  required: boolean;
  dependsOn?: string; // ID di altra domanda
  reason: string; // Perché stiamo facendo questa domanda
}

export interface QuestionGroup {
  title: string;
  description: string;
  questions: Question[];
  applicableRates: string[]; // Labels delle aliquote che potrebbero applicarsi
}

export class TorinIMUQuestionGenerator {
  private rates: ImuRateEntry[];
  
  constructor() {
    this.rates = imuRatesTorinoTO2025;
  }

  // Genera le domande necessarie per un immobile specifico
  generateQuestions(property: RawProperty): QuestionGroup[] {
    const potentialRates = this.findPotentialRates(property);
    const questionGroups: QuestionGroup[] = [];

    // Gruppo 1: Informazioni di base
    const basicQuestions = this.generateBasicQuestions(property, potentialRates);
    if (basicQuestions.questions.length > 0) {
      questionGroups.push(basicQuestions);
    }

    // Gruppo 2: Informazioni sul proprietario
    const ownerQuestions = this.generateOwnerQuestions(property, potentialRates);
    if (ownerQuestions.questions.length > 0) {
      questionGroups.push(ownerQuestions);
    }

    // Gruppo 3: Informazioni sull'uso
    const usageQuestions = this.generateUsageQuestions(property, potentialRates);
    if (usageQuestions.questions.length > 0) {
      questionGroups.push(usageQuestions);
    }

    // Gruppo 4: Informazioni contrattuali/locazioni
    const contractQuestions = this.generateContractQuestions(property, potentialRates);
    if (contractQuestions.questions.length > 0) {
      questionGroups.push(contractQuestions);
    }

    return questionGroups;
  }

  // Trova le aliquote potenzialmente applicabili basandosi sui dati della visura
  private findPotentialRates(property: RawProperty): ImuRateEntry[] {
    return this.rates.filter(rate => {
      // Se la rate specifica categoryTypes, l'immobile deve averla
      if (rate.categoryTypes && property.category) {
        return rate.categoryTypes.includes(property.category);
      }
      
      // Se non specifica categoryTypes, potrebbe essere applicabile
      return true;
    });
  }

  private generateBasicQuestions(property: RawProperty, potentialRates: ImuRateEntry[]): QuestionGroup {
    const questions: Question[] = [];
    const applicableRates = potentialRates.map(r => r.label);

    // Domanda su abitazione principale (solo per fabbricati residenziali)
    if (property.type === 'fabbricato' && this.needsMainResidenceInfo(potentialRates)) {
      questions.push({
        id: 'isMainResidence',
        text: 'Questo immobile è indicato come abitazione principale del proprietario?',
        type: 'boolean',
        required: true,
        reason: 'Per determinare se applicare l\'aliquota agevolata per abitazione principale'
      });
    }

    // Domanda su pertinenze
    if (property.type === 'fabbricato' && this.needsPertinenceInfo(property, potentialRates)) {
      questions.push({
        id: 'isAppurtenance',
        text: 'Questo immobile è una pertinenza (garage, cantina, etc.) di un\'abitazione principale?',
        type: 'boolean',
        required: true,
        reason: 'Le pertinenze godono della stessa aliquota dell\'abitazione principale'
      });
    }

    // Per terreni: edificabilità
    if (property.type === 'terreno' && this.needsBuildabilityInfo(potentialRates)) {
      questions.push({
        id: 'isBuildable',
        text: 'Questo terreno è considerato edificabile secondo il PRG comunale o risulta come area fabbricabile al catasto?',
        type: 'boolean',
        required: true,
        reason: 'I terreni edificabili hanno un\'aliquota diversa da quelli agricoli'
      });
    }

    return {
      title: 'Informazioni di base',
      description: 'Caratteristiche principali dell\'immobile',
      questions,
      applicableRates
    };
  }

  private generateOwnerQuestions(property: RawProperty, potentialRates: ImuRateEntry[]): QuestionGroup {
    const questions: Question[] = [];
    const applicableRates: string[] = [];

    // Controllo per agevolazioni anziani/disabili
    const elderlyDisabledRates = potentialRates.filter(r => 
      r.conditions.some(c => c.predicate.includes('ownerIsElderlyOrDisabled'))
    );
    
    if (elderlyDisabledRates.length > 0) {
      applicableRates.push(...elderlyDisabledRates.map(r => r.label));
      
      questions.push({
        id: 'ownerIsElderlyOrDisabled',
        text: 'Il proprietario è una persona anziana (oltre 65 anni) o con disabilità riconosciuta?',
        type: 'boolean',
        required: true,
        reason: 'Per l\'agevolazione assimilazione abitazione principale per anziani/disabili'
      });

      questions.push({
        id: 'ownerIsInstitutionalized',
        text: 'Il proprietario è ricoverato o domiciliato presso una struttura di assistenza?',
        type: 'boolean',
        required: true,
        dependsOn: 'ownerIsElderlyOrDisabled',
        reason: 'Condizione aggiuntiva per l\'agevolazione anziani/disabili'
      });
    }

    // Controllo per imprenditori agricoli
    const agriculturalRates = potentialRates.filter(r =>
      r.conditions.some(c => c.predicate.includes('ownerIsAgriculturalEntrepreneur'))
    );

    if (agriculturalRates.length > 0) {
      applicableRates.push(...agriculturalRates.map(r => r.label));
      
      questions.push({
        id: 'ownerIsAgriculturalEntrepreneur',
        text: 'Il proprietario è un coltivatore diretto o imprenditore agricolo professionale?',
        type: 'boolean',
        required: true,
        reason: 'Per l\'aliquota agevolata sui fabbricati rurali ad uso agricolo'
      });
    }

    return {
      title: 'Informazioni sul proprietario',
      description: 'Caratteristiche del proprietario che possono influire sull\'aliquota',
      questions,
      applicableRates
    };
  }

  private generateUsageQuestions(property: RawProperty, potentialRates: ImuRateEntry[]): QuestionGroup {
    const questions: Question[] = [];
    const applicableRates: string[] = [];

    // Uso agricolo
    const agriculturalUseRates = potentialRates.filter(r =>
      r.conditions.some(c => c.predicate.includes('isAgriculturalUse'))
    );

    if (agriculturalUseRates.length > 0) {
      applicableRates.push(...agriculturalUseRates.map(r => r.label));
      
      questions.push({
        id: 'isAgriculturalUse',
        text: 'Questo immobile è effettivamente utilizzato per attività agricola?',
        type: 'boolean',
        required: true,
        reason: 'Per l\'aliquota agevolata sui fabbricati rurali ad uso agricolo'
      });
    }

    // Codice ATECO per attività specifiche
    const atecoRates = potentialRates.filter(r =>
      r.conditions.some(c => c.predicate.includes('atecoCode'))
    );

    if (atecoRates.length > 0) {
      applicableRates.push(...atecoRates.map(r => r.label));
      
      const atecoOptions = this.extractAtecoCodesFromRates(atecoRates);
      
      questions.push({
        id: 'hasEconomicActivity',
        text: 'Nell\'immobile viene svolta un\'attività economica?',
        type: 'boolean',
        required: true,
        reason: 'Per verificare agevolazioni legate a specifiche attività economiche'
      });

      questions.push({
        id: 'atecoCode',
        text: 'Qual è il codice ATECO dell\'attività svolta?',
        type: 'select',
        options: atecoOptions,
        required: true,
        dependsOn: 'hasEconomicActivity',
        reason: 'Alcune attività hanno aliquote agevolate (cinema, startup innovative)'
      });

      // Per startup innovative
      if (atecoOptions.includes('72.1')) {
        questions.push({
          id: 'tenantCompanyAgeMonths',
          text: 'Da quanti mesi è attiva la startup?',
          type: 'number',
          required: true,
          dependsOn: 'atecoCode',
          reason: 'L\'agevolazione per startup innovative vale solo per i primi 24 mesi'
        });
      }
    }

    return {
      title: 'Informazioni sull\'uso',
      description: 'Come viene utilizzato l\'immobile',
      questions,
      applicableRates
    };
  }

  private generateContractQuestions(property: RawProperty, potentialRates: ImuRateEntry[]): QuestionGroup {
    const questions: Question[] = [];
    const applicableRates: string[] = [];

    // Contratti di locazione agevolati
    const rentalRates = potentialRates.filter(r =>
      r.conditions.some(c => c.predicate.includes('contractType')) ||
      r.conditions.some(c => c.predicate.includes('tenantIsMigrantSupportOrg'))
    );

    if (rentalRates.length > 0 && property.type === 'fabbricato') {
      applicableRates.push(...rentalRates.map(r => r.label));
      
      questions.push({
        id: 'isRented',
        text: 'L\'immobile è dato in locazione?',
        type: 'boolean',
        required: true,
        reason: 'Alcuni tipi di locazione hanno aliquote agevolate'
      });

      questions.push({
        id: 'contractType',
        text: 'Che tipo di contratto di locazione è?',
        type: 'select',
        options: [
          'canone_concordato',
          'studenti', 
          'transitorio',
          'libero'
        ],
        required: true,
        dependsOn: 'isRented',
        reason: 'I contratti a canone concordato, per studenti e transitori hanno aliquote agevolate'
      });

      questions.push({
        id: 'tenantIsMigrantSupportOrg',
        text: 'L\'inquilino è un ente che si occupa di accoglienza per migranti/richiedenti asilo?',
        type: 'boolean',
        required: true,
        dependsOn: 'isRented',
        reason: 'Agevolazione per immobili destinati all\'accoglienza integrata'
      });
    }

    return {
      title: 'Informazioni contrattuali',
      description: 'Contratti di locazione e destinazione d\'uso',
      questions,
      applicableRates
    };
  }

  // Metodi di supporto
  private needsMainResidenceInfo(rates: ImuRateEntry[]): boolean {
    return rates.some(r => r.conditions.some(c => c.predicate.includes('isMainResidence')));
  }

  private needsPertinenceInfo(property: RawProperty, rates: ImuRateEntry[]): boolean {
    const pertinenceCategories = ['C/2', 'C/6', 'C/7'];
    return property.category && pertinenceCategories.includes(property.category) &&
           rates.some(r => r.conditions.some(c => c.predicate.includes('isAppurtenanceOf')));
  }

  private needsBuildabilityInfo(rates: ImuRateEntry[]): boolean {
    return rates.some(r => r.conditions.some(c => c.predicate.includes('isBuildable')));
  }

  private extractAtecoCodesFromRates(rates: ImuRateEntry[]): string[] {
    const codes: string[] = [];
    rates.forEach(rate => {
      rate.conditions.forEach(condition => {
        const match = condition.predicate.match(/'(\d+\.?\d*\.?\d*)'/);
        if (match && match[1]) {
          codes.push(match[1]);
        }
      });
    });
    return [...new Set(codes)];
  }
}

// Funzione di utilità per generare tutte le domande per una lista di immobili
export function generateQuestionsForProperties(properties: RawProperty[]): Map<string, QuestionGroup[]> {
  const generator = new TorinIMUQuestionGenerator();
  const questionsMap = new Map<string, QuestionGroup[]>();
  
  properties.forEach(property => {
    questionsMap.set(property.id, generator.generateQuestions(property));
  });
  
  return questionsMap;
} 