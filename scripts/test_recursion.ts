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

async function verifyRecursion() {
  const email = 'kent900919@gmail.com';
  const password = '0919';

  console.log(`--- Verifying Recursion Fix for ${email} ---`);

  // 1. Sign In
  const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    console.error('❌ Login failed:', loginError.message);
    return;
  }

  console.log('✅ Auth Login Successful. User ID:', session?.user.id);

  // 2. Fetch Users (Problematic Query)
  console.log('--- Fetching All Users with Relationships ---');
  const { data: users, error: infoError } = await supabase
    .from('user_info')
    .select('*,identity:identity_id(identity_id,name),student_info(id,student_code,teacher_code,created_at,updated_at),teacher_info(id,teacher_code,title,experience_years,base_price,is_public,bio,created_at,updated_at)')
    .order('created_at', { ascending: false });

  if (infoError) {
    console.error('❌ Failed to fetch users (Recursion Detected?):', infoError);
  } else {
    console.log(`✅ Successfully fetched ${users?.length} users.`);
    // console.log(users);
  }
}

verifyRecursion().catch(console.error);
