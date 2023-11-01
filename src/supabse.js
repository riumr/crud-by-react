import { createClient } from '@supabase/supabase-js';
require("dotenv").config();

async function supabase(){
    const supabaseUrl = 'https://necxpvdjfhkcoadxmhcq.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase=createClient(supabaseUrl,supabaseKey)

    const { error } = await supabase
        .from('countries')
        .insert({ id: 1, name: 'Denmark' })
}

export default supabase;