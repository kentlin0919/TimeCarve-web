import { AuthRepository, Session, AuthStateChangeCallback, LoginCredentials, RegisterCredentials, User } from '@/lib/domain/auth/repository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async getSession(): Promise<Session | null> {
    return this.authRepository.getSession();
  }

  async getUser(): Promise<User | null> {
    return this.authRepository.getUser();
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: Error | null }> {
    return this.authRepository.signIn(credentials);
  }

  async signUp(credentials: RegisterCredentials): Promise<{ error: Error | null }> {
    return this.authRepository.signUp(credentials);
  }

  async signOut(): Promise<void> {
    return this.authRepository.signOut();
  }

  onAuthStateChange(callback: AuthStateChangeCallback) {
    return this.authRepository.onAuthStateChange(callback);
  }

  async getIdentityId(): Promise<number | null> {
    return this.authRepository.getIdentityId();
  }
}