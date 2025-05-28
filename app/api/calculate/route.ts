import { NextRequest, NextResponse } from 'next/server'
import { Property } from '@/types/property'
import { calculateIMUForProperty, validatePropertyForCalculation } from '@/lib/imu-calculator'
import { loadDeliberaComune } from '@/lib/delibera-loader'

export async function POST(request: NextRequest) {
  try {
    const { properties }: { properties: Property[] } = await request.json()
    
    if (!properties || properties.length === 0) {
      return NextResponse.json(
        { error: 'Nessuna proprietà da calcolare' },
        { status: 400 }
      )
    }
    
    const calculations = []
    const errors = []
    
    for (const property of properties) {
      try {
        // Valida i dati della proprietà
        console.log('Validating property:', property.id, property.address)
        const validationErrors = validatePropertyForCalculation(property)
        if (validationErrors.length > 0) {
          console.log('Validation errors:', validationErrors)
          errors.push({
            propertyId: property.id,
            address: property.address,
            errors: validationErrors
          })
          continue
        }
        
        console.log('Property validation passed, loading delibera...')
        
        // Carica la delibera comunale
        const delibera = await loadDeliberaComune(property.comune, property.provincia)
        
        if (!delibera) {
          return NextResponse.json({ 
            error: 'Dati del comune incompleti',
            details: `Delibera non trovata per ${property.comune} (${property.provincia})`
          }, { status: 400 })
        }
        
        console.log('Delibera loaded, calculating IMU...')
        
        // Calcola l'IMU per la proprietà
        const calculation = calculateIMUForProperty(property, delibera)
        console.log('Calculation result:', calculation)
        calculations.push(calculation)
        
      } catch (error) {
        console.error(`Errore nel calcolo per ${property.address}:`, error)
        errors.push({
          propertyId: property.id,
          address: property.address,
          errors: ['Errore durante il calcolo']
        })
      }
    }
    
    const totalIMU = calculations.reduce((sum, calc) => sum + calc.importoFinale, 0)
    
    return NextResponse.json({
      success: true,
      calculations,
      totalIMU,
      errors,
      message: `Calcolato IMU per ${calculations.length} immobili`
    })
    
  } catch (error) {
    console.error('Errore durante il calcolo IMU:', error)
    return NextResponse.json(
      { error: 'Errore durante il calcolo IMU' },
      { status: 500 }
    )
  }
} 