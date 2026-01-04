import { supabase } from '@/lib/supabase';
import { AuthRepository, Session, AuthStateChangeCallback, AuthSubscription, User, LoginCredentials, RegisterCredentials } from '@/lib/domain/auth/repository';

export class SupabaseAuthRepository implements AuthRepository {
  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    
    // We need to fetch user info to complete the User object
    const userInfo = await this.fetchUserInfo(session.user.id);
    
    return this.mapSession(session, userInfo);
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    
    const userInfo = await this.fetchUserInfo(user.id);
    
    return this.mapUser(user, userInfo);
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) return { user: null, error };
    
    if (data.user) {
      const userInfo = await this.fetchUserInfo(data.user.id);
      return { user: this.mapUser(data.user, userInfo), error: null };
    }
    
    return { user: null, error: null };
  }

  async signUp(credentials: RegisterCredentials): Promise<{ error: Error | null }> {
    const metaData: any = {};
    // Map 'name' to 'full_name' for compatibility with existing triggers/schema if needed, 
    // or 'name' if the trigger was updated. Sending both might be safest if unsure, 
    // but typically we match the schema. The schema has 'name'. 
    // Let's assume the trigger reads 'name' or we should update the trigger. 
    // Given I cannot see the trigger, I will send 'name' as the primary key.
    if (credentials.name) metaData.name = credentials.name;
    if (credentials.teacherCode) metaData.teacher_code = credentials.teacherCode;
    if (credentials.education) metaData.education = credentials.education;
    if (credentials.identityId) metaData.identity_id = credentials.identityId;

    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: metaData,
      },
    });

    return { error };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // This might be expensive to call on every event, but necessary for the full User object
        const userInfo = await this.fetchUserInfo(session.user.id);
        callback(event, this.mapSession(session, userInfo));
      } else {
        callback(event, null);
      }
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }

  async getIdentityId(): Promise<number | null> {
    const { data, error } = await supabase.rpc('get_identity_id');
    if (error) {
      console.error('Error fetching identity:', error);
      return null;
    }
    return data as number;
  }

  private async fetchUserInfo(userId: string): Promise<any> {
    const { data, error } = await supabase
      .from('user_info' as any)
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      // If user_info doesn't exist yet (e.g. right after signup before trigger), handle gracefully?
      console.warn('Error fetching user_info:', error.message);
      return null;
    }
    return data;
  }

  private mapSession(supabaseSession: any, userInfo: any): Session {
    return {
      user: this.mapUser(supabaseSession.user, userInfo),
      accessToken: supabaseSession.access_token,
    };
  }

  private mapUser(supabaseUser: any, userInfo: any): User {
    // Merge auth user data with profile data
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      role: supabaseUser.role, // from auth.users
      emailConfirmedAt: supabaseUser.email_confirmed_at,
      
      // Fields from user_info OR fallback
      name: userInfo?.name || userInfo?.full_name || supabaseUser.user_metadata?.name || '',
      identityId: userInfo?.identity_id,
      isActive: userInfo?.is_active ?? true,
      isFirstLogin: userInfo?.is_first_login ?? false, // Default to false (Setup Not Done)
      avatarUrl: userInfo?.avatar_url,
      phone: userInfo?.phone,
      disabledAt: userInfo?.disabled_at,
      disabledReason: userInfo?.disabled_reason,
    };
  }
}
