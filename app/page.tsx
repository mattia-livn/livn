'use client'

import React, { useState } from 'react'
import DocumentUpload from '@/components/DocumentUpload'
import { CadastralSearch } from '@/components/CadastralSearch'
import IMUCalculationComponent from '@/components/IMUCalculation'
import { Property, IMUCalculation as IMUCalcType } from '@/types/property'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
  const [analyzedProperties, setAnalyzedProperties] = useState<Property[]>([])
  const [calculations, setCalculations] = useState<IMUCalcType[]>([])

  const handleDocumentsUploaded = (documents: File[]) => {
    setUploadedDocuments(documents)
    setCurrentStep(2)
  }

  const handlePropertiesAnalyzed = (properties: Property[]) => {
    setAnalyzedProperties(properties)
    setCurrentStep(3)
  }

  const handleCalculationComplete = (calculations: IMUCalcType[]) => {
    setCalculations(calculations)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LIVN - Calcolo IMU
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Piattaforma per il calcolo dell'IMU con due modalità: ricerca automatica tramite codice fiscale 
            o analisi di documenti catastali caricati
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 justify-center">
              <button className="border-b-2 border-blue-500 py-2 px-1 text-blue-600 font-medium">
                Ricerca per Codice Fiscale
              </button>
              <button className="border-transparent py-2 px-1 text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                Carica Documenti
              </button>
              <button className="border-transparent py-2 px-1 text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                Calcolo IMU
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Ricerca Catastale */}
          <section>
            <CadastralSearch />
          </section>

          {/* Separatore */}
          <div className="flex items-center justify-center py-8">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-4 text-gray-500 bg-gray-50">oppure</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Upload Documenti */}
          <section>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Carica Documenti Catastali</h2>
              <p className="text-gray-600 mb-6">
                Se preferisci, puoi caricare manualmente i tuoi documenti catastali per l'analisi
              </p>
              <DocumentUpload onDocumentsUploaded={handleDocumentsUploaded} />
            </div>
          </section>

          {/* Calcolo IMU */}
          <section>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calcolo IMU Manuale</h2>
              <p className="text-gray-600 mb-6">
                Inserisci manualmente i dati per calcolare l'IMU
              </p>
              <IMUCalculationComponent 
                properties={analyzedProperties}
                onCalculationComplete={handleCalculationComplete}
              />
            </div>
          </section>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ricerca Automatica</h3>
            <p className="text-gray-600">
              Inserisci solo il codice fiscale e recupera automaticamente tutti gli immobili dall'Agenzia delle Entrate
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Calcolo Preciso</h3>
            <p className="text-gray-600">
              Algoritmi aggiornati per il calcolo dell'IMU con tutte le aliquote e detrazioni aggiornate
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Veloce e Sicuro</h3>
            <p className="text-gray-600">
              Risultati istantanei con dati aggiornati in tempo reale dalle fonti ufficiali
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 