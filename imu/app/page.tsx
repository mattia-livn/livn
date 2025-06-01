'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [deliberaLoading, setDeliberaLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [delibereFiles, setDelibereFiles] = useState<string[]>([]);

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-imu');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Errore nella chiamata API',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    setReportLoading(true);
    
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          municipalRate: 10.6
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.report) {
        // Crea il file JSON e scaricalo
        const jsonString = JSON.stringify(data.report, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename || 'IMU_Report.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setResult({
          success: true,
          message: 'Report scaricato con successo!',
          filename: data.filename,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(data.error || 'Errore nella generazione del report');
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Errore nel download del report: ' + (error instanceof Error ? error.message : 'Errore sconosciuto'),
        timestamp: new Date().toISOString()
      });
    } finally {
      setReportLoading(false);
    }
  };

  const loadDelibereFiles = async () => {
    try {
      const response = await fetch('/api/analyze-delibera');
      const data = await response.json();
      
      if (data.success) {
        setDelibereFiles(data.files);
        setResult({
          success: true,
          message: `Trovati ${data.count} file di delibere nel bucket`,
          files: data.files,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Errore nel caricamento file delibere: ' + (error instanceof Error ? error.message : 'Errore sconosciuto'),
        timestamp: new Date().toISOString()
      });
    }
  };

  const analyzeDelibera = async (fileName: string) => {
    setDeliberaLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/analyze-delibera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName,
          bucketName: 'imu',
          folderPath: 'statements/2025'
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Errore nell\'analisi della delibera: ' + (error instanceof Error ? error.message : 'Errore sconosciuto'),
        timestamp: new Date().toISOString()
      });
    } finally {
      setDeliberaLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🏛️ Sistema AI per Calcolo IMU
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Test Sistema</h2>
          <p className="text-gray-600 mb-6">
            Clicca per testare il sistema di calcolo IMU con i dati catastali di esempio.
            Il sistema utilizzerà l'AI per analizzare i dati e calcolare l'imposta.
          </p>
          
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={runTest}
              disabled={loading || reportLoading || deliberaLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? '🔄 Calcolo in corso...' : '🚀 Avvia Test IMU'}
            </button>
            
            <button
              onClick={downloadReport}
              disabled={loading || reportLoading || deliberaLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {reportLoading ? '📄 Generando report...' : '📋 Scarica Report JSON'}
            </button>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">🔍 Test Analisi Delibere AI</h2>
          <p className="text-gray-600 mb-6">
            Testa la capacità dell'AI di estrarre informazioni fiscali dalle delibere comunali caricate su Supabase.
          </p>
          
          <div className="flex gap-4 flex-wrap mb-4">
            <button
              onClick={loadDelibereFiles}
              disabled={loading || reportLoading || deliberaLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📂 Carica Lista Delibere
            </button>
          </div>

          {delibereFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">📄 File Disponibili:</h3>
              <div className="grid gap-2">
                {delibereFiles.map((fileName, index) => (
                  <button
                    key={index}
                    onClick={() => analyzeDelibera(fileName)}
                    disabled={loading || reportLoading || deliberaLoading}
                    className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-left px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {deliberaLoading ? '🔄 Analizzando...' : `🏛️ ${fileName}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              {result.success ? '✅ Risultato' : '❌ Errore'}
            </h3>
            
            <div className="bg-gray-50 rounded p-4 mb-4">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            
            <p className="text-sm text-gray-500">
              Timestamp: {result.timestamp}
            </p>
            
            {result.success && result.filename && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800">
                  ✅ Report scaricato: <strong>{result.filename}</strong>
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Il file contiene tutti i dati di partenza, le regole applicate, i calcoli dettagliati e il ragionamento dell'AI.
                </p>
              </div>
            )}

            {result.success && result.analysis && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
                <p className="text-purple-800">
                  🔍 <strong>Analisi Delibera Completata</strong>
                </p>
                <p className="text-purple-600 text-sm mt-2">
                  Comune: {result.analysis.municipalityInfo.name} ({result.analysis.municipalityInfo.province})
                </p>
                <p className="text-purple-600 text-sm">
                  Aliquota Standard: {result.analysis.imuRates.standardRate || 'Non trovata'}‰
                </p>
                <p className="text-purple-600 text-sm">
                  Confidenza: {result.analysis.analysisConfidence}
                </p>
              </div>
            )}
            
            {result.success && !result.filename && !result.analysis && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800">
                  ✅ Il sistema ha elaborato correttamente i dati catastali e calcolato l'IMU.
                  Controlla la console del browser per i dettagli completi del calcolo.
                </p>
              </div>
            )}
            
            {!result.success && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800">
                  ❌ Si è verificato un errore durante l'elaborazione.
                  Verifica che le chiavi API siano configurate correttamente.
                </p>
                {result.error && (
                  <p className="text-red-600 text-sm mt-2">
                    Errore: {result.error}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">📋 Funzionalità del Sistema</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ Caricamento dati catastali da JSON</li>
            <li>✅ Analisi automatica delle categorie catastali</li>
            <li>✅ Calcolo IMU per fabbricati e terreni</li>
            <li>✅ Utilizzo di regole fiscali aggiornate</li>
            <li>✅ AI per interpretazione e calcolo automatico</li>
            <li>✅ Gestione quote di possesso e giorni di possesso</li>
            <li>✅ Report JSON completo scaricabile</li>
            <li>✅ <strong>Analisi AI delle delibere comunali</strong></li>
            <li>✅ <strong>Validatore matematico deterministico</strong></li>
          </ul>
        </div>

        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🔍 Analisi Delibere AI</h3>
          <ul className="space-y-2 text-sm">
            <li>🔸 <strong>Estrazione automatica:</strong> Aliquote IMU, esenzioni, regole speciali</li>
            <li>🔸 <strong>Riconoscimento categorie:</strong> Coefficienti catastali specifici</li>
            <li>🔸 <strong>Identificazione comune:</strong> Nome, provincia, numero delibera</li>
            <li>🔸 <strong>Validazione dati:</strong> Controllo coerenza delle aliquote estratte</li>
            <li>🔸 <strong>Livello confidenza:</strong> Valutazione affidabilità dell'estrazione</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
