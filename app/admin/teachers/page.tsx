import Link from 'next/link';

export default function TeacherManagement() {
  return (
    <div className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            教師管理
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            管理所有註冊教師的帳號權限、狀態與維護費方案
          </p>
        </div>
        <Link
          href="/admin/teachers/new"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl h-12 px-6 bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="text-sm font-bold tracking-wide">新增教師</span>
        </Link>
      </header>
      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 dark:text-gray-500 group-focus-within:text-sky-500 transition-colors">
            search
          </span>
          <input
            className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/70 transition-all outline-none"
            placeholder="搜尋姓名或電子郵件..."
            type="text"
          />
        </div>
        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0">
          <div className="relative min-w-[160px]">
            <select className="w-full h-12 pl-4 pr-10 appearance-none rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:ring-0 text-gray-900 dark:text-white cursor-pointer outline-none">
              <option value="">所有狀態</option>
              <option value="active">啟用中</option>
              <option value="disabled">已停用</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          <div className="relative min-w-[160px]">
            <select className="w-full h-12 pl-4 pr-10 appearance-none rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:ring-0 text-gray-900 dark:text-white cursor-pointer outline-none">
              <option value="">所有方案</option>
              <option value="basic">基礎版</option>
              <option value="pro">專業版</option>
              <option value="enterprise">企業版</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>
        </div>
      </div>
      {/* Stats Summary (Quick View) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              總教師數
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              128
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
          <div className="size-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              啟用中
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              112
            </p>
          </div>
        </div>
        {/* Add more stats if needed */}
      </div>
      {/* Data Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[280px]">
                  教師姓名
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[240px]">
                  電子郵件
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  維護費方案
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  狀態
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {/* Row 1 */}
              <tr className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANZ-oaySP0kVjk34VAVu06wIbevYcQtfoKHy3c2oIOdl-CjEvMvXqoT718BNUAqmY0SvOn0347G4ERc61t_KBny4v1Zkv5deYDkhG3btp-_fIUf8f-MG7mN-G9FweYlLhNG4Rk6IniFtjUm_rxkpYV3dtmo1EwOTROOHqiVa5hIshqjrMy93PjXVE6ZvHsq72btyGH4Pe3yhXZXCEB_YjOWbLJw7LhjWPcMdOn2IdUduJkLhVc_LWgZ6x7ifX5fZ82RJ0qehTu-2k")',
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        林小美
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        lin.xm@example.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    lin.xm@example.com
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                    專業版
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      啟用中
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                      title="編輯"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                      title="刪除"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLGWWfrL0jWRTHUvl_HgY2k7yIHdosiB1hBysJpPYK0JEzBCnIRVu8pWrp_4NffzBUDqqA4mMj7JJW771UTL4YMWe2o9VDC9fFOeUFqgbGOoQSGf3DtzxoNP7GhqtTYoUK-L8g9IAct6gbKdQqPss8lzn54BbcukP62nTIcsWXtjAwxjaW0rHTrgWZbVhXEkn4iADhIEBfUoLNzy8BMMvl8HxeOWF-3onUADPhR5mbdgfnRmkwVMwHeSH1xoE53Mcr-C4UAJWLqiQ")',
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        王大明
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        wang.dm@test.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    wang.dm@test.com
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    基礎版
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      已停用
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                      title="編輯"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                      title="刪除"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw_2AOzTgC3IQP9-8B7S6AynOYyZFpbxjxJ0be-Xk8Ihuhq-tnsWl5TSWDn3pYQRAPf7gcgQ6jCGJoTlQvHbwhlIfz6wlPrhMtWvyfTicTVTKU11b5jRn8EeKoxyjfQEABjbOAWTP5vEB5JcPFYApyj-1U6H3NXEh0u6iw9RcMtxPte_qciIbwYJ3y5iX1Vda5iu0eNLGHKUh-9d5yGoyewWPGjbV7qz330Sn9EtA-hz1nHsMpcXToEC1bN29DJ6SPv2rmzi38Ygw")',
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        陳思妤
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        chen.sy@demo.tw
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    chen.sy@demo.tw
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                    進階版
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      啟用中
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                      title="編輯"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                      title="刪除"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAb6wUFT0fR0pMYyRY72cvTCnrwXEiT1mo1LomYebfnKY4Lq-uQRgrCWUCqR7zQ0gnxbsgDibYuH2RckCNhpWFADJowTrNI4uIjPaQsq3B_4gGlgZcdTkwpnYZdFuNQ5ywwcmAmLvD5z5eTAPXeCKox-5yprAnwonkN7-hxyDjrpZS-UcS6vQ2AjQMdt1mATsg7AGYH_ip_SaVYbN3M2yO3VvvHqIy_XckIErZIWMLB7pXAvfeKGIT3DHkjGbIlXwQGZQYqYznA3ag")',
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        張志豪
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        chang.jh@mail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    chang.jh@mail.com
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                    專業版
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      啟用中
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                      title="編輯"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                      title="刪除"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjCLMCgpNGALVrkIIQ2dqNCOL2JHr1a-VIcezvxwmRpY_5RvCqzT8nsvi8h3ZGuAEVUp297kEH3DJ_2aEHWc088M6viWEpy2I_4goUNvh9TvYgtfXlq4A-g9UZAUIwTmgrfo-lUqqZF89wPrD4_cqqoFSI4BAysmnBb_UA1LQLF_nXObWV5d2B-R8OSBoucaJux5o46L-ODsUe41cuUI3r5tTF1jQvhsqnS0kMug7q25wHchTsmKeSbYdvISe3Z-JXpqL01tNQa2s")',
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        李淑芬
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        lee.sf@web.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    lee.sf@web.com
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-sky-50 dark:bg-sky-900/10 text-sky-500 border border-sky-100 dark:border-sky-500/20">
                    企業版
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      已停用
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                      title="編輯"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                      title="刪除"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              顯示 1 到 5 筆，共 128 筆
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-sky-500 text-white text-sm font-bold">
              1
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">
              2
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">
              3
            </button>
            <span className="text-gray-500 dark:text-gray-400 text-sm px-1">
              ...
            </span>
            <button className="size-8 flex items-center justify-center rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">
              10
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
