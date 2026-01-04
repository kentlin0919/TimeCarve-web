import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#f6f8f8] dark:bg-[#101d22] font-display antialiased transition-colors duration-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 lg:px-12 w-full max-w-[1280px] mx-auto z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-xl bg-[#13b6ec]/10 text-[#13b6ec]">
            {/* Streamlined Sky Blue Icon */}
            <span className="material-symbols-outlined text-3xl">
              water_drop
            </span>
          </div>
          <h1 className="text-[#111618] dark:text-white text-xl font-bold tracking-tight">
            TimeCarve 刻時
          </h1>
        </Link>
        {/* Optional Top Right Action */}
        <Link
          href="mailto:support@timecarve.com" // 假設的聯絡連結
          className="hidden md:flex text-sm font-medium text-[#637588] hover:text-[#13b6ec] dark:text-slate-400 dark:hover:text-[#13b6ec] transition-colors"
        >
          需要協助？
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative">
        {/* Decorative Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#13b6ec]/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#13b6ec]/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="flex flex-col items-center max-w-[640px] w-full z-10">
          {/* Illustration Area */}
          <div className="relative w-full max-w-[400px] aspect-[4/3] mb-8 animate-float">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-3xl"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDj056gMXnmCUGEHxBDUqpGLhtcpA68GMUoc9hYBDWRtX3-y5OxaDwhOwQBrP6AIEuxxmRyxvVOc-8mTEjjm6LKXS1XjtUC9YaoqCRQTL-BIub2bF4FU6BD5QjMZWeskL-S0YfipOhMGzzchjpEOTsUNNJxhIFs4got-6x7mJYMoV1CQ_rStUXKnhKIYVJcC-OuJbtRRmh3slcMpPujRX-FvLyyuswOIL48KGvVUOoJonWKA50BfR7HVTBJw9Ekqb6PAGX_-J9xcog')",
              }}
            ></div>
            {/* Overlay gradient to blend image if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f6f8f8] dark:from-[#101d22] to-transparent opacity-20 rounded-3xl"></div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center gap-4 mb-10 px-4">
            <h2 className="text-8xl md:text-9xl font-bold text-[#13b6ec]/20 dark:text-[#13b6ec]/10 leading-none select-none">
              404
            </h2>
            <h3 className="text-[#111618] dark:text-white text-2xl md:text-3xl font-bold leading-tight">
              頁面未找到
            </h3>
            <p className="text-[#637588] dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-[480px]">
              就像一件未完成的藝術品，這個頁面似乎還在打磨中。
              <br className="hidden md:block" />
              您似乎走失了，別擔心，我們可以幫您找回來！
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[480px] justify-center">
            {/* Primary Button */}
            <Link
              href="/"
              className="w-full sm:w-auto min-w-[140px] h-12 px-6 rounded-xl bg-[#13b6ec] hover:bg-[#0ea5d9] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#13b6ec]/20 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              返回首頁
            </Link>

            {/* Secondary Button */}
            <Link
              href="/courses"
              className="w-full sm:w-auto min-w-[140px] h-12 px-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#13b6ec] dark:hover:border-[#13b6ec] text-[#111618] dark:text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[20px] text-[#13b6ec] group-hover:scale-110 transition-transform">
                grid_view
              </span>
              查看所有課程
            </Link>
          </div>

          {/* Tertiary Link */}
          <div className="mt-8">
            <Link
              href="mailto:support@timecarve.com"
              className="text-[#637588] hover:text-[#13b6ec] dark:text-slate-400 dark:hover:text-[#13b6ec] text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
              聯絡我們
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-400 dark:text-slate-600">
        <p>© 2024 TimeCarve 刻時. All rights reserved.</p>
      </footer>
    </div>
  );
}
