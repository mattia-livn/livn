import { NextRequest, NextResponse } from 'next/server';

interface OpenAPIConfig {
  baseUrl: string;
  apiKey: string;
}

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

interface CadastralSearchResult {
  properties: PropertyData[];
  owners: OwnerData[];
  success: boolean;
  message?: string;
}

// Configurazione OpenAPI (dovrebbe essere in variabili d'ambiente)
const openAPIConfig: OpenAPIConfig = {
  baseUrl: process.env.OPENAPI_BASE_URL || 'https://catasto.openapi.it',
  apiKey: process.env.OPENAPI_CATASTO_TOKEN || ''
};

export async function POST(request: NextRequest) {
  try {
    const { codiceFiscale } = await request.json();

    if (!codiceFiscale) {
      return NextResponse.json({
        success: false,
        message: 'Codice fiscale è obbligatorio'
      }, { status: 400 });
    }

    // Validazione formato codice fiscale
    const cfRegex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
    if (!cfRegex.test(codiceFiscale.toUpperCase())) {
      return NextResponse.json({
        success: false,
        message: 'Formato codice fiscale non valido'
      }, { status: 400 });
    }

    console.log('Searching properties for CF:', codiceFiscale);

    // Ricerca nazionale degli immobili
    const searchResult = await searchPropertiesByTaxCode(codiceFiscale);

    if (!searchResult.success) {
      return NextResponse.json({
        success: false,
        message: searchResult.message || 'Errore nella ricerca'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        codiceFiscale,
        immobili: searchResult.properties,
        proprietari: searchResult.owners,
        totalProperties: searchResult.properties.length
      }
    });

  } catch (error) {
    console.error('Error in cadastral search:', error);
    return NextResponse.json({
      success: false,
      message: 'Errore interno del server'
    }, { status: 500 });
  }
}

async function searchPropertiesByTaxCode(codiceFiscale: string): Promise<CadastralSearchResult> {
  try {
    // Fase 1: Avvia ricerca nazionale
    const searchResponse = await fetch(`${openAPIConfig.baseUrl}/richiesta/ricerca_nazionale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAPIConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF', // Terreni e Fabbricati
        cf_piva: codiceFiscale // Parametro corretto per OpenAPI
      })
    });

    if (!searchResponse.ok) {
      throw new Error(`National search failed: ${searchResponse.status}`);
    }

    const searchResult = await searchResponse.json();
    const requestId = searchResult.id;

    // Step 2: Recupera i risultati della ricerca nazionale
    const nationalDataResponse = await fetch(`${openAPIConfig.baseUrl}/richiesta/${requestId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openAPIConfig.apiKey}`,
      }
    });

    if (!nationalDataResponse.ok) {
      throw new Error(`Failed to get national data: ${nationalDataResponse.status}`);
    }

    const nationalData = await nationalDataResponse.json();
    
    if (nationalData.stato !== 'EVASA') {
      // Potrebbe essere ancora in elaborazione, implementare retry logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const retryResponse = await fetch(`${openAPIConfig.baseUrl}/richiesta/${requestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${openAPIConfig.apiKey}`,
        }
      });
      
      const retryData = await retryResponse.json();
      if (retryData.stato !== 'EVASA') {
        throw new Error('Request timeout - please try again');
      }
    }

    // Step 3: Per ogni provincia trovata, fai una ricerca dettagliata
    const allProperties: PropertyData[] = [];
    const allOwners: OwnerData[] = [];

    for (const province of nationalData.dati || []) {
      const provinceDetails = await searchPropertiesInProvince(codiceFiscale, province.provincia);
      allProperties.push(...provinceDetails.properties);
      allOwners.push(...provinceDetails.owners);
    }

    return {
      properties: allProperties,
      owners: allOwners,
      success: true
    };

  } catch (error) {
    console.error('Error in OpenAPI search:', error);
    return {
      properties: [],
      owners: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function searchPropertiesInProvince(codiceFiscale: string, provincia: string): Promise<CadastralSearchResult> {
  try {
    // Ricerca per provincia specifica
    const provinceSearchResponse = await fetch(`${openAPIConfig.baseUrl}/richiesta/ricerca_persona`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAPIConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_catasto: 'TF',
        provincia: provincia,
        codice_fiscale: codiceFiscale
      })
    });

    if (!provinceSearchResponse.ok) {
      throw new Error(`Province search failed: ${provinceSearchResponse.status}`);
    }

    const provinceResult = await provinceSearchResponse.json();
    const requestId = provinceResult.id;

    // Attendi e recupera i risultati
    await new Promise(resolve => setTimeout(resolve, 2000));

    const provinceDataResponse = await fetch(`${openAPIConfig.baseUrl}/richiesta/${requestId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openAPIConfig.apiKey}`,
      }
    });

    const provinceData = await provinceDataResponse.json();

    // Trasforma i dati nel formato della nostra applicazione
    const properties: PropertyData[] = [];
    const owners: OwnerData[] = [];

    if (provinceData.dati && provinceData.dati.immobili) {
      for (const immobile of provinceData.dati.immobili) {
        properties.push({
          immobile_id: immobile.immobile_id || `${immobile.foglio}-${immobile.particella}-${immobile.subalterno}`,
          indirizzo: immobile.indirizzo || '',
          zona_censuaria: immobile.zona_censuaria || '',
          categoria: immobile.categoria || '',
          classe: immobile.classe || '',
          consistenza: immobile.consistenza || '',
          rendita: parseFloat(immobile.rendita) || 0,
          foglio: immobile.foglio || '',
          particella: immobile.particella || '',
          subalterno: immobile.subalterno,
          comune: immobile.comune || '',
          provincia: provincia,
          superficie: immobile.superficie ? parseFloat(immobile.superficie) : undefined
        });
      }
    }

    if (provinceData.dati && provinceData.dati.intestatari) {
      for (const intestatario of provinceData.dati.intestatari) {
        owners.push({
          nome_cognome: intestatario.denominazione || `${intestatario.nome} ${intestatario.cognome}`,
          codice_fiscale: intestatario.codice_fiscale || codiceFiscale,
          tipo_proprieta: intestatario.tipo_diritto || 'Proprietà',
          quota: intestatario.quota || '1/1'
        });
      }
    }

    return {
      properties,
      owners,
      success: true
    };

  } catch (error) {
    console.error(`Error searching in province ${provincia}:`, error);
    return {
      properties: [],
      owners: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 