import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using anon key, might need service role if RLS blocks reading others

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
  const email = 'kent900919@gmail.com';
  console.log(`Checking user: ${email}`);

  // 1. Check Auth User (requires service role usually, but let's try or just assume auth works)
  // We can't easily list users with anon key.
  
  // 2. Check public.user_info
  const { data: userInfo, error } = await supabase
    .from('user_info')
    .select('*, identity(name)')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user_info:', error);
  } else {
    console.log('User Info:', userInfo);
  }
}

checkUser();
