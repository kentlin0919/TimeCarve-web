import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// 嘗試多種常見的命名慣例，以適應不同的部署設定
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                        ''

// 為了在建置時期 (CI/CD) 或環境變數未設定時不讓程式直接崩潰，
// 我們先確認變數是否存在。若不存在，則回傳一個具有基本結構的 Proxy 或空 Client。
// 但為了簡化且確保型別正確，最安全的方式是僅在有網址時初始化。

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)


