import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpdtgzwkkjbbizqthici.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZHRnendra2piYml6cXRoaWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NjUzNTAsImV4cCI6MjA1NzU0MTM1MH0.kUCHndMZhQbqlqZY6FTYyZ8UfX3Xkl5OVJai6F-u7Q0';
export const supabase = createClient(supabaseUrl, supabaseKey);
