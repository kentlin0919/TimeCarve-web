import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkModules() {
  console.log('Checking system_modules access...');
  
  // 1. Try reading anonymously (public modules?)
  // Actually system_modules usually requires auth or is public?
  // Let's try anonymous first.
  const { data: publicData, error: publicError } = await supabase
    .from('system_modules')
    .select('*')
    .limit(1);

  if (publicError) {
    console.log('Anonymous read failed/empty:', publicError.message);
  } else {
    console.log(`Anonymous read success. Count: ${publicData?.length}`);
  }

  // 2. Try with Auth
  const email = 'kent900919@gmail.com';
  const password = '0919';
  const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (!session) {
    console.error('Login failed for check:', loginError?.message);
    return;
  }

  const { data: authData, error: authError } = await supabase
    .from('system_modules')
    .select('*');

  if (authError) {
    console.error('Authenticated read failed:', authError.message);
  } else {
    console.log(`Authenticated read success. Count: ${authData?.length}`);
    const dashboard = authData?.find(m => m.key === 'admin_dashboard');
    console.log('Admin Dashboard Module:', dashboard);
  }
}

checkModules();
