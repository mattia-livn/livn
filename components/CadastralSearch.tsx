'use client';

import { useState } from 'react';
import { Search, Building2, MapPin, Calculator } from 'lucide-react';

interface PropertyData {
  immobile_id: string;
  indirizzo: string;
  zona_censuaria: string;
  categoria: string;
  classe: string;
  consistenza: string;
  rendita: number;
  foglio: string;
  particella: string;
  subalterno?: string;
  comune: string;
  provincia: string;
  superficie?: number;
}

interface OwnerData {
  nome_cognome: string;
  codice_fiscale: string;
  tipo_proprieta: string;
  quota: string;
}

interface SearchResult {
  codiceFiscale: string;
  immobili: PropertyData[];
  proprietari: OwnerData[];
  totalProperties: number;
}

export function CadastralSearch() {
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!codiceFiscale.trim()) {
      setError('Inserisci un codice fiscale');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/search-cf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codiceFiscale: codiceFiscale.toUpperCase().trim()
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Errore nella ricerca');
        return;
      }

      setResult(data.data);
    } catch (err) {
      setError('Errore di connessione. Riprova più tardi.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateEstimatedIMU = (rendita: number, categoria: string) => {
    // Coefficienti di esempio (dovrebbero venire dal nostro sistema esistente)
    const coefficienti: { [key: string]: number } = {
      'A/1': 176,
      'A/2': 140,
      'A/3': 126,
      'A/4': 110,
      'A/5': 140,
      'A/6': 126,
      'A/7': 110,
      'A/8': 140,
      'A/9': 140,
      'A/10': 55,
      'A/11': 126,
      // Aggiungere altri coefficienti...
    };

    const coefficiente = coefficienti[categoria] || 126;
    const valoreCategoria = rendita * coefficiente;
    const aliquotaBase = 0.0076; // 7.6 per mille (aliquota standard)
    
    return valoreCategoria * aliquotaBase;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      {/* Sezione di ricerca */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Ricerca Catastale per Codice Fiscale</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Inserisci il codice fiscale per recuperare automaticamente tutti gli immobili intestati
        </p>
        
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Inserisci il codice fiscale (es. RSSMRA80A01H501Z)"
            value={codiceFiscale}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodiceFiscale(e.target.value.toUpperCase())}
            maxLength={16}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="min-w-[120px] px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Ricerca...' : 'Cerca'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Risultati della ricerca */}
      {result && (
        <div className="space-y-6">
          {/* Riepilogo */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Riepilogo Ricerca</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{result.totalProperties}</div>
                <div className="text-sm text-gray-600 mt-1">Immobili trovati</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(result.immobili.reduce((sum, prop) => sum + prop.rendita, 0))}
                </div>
                <div className="text-sm text-gray-600 mt-1">Rendita catastale totale</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {formatCurrency(result.immobili.reduce((sum, prop) => 
                    sum + calculateEstimatedIMU(prop.rendita, prop.categoria), 0))}
                </div>
                <div className="text-sm text-gray-600 mt-1">IMU stimata annuale</div>
              </div>
            </div>
          </div>

          {/* Lista immobili */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Dettaglio Immobili</h3>
            {result.immobili.map((immobile, index) => (
              <div key={immobile.immobile_id || index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      {immobile.indirizzo || 'Indirizzo non disponibile'}
                    </h4>
                    <p className="text-gray-600">
                      {immobile.comune} ({immobile.provincia})
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {immobile.categoria}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Dati catastali</div>
                    <div className="text-sm text-gray-800">
                      Foglio: {immobile.foglio}<br/>
                      Particella: {immobile.particella}<br/>
                      {immobile.subalterno && `Subalterno: ${immobile.subalterno}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Classificazione</div>
                    <div className="text-sm text-gray-800">
                      Categoria: {immobile.categoria}<br/>
                      Classe: {immobile.classe}<br/>
                      Zona: {immobile.zona_censuaria}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Caratteristiche</div>
                    <div className="text-sm text-gray-800">
                      Consistenza: {immobile.consistenza}<br/>
                      {immobile.superficie && `Superficie: ${immobile.superficie} mq`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Valori</div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">
                        Rendita: {formatCurrency(immobile.rendita)}
                      </div>
                      <div className="text-purple-600 font-semibold">
                        IMU stimata: {formatCurrency(calculateEstimatedIMU(immobile.rendita, immobile.categoria))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    ID: {immobile.immobile_id}
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                    <Calculator className="h-4 w-4" />
                    Calcola IMU dettagliata
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Informazioni proprietari */}
          {result.proprietari.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informazioni Proprietari</h3>
              <div className="space-y-3">
                {result.proprietari.map((proprietario, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{proprietario.nome_cognome}</div>
                      <div className="text-sm text-gray-600">CF: {proprietario.codice_fiscale}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{proprietario.tipo_proprieta}</div>
                      <div className="text-sm text-gray-600">Quota: {proprietario.quota}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 