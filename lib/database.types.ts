export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      identity: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      userinfo: {
        Row: {
          id: string // Assuming this links to auth.users.id
          identity_id: number
          // Add other columns as needed
        }
        Insert: {
          id: string
          identity_id: number
        }
        Update: {
          id?: string
          identity_id?: number
        }
      }
    }
    Functions: {
      has_role: {
        Args: {
          target_role_name: string
        }
        Returns: boolean
      },
      get_identity_id: {
        Args: Record<string, never>
        Returns: number
      }
    }
  }
}
