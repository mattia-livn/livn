import { createClient } from '@supabase/supabase-js'
import { DeliberaComune } from '@/types/property'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

/**
 * Cerca il codice comune nella tabella Supabase
 */
async function getCodiceComune(comune: string, provincia: string, codiceComune?: string): Promise<string | null> {
  try {
    // 1. Se ho già il codice, cerco direttamente per codice
    if (codiceComune) {
      let { data, error } = await supabase
        .from('municipalities')
        .select('municipality_code')
        .eq('municipality_code', codiceComune.trim())
        .single();
      if (data && data.municipality_code) return data.municipality_code.trim();
    }

    // 2. Altrimenti cerco per nome e provincia
    let { data, error } = await supabase
      .from('municipalities')
      .select('municipality_code')
      .eq('municipality', comune)
      .eq('province', provincia.toUpperCase())
      .single();
    if (data && data.municipality_code) return data.municipality_code.trim();

    // 3. Fallback: provo con nome maiuscolo
    let { data: data2, error: error2 } = await supabase
      .from('municipalities')
      .select('municipality_code')
      .eq('municipality', comune.toUpperCase())
      .eq('province', provincia.toUpperCase())
      .single();
    if (data2 && data2.municipality_code) return data2.municipality_code.trim();

    // 4. Fallback: provo con nome CamelCase
    let camelCase = comune.replace(/\s+/g, '');
    let { data: data3, error: error3 } = await supabase
      .from('municipalities')
      .select('municipality_code')
      .eq('municipality', camelCase)
      .eq('province', provincia.toUpperCase())
      .single();
    if (data3 && data3.municipality_code) return data3.municipality_code.trim();

    return null;
  } catch (e) {
    console.error('Errore lookup codice comune:', e);
    return null;
  }
}

/**
 * Carica la delibera comunale da Supabase
 */
export async function loadDeliberaComune(
  comune: string, 
  provincia: string, 
  codiceComune?: string
): Promise<DeliberaComune | null> {
  try {
    console.log(`🔍 Cercando delibera per: ${comune} (${provincia})`)
    
    // Se il codice comune non è fornito, cercalo nella tabella
    let codiceDaCercare = codiceComune
    if (!codiceDaCercare) {
      const codiceFromDb = await getCodiceComune(comune, provincia)
      if (!codiceFromDb) {
        console.log(`❌ Codice comune non trovato per ${comune} (${provincia})`)
        return null
      }
      codiceDaCercare = codiceFromDb
    }
    
    const fileName = `${comune}_${provincia}_${codiceDaCercare}.pdf`
    console.log(`📁 Cercando file: ${fileName}`)
    
    // Cerca in tutte le cartelle statements/2025/
    const { data: files, error: listError } = await supabase.storage
      .from('imu')
      .list('statements/2025', {
        limit: 10000,
        search: fileName
      })
    
    if (listError) {
      console.error('❌ Errore ricerca file:', listError)
      return null
    }
    
    const deliberaFile = files?.find(file => file.name === fileName)
    
    if (!deliberaFile) {
      console.log(`❌ File delibera non trovato: ${fileName}`)
      console.log(`📋 File disponibili: ${files?.map(f => f.name).slice(0, 5).join(', ')}...`)
      return null
    }
    
    console.log(`✅ Delibera trovata: ${fileName}`)
    
    // Per ora restituiamo dati standard, in futuro analizzeremo il PDF
    const aliquotesStandard = {
      'A': {
        abitazionePrincipale: 0.4,
        altreAbitazioni: 1.06,
        fabbricatiProduttivi: 1.06
      },
      'B': {
        abitazionePrincipale: 1.06,
        altreAbitazioni: 1.06,
        fabbricatiProduttivi: 1.06
      },
      'C': {
        abitazionePrincipale: 1.06,
        altreAbitazioni: 1.06,
        fabbricatiProduttivi: 1.06
      }
    }
    
    const detrazioneAbitazionePrincipale = 300 // €300 standard
    
    return {
      comune,
      provincia,
      codiceComune: codiceDaCercare,
      anno: 2025,
      aliquote: aliquotesStandard,
      detrazioni: {
        abitazionePrincipale: detrazioneAbitazionePrincipale,
        pertinenze: 0
      }
    }
    
  } catch (error) {
    console.error('❌ Errore caricamento delibera:', error)
    return null
  }
}

/**
 * Lista dei comuni disponibili nel bucket
 */
export async function getAvailableComuni(): Promise<string[]> {
  try {
    const { data: files, error } = await supabase.storage
      .from('imu')
      .list('statements/2025')
    
    if (error || !files) {
      return []
    }
    
    return files
      .filter(file => file.name.endsWith('.pdf'))
      .map(file => {
        const [comune, provincia] = file.name.replace('.pdf', '').split('_')
        return `${comune} (${provincia})`
      })
      .sort()
      
  } catch (error) {
    console.error('Errore caricamento lista comuni:', error)
    return []
  }
} 