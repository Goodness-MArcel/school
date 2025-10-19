import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Keep session automatically and persist it in localStorage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // ensures the user stays logged in on reload
    autoRefreshToken: true,    // auto-refresh access tokens before they expire
    detectSessionInUrl: true,  // handles OAuth redirects if you use them later
  },
});
