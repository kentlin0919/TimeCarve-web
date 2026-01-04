import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUser() {
  const email = 'kent900919@gmail.com';
  const password = '0919';
  console.log(`Attempting login for: ${email}`);

  const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError || !user) {
    console.error('Login failed:', loginError);
    return;
  }

  console.log(`Login successful. User ID: ${user.id}`);

  // Insert missing user_info
  const { error: insertError } = await supabase
    .from('user_info')
    .insert({
      id: user.id,
      email: user.email!,
      name: 'Kent Lin', // Default name
      identity_id: 1, // Admin
      is_active: true,
      // is_first_login: false // Let's set to false so they don't get stuck in onboarding if that logic exists
    });

  if (insertError) {
    if (insertError.code === '23505') { // Unique violation
       console.log('User info already exists (race condition or previous run). Updating instead...');
       const { error: updateError } = await supabase
         .from('user_info')
         .update({ identity_id: 1, is_active: true })
         .eq('id', user.id);
       if (updateError) console.error('Update failed:', updateError);
       else console.log('User info updated to Admin.');
    } else {
       console.error('Failed to insert user_info:', insertError);
    }
  } else {
    console.log('Successfully created user_info record for Admin.');
  }
}

fixUser();
