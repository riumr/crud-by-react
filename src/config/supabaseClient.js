import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKeyuse = process.env.REACT_APP_SUPABASE_KEY
const supabase=createClient(supabaseUrl,supabaseKeyuse)

export default supabase;