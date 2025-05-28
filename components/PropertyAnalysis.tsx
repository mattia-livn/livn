'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Property } from '@/types/property'
import { CheckCircle, AlertCircle, Home, Building, Warehouse } from 'lucide-react'

interface PropertyAnalysisProps {
  documents: File[]
  onPropertiesAnalyzed: (properties: Property[]) => void
}

export default function PropertyAnalysis({ documents, onPropertiesAnalyzed }: PropertyAnalysisProps) {
  const [analyzing, setAnalyzing] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const analyzeDocuments = useCallback(async () => {
    setAnalyzing(true)
    
    try {
      // Crea FormData per l'API
      const formData = new FormData()
      documents.forEach(file => {
        formData.append('files', file)
      })
      
      // Chiama l'API di analisi
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Errore durante l\'analisi')
      }
      
      const result = await response.json()
      const analyzedProperties = result.properties || []
      
      setProperties(analyzedProperties)
      
    } catch (error) {
      console.error('Errore durante l\'analisi:', error)
    } finally {
      setAnalyzing(false)
    }
  }, [documents, onPropertiesAnalyzed])

  useEffect(() => {
    analyzeDocuments()
  }, [analyzeDocuments])

  const handlePropertyUpdate = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => 
      p.id === updatedProperty.id ? updatedProperty : p
    ))
  }

  const handleSubmit = () => {
    const validationErrors = []
    
    // Verifica che ci sia almeno un'abitazione principale nelle categorie A
    const categoriaA = properties.filter(p => p.categoriaCatastale.startsWith('A/'))
    const hasAbitazionePrincipale = categoriaA.some(p => p.abitazionePrincipale === true)
    
    if (categoriaA.length > 0 && !hasAbitazionePrincipale) {
      validationErrors.push('Seleziona almeno un\'abitazione principale tra le categorie A')
    }
    
    // Verifica che ogni proprietà abbia i dati necessari (ora solo dati catastali)
    const incompleteProperties = properties.filter(p => 
      !p.comune || !p.provincia || !p.categoriaCatastale || p.renditaCatastale === 0
    )
    
    if (incompleteProperties.length > 0) {
      validationErrors.push('Completa tutti i dati catastali per ogni immobile')
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    // Marca tutte le proprietà come complete
    const completedProperties = properties.map(p => ({
      ...p,
      analisiCompleta: true,
      datiMancanti: []
    }))
    
    onPropertiesAnalyzed(completedProperties)
  }

  // Raggruppa immobili per categoria
  const groupedProperties = properties.reduce((groups, property) => {
    const category = property.categoriaCatastale.charAt(0)
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(property)
    return groups
  }, {} as Record<string, Property[]>)

  if (analyzing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analisi documenti in corso...
        </h2>
        <p className="text-gray-600">
          Stiamo estraendo le informazioni catastali dai tuoi documenti
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-full mx-auto px-2">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verifica e completa i dati estratti
        </h2>
        <p className="text-gray-600">
          Abbiamo trovato {properties.length} immobili. Verifica i dati e completa le informazioni mancanti.
        </p>
      </div>

      {/* Errori */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h4 className="text-sm font-medium text-red-900">
              Correggi i seguenti errori:
            </h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabelle per categoria - ordinate A, B, C, D */}
      {['A', 'B', 'C', 'D'].map(category => {
        const categoryProperties = groupedProperties[category]
        if (!categoryProperties || categoryProperties.length === 0) return null
        
        return (
          <PropertyCategoryTable
            key={category}
            category={category}
            properties={categoryProperties}
            allProperties={properties}
            onPropertyUpdate={handlePropertyUpdate}
          />
        )
      })}

      {/* Pulsante conferma */}
      <div className="flex justify-end pt-6 border-t">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Conferma e procedi al calcolo IMU
        </button>
      </div>
    </div>
  )
}

interface PropertyCategoryTableProps {
  category: string
  properties: Property[]
  allProperties: Property[]
  onPropertyUpdate: (property: Property) => void
}

function PropertyCategoryTable({ 
  category, 
  properties, 
  allProperties, 
  onPropertyUpdate 
}: PropertyCategoryTableProps) {
  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'A': return { 
        name: 'Abitazioni', 
        icon: Home, 
        bgColor: 'bg-blue-50', 
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-900'
      }
      case 'B': return { 
        name: 'Uffici e Studi', 
        icon: Building, 
        bgColor: 'bg-green-50', 
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        textColor: 'text-green-900'
      }
      case 'C': return { 
        name: 'Negozi e Laboratori', 
        icon: Warehouse, 
        bgColor: 'bg-purple-50', 
        borderColor: 'border-purple-200',
        iconColor: 'text-purple-600',
        textColor: 'text-purple-900'
      }
      case 'D': return { 
        name: 'Immobili Industriali', 
        icon: Warehouse, 
        bgColor: 'bg-orange-50', 
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-600',
        textColor: 'text-orange-900'
      }
      default: return { 
        name: `Categoria ${cat}`, 
        icon: Home, 
        bgColor: 'bg-gray-50', 
        borderColor: 'border-gray-200',
        iconColor: 'text-gray-600',
        textColor: 'text-gray-900'
      }
    }
  }

  const categoryInfo = getCategoryInfo(category)
  const Icon = categoryInfo.icon

  const handleAbitazionePrincipaleChange = (propertyId: string, isMain: boolean) => {
    const property = properties.find(p => p.id === propertyId)
    if (!property) return

    // Se stiamo impostando come abitazione principale, rimuovi il flag da altri immobili categoria A
    if (isMain && category === 'A') {
      // Aggiorna tutti gli altri immobili categoria A per rimuovere abitazione principale
      allProperties.forEach(p => {
        if (p.id !== propertyId && p.categoriaCatastale.startsWith('A/')) {
          onPropertyUpdate({
            ...p,
            abitazionePrincipale: false
          })
        }
      })
    }

    onPropertyUpdate({
      ...property,
      abitazionePrincipale: isMain,
      locato: isMain ? false : property.locato // Se è abitazione principale, non può essere locato
    })
  }

  const handleLocatoChange = (propertyId: string, locatoValue: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (!property) return

    onPropertyUpdate({
      ...property,
      locato: locatoValue === 'true'
    })
  }

  const handlePertinenzaChange = (propertyId: string, pertinenzaId: string) => {
    const property = properties.find(p => p.id === propertyId)
    if (!property) return

    onPropertyUpdate({
      ...property,
      pertinenzaDi: pertinenzaId || undefined
    })
  }

  // Ottieni immobili categoria A per le select di pertinenza
  const categoriaAProperties = allProperties.filter(p => 
    p.categoriaCatastale.startsWith('A/')
  )

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className={`${categoryInfo.bgColor} border-b ${categoryInfo.borderColor} px-4 py-3`}>
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${categoryInfo.iconColor}`} />
          <h3 className={`text-base font-semibold ${categoryInfo.textColor}`}>
            {categoryInfo.name} ({properties.length} immobili)
          </h3>
        </div>
      </div>

      <div className="w-full">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Indirizzo
              </th>
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Cat.
              </th>
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Rendita €
              </th>
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Consist.
              </th>
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Quota %
              </th>
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                F/P/S
              </th>
              {category === 'A' && (
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Abit. Princ.
                </th>
              )}
              {category === 'C' && (
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Pertinenza di
                </th>
              )}
              <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Locazione
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-2 py-2 text-xs text-gray-900">
                  <div className="font-medium text-xs leading-tight">{property.address}</div>
                  <div className="text-gray-500 text-xs">{property.comune} ({property.provincia})</div>
                </td>
                <td className="px-1 py-2 text-xs font-medium text-gray-900">
                  {property.categoriaCatastale}
                </td>
                <td className="px-1 py-2 text-xs text-gray-900">
                  €{property.renditaCatastale.toFixed(0)}
                </td>
                <td className="px-1 py-2 text-xs text-gray-900">
                  {/* Categoria A: mostra vani se disponibili, altrimenti superficie */}
                  {category === 'A' ? (
                    property.vani ? `${property.vani} vani` : 
                    property.superficie ? `${property.superficie} m²` : '-'
                  ) : (
                    /* Altre categorie: mostra superficie se disponibile, altrimenti vani */
                    property.superficie ? `${property.superficie} m²` :
                    property.vani ? `${property.vani} vani` : '-'
                  )}
                </td>
                <td className="px-1 py-2 text-xs text-gray-900">
                  {property.quotaPossesso}%
                </td>
                <td className="px-1 py-2 text-xs text-gray-500">
                  {property.foglio}/{property.particella}/{property.subalterno}
                </td>
                {category === 'A' && (
                  <td className="px-1 py-2 text-xs">
                    <input
                      type="checkbox"
                      checked={property.abitazionePrincipale === true}
                      onChange={(e) => handleAbitazionePrincipaleChange(property.id, e.target.checked)}
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                )}
                {category === 'C' && (
                  <td className="px-1 py-2 text-xs">
                    <select
                      value={property.pertinenzaDi || ''}
                      onChange={(e) => handlePertinenzaChange(property.id, e.target.value)}
                      className="block w-full px-1 py-1 text-xs border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Nessuna</option>
                      {categoriaAProperties.map((aProperty) => (
                        <option key={aProperty.id} value={aProperty.id}>
                          {aProperty.address.substring(0, 20)}...
                        </option>
                      ))}
                    </select>
                  </td>
                )}
                <td className="px-1 py-2 text-xs">
                  {property.abitazionePrincipale === true ? (
                    <span className="text-gray-500 italic text-xs">Abit. princ.</span>
                  ) : (
                    <select
                      value={property.locato === true ? 'true' : 'false'}
                      onChange={(e) => handleLocatoChange(property.id, e.target.value)}
                      className="block w-full px-1 py-1 text-xs border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Sì</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 