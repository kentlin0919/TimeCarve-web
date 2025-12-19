import Link from 'next/link';

export default function AddTeacherPage() {
  return (
    <div className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-[1000px] mx-auto w-full">
      <div className="mb-6">
        <Link
          href="/admin/teachers"
          className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-sky-500 transition-colors group"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="text-sm font-bold">返回教師列表</span>
        </Link>
      </div>

      <header className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          新增教師
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          填寫以下資訊以為牙牙學語系統建立新的教師帳號。
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-10">
        <form className="flex flex-col gap-8">
          {/* Basic Information */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-sky-500"></span>
              基本資料
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  教師姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/60 transition-all outline-none"
                  placeholder="請輸入真實姓名"
                  required
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  電子郵件 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/60 transition-all outline-none"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  初始密碼 <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/60 transition-all outline-none"
                    placeholder="••••••••"
                    required
                    type="password"
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility_off
                    </span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                  密碼長度須至少 8 碼，包含英文與數字。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  確認密碼 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/60 transition-all outline-none"
                  placeholder="請再次輸入密碼"
                  required
                  type="password"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Permissions and Plans */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-sky-500"></span>
              權限與方案
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  維護費方案 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full h-12 px-4 pr-10 appearance-none rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white cursor-pointer outline-none transition-all"
                    defaultValue="pro"
                  >
                    <option value="basic">基礎版 (Basic)</option>
                    <option value="pro">專業版 (Pro)</option>
                    <option value="enterprise">企業版 (Enterprise)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                  不同方案將影響教師可開設的課程數量上限。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  初始狀態
                </label>
                <div className="flex items-center gap-4 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 border-2 border-transparent">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      className="size-4 text-sky-500 focus:ring-sky-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      name="status"
                      type="radio"
                      value="active"
                      defaultChecked
                    />
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      啟用帳號
                    </span>
                  </label>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      className="size-4 text-gray-400 focus:ring-gray-400 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      name="status"
                      type="radio"
                      value="disabled"
                    />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      暫時禁用
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 mt-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              className="h-12 px-6 rounded-xl border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold transition-colors"
              type="button"
            >
              取消
            </button>
            <button
              className="h-12 px-8 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px]">
                check
              </span>
              <span>確認新增</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
