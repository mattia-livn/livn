'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Property, type IMUCalculation, DeliberaComune } from '@/types/property'
import { Download, FileText, Euro, Home, MapPin } from 'lucide-react'

interface IMUCalculationProps {
  properties: Property[]
  onCalculationComplete: (calculations: IMUCalculation[]) => void
}

export default function IMUCalculationComponent({ properties, onCalculationComplete }: IMUCalculationProps) {
  const [calculating, setCalculating] = useState(true)
  const [calculations, setCalculations] = useState<IMUCalculation[]>([])
  const [totalIMU, setTotalIMU] = useState(0)

  const calculateIMU = useCallback(async () => {
    setCalculating(true)
    
    try {
      // Simula il recupero delle delibere comunali
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock delle delibere comunali
      const mockDelibere: DeliberaComune[] = [
        {
          comune: 'Milano',
          provincia: 'MI',
          codiceComune: 'F205',
          anno: 2025,
          aliquote: {
            'A/1': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/2': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/3': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/4': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'C/6': { abitazionePrincipale: 0, altreAbitazioni: 1.06, pertinenze: 1.06 }
          },
          detrazioni: {
            abitazionePrincipale: 200,
            pertinenze: 0
          }
        },
        {
          comune: 'Roma',
          provincia: 'RM',
          codiceComune: 'H501',
          anno: 2025,
          aliquote: {
            'A/1': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/2': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/3': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'A/4': { abitazionePrincipale: 0.4, altreAbitazioni: 1.06, locato: 1.06 },
            'C/6': { abitazionePrincipale: 0, altreAbitazioni: 1.06, pertinenze: 1.06 }
          },
          detrazioni: {
            abitazionePrincipale: 200,
            pertinenze: 0
          }
        }
      ]
      
      // Calcola l'IMU per ogni proprietà
      const calculatedIMU: IMUCalculation[] = properties.map(property => {
        const delibera = mockDelibere.find(d => d.codiceComune === property.codiceComune)
        if (!delibera) {
          throw new Error(`Delibera non trovata per il comune ${property.comune}`)
        }
        
        return calculatePropertyIMU(property, delibera)
      })
      
      setCalculations(calculatedIMU)
      setTotalIMU(calculatedIMU.reduce((sum, calc) => sum + calc.importoFinale, 0))
      onCalculationComplete(calculatedIMU)
      
    } catch (error) {
      console.error('Errore durante il calcolo:', error)
    } finally {
      setCalculating(false)
    }
  }, [properties, onCalculationComplete])

  useEffect(() => {
    calculateIMU()
  }, [calculateIMU])

  const calculatePropertyIMU = (property: Property, delibera: DeliberaComune): IMUCalculation => {
    const moltiplicatore = 160 // Moltiplicatore per categoria A
    const renditaRivalutata = property.renditaCatastale * 1.05 // Rivalutazione 5%
    const baseImponibile = renditaRivalutata * moltiplicatore
    
    // Determina l'aliquota
    let aliquotaApplicata: number
    let tipo: 'abitazione_principale' | 'altra_abitazione' | 'locato'
    
    if (property.abitazionePrincipale) {
      aliquotaApplicata = delibera.aliquote[property.categoriaCatastale]?.abitazionePrincipale || 0.4
      tipo = 'abitazione_principale'
    } else if (property.locato) {
      aliquotaApplicata = delibera.aliquote[property.categoriaCatastale]?.locato || 1.06
      tipo = 'locato'
    } else {
      aliquotaApplicata = delibera.aliquote[property.categoriaCatastale]?.altreAbitazioni || 1.06
      tipo = 'altra_abitazione'
    }
    
    const importoLordo = (baseImponibile * aliquotaApplicata) / 100
    const detrazione = property.abitazionePrincipale ? delibera.detrazioni.abitazionePrincipale : 0
    const importoNetto = Math.max(0, importoLordo - detrazione)
    const importoFinale = importoNetto * property.quotaPossesso
    
    // Calcola le pertinenze
    const pertinenze = property.pertinenze.map(pertinenza => {
      const pertinenzaRivalutata = pertinenza.renditaCatastale * 1.05
      const pertinenzaBase = pertinenzaRivalutata * moltiplicatore
      const pertinenzaAliquota = delibera.aliquote[pertinenza.categoriaCatastale]?.pertinenze || 1.06
      const pertinenzaLordo = (pertinenzaBase * pertinenzaAliquota) / 100
      const pertinenzaDetrazione = 0 // Nessuna detrazione per pertinenze
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
    
    return {
      propertyId: property.id,
      renditaRivalutata,
      baseImponibile,
      aliquotaApplicata,
      importoLordo,
      detrazione,
      importoNetto,
      quotaPossesso: property.quotaPossesso,
      importoFinale: importoFinale + pertinenze.reduce((sum, p) => sum + p.importoFinale, 0),
      dettagli: {
        categoria: property.categoriaCatastale,
        tipo,
        pertinenze
      }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const downloadReport = () => {
    // Simula il download del report
    const reportData = {
      properties,
      calculations,
      totalIMU,
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `calcolo-imu-${new Date().getFullYear()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (calculating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Calcolo IMU in corso...
        </h2>
        <p className="text-gray-600">
          Stiamo recuperando le aliquote comunali e calcolando l&apos;importo dovuto
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Calcolo IMU 2025
        </h2>
        <p className="text-gray-600">
          Ecco il riepilogo del calcolo IMU per i tuoi immobili
        </p>
      </div>

      {/* Totale IMU */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Euro className="h-8 w-8" />
          <h3 className="text-2xl font-bold">Totale IMU 2025</h3>
        </div>
        <p className="text-4xl font-bold">{formatCurrency(totalIMU)}</p>
        <p className="text-blue-100 mt-2">
          Importo complessivo da versare per tutti gli immobili
        </p>
      </div>

      {/* Dettaglio per immobile */}
      <div className="space-y-4">
        {calculations.map((calculation) => {
          const property = properties.find(p => p.id === calculation.propertyId)!
          
          return (
            <div key={calculation.propertyId} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Home className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {property.address}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {property.categoriaCatastale} • {calculation.dettagli.tipo.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(calculation.importoFinale)}
                  </p>
                  <p className="text-sm text-gray-500">IMU dovuta</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Rendita Catastale</p>
                  <p className="font-medium">{formatCurrency(property.renditaCatastale)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rendita Rivalutata</p>
                  <p className="font-medium">{formatCurrency(calculation.renditaRivalutata)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aliquota</p>
                  <p className="font-medium">{calculation.aliquotaApplicata}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quota Possesso</p>
                  <p className="font-medium">{(calculation.quotaPossesso * 100)}%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Dettaglio calcolo:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base imponibile (rendita × 160):</span>
                    <span>{formatCurrency(calculation.baseImponibile)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Importo lordo ({calculation.aliquotaApplicata}%):</span>
                    <span>{formatCurrency(calculation.importoLordo)}</span>
                  </div>
                  {calculation.detrazione > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Detrazione abitazione principale:</span>
                      <span>-{formatCurrency(calculation.detrazione)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Importo netto:</span>
                    <span>{formatCurrency(calculation.importoNetto)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Importo finale (quota {(calculation.quotaPossesso * 100)}%):</span>
                    <span>{formatCurrency(calculation.importoFinale)}</span>
                  </div>
                </div>
              </div>

              {calculation.dettagli.pertinenze.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pertinenze:</h4>
                  <div className="space-y-2">
                    {calculation.dettagli.pertinenze.map((pertinenza, pIndex) => (
                      <div key={pIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="capitalize">{pertinenza.tipo}</span>
                          <span className="text-gray-500">({pertinenza.aliquotaApplicata}%)</span>
                        </div>
                        <span className="font-medium">{formatCurrency(pertinenza.importoFinale)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Azioni */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Scarica Report</span>
        </button>
        
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Stampa</span>
        </button>
      </div>

      {/* Note legali */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-900 mb-2">
          ⚠️ Note importanti:
        </h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Il calcolo è basato sulle aliquote comunali 2025 disponibili</li>
          <li>• Verificare sempre le delibere comunali ufficiali per conferma</li>
          <li>• Le scadenze di pagamento possono variare per comune</li>
          <li>• In caso di dubbi, consultare un commercialista</li>
        </ul>
      </div>
    </div>
  )
} 