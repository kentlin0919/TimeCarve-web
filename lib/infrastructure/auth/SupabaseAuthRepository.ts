import { supabase } from '@/lib/supabase';
import { AuthRepository, Session, AuthStateChangeCallback, AuthSubscription, User } from '@/lib/domain/auth/repository';

export class SupabaseAuthRepository implements AuthRepository {
  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    
    return this.mapSession(session);
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    
    return {
        id: user.id,
        email: user.email,
        role: user.role
    };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session ? this.mapSession(session) : null);
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }

  private mapSession(supabaseSession: any): Session {
    return {
      user: {
        id: supabaseSession.user.id,
        email: supabaseSession.user.email,
        role: supabaseSession.user.role,
      },
      accessToken: supabaseSession.access_token,
    };
  }
}
