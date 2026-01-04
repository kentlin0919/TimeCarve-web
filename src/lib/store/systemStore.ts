import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type SystemModule = Database['public']['Tables']['system_modules']['Row'];

interface SystemState {
  modules: SystemModule[];
  loading: boolean;
  initialized: boolean;
  error: string | null;

  init: () => Promise<void>;
  getModuleByRoute: (route: string) => SystemModule | undefined;
  getModulesByIdentity: (identityId: number) => SystemModule[];
}

export const useSystemStore = create<SystemState>((set, get) => ({
  modules: [],
  loading: false,
  initialized: false, // Track if we have already tried to fetch
  error: null,

  init: async () => {
    // If already initialized or currently loading, skip
    if (get().initialized || get().loading) return;

    set({ loading: true, error: null });

    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Modules fetch timeout')), 8000)
      );

      const fetchPromise = supabase
        .from('system_modules')
        .select('*')
        .order('sequence', { ascending: true })
        .order('created_at', { ascending: true });

      const { data, error } = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as any;

      if (error) {
        console.error('Error fetching system modules:', error);
        set({ error: error.message || 'Error fetching modules' });
      } else if (data) {
        set({ modules: data, initialized: true });
      }
    } catch (err: any) {
      if (err?.message === 'Modules fetch timeout') {
        console.warn('Modules fetch timeout - continuing without modules');
      } else {
        console.error('Unexpected error fetching modules:', err);
      }
      set({ error: err?.message || 'Unexpected error' });
    } finally {
      set({ loading: false });
    }

    // Subscribe to changes (Idempotent check not strictly needed if init is once, 
    // but good to be safe or store unsubscribe function)
    // For simplicity, we just subscribe.
    supabase
      .channel('system_modules_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_modules',
        },
        async () => {
             // Simple refetch strategy
             const { data } = await supabase
              .from('system_modules')
              .select('*')
              .order('sequence', { ascending: true });
             if (data) set({ modules: data });
        }
      )
      .subscribe();
  },

  getModuleByRoute: (route: string) => {
     return get().modules.find((m) => m.route === route);
  },

  getModulesByIdentity: (identityId: number) => {
    return get().modules.filter((m) => m.identity_id === identityId);
  }
}));
