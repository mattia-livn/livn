import { createClient } from '@supabase/supabase-js';

// Verifica che le chiavi Supabase siano configurate
if (!process.env.SUPABASE_URL) {
  console.error('⚠️ SUPABASE_URL non configurata nel file .env');
}

if (!process.env.SUPABASE_ANON_KEY) {
  console.error('⚠️ SUPABASE_ANON_KEY non configurata nel file .env');
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getFileFromBucket = async (fileName: string) => {
  try {
    const { data, error } = await supabase
      .storage
      .from('imu')
      .download(`.statements/2025/${fileName}`);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
};

export default supabase; 