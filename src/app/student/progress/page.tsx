'use client';

import React from 'react';

export default function StudentProgressPage() {
  return (
    <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
      {/* Mobile Header (Hidden on desktop, usually handled by layout/AppShell but kept for completeness if needed) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-1.5 rounded-lg text-teal-600 dark:text-teal-400">
            <span className="material-symbols-outlined text-[20px]">dentistry</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">牙雕家教</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="container mx-auto max-w-[1280px] p-6 md:p-10 flex flex-col gap-8 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-display font-black leading-tight tracking-tight mb-2">
              學習進度追蹤
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              檢視您的學習歷程，一步步精通牙體雕刻藝術。
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">連續學習</span>
                <span className="font-black text-slate-700 dark:text-slate-200">12 天</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Progress Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-soft flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
            
            {/* Circular Progress */}
            <div className="relative size-40 flex-shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path className="text-teal-500 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="45, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800 dark:text-white">45<span className="text-base font-bold text-slate-400">%</span></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">總體進度</span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left z-10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">做得好，小美！ 🎉</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                您已經完成了將近一半的課程內容。目前的學習速度保持得非常穩定，按照這個進度，預計在 <span className="text-teal-500 font-bold">3 週內</span> 完成第二階段課程。
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">已完成</span>
                  <span className="text-lg font-black text-slate-700 dark:text-slate-200">12 <span className="text-xs font-normal text-slate-400">堂課</span></span>
                </div>
                <div className="px-4 py-2 bg-teal-500/5 dark:bg-teal-500/10 rounded-xl border border-teal-500/10 flex flex-col">
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-bold mb-0.5">進行中</span>
                  <span className="text-lg font-black text-teal-600 dark:text-teal-400">3 <span className="text-xs font-normal text-teal-600/70 dark:text-teal-400/70">主題</span></span>
                </div>
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col">
                  <span className="text-xs text-slate-400 font-bold mb-0.5">待解鎖</span>
                  <span className="text-lg font-black text-slate-700 dark:text-slate-200">8 <span className="text-xs font-normal text-slate-400">章節</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Card */}
          <div className="bg-gradient-to-br from-slate-800 to-black dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div>
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <span className="material-symbols-outlined text-[20px]">flag</span>
                <span className="text-xs font-bold uppercase tracking-wider">下一個里程碑</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">完成臼齒雕刻</h3>
              <p className="text-sm text-slate-300 mb-6">掌握複雜的咬合面形態，是通往高階牙雕的關鍵。</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>目標進度</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-400 to-green-400 h-2 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: '80%' }}></div>
              </div>
              <button className="w-full mt-4 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                繼續學習
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Map */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-500">alt_route</span>
            課程地圖
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-[35px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

            {/* Stage 1: Completed */}
            <div className="relative pl-20 md:pl-24 mb-10 group">
              <div className="absolute left-0 top-0 md:left-2 flex flex-col items-center">
                <div className="size-14 md:size-16 rounded-full bg-green-50 dark:bg-green-900/20 border-4 border-green-500 text-green-600 flex items-center justify-center shadow-sm z-10 group-hover:scale-110 trans-all transition-transform duration-300">
                  <span className="material-symbols-outlined text-[28px] md:text-[32px]">check</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm opacity-80 hover:opacity-100 trans-all transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-md">第一階段</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">已完成</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">牙體形態學概論</h3>
                  </div>
                  <button className="text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                    <span className="text-sm font-medium">牙齒解剖名詞</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                    <span className="text-sm font-medium">雕刻工具介紹</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                    <span className="text-sm font-medium">基礎蠟塊整平</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2: In Progress (Active) */}
            <div className="relative pl-20 md:pl-24 mb-10">
              <div className="absolute left-0 top-0 md:left-2 flex flex-col items-center">
                <div className="size-14 md:size-16 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.4)] z-10 ring-4 ring-white dark:ring-background-dark">
                  <span className="material-symbols-outlined text-[28px] md:text-[32px] animate-pulse">edit_square</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 border-2 border-teal-500/20 rounded-2xl p-6 shadow-lg shadow-teal-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold px-2 py-0.5 rounded-md">第二階段</span>
                      <span className="text-xs font-bold text-teal-500 uppercase tracking-wide animate-pulse">進行中</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">單齒形態雕刻實作</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">重點在於掌握各個牙位的特徵與比例控制。</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 min-w-[120px]">
                    <span className="text-3xl font-black text-teal-500">60%</span>
                    <span className="text-xs text-slate-400 font-bold">階段完成度</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Lesson Item: Completed */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 opacity-70">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">正中門齒 (Central Incisor)</h4>
                        <p className="text-xs text-slate-500">已通過考核 - 評分 A</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>

                  {/* Lesson Item: Active */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-teal-500/30 shadow-sm ring-1 ring-teal-500/10">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="bg-teal-500 text-white p-2 rounded-lg shadow-glow shadow-teal-500/30">
                        <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">犬齒 (Canine)</h4>
                        <p className="text-xs text-teal-500 font-medium">當前課程 - 剩餘 2 小時</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="flex-1 sm:w-32 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-md shadow-teal-500/20">
                        繼續
                      </button>
                    </div>
                  </div>

                  {/* Lesson Item: Locked */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-400 dark:text-slate-500 text-sm">第一小臼齒 (Premolar)</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-600">需先完成犬齒課程</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3: Locked */}
            <div className="relative pl-20 md:pl-24 opacity-60 hover:opacity-100 trans-all transition-opacity duration-300 group cursor-not-allowed">
              <div className="absolute left-0 top-0 md:left-2 flex flex-col items-center">
                <div className="size-14 md:size-16 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-600 text-slate-400 flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-[28px] md:text-[32px]">lock</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded-md">第三階段</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">鎖定中</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400">全口假牙排列與調整</h3>
                    <p className="text-slate-400 text-sm mt-1">進階咬合調整與美觀排列技巧。</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 text-[40px] opacity-20">grid_on</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
