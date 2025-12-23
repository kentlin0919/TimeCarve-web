'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '@/lib/application/auth/AuthService';
import { SupabaseAuthRepository } from '@/lib/infrastructure/auth/SupabaseAuthRepository';

// In a real DI container, this would be injected.
// For now, we instantiate it here or in a singleton helper.
const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname === '/') {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        const session = await authService.getSession();
        
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      } catch (error: any) {
        console.error('Error checking auth:', error);
        
        // Handle invalid refresh token specifically to prevent infinite loops
        // "AuthApiError: Invalid Refresh Token: Refresh Token Not Found"
        if (error?.message?.includes('Invalid Refresh Token') || 
            error?.message?.includes('Refresh Token Not Found')) {
          console.warn('Invalid refresh token detected. Force signing out...');
          await authService.signOut();
        }
        
        setIsAuthenticated(false);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const subscription = authService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        router.push('/auth/login');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
