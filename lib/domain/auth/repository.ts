export interface User {
  id: string;
  email?: string;
  role?: string;
}

export interface Session {
  user: User;
  accessToken: string;
}

export interface AuthSubscription {
  unsubscribe: () => void;
}

export type AuthStateChangeCallback = (event: string, session: Session | null) => void;

export interface AuthRepository {
  getSession(): Promise<Session | null>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription;
  getUser(): Promise<User | null>;
}
