'use client';

import React from 'react';

export default function ReportsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            營收報表
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">檢視財務健康狀況與營收趨勢</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative inline-block text-left">
            <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 shadow-sm text-sm font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>2023年 10月</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 shadow-sm text-sm font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>匯出報表</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span>進階篩選</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">本月總營收</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">NT$ 126,000</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full flex items-center">
                      <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                      12.5%
                    </span>
                    <span className="text-xs text-text-sub ml-1">較上月</span>
                  </div>
                </div>
                <div className="size-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">attach_money</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">累計課程數</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                    24 <span className="text-lg font-medium text-text-sub">堂</span>
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full flex items-center">
                      <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                      4
                    </span>
                    <span className="text-xs text-text-sub ml-1">較上月</span>
                  </div>
                </div>
                <div className="size-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">school</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">平均每堂收入</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">NT$ 5,250</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-1.5 py-0.5 rounded-full flex items-center">
                      <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_downward</span>
                      2.1%
                    </span>
                    <span className="text-xs text-text-sub ml-1">較上月</span>
                  </div>
                </div>
                <div className="size-10 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">活躍學生數</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                    18 <span className="text-lg font-medium text-text-sub">人</span>
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full flex items-center">
                      <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                      2
                    </span>
                    <span className="text-xs text-text-sub ml-1">較上月</span>
                  </div>
                </div>
                <div className="size-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">group</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">bar_chart</span>
                  月營收趨勢
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-text-sub hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">近6個月</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">本年度</button>
                </div>
              </div>
              <div className="h-64 w-full flex items-end justify-between gap-4 px-2">
                {/* May */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">6.5萬</div>
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group" style={{ height: '40%' }}>
                    <div className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.1s' }}></div>
                  </div>
                  <div className="text-xs text-text-sub">5月</div>
                </div>
                {/* June */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">8.2萬</div>
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group" style={{ height: '55%' }}>
                    <div className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.2s' }}></div>
                  </div>
                  <div className="text-xs text-text-sub">6月</div>
                </div>
                {/* July */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">7.8萬</div>
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group" style={{ height: '50%' }}>
                    <div className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.3s' }}></div>
                  </div>
                  <div className="text-xs text-text-sub">7月</div>
                </div>
                {/* August */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">10.5萬</div>
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group" style={{ height: '75%' }}>
                    <div className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.4s' }}></div>
                  </div>
                  <div className="text-xs text-text-sub">8月</div>
                </div>
                {/* September */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-0 group-hover:opacity-100 transition-opacity font-medium">11.2萬</div>
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative group" style={{ height: '85%' }}>
                    <div className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.5s' }}></div>
                  </div>
                  <div className="text-xs text-text-sub">9月</div>
                </div>
                {/* October */}
                <div className="flex flex-col items-center gap-2 group w-full">
                  <div className="text-xs text-text-sub opacity-100 font-bold text-primary">12.6萬</div>
                  <div className="w-full bg-primary/30 hover:bg-primary/50 rounded-t-sm transition-all relative group shadow-[0_0_15px_rgba(19,182,236,0.3)]" style={{ height: '100%' }}>
                    <div className="absolute bottom-0 w-full bg-primary rounded-t-sm" style={{ height: '0%', animation: 'grow 1s ease-out forwards 0.6s' }}></div>
                  </div>
                  <div className="text-xs font-bold text-primary">10月</div>
                </div>
              </div>
              <style jsx>{`
                @keyframes grow { to { height: 100%; } }
              `}</style>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card p-6 flex flex-col">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-500">pie_chart</span>
                課程收入占比
              </h3>
              <div className="flex-1 flex flex-col justify-center items-center relative">
                <div className="size-48 rounded-full border-[16px] border-l-primary border-t-purple-500 border-r-amber-400 border-b-emerald-400 relative rotate-45 hover:scale-105 transition-transform">
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xs text-text-sub">總營收</span>
                    <span className="text-xl font-bold text-slate-800 dark:text-white">100%</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-primary"></span>
                    <span className="text-slate-600 dark:text-gray-300">國考衝刺班</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-purple-500"></span>
                    <span className="text-slate-600 dark:text-gray-300">局部活動假牙</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-amber-400"></span>
                    <span className="text-slate-600 dark:text-gray-300">全口假牙入門</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">20%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-600 dark:text-gray-300">形態學基礎</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Details Table */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-slate-50/30 dark:bg-slate-800/30">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-text-sub">list_alt</span>
                營收明細列表
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <div className="relative group w-full sm:w-64">
                  <input 
                    className="pl-9 pr-4 py-2 w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                    placeholder="搜尋學生、課程..." 
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">search</span>
                </div>
                <select className="pl-3 pr-8 py-2 w-full sm:w-auto rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none appearance-none cursor-pointer text-slate-700 dark:text-gray-200">
                  <option>所有課程類型</option>
                  <option>國考衝刺班</option>
                  <option>局部活動假牙</option>
                  <option>全口假牙入門</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-text-sub uppercase border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-6 py-4 font-semibold">入帳日期</th>
                    <th className="px-6 py-4 font-semibold">學生姓名</th>
                    <th className="px-6 py-4 font-semibold">課程名稱</th>
                    <th className="px-6 py-4 font-semibold">課程類型</th>
                    <th className="px-6 py-4 font-semibold text-right">實收金額</th>
                    <th className="px-6 py-4 font-semibold text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark bg-white dark:bg-surface-dark">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-text-sub">2023-10-28</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold">陳</div>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">陳小美</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">全口假牙雕刻入門</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-medium dark:bg-amber-900/30 dark:text-amber-400">入門課程</span></td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">NT$ 8,000</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-text-sub hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-text-sub">2023-10-25</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">王</div>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">王小明</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">牙體技術師國考衝刺班</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-md bg-primary/10 text-primary-dark text-xs font-medium dark:text-primary">進階衝刺</span></td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">NT$ 15,000</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-text-sub hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-text-sub">2023-10-22</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">林</div>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">林大山</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">進階局部活動假牙</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-medium dark:bg-purple-900/30 dark:text-purple-400">專項技能</span></td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">NT$ 12,000</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-text-sub hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-text-sub">2023-10-15</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-xs font-bold">張</div>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">張雅婷</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">牙體形態學基礎</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium dark:bg-emerald-900/30 dark:text-emerald-400">基礎理論</span></td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">NT$ 6,000</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-text-sub hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border-light dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-text-sub">顯示最新 4 筆，共 24 筆交易</span>
              <div className="flex items-center gap-2">
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors" disabled>
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
                <button className="size-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">2</button>
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
