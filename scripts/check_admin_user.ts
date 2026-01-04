import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdminUser() {
  // Check all users with their identity_id
  const { data: users, error } = await supabase
    .from('user_info')
    .select('id, email, name, identity_id')
    .order('created_at', { ascending: true });
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Users in DB:');
    users.forEach((u, i) => {
      console.log(`[${i}] email: ${u.email}, name: ${u.name}, identity_id: ${u.identity_id}`);
    });
    
    // Also check the get_identity_id function directly
    console.log('\n--- Checking get_identity_id function ---');
    const { data: identityData, error: identityError } = await supabase.rpc('get_identity_id');
    if (identityError) {
      console.error('get_identity_id error:', identityError);
    } else {
      console.log('get_identity_id result (with service key):', identityData);
    }
  }
}

checkAdminUser();
