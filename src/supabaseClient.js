import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddcbhoxebjvorjxnbjmt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkY2Job3hlYmp2b3JqeG5iam10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNjk2NTMsImV4cCI6MjA0Njc0NTY1M30.tlD7tCS2tOX6-lm-0Sc-FQRX0el0e_EqOdxLeQeQUjE';
export const supabase = createClient(supabaseUrl, supabaseKey);