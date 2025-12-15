'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#111618] dark:text-gray-100 antialiased min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between border-b border-solid border-[#f0f3f4] dark:border-gray-800 bg-white dark:bg-[#152329] px-6 lg:px-40 py-4 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 text-[#111618] dark:text-white cursor-pointer select-none">
          <div className="text-primary">
            <span className="material-symbols-outlined text-3xl">dentistry</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">假牙雕刻家教課程</h2>
        </Link>
        <div className="hidden sm:flex gap-4">
          <Link href="/courses" className="text-sm font-medium text-[#617f89] dark:text-gray-400 hover:text-primary transition-colors">課程介紹</Link>
          <Link href="/teachers" className="text-sm font-medium text-[#617f89] dark:text-gray-400 hover:text-primary transition-colors">導師團隊</Link>
          <Link href="#" className="text-sm font-medium text-[#617f89] dark:text-gray-400 hover:text-primary transition-colors">聯絡我們</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-5xl flex rounded-2xl shadow-xl bg-white dark:bg-[#152329] overflow-hidden border border-gray-100 dark:border-gray-800 relative z-10">
          {/* Left Side: Image / Brand */}
          <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-900 relative flex-col justify-end p-12">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-cover bg-center opacity-90 dark:opacity-60 absolute inset-0" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwTmPLbSh_cQtJ9sqLRYLiPRZYUVG9p2wLhfqJnKJEONJ_ATvKjECkBeKP9r8SO0GYdLwiJU-Zj4-W1IyJsItzTz7WnFZoGCsKl-3QJGq4Cic1dE2ucw5CDNyczr3m7S-usKCYCTmC3inWNuw9h_nGtQcnKK88188caZJkRyFcBoFaH_eRx-fsWyt9LzWnfO4xllnp1ISySD2_GohCyigpyriCeR_O5VWj1NpDI9eebyEaZbZFXLixjVRKXorOj1NvXLd2M7bCcmU")' }}
                aria-label="Dental tools and models representing professional denture carving"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative z-10 text-white">
              <h3 className="text-3xl font-bold mb-4">開啟您的專業技能之旅</h3>
              <p className="text-gray-200 text-lg leading-relaxed">加入我們的課程，與專業導師一同精進假牙雕刻技術，為未來的牙體技術職涯奠定堅實基礎。</p>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-[#111618] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] mb-2">建立您的帳戶</h1>
              <p className="text-[#617f89] dark:text-gray-400 text-base font-normal">填寫下方資訊以開始您的假牙雕刻學習旅程。</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-[#111618] dark:text-gray-200 mb-1.5" htmlFor="name">姓名</label>
                <div className="relative">
                  <input className="form-input block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2d36] text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm h-12 px-4 focus:shadow-[0_0_0_4px_rgba(19,182,236,0.1)] transition-all duration-200 ease-in-out" id="name" name="name" placeholder="請輸入您的全名" type="text" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-valid:opacity-100">
                    {/* Check icon placeholder for valid state */}
                  </div>
                </div>
              </div>

              {/* Email Field with Validation State Example */}
              <div>
                <label className="block text-sm font-medium text-[#111618] dark:text-gray-200 mb-1.5" htmlFor="email">電子郵件</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  <input className="form-input block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2d36] text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm h-12 focus:shadow-[0_0_0_4px_rgba(19,182,236,0.1)] transition-all duration-200 ease-in-out" id="email" name="email" placeholder="name@example.com" type="email" />
                </div>
                {/* Helper Text */}
                <p className="mt-1 text-xs text-[#617f89] dark:text-gray-500">我們將發送驗證信至此信箱。</p>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-[#111618] dark:text-gray-200 mb-1.5" htmlFor="password">密碼</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </span>
                  <input className="form-input block w-full pl-10 pr-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2d36] text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm h-12 focus:shadow-[0_0_0_4px_rgba(19,182,236,0.1)] transition-all duration-200 ease-in-out" id="password" name="password" placeholder="設定密碼 (至少8個字元)" type="password" />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
                {/* Password Strength Indicator */}
                <div className="mt-2 flex gap-1 h-1">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-yellow-400"></div>
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-500">密碼強度：中等</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-[#111618] dark:text-gray-200 mb-1.5" htmlFor="confirm-password">確認密碼</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                  </span>
                  <input className="form-input block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2d36] text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm h-12 focus:shadow-[0_0_0_4px_rgba(19,182,236,0.1)] transition-all duration-200 ease-in-out" id="confirm-password" name="confirm-password" placeholder="再次輸入密碼" type="password" />
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-[#1e2d36] dark:border-gray-600" id="terms" name="terms" type="checkbox" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700 dark:text-gray-300" htmlFor="terms">
                    我已閱讀並同意 <Link className="text-primary hover:text-cyan-600 hover:underline" href="/legal/terms">使用者條款</Link> 與 <Link className="text-primary hover:text-cyan-600 hover:underline" href="/legal/privacy">隱私政策</Link>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                立即註冊
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#152329] text-gray-500">或</span>
                </div>
              </div>

              {/* Social Login (Optional) */}
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-[#1e2d36] text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors" type="button">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                使用 Google 帳號繼續
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                已經有帳號了嗎？ 
                <Link className="font-medium text-primary hover:text-cyan-500 hover:underline" href="/auth/login">在此登入</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-[#152329] border-t border-[#f0f3f4] dark:border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-[#617f89] dark:text-gray-500">
          <p>© 2024 假牙雕刻家教課程. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
