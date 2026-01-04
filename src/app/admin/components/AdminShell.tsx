"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UserSync from "@/components/UserSync";
import { User } from "@/lib/domain/auth/repository";

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <UserSync user={user} />
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased min-h-screen flex transition-colors duration-300">
        {/* Sidebar Components */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile Header */}
        <header className="lg:hidden fixed w-full z-30 top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Admin</h1>
          <button
            className="text-gray-500 dark:text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-10 pt-20 lg:pt-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
