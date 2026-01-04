import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRPC() {
  // Test with the correct teacher_code
  const { data, error } = await supabase.rpc('get_public_teacher_profile', { code: 'ZN9G' });
  
  if (error) {
    console.error('RPC Error:', error);
  } else {
    console.log('RPC Result:', JSON.stringify(data, null, 2));
    const result = Array.isArray(data) ? data[0] : data;
    if (result) {
      console.log('\n=== Key Fields ===');
      console.log('Has philosophy_items:', 'philosophy_items' in result);
      console.log('philosophy_items value:', JSON.stringify(result.philosophy_items, null, 2));
    } else {
      console.log('\nNo result found');
    }
  }
}

checkRPC();
