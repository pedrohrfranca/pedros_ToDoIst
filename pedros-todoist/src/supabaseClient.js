import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://shuowhrycttukdcolrjs.supabase.co'; // Substitua com sua URL do projeto
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodW93aHJ5Y3R0dWtkY29scmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEzNzcwNCwiZXhwIjoyMDE1NzEzNzA0fQ.ZyjAg6PgtxsTbCMmO89AW3mVCWiEih55MCaSDx_Ls5Q'; // Substitua com sua anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
