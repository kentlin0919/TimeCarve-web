import AuthGuard from '@/app/components/AuthGuard';
import StudentSidebar from './components/StudentSidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white antialiased min-h-screen flex transition-colors duration-200 font-display">
        {/* Sidebar */}
        <StudentSidebar />

        {/* Mobile Header */}
        <div className="md:hidden fixed w-full z-40 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/10 p-1.5 rounded-lg text-teal-600 dark:text-teal-400">
              <span className="material-symbols-outlined text-[20px]">
                dentistry
              </span>
            </div>
            <span className="font-bold text-slate-800 dark:text-white">
              牙雕家教
            </span>
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 pt-20 md:pt-0 overflow-x-hidden h-screen overflow-y-auto relative bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
