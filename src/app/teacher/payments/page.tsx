'use client';

import React from 'react';

export default function PaymentManagementPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            收款管理
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">
            本月應收 <span className="text-primary font-bold">NT$ 42,000</span>，目前尚有 <span className="text-red-500 font-bold">3</span> 筆款項逾期
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="size-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-text-sub hover:text-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="size-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-text-sub hover:text-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>
          </div>
          <div className="h-8 w-px bg-border-light dark:bg-border-dark mx-1"></div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>新增收款記錄</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">本月預估總收入</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">NT$ 126,000</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  較上月 +12%
                </p>
              </div>
              <div className="size-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">attach_money</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">實際已收款</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">NT$ 84,000</p>
                <p className="text-xs text-text-sub mt-1">達成率 66%</p>
              </div>
              <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-50/50 to-transparent dark:from-emerald-900/10 pointer-events-none"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">待收與逾期</p>
                <p className="text-2xl font-bold text-orange-500 dark:text-orange-400 mt-1">NT$ 42,000</p>
                <p className="text-xs text-red-500 mt-1 font-medium">包含 3 筆逾期款項</p>
              </div>
              <div className="size-12 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">pending</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-orange-50/50 to-transparent dark:from-orange-900/10 pointer-events-none"></div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
            {/* Filter Bar */}
            <div className="p-5 border-b border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-slate-50/30 dark:bg-slate-800/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-48">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub text-[18px]">calendar_month</span>
                  <select className="pl-10 pr-8 py-2 w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none appearance-none cursor-pointer text-slate-700 dark:text-gray-200">
                    <option>2023年 10月</option>
                    <option>2023年 09月</option>
                    <option>2023年 08月</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-text-sub text-[18px] pointer-events-none">expand_more</span>
                </div>
                <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-border-light dark:border-border-dark w-full sm:w-auto overflow-x-auto">
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600 transition-all whitespace-nowrap">全部</button>
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md text-text-sub hover:bg-slate-50 dark:hover:bg-slate-700 transition-all whitespace-nowrap">待收款</button>
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md text-text-sub hover:bg-slate-50 dark:hover:bg-slate-700 transition-all whitespace-nowrap">已收款</button>
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all whitespace-nowrap">逾期</button>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative group flex-1 lg:flex-none">
                  <input 
                    className="pl-10 pr-4 py-2 w-full lg:w-64 rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                    placeholder="搜尋學生姓名..." 
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">search</span>
                </div>
                <button className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:text-primary hover:border-primary transition-colors shadow-sm" title="匯出報表">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-text-sub uppercase border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-6 py-4 font-semibold w-1/4">學生姓名</th>
                    <th className="px-6 py-4 font-semibold w-1/4">課程內容與時間</th>
                    <th className="px-6 py-4 font-semibold">應收 / 實收金額</th>
                    <th className="px-6 py-4 font-semibold">付款狀態</th>
                    <th className="px-6 py-4 font-semibold text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark bg-white dark:bg-surface-dark">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold shadow-sm">
                          林
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">林大山</span>
                          <span className="text-xs text-text-sub">lin.shan@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-white">進階局部活動假牙</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-red-500 font-medium">
                          <span className="material-symbols-outlined text-[14px]">event_busy</span>
                          2023-10-20 14:00 (已過期)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-white">NT$ 12,000</span>
                        <span className="text-xs text-text-sub">實收: <span className="text-slate-400">NT$ 0</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/status inline-block">
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                          <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                          逾期未繳
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" title="發送提醒">
                          <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-sm shadow-primary/30 transition-colors">
                          記錄收款
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold shadow-sm">
                          陳
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">陳小美</span>
                          <span className="text-xs text-text-sub">chen.mei@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-white">全口假牙雕刻入門</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-text-sub">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          2023-10-28 10:00
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-white">NT$ 8,000</span>
                        <span className="text-xs text-text-sub">實收: <span className="text-slate-400">NT$ 0</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/status inline-block">
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50 text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                          <span className="size-2 rounded-full bg-orange-500"></span>
                          待收款
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" title="查看詳情">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-sm shadow-primary/30 transition-colors">
                          記錄收款
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center font-bold shadow-sm">
                          張
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">張雅婷</span>
                          <span className="text-xs text-text-sub">chang.ya@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-white">牙體形態學基礎</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-text-sub">
                          <span className="material-symbols-outlined text-[14px]">event_available</span>
                          2023-10-15 13:30
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-sub line-through">NT$ 6,000</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">實收: NT$ 6,000</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/status inline-block">
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          已收款
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" title="列印收據">
                          <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors">
                          詳細記錄
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold shadow-sm">
                          王
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">王小明</span>
                          <span className="text-xs text-text-sub">wang.min@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-white">牙體技術師國考衝刺班</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-text-sub">
                          <span className="material-symbols-outlined text-[14px]">event_available</span>
                          2023-10-12 09:00
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-sub line-through">NT$ 15,000</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">實收: NT$ 15,000</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/status inline-block">
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          已收款
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" title="列印收據">
                          <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors">
                          詳細記錄
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold shadow-sm">
                          李
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">李大華</span>
                          <span className="text-xs text-text-sub">lee.hua@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-white">全口假牙雕刻入門</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-text-sub">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          2023-11-05 14:00
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-white">NT$ 8,000</span>
                        <span className="text-xs text-text-sub">實收: <span className="text-slate-400">NT$ 0</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/status inline-block">
                        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50 text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                          <span className="size-2 rounded-full bg-orange-500"></span>
                          待收款
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" title="查看詳情">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-sm shadow-primary/30 transition-colors">
                          記錄收款
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border-light dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-text-sub">顯示第 1 到 5 筆，共 24 筆記錄</span>
              <div className="flex items-center gap-2">
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors" disabled>
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">2</button>
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">3</button>
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
