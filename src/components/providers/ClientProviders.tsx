"use client";

import { ModalProvider } from "./ModalContext";
import GlobalOnboardingGuard from "../GlobalOnboardingGuard";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <GlobalOnboardingGuard />
      {children}
    </ModalProvider>
  );
}
