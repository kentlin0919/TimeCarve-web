import { AuthRepository, Session, AuthStateChangeCallback } from '@/lib/domain/auth/repository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async getSession(): Promise<Session | null> {
    return this.authRepository.getSession();
  }

  async signOut(): Promise<void> {
    return this.authRepository.signOut();
  }

  onAuthStateChange(callback: AuthStateChangeCallback) {
    return this.authRepository.onAuthStateChange(callback);
  }
}
