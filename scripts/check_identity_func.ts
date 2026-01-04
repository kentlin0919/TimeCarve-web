import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFunction() {
  // Check the actual function definition
  const { data, error } = await supabase.rpc('get_identity_id');
  console.log('Direct RPC call result:', data, error);
  
  // Check if there's any issue with user_info table
  const { data: userInfo } = await supabase
    .from('user_info')
    .select('id, email, identity_id')
    .eq('email', 'kent900919@gmail.com')
    .single();
    
  console.log('Admin user_info:', userInfo);
}

checkFunction();
