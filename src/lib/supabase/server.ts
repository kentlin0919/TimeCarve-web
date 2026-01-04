// This file is intentionally stubbed for Static Export (GitHub Pages).
// Server-side Supabase client is not available in static builds.
// Use the client-side version from ./client.ts instead.

import { createClient as createClientSide } from './client'

// Re-export the client-side version for compatibility
// Note: This will NOT have server-side cookie access
export async function createClient() {
  console.warn('[Supabase] Server-side client is not available in static export. Using client-side version.')
  return createClientSide()
}
