import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid Supabase credentials have been configured in environment variables
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

if (!isSupabaseConfigured) {
  console.info(
    '[Supabase Notice] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Scholr / Medium.AI is operating in local/offline mode.'
  );
}

// Create and export the Supabase client (or a fallback dummy client to prevent crashes)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
