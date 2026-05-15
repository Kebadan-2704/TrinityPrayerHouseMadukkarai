import { createClient } from '@supabase/supabase-js';

// Supabase REST URL (do NOT include /rest/v1 suffix — the client adds it)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Strip any path the user may have accidentally pasted
const cleanUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(cleanUrl, supabaseAnonKey);
