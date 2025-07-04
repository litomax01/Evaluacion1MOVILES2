import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kjlcquxvufazjrqpeyvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbGNxdXh2dWZhempycXBleXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODc2MjAsImV4cCI6MjA2NzE2MzYyMH0.9rAcQ-z5WOJlpswtzi_cW5pWiG8SsIj2y3gC-pduEcs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
