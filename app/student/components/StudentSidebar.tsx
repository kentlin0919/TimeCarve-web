import Link from 'next/link';

export default function StudentSidebar() {
  return (
    <aside className="w-72 flex-shrink-0 flex flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-slate-800 transition-colors duration-200 hidden md:flex z-30 shadow-sm fixed h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 text-teal-600 dark:text-teal-400">
          <div className="p-2 bg-teal-500/10 rounded-xl">
            <span className="material-symbols-outlined text-[28px]">
              dentistry
            </span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
            牙雕家教
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
            主選單
          </div>
          <Link
            href="/student/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 transition-colors group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r-full"></div>
            <span className="material-symbols-outlined text-[22px]">
              dashboard
            </span>
            <span className="text-sm font-bold">儀表板</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              menu_book
            </span>
            <span className="text-sm font-medium">課程方案</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              calendar_month
            </span>
            <span className="text-sm font-medium">預約記錄</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              trending_up
            </span>
            <span className="text-sm font-medium">學習進度</span>
          </Link>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-4">
            帳戶管理
          </div>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              settings
            </span>
            <span className="text-sm font-medium">個人設定</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              help
            </span>
            <span className="text-sm font-medium">支援中心</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm relative ring-2 ring-white dark:ring-slate-700"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHpcmx5FN0ieyK-KUTHlzpCr7Aj8wyk3XwCcfO9sBG40Fan-DY44DtRxhLT6rnswES6q6B0xREgxnk1ImkFwzDG1AjLCEp0il-_ttTxQZAjLL4AmXamRYBu2Zh6v2QyEZ0GyVpujs4Zkwv3aEJLnYJezfNy4L9DxmcDC3Z5QoMc3eQbRTwtSxoYieRI_nfI5E5ysjpEjZueHWnjExK4sfPdXovbW73WmDh1wuhV8s2zmYq5qKDODTOCJw_efYco-8WOO4DyDdedxA")',
              }}
            >
              <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-800 dark:text-white text-sm font-bold truncate">
                陳小美
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
                進階學員
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-400 ml-auto">
              logout
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
