import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

async function checkTeacherInfoRLS() {
  // Service role client (bypasses RLS)
  const serviceClient = createClient(supabaseUrl, serviceKey);
  
  console.log('=== Testing with Service Role Key ===');
  const { data: serviceData, error: serviceError } = await serviceClient
    .from('teacher_info')
    .select('id, teacher_code')
    .limit(5);
  
  console.log('Service role can read teacher_info:', !serviceError);
  console.log('Data:', JSON.stringify(serviceData, null, 2));

  // Anon client (respects RLS)
  console.log('\n=== Testing with Anon Key ===');
  const anonClient = createClient(supabaseUrl, anonKey);
  
  const { data: anonData, error: anonError } = await anonClient
    .from('teacher_info')
    .select('id, teacher_code')
    .limit(5);
  
  console.log('Anon key can read teacher_info:', !anonError);
  if (anonError) console.log('Anon error:', anonError.message, anonError.code);
  console.log('Anon data:', JSON.stringify(anonData, null, 2));
}

checkTeacherInfoRLS().catch(console.error);
