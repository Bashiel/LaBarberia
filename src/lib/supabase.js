import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zxlkuptncsgubbxqjdfu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bGt1cHRuY3NndWJieHFqZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2OTgyNDQsImV4cCI6MjA4OTI3NDI0NH0.r_VOdILI1Xbj7KkBW90VoQo7JuaDENPWEf3wAjg2L3E'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)