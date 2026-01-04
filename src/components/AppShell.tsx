'use client';

import { useState } from 'react';
import Image from 'next/image';
import AppSidebar from './AppSidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white antialiased font-display transition-colors duration-200">
      
      {/* Sidebar Component */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header (Hamburger) - Visible only on mobile */}
        <header className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                 <div className="relative w-8 h-8">
                     <Image src="/logo.svg" alt="TimeCarve Logo" fill className="object-contain" />
                 </div>
                 <span className="font-bold text-slate-800 dark:text-white">TimeCarve 刻時</span>
            </div>
            <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden p-0 md:p-0 relative">
            {children}
        </main>

      </div>
    </div>
  );
}
