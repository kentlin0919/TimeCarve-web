"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/application/auth/AuthService";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";
import { supabase } from "@/lib/supabase";

// In a real DI container, this would be injected.
// For now, we instantiate it here or in a singleton helper.
const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuthOnMount = useRef(false); // Add useRef to prevent multiple initial checks

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      // If we've already performed the initial check and are not on the root path,
      // and the component is not loading, we can skip re-checking unless pathname changes.
      // However, the dependency array already handles pathname changes.
      // This ref is primarily to ensure the initial navigation logic runs only once on mount.
      if (hasCheckedAuthOnMount.current && !isLoading) {
        return;
      }

      try {
        if (pathname === "/") {
          if (mounted) {
            setIsAuthenticated(true);
            setIsLoading(false);
            hasCheckedAuthOnMount.current = true; // Mark as checked
          }
          return;
        }

        // Add 10s timeout to prevent infinite loading
        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("Auth check timed out")), 10000)
        );

        const user = await Promise.race([
          authService.getUser(),
          timeoutPromise,
        ]);

        if (!mounted) return;

        if (user) {
          // 1. Check Email Verification
          if (!user.emailConfirmedAt) {
            if (
              pathname !== "/auth/login" &&
              pathname !== "/auth/verify-email"
            ) {
              // Handle unverified email logic here if needed
            }
          }

          // 2. Check First Login
          // Refactored to GlobalOnboardingGuard for app-wide enforcement
          // if (user.isFirstLogin === false) { ... }

          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          const loginUrl = `/auth/login?redirect=${encodeURIComponent(
            pathname
          )}`;
          router.replace(loginUrl); // Changed to router.replace
        }
      } catch (error: any) {
        if (!mounted) return;
        console.error("Error checking auth:", error);

        if (
          error?.message?.includes("Invalid Refresh Token") ||
          error?.message?.includes("Refresh Token Not Found") ||
          error?.message === "Auth check timed out"
        ) {
          console.warn(
            "Auth issue detected (Timeout or Invalid Token). Force signing out..."
          );
          await authService.signOut();
        }

        setIsAuthenticated(false);
        router.replace("/auth/login"); // Changed to router.replace
      } finally {
        if (mounted) {
          setIsLoading(false);
          hasCheckedAuthOnMount.current = true; // Mark as checked after the first full check
        }
      }
    };

    checkAuth();

    const subscription = authService.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_OUT" || !session) {
        setIsAuthenticated(false);
        router.replace("/auth/login"); // Changed to router.replace
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setIsAuthenticated(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, pathname, isLoading]); // Added isLoading to dependencies to re-evaluate when loading state changes

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

  return isAuthenticated ? <>{children}</> : null;
}
