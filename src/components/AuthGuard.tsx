"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/application/auth/AuthService";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/lib/store/userStore";

// In a real DI container, this would be injected.
// For now, we instantiate it here or in a singleton helper.
const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuthOnMount = useRef(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand store actions
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoadingStore = useUserStore((state) => state.setIsLoading);

  // ... (useEffects remain same, but catch block updates error state)

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (hasCheckedAuthOnMount.current && !isLoading) {
        return;
      }

      // Reset error on new check
      setError(null);

      try {
        if (pathname === "/") {
          if (mounted) {
            setIsAuthenticated(true);
            setIsLoading(false);
            hasCheckedAuthOnMount.current = true;
          }
          return;
        }

        // Timeout 10s
        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("Auth check timed out")), 10000)
        );

        const user = await Promise.race([
          authService.getUser(),
          timeoutPromise,
        ]);

        if (!mounted) return;

        if (user) {
          setIsAuthenticated(true);
          setUser(user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          const loginUrl = `/auth/login?redirect=${encodeURIComponent(
            pathname
          )}`;
          router.replace(loginUrl);
        }
      } catch (err: any) {
        if (!mounted) return;
        console.error("Error checking auth:", err);

        // Don't auto-redirect on timeout/network error, let user see the error
        // forcing redirect might cause loop if the error is persistent
        setError(err.message || "Authentication failed");
        setIsAuthenticated(false);

        // Force logout if it's a critical auth error
        if (
          err?.message?.includes("Invalid Refresh Token") ||
          err?.message?.includes("Refresh Token Not Found")
        ) {
          await authService.signOut();
          setUser(null);
          router.replace("/auth/login");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsLoadingStore(false);
          hasCheckedAuthOnMount.current = true;
        }
      }
    };

    checkAuth();

    // Subscriber logic remains...
    const subscription = authService.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_OUT" || !session) {
        setIsAuthenticated(false);
        setUser(null);
        router.replace("/auth/login");
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setIsAuthenticated(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, pathname, isLoading, setUser, setIsLoadingStore]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Show error UI if authentication failed with an error (and we didn't redirect)
  if (error && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">
              error
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error === "Auth check timed out"
              ? "Connection timed out. Please check your network or try again."
              : "We couldn't verify your identity. Please try logging in again."}
          </p>
          <p className="text-xs text-gray-400 mb-6 font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
            Error details: {error}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => router.replace("/auth/login")}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
