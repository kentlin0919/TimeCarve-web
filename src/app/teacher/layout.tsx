"use client";

import { useState } from "react";
import Image from "next/image";
import AuthGuard from "@/components/AuthGuard";
import TeacherSidebar from "./components/TeacherSidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-text-main dark:text-gray-200 font-display overflow-hidden antialiased transition-colors duration-200">
        <TeacherSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Mobile Header */}
          <header className="lg:hidden w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-4 py-3 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="TimeCarve Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-slate-800 dark:text-white">
                TimeCarve 刻時
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          <main className="flex-1 overflow-hidden relative">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
