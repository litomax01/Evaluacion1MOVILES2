import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
const SUPABASE_KEY = 'TU-API-KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
