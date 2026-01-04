import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyLogin() {
  const email = 'kent900919@gmail.com';
  const password = '0919';

  console.log(`--- Verifying Login for ${email} ---`);

  // 1. Sign In
  const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    console.error('❌ Login failed:', loginError.message);
    return;
  }
  
  if (!session || !session.user) {
    console.error('❌ Login succeeded but no session/user returned.');
    return;
  }

  const user = session.user;
  console.log('✅ Auth Login Successful. User ID:', user.id);

  // 2. Fetch User Info (Simulating Layout Check)
  console.log('--- Fetching User Info ---');
  const { data: userInfo, error: infoError } = await supabase
    .from('user_info')
    .select('*')
    .eq('id', user.id)
    .single();

  if (infoError) {
    console.error('❌ Failed to fetch user_info:', infoError);
    // Common reasons: RLS policy missing, or record doesn't exist
    if (infoError.code === 'PGRST116') {
      console.error('   -> Record not found (or hidden by RLS).');
    }
    return;
  }

  if (!userInfo) {
    console.error('❌ userInfo is null.');
    return;
  }

  console.log('✅ Fetched user_info:', userInfo);

  // 3. Check Identity ID
  console.log('--- Checking Identity ID ---');
  if (userInfo.identity_id === 1) {
    console.log('✅ Identity ID is 1 (Admin). Access SHOULD be granted.');
  } else {
    console.error(`❌ Identity ID is ${userInfo.identity_id}. Access DENIED (Required: 1).`);
  }
}

verifyLogin().catch(console.error);
