'use client'

import React, { useState } from 'react'
import DocumentUpload from '@/components/DocumentUpload'
import PropertyAnalysis from '@/components/PropertyAnalysis'
import IMUCalculationComponent from '@/components/IMUCalculation'
import { Property, IMUCalculation as IMUCalcType } from '@/types/property'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
  const [analyzedProperties, setAnalyzedProperties] = useState<Property[]>([])

  const handleDocumentsUploaded = (documents: File[]) => {
    setUploadedDocuments(documents)
    setCurrentStep(2)
  }

  const handlePropertiesAnalyzed = (properties: Property[]) => {
    setAnalyzedProperties(properties)
    setCurrentStep(3)
  }

  const handleCalculationComplete = (calculations: IMUCalcType[]) => {
    // Gestione del completamento del calcolo
    console.log('Calcoli completati:', calculations)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Livn - Calcolo IMU Intelligente
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Carica i tuoi documenti catastali e ricevi un calcolo preciso dell&apos;IMU
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Carica Documenti</span>
            </div>
            
            <div className="w-8 h-0.5 bg-gray-300"></div>
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Analisi Immobili</span>
            </div>
            
            <div className="w-8 h-0.5 bg-gray-300"></div>
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Calcolo IMU</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <DocumentUpload onDocumentsUploaded={handleDocumentsUploaded} />
          )}
          
          {currentStep === 2 && (
            <PropertyAnalysis 
              documents={uploadedDocuments}
              onPropertiesAnalyzed={handlePropertiesAnalyzed}
            />
          )}
          
          {currentStep === 3 && (
            <IMUCalculationComponent 
              properties={analyzedProperties}
              onCalculationComplete={handleCalculationComplete}
            />
          )}
        </div>
      </div>
    </main>
  )
} 