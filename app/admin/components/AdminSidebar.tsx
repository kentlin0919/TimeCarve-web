import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed h-full z-20 hidden lg:flex transition-colors duration-300">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <img
            alt="Super Admin Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-gray-900"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt6W3eIXk2fHV7ExtV5kB8M6gkgNH91LHPohYHNEV1GR6Ot_YkeOJzTvmE-1EVYqbI66jY480BTxj0G_uPFRLhIIaT-Ved3efBy1SOMqYXPWFlp3guuL8uwqw6KIwgIx825PFTnA65hOhzb0NlEsA5IrD3evHcAGrODr9IcrhcTOkPzQ_BQjfhC98fgy_rXLJFcrx2hbzXDC0V0zEp-TM1pR9xacPJ2rvzyzLn68TK8-qB_ZiFcmPH_iNeakodt5pVW8tC86Uro24"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            Super Admin
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            牙牙學語 系統管理
          </p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <Link
          href="/admin/dashboard"
          className="flex items-center space-x-3 px-3 py-2.5 bg-sky-50 dark:bg-sky-500/20 text-sky-500 rounded-lg group"
        >
          <span className="material-icons-outlined text-xl">dashboard</span>
          <span className="font-medium text-sm">儀表板</span>
        </Link>
        <Link
          href="/admin/teachers"
          className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
        >
          <span className="material-icons-outlined text-xl group-hover:text-sky-500 transition-colors">
            school
          </span>
          <span className="font-medium text-sm">教師管理</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
        >
          <span className="material-icons-outlined text-xl group-hover:text-sky-500 transition-colors">
            menu_book
          </span>
          <span className="font-medium text-sm">課程管理</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
        >
          <span className="material-icons-outlined text-xl group-hover:text-sky-500 transition-colors">
            people
          </span>
          <span className="font-medium text-sm">學生管理</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
        >
          <span className="material-icons-outlined text-xl group-hover:text-sky-500 transition-colors">
            payments
          </span>
          <span className="font-medium text-sm">財務報表</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg group transition-colors"
        >
          <span className="material-icons-outlined text-xl group-hover:text-sky-500 transition-colors">
            settings
          </span>
          <span className="font-medium text-sm">系統設定</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="#"
          className="flex items-center space-x-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <span className="material-icons-outlined text-xl">logout</span>
          <span className="font-medium text-sm">登出系統</span>
        </Link>
      </div>
    </aside>
  );
}
