import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funzione per caricare documenti nel bucket uploads
export async function uploadDocument(file: File, userId: string) {
  const fileName = `${userId}/${Date.now()}-${file.name}`
  
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file)
  
  if (error) {
    throw new Error(`Errore durante l'upload: ${error.message}`)
  }
  
  return data
}

// Funzione per recuperare la delibera comunale
export async function getDeliberaComune(comune: string, provincia: string, codiceComune: string) {
  const fileName = `${comune}_${provincia}_${codiceComune}.pdf`
  
  const { data, error } = await supabase.storage
    .from('imu')
    .download(`statements/2025/${fileName}`)
  
  if (error) {
    throw new Error(`Delibera non trovata per ${comune}: ${error.message}`)
  }
  
  return data
}

// Funzione per ottenere l'URL pubblico di un file
export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
} 