export interface Property {
  id: string
  address: string
  comune: string
  provincia: string
  codiceComune: string
  categoriaCatastale: string
  renditaCatastale: number
  quotaPossesso: number
  superficie?: number
  vani?: number
  
  // Informazioni per il calcolo IMU
  abitazionePrincipale: boolean
  locato: boolean
  dataInizioLocazione?: string
  pertinenze: Pertinenza[]
  pertinenzaDi?: string // ID dell'immobile di cui questo è pertinenza (per categoria C)
  
  // Dati estratti dai documenti
  foglio?: string
  particella?: string
  subalterno?: string
  
  // Status dell'analisi
  analisiCompleta: boolean
  datiMancanti: string[]
}

export interface Pertinenza {
  id: string
  tipo: 'box' | 'cantina' | 'soffitta' | 'altro'
  categoriaCatastale: string
  renditaCatastale: number
  quotaPossesso: number
  foglio?: string
  particella?: string
  subalterno?: string
}

export interface DeliberaComune {
  comune: string
  provincia: string
  codiceComune: string
  anno: number
  aliquote: {
    [categoria: string]: {
      abitazionePrincipale: number
      altreAbitazioni: number
      locato?: number
      pertinenze?: number
    }
  }
  detrazioni: {
    abitazionePrincipale: number
    pertinenze?: number
  }
}

export interface IMUCalculation {
  propertyId: string
  renditaRivalutata: number
  baseImponibile: number
  aliquotaApplicata: number
  importoLordo: number
  detrazione: number
  importoNetto: number
  quotaPossesso: number
  importoFinale: number
  dettagli: {
    categoria: string
    tipo: 'abitazione_principale' | 'altra_abitazione' | 'locato'
    pertinenze: PertinenzaCalculation[]
  }
}

export interface PertinenzaCalculation {
  tipo: string
  renditaRivalutata: number
  baseImponibile: number
  aliquotaApplicata: number
  importoLordo: number
  detrazione: number
  importoNetto: number
  quotaPossesso: number
  importoFinale: number
} 