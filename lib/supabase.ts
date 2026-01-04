import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Lazy initialization to handle static export build
let supabaseInstance: SupabaseClient<Database> | null = null

export const supabase = (() => {
  // During static build, return a dummy client that will be replaced at runtime
  if (typeof window === 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    // Return a proxy that throws helpful errors if used during SSR without env vars
    return new Proxy({} as SupabaseClient<Database>, {
      get: (target, prop) => {
        if (prop === 'auth' || prop === 'from' || prop === 'rpc') {
          return new Proxy(() => {}, {
            get: () => () => Promise.resolve({ data: null, error: { message: 'Supabase not configured for SSR' } }),
            apply: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured for SSR' } }),
          })
        }
        return () => Promise.resolve({ data: null, error: null })
      },
    })
  }

  // Normal runtime initialization
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance!
})()

