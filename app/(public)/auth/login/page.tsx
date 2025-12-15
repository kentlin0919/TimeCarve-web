'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111618] dark:text-white font-display antialiased selection:bg-primary/20">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] dark:border-b-gray-800 px-6 lg:px-10 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#111618] dark:text-white">
          <Link className="size-8 text-primary block" href="/">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </Link>
          <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">牙體雕刻家教中心</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden lg:flex items-center gap-9">
            <Link className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="/">首頁</Link>
            <Link className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="/courses">課程列表</Link>
            <Link className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="/teachers">師資介紹</Link>
            <Link className="text-[#111618] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">聯絡我們</Link>
          </div>
          <div className="flex gap-4 items-center">
            <button className="lg:hidden text-[#111618] dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-background-light to-blue-50/50 dark:from-background-dark dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100 dark:border-gray-700/50 overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[640px]">
          <div className="hidden md:flex flex-col justify-between w-1/2 bg-cover bg-center relative p-12 text-white" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHhqJqS-VgLptXAcCrNziettbp0-KH-cAC-oY7-qxcwZYspiupMFZMYTZmQSJqGYokazzYf31feFqozjVqQF5HyHuvKkZGz64lFzSWHrbd5eSVqsgr25QOyYUyD0QmGQ68tOAX8JZeAFTu72ATHh7m-IF1bgfrMZBT5moP5QMWBSoWQVf4HJYudJAFQCKV6GS2gLZIw7EVw-bFeQ1EAfPoglVwm-NI69IRGWk7vQmqDnv-qp6kGs1pYiMiyOzxQHuaWhsmcU1SjQE")' }}>
            <div className="absolute inset-0 bg-primary/80 mix-blend-multiply opacity-90 dark:opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-12">
                <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                  <span className="material-symbols-outlined text-3xl">brush</span>
                </div>
                <h2 className="text-4xl font-bold mb-4 leading-tight tracking-tight">精雕細琢<br />成就非凡職人</h2>
                <p className="text-lg text-white/90 font-light leading-relaxed max-w-sm">
                  專為女性設計的牙體技術雕刻課程，在舒適的環境中，開始您的專業學習之旅。
                </p>
              </div>
              <div className="mt-auto space-y-6">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  </div>
                  <p className="text-sm italic text-white/95">{`"老師非常有耐心，小班制的教學讓我能真正掌握到雕刻的訣竅，推薦給所有想考國考的學妹！"`}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">L</div>
                    <span className="text-xs font-medium opacity-80">林曉梅 - 112年國考及格</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 lg:p-12 relative flex flex-col justify-center bg-white dark:bg-gray-800">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Note: defaultChecked in React replaces checked attribute */}
              <input className="peer/login hidden" id="tab-login" name="auth-tabs" type="radio" defaultChecked />
              <input className="peer/register hidden" id="tab-register" name="auth-tabs" type="radio" />
              <div className="flex justify-center mb-8 gap-6 border-b border-slate-100 dark:border-gray-700 relative">
                <label className="cursor-pointer pb-3 text-lg font-bold text-slate-400 dark:text-gray-500 transition-all hover:text-slate-600 dark:hover:text-gray-300 peer-checked/login:text-primary dark:peer-checked/login:text-primary peer-checked/login:border-b-2 peer-checked/login:border-primary peer-checked/login:-mb-[2px]" htmlFor="tab-login">
                  學員登入
                </label>
                <label className="cursor-pointer pb-3 text-lg font-bold text-slate-400 dark:text-gray-500 transition-all hover:text-slate-600 dark:hover:text-gray-300 peer-checked/register:text-primary dark:peer-checked/register:text-primary peer-checked/register:border-b-2 peer-checked/register:border-primary peer-checked/register:-mb-[2px]" htmlFor="tab-register">
                  註冊帳號
                </label>
              </div>
              <div className="hidden peer-checked/login:block animate-[fadeIn_0.3s_ease-out]">
                <form className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="login-email">電子郵件</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">mail</span>
                      <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="login-email" placeholder="name@example.com" type="email" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="login-password">密碼</label>
                      <Link className="text-xs font-medium text-primary hover:text-primary-dark transition-colors" href="/auth/forgot-password">忘記密碼？</Link>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">lock</span>
                      <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="login-password" placeholder="••••••••" type="password" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary" id="remember" type="checkbox" />
                    <label className="text-sm text-slate-600 dark:text-gray-400" htmlFor="remember">記住我的登入資訊</label>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] flex items-center justify-center gap-2">
                    <span>立即登入</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-gray-700"></div></div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-gray-800 px-2 text-slate-400">或使用以下方式登入</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-gray-600 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-slate-700 dark:text-gray-300">
                      <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuActoeFgeACj5j868KbNSODvUCcGssflFs-JuMbBA6Z9_5GmYHHSmhbVJvH62yPMnq0maPe7jF-MqhlLYWHLad5nueGKj7b5RrnLEkF93gY6ug2cg6JfbY-jv470WnHyi-S0q8bTwoyF6EkR9bcT5XOzHJOju8jmaCXr_1p0012XkfHDpyAvT0bYqVxIf6eIAU8wX1ljJ8WeMW7Ok5FT81l1Z001OJE6tw8iYd8L-s6Bw3NG05LqqkzFDpAAAVGdPBiqIuxplawacY" />
                      <span className="hidden sm:inline">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-gray-600 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-slate-700 dark:text-gray-300">
                      <img alt="Facebook" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_03tU9o1bP6_58eLpazAdhvnX6O--ihoUf_LKHLZTp2XzLIWVDIGdofwUaaksnVd7ArVaCNn2yxiPz0wF96A-82vNP498VrC-dl75tomPDJT1R3OxU0IbLZMqgA33j-vBTZFNweQZPhI_rhqeU8GQg3QRAFeNqD6gcYewyAzHEpXqVdKcTspsztXHS8vIklalZCmYnZQcWPBW3Ue6fcTlqBjtv8qISsb8O13_oGDazHJdBBbl45Kt-ryyiEGYAu5_8zYwZtKq0YU" />
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="hidden peer-checked/register:block animate-[fadeIn_0.3s_ease-out]">
                <form className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="reg-name">姓名</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">person</span>
                      <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="reg-name" placeholder="您的真實姓名" type="text" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="reg-email">電子郵件</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">mail</span>
                      <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="reg-email" placeholder="name@example.com" type="email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="reg-password">設定密碼</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">lock</span>
                        <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="reg-password" placeholder="••••••" type="password" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-gray-300" htmlFor="reg-confirm">確認密碼</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">lock_reset</span>
                        <input className="block w-full rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all text-sm font-medium" id="reg-confirm" placeholder="••••••" type="password" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input className="mt-1 rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary" id="terms" type="checkbox" />
                    <label className="text-xs text-slate-600 dark:text-gray-400 leading-tight" htmlFor="terms">
                      我同意 <a className="text-primary hover:underline" href="/legal/terms">服務條款</a> 與 <a className="text-primary hover:underline" href="/legal/privacy">隱私權政策</a>
                    </label>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] mt-4">
                    建立帳戶
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-white dark:bg-gray-900 border-t border-[#f0f3f4] dark:border-gray-800 py-10 px-6 lg:px-40 mt-auto hidden">
           {/* Note: I hid this extra footer because the main page probably already has one or uses layout footer. 
               However, the provided design has a specific simplified footer for the login page.
               If I use PublicLayout, it might duplication. But PublicLayout (modified earlier) is just empty shell now.
               Wait, earlier I made PublicLayout an empty shell. So this footer IS needed. 
               But the provided HTML structure nests this footer inside the body. 
               Let's keep it but check if it conflicts with visual design. 
               Actually the provided HTML puts it at bottom properly.
           */}
           {/* Re-evaluating: The provided HTML has a footer at the bottom. 
               My implemented PublicLayout is just {children}. 
               So this LoginPage component is responsible for the full page including footer.
               But wait, the design shows the footer OUTSIDE the main centering div.
               Let's adapt.
           */}
        </footer>
      </div>
       <footer className="bg-white dark:bg-gray-900 border-t border-[#f0f3f4] dark:border-gray-800 py-10 px-6 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path></svg>
            </div>
            <p className="text-[#617f89] dark:text-gray-500 text-sm">© 2023 牙體雕刻家教中心. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="/legal/privacy">隱私權政策</Link>
            <Link className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="/legal/terms">服務條款</Link>
            <Link className="text-[#617f89] dark:text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">常見問題</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
