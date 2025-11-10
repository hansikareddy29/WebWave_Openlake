// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// These are read from your .env.local file for local development
// and from your Vercel environment variables in production.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)