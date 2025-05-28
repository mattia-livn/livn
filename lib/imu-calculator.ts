import { Property, IMUCalculation, DeliberaComune, PertinenzaCalculation } from '@/types/property'

// Coefficienti di rivalutazione per categoria catastale
const COEFFICIENTI_RIVALUTAZIONE = {
  'A': 1.05,  // 5% per categorie A
  'B': 1.40,  // 40% per categorie B
  'C': 1.05,  // 5% per categorie C
  'D': 1.05,  // 5% per categorie D
}

// Moltiplicatori per categoria catastale
const MOLTIPLICATORI = {
  'A': 160,   // Abitazioni
  'B': 140,   // Uffici, studi privati
  'C': 160,   // Negozi, laboratori
  'D': 65,    // Immobili industriali
}

export function calculateIMUForProperty(
  property: Property, 
  delibera: DeliberaComune
): IMUCalculation {
  // Determina il coefficiente di rivalutazione
  const categoria = property.categoriaCatastale.charAt(0) as keyof typeof COEFFICIENTI_RIVALUTAZIONE
  const coefficienteRivalutazione = COEFFICIENTI_RIVALUTAZIONE[categoria] || 1.05
  
  // Determina il moltiplicatore
  const moltiplicatore = MOLTIPLICATORI[categoria] || 160
  
  // Calcola la rendita rivalutata
  const renditaRivalutata = property.renditaCatastale * coefficienteRivalutazione
  
  // Calcola la base imponibile
  const baseImponibile = renditaRivalutata * moltiplicatore
  
  // Determina l'aliquota e il tipo
  let aliquotaApplicata: number
  let tipo: 'abitazione_principale' | 'altra_abitazione' | 'locato'
  
  const aliquoteCategoria = delibera.aliquote[property.categoriaCatastale]
  
  if (property.abitazionePrincipale) {
    aliquotaApplicata = aliquoteCategoria?.abitazionePrincipale || 0.4
    tipo = 'abitazione_principale'
  } else if (property.locato) {
    aliquotaApplicata = aliquoteCategoria?.locato || aliquoteCategoria?.altreAbitazioni || 1.06
    tipo = 'locato'
  } else {
    aliquotaApplicata = aliquoteCategoria?.altreAbitazioni || 1.06
    tipo = 'altra_abitazione'
  }
  
  // Calcola l'importo lordo
  const importoLordo = (baseImponibile * aliquotaApplicata) / 100
  
  // Applica la detrazione se abitazione principale
  const detrazione = property.abitazionePrincipale ? delibera.detrazioni.abitazionePrincipale : 0
  
  // Calcola l'importo netto
  const importoNetto = Math.max(0, importoLordo - detrazione)
  
  // Applica la quota di possesso (convertita da percentuale a decimale)
  const quotaDecimale = property.quotaPossesso > 1 ? property.quotaPossesso / 100 : property.quotaPossesso
  const importoQuota = importoNetto * quotaDecimale
  
  // Calcola le pertinenze
  const pertinenze: PertinenzaCalculation[] = property.pertinenze.map(pertinenza => {
    const pertinenzaCategoria = pertinenza.categoriaCatastale.charAt(0) as keyof typeof COEFFICIENTI_RIVALUTAZIONE
    const pertinenzaCoeff = COEFFICIENTI_RIVALUTAZIONE[pertinenzaCategoria] || 1.05
    const pertinenzaMolt = MOLTIPLICATORI[pertinenzaCategoria] || 160
    
    const pertinenzaRivalutata = pertinenza.renditaCatastale * pertinenzaCoeff
    const pertinenzaBase = pertinenzaRivalutata * pertinenzaMolt
    
    const pertinenzaAliquote = delibera.aliquote[pertinenza.categoriaCatastale]
    const pertinenzaAliquota = pertinenzaAliquote?.pertinenze || 
                               pertinenzaAliquote?.altreAbitazioni || 1.06
    
    const pertinenzaLordo = (pertinenzaBase * pertinenzaAliquota) / 100
    const pertinenzaDetrazione = delibera.detrazioni.pertinenze || 0
    const pertinenzaNetto = Math.max(0, pertinenzaLordo - pertinenzaDetrazione)
    const pertinenzaFinale = pertinenzaNetto * pertinenza.quotaPossesso
    
    return {
      tipo: pertinenza.tipo,
      renditaRivalutata: pertinenzaRivalutata,
      baseImponibile: pertinenzaBase,
      aliquotaApplicata: pertinenzaAliquota,
      importoLordo: pertinenzaLordo,
      detrazione: pertinenzaDetrazione,
      importoNetto: pertinenzaNetto,
      quotaPossesso: pertinenza.quotaPossesso,
      importoFinale: pertinenzaFinale
    }
  })
  
  // Calcola l'importo finale totale (immobile + pertinenze)
  const importoTotalePertinenze = pertinenze.reduce((sum, p) => sum + p.importoFinale, 0)
  const importoFinale = importoQuota + importoTotalePertinenze
  
  return {
    propertyId: property.id,
    renditaRivalutata,
    baseImponibile,
    aliquotaApplicata,
    importoLordo,
    detrazione,
    importoNetto,
    quotaPossesso: property.quotaPossesso,
    importoFinale,
    dettagli: {
      categoria: property.categoriaCatastale,
      tipo,
      pertinenze
    }
  }
}

export function calculateTotalIMU(calculations: IMUCalculation[]): number {
  return calculations.reduce((total, calc) => total + calc.importoFinale, 0)
}

// Funzione per validare i dati di una proprietà prima del calcolo
export function validatePropertyForCalculation(property: Property): string[] {
  const errors: string[] = []
  
  if (!property.renditaCatastale || property.renditaCatastale <= 0) {
    errors.push('Rendita catastale non valida')
  }
  
  if (!property.categoriaCatastale) {
    errors.push('Categoria catastale mancante')
  }
  
  if (!property.quotaPossesso || property.quotaPossesso <= 0 || property.quotaPossesso > 100) {
    errors.push('Quota di possesso non valida (deve essere tra 0 e 100)')
  }
  
  if (!property.comune || !property.provincia || !property.codiceComune) {
    errors.push('Dati del comune incompleti')
  }
  
  if (property.abitazionePrincipale === undefined) {
    errors.push('Specificare se è abitazione principale')
  }
  
  if (property.locato === undefined) {
    errors.push('Specificare se l\'immobile è locato')
  }
  
  if (property.locato && !property.dataInizioLocazione) {
    errors.push('Data inizio locazione mancante per immobile locato')
  }
  
  return errors
}

// Funzione per ottenere le scadenze di pagamento IMU
export function getIMUDeadlines(year: number = new Date().getFullYear()) {
  return {
    acconto: {
      scadenza: new Date(year, 5, 16), // 16 giugno
      percentuale: 50
    },
    saldo: {
      scadenza: new Date(year, 11, 16), // 16 dicembre
      percentuale: 50
    }
  }
} 