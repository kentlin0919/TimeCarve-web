
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function main() {
  const { data, error } = await supabase
    .from('user_info')
    .select('id, name, identity_id')
    .not('identity_id', 'is', null);

  if (error) {
    console.error(error);
    return;
  }

  const validIds = [1, 2, 3];
  const invalidUsers = data.filter(u => u.identity_id !== null && !validIds.includes(u.identity_id as number));

  if (invalidUsers.length > 0) {
    console.log('Found users with invalid identity_id:', JSON.stringify(invalidUsers, null, 2));
  } else {
    console.log('All users have valid identity_id (1, 2, or 3).');
  }
}

main();
