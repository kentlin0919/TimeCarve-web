"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/application/auth/AuthService";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";

const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);

export default function GlobalOnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUserStatus = async () => {
      // Avoid infinite loops on auth pages
      if (
        pathname.startsWith("/auth/onboarding") ||
        pathname.startsWith("/auth/reset-password") ||
        pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/verify") ||
        pathname === "/auth/logout"
      ) {
        return;
      }

      const user = await authService.getUser();
      if (user) {
        // If logged in, check if setup is completed (isFirstLogin === true means completed in this confusing schema)
        // Default in DB is FALSE (not completed). Code defaults to FALSE.
        // Onboarding sets to TRUE.
        // So: if (isFirstLogin === false) -> Not Completed -> Redirect.
        
        if (user.isFirstLogin === false) {
          console.log("GlobalGuard: User setup not complete, redirecting...", pathname);
          if (user.identityId === 2) {
             // Teachers forced to reset password first? 
             // Logic from AuthGuard: if teacher, go to reset-password.
             router.push("/auth/reset-password");
          } else {
             router.push("/auth/onboarding");
          }
        }
      }
    };

    checkUserStatus();
  }, [pathname, router]);

  return null;
}
