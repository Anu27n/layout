import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iultciezzujrjhcjjmkg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bHRjaWV6enVqcmpoY2pqbWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MjkzMTYsImV4cCI6MjA0MjQwNTMxNn0.9SpSxdPMQEy4nguFLElw7wlq0RNscmT-tOK0Qs_UGyk';
export const supabase = createClient(supabaseUrl, supabaseKey);

