export default function StudentDashboard() {
  return (
    <div className="container mx-auto max-w-[1280px] p-6 md:p-10 flex flex-col gap-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
            早安，小美{' '}
            <span className="inline-block animate-wave origin-bottom-right">
              👋
            </span>
          </h1>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm md:text-base">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span>
              距離{' '}
              <span className="font-bold text-slate-700 dark:text-slate-200">
                牙體形態學概論
              </span>{' '}
              還有{' '}
              <span className="text-teal-600 dark:text-teal-400 font-bold">
                2 天
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="hidden sm:inline">個人設定</span>
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              add_circle
            </span>
            預約新課程
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
        <div className="xl:col-span-3 flex flex-col gap-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] opacity-5 transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[120px]">
                  check_circle
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-green-500">
                  check_circle
                </span>
                已完成課程
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                  3
                </span>
                <span className="text-sm font-medium text-slate-400">堂</span>
              </div>
            </div>
            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] opacity-5 transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[120px]">
                  hourglass_top
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-teal-500">
                  hourglass_top
                </span>
                剩餘點數
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                  7
                </span>
                <span className="text-sm font-medium text-slate-400">堂</span>
              </div>
            </div>
            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] opacity-5 transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[120px]">
                  timer
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-orange-400">
                  timer
                </span>
                本月練習時數
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                  12
                </span>
                <span className="text-sm font-medium text-slate-400">小時</span>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-slate-800 dark:text-white text-lg font-bold">
                  學習路徑：全口假牙專修
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  按部就班，從基礎到精通
                </p>
              </div>
              <span className="text-teal-500 font-bold text-lg">30%</span>
            </div>
            <div className="relative pt-4 pb-2 overflow-x-auto">
              <div className="min-w-[600px] flex items-center justify-between relative z-0">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
                <div className="absolute top-5 left-0 w-[35%] h-1 bg-gradient-to-r from-teal-500 to-teal-600 -z-10 rounded-full"></div>

                <div className="flex flex-col items-center gap-3 w-32 group cursor-pointer">
                  <div className="size-10 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 ring-4 ring-white dark:ring-slate-800 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">
                      check
                    </span>
                  </div>
                  <div className="text-center group-hover:-translate-y-1 transition-transform">
                    <p className="font-bold text-slate-800 dark:text-white text-sm">
                      基礎蠟型
                    </p>
                    <p className="text-xs text-green-500 font-medium">已完成</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 w-32 group cursor-pointer">
                  <div className="size-10 rounded-full bg-white dark:bg-slate-800 border-2 border-teal-500 text-teal-500 flex items-center justify-center ring-4 ring-white dark:ring-slate-800 shadow-sm relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-20 animate-ping"></span>
                    <span className="material-symbols-outlined text-[20px]">
                      edit_square
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                      單齒形態
                    </p>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium bg-teal-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                      進行中
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 w-32 opacity-60">
                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center ring-4 ring-white dark:ring-slate-800">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">
                      咬合調整
                    </p>
                    <p className="text-xs text-slate-400">待解鎖</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 w-32 opacity-60">
                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center ring-4 ring-white dark:ring-slate-800">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">
                      最終拋光
                    </p>
                    <p className="text-xs text-slate-400">待解鎖</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-slate-800 dark:text-white text-xl font-bold">
                預約記錄
              </h2>
              <div className="flex gap-2 text-sm bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md shadow-sm text-slate-800 dark:text-white font-medium">
                  即將到來
                </button>
                <button className="px-3 py-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                  歷史紀錄
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between hover:border-teal-500/30 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-teal-500/10 rounded-xl min-w-[60px] h-[60px] text-teal-600 dark:text-teal-400">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        10月
                      </span>
                      <span className="text-2xl font-black leading-none">
                        26
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          一對一
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>{' '}
                          14:00 - 16:00
                        </span>
                      </div>
                      <h3 className="text-slate-800 dark:text-white font-bold text-base line-clamp-1 group-hover:text-teal-500 transition-colors">
                        上顎中門齒形態雕刻
                      </h3>
                      <p className="text-slate-500 text-sm mt-0.5">
                        教室 A03 • 林醫師
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{' '}
                    已確認
                  </span>
                  <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-500 transition-colors">
                    查看詳情 →
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between hover:border-orange-400/30 hover:shadow-lg transition-all opacity-90">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl min-w-[60px] h-[60px] text-slate-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        11月
                      </span>
                      <span className="text-2xl font-black leading-none">
                        02
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          小組課
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>{' '}
                          10:00 - 12:00
                        </span>
                      </div>
                      <h3 className="text-slate-800 dark:text-white font-bold text-base line-clamp-1">
                        臼齒蠟型堆塑基礎
                      </h3>
                      <p className="text-slate-500 text-sm mt-0.5">
                        教室 B01 • 張技師
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">
                      pending
                    </span>{' '}
                    待確認
                  </span>
                  <button className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                    修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Current Plan */}
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-slate-800 dark:text-white text-xl font-bold">
                當前方案
              </h2>
              <button className="text-teal-500 hover:text-teal-600 text-sm font-medium">
                變更
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full group">
              <div
                className="h-40 bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    進階班
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-bold leading-tight shadow-black drop-shadow-md">
                    牙體雕刻工作坊
                  </h3>
                  <p className="text-slate-200 text-xs mt-1 font-medium">
                    含 10 堂實作課 + 教材包
                  </p>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">訂閱狀態</span>
                    <span className="flex items-center gap-1.5 text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{' '}
                      啟用中
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">有效期限</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      2024/12/31
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">總進度</span>
                      <span className="text-teal-500 font-bold">30%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full shadow-lg shadow-teal-500/30"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-auto py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  查看方案詳情
                </button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-black rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <h3 className="font-bold text-lg mb-1 relative z-10">個人設定</h3>
            <p className="text-slate-400 text-sm mb-4 relative z-10">
              管理您的帳戶、密碼與通知偏好。
            </p>
            <div className="space-y-2 relative z-10">
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-teal-500">
                    person
                  </span>
                  <span className="text-sm font-medium">編輯個人資料</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  chevron_right
                </span>
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-teal-500">
                    notifications
                  </span>
                  <span className="text-sm font-medium">通知設定</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
