"use client";

import React, { useEffect } from "react";
import Link from "next/link";
// import { cn } from "@/lib/utils"; // Assuming cn utility exists, usually in lib/utils. If not, I'll use template literals but cn is standard in modern Next.js/Tailwind setups. I'll stick to standard string concatenation or simple template literals to be safe if I don't see utils.
// Actually, looking at previous file reads, I don't see lib/utils explicitly confirmed, but it's very common.
// Safest is to just use standard className strings as per the user's provided HTML.

// Icons
// The user's design used Google Fonts Material Icons.
// I will use text-based Material Symbols (if font is loaded) or SVG icons to be safe and self-contained if possible.
// The existing file used specific material-symbols-outlined spans. I will continue to use that pattern as it seems established in the project.

export default function TermsPage() {
  // Simple smooth scroll handler for the sidebar
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 min-h-screen">
      {/* Nav is usually handled by the layout, but the user provided a full HTML page. 
                I will assume the layout wraps this, but checking the file path `app/(public)/legal/terms/page.tsx` 
                suggests it shares a layout with other public pages. 
                The user's HTML included a specific Nav. 
                Since this is a specific page request, I will adhere to the provided design's inner content structure 
                but I should be careful about double navs if `app/(public)/layout.tsx` already has one.
                However, looking at the previous file content, it had its own header.
                I will implement the HEADER from the design as the page header, and the main content.
            */}

      {/* Hero Header */}
      <header className="bg-slate-50 dark:bg-slate-950 px-6 py-16 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-sky-500 transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-sm font-bold">返回首頁</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            使用者條款
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl text-lg">
            歡迎使用 TimeCarve
            刻時。本條款旨在保障您的權益，並規範您與本平台之間的權利義務。本條款依據中華民國《消費者保護法》及《網際網路教學服務定型化契約應記載及不得記載事項》制定。
          </p>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            最後更新日期：2025年12月24日
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="md:w-1/4 flex-shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden ring-1 ring-slate-900/5">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
                目錄導覽
              </h3>
            </div>
            <nav className="flex flex-col text-sm py-2">
              <a
                onClick={(e) => scrollToSection(e, "section-1")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-1"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  description
                </span>
                1. 認知與接受條款
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-2")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-2"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  person_check
                </span>
                2. 會員註冊與義務
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-3")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-3"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  payments
                </span>
                3. 付款與退費政策
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-4")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-4"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  copyright
                </span>
                4. 智慧財產權
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-5")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-5"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  block
                </span>
                5. 暫停與終止服務
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-6")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-6"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  gavel
                </span>
                6. 準據法與管轄
              </a>
            </nav>
          </div>
        </aside>

        <article className="md:w-3/4 space-y-12">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">01.</span>{" "}
              認知與接受條款
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                TimeCarve
                刻時（以下簡稱「本平台」）係依據本使用者條款提供服務。當您註冊完成或開始使用本服務時，即表示您已閱讀、瞭解並同意接受本條款之所有內容。
              </p>
              <p>
                若您為未滿 18
                歲之法律上限制行為能力人，應由您的法定代理人（如家長或監護人）閱讀、瞭解並同意本條款之所有內容及其後修改變更後，方得註冊及使用本服務。當您使用或繼續使用本服務時，即推定您的法定代理人已閱讀、瞭解並同意接受本條款。
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">02.</span>{" "}
              會員註冊與義務
            </h2>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-sky-500">
                    check_circle
                  </span>
                </div>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    真實資料：
                  </strong>
                  您同意於註冊時提供正確、最新及完整的個人資料。若您提供任何錯誤或不實的資料，本平台有權暫停或終止您的帳號，並拒絕您使用本服務之全部或一部。
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-sky-500">
                    check_circle
                  </span>
                </div>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    帳號安全：
                  </strong>
                  您的帳號及密碼由您自行保管。您同意不將帳號、密碼轉讓或出借給他人使用。若您發現帳號遭盜用，應立即通知本平台。
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">03.</span>{" "}
              付款與退費政策
            </h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                本平台之課程服務屬於「非以有形媒介提供之數位內容或一經提供即為完成之線上服務」。依據行政院訂定之《網際網路教學服務定型化契約應記載及不得記載事項》，退費規定如下：
              </p>

              <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                      >
                        使用程度 / 期間
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                      >
                        退費比例
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                        未開始使用 或 使用時數&lt;10%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sky-600 dark:text-sky-400 font-bold">
                        全額退費
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        使用時數 10% ~ 30%
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        退還 50% 費用
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        使用時數 &gt; 30%
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        不予退費
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm bg-blue-50 dark:bg-slate-800/50 p-4 rounded-md border-l-4 border-sky-500">
                <strong className="block mb-1 text-sky-700 dark:text-sky-400">
                  關於猶豫期之例外
                </strong>
                依《消費者保護法》第19條及《通訊交易解除權合理例外情事適用準則》，若本平台已提供試讀、試聽機會，且經消費者同意始提供之數位內容，將
                <strong>不適用 7 日猶豫期（鑑賞期）</strong>
                之規定。請您在購買前充分利用試用資源。
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">04.</span>{" "}
              智慧財產權
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                TimeCarve
                刻時平台上的所有內容，包括但不限於文字、圖片、影片、檔案、網站架構、網頁設計，均由本平台或其他權利人依法擁有其智慧財產權，包括商標權、專利權、著作權、營業秘密與專有技術等。
              </p>
              <p>
                <strong>授權範圍：</strong>
                您購買課程後，僅取得該課程之「個人非專屬使用權」。嚴禁將課程內容進行側錄、重製、公開傳輸、轉售、共享帳號或用於任何商業用途。若有違反，本平台將依法追究相關法律責任並請求損害賠償。
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">05.</span>{" "}
              暫停與終止服務
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                本平台將盡力維護服務之正常運作。但在下列情形下，本平台有權暫停或中斷本服務之全部或一部，且對使用者任何直接或間接之損害，均不負任何賠償或補償之責任：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  本平台相關軟硬體設備進行搬遷、更換、升級、保養或維修時。
                </li>
                <li>使用者有任何違反政府法令或本使用條款情形。</li>
                <li>天災或其他不可抗力之因素所致之服務停止或中斷。</li>
                <li>
                  非本平台所得控制之事項而致本服務資訊顯示不正確、或遭偽造、竄改、刪除或擷取、或致系統中斷或不能正常運作時。
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="section-6"
            className="scroll-mt-28 border-t border-slate-200 dark:border-slate-700 pt-8"
          >
            <div className="flex items-start">
              <span className="material-symbols-outlined text-slate-400 mr-3 mt-1">
                gavel
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  準據法與管轄法院
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-2 text-justify">
                  本條款之解釋與適用，以及與本條款有關的爭議，均應依照中華民國法律予以處理，並以
                  <strong>臺灣臺北地方法院</strong>為第一審管轄法院。
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
