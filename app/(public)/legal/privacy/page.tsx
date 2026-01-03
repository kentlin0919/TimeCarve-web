"use client";

import React from "react";
import Link from "next/link";
// Using standard className strings for styling, consistent with the Terms page.

export default function PrivacyPage() {
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
            隱私權保護政策
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl text-lg">
            TimeCarve 刻時
            非常重視您的隱私權。我們致力於保護您的個人資料，並遵循中華民國《個人資料保護法》及相關法令規範。
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
                  verified_user
                </span>
                1. 適用範圍
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-2")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-2"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  folder_shared
                </span>
                2. 資料蒐集與利用
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-3")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-3"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  lock
                </span>
                3. 資料保護與安全
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-4")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-4"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  link
                </span>
                4. 外部連結與共用
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-5")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-5"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  cookie
                </span>
                5. Cookie 政策
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-6")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-6"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  accessibility_new
                </span>
                6. 當事人權利
              </a>
              <a
                onClick={(e) => scrollToSection(e, "section-7")}
                className="group flex items-center px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-l-[3px] border-transparent hover:border-sky-500 cursor-pointer"
                href="#section-7"
              >
                <span className="material-symbols-outlined text-[20px] mr-3">
                  mail
                </span>
                7. 聯絡我們
              </a>
            </nav>
          </div>
        </aside>

        <article className="md:w-3/4 space-y-12">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">01.</span>{" "}
              隱私權保護政策的適用範圍
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                本隱私權保護政策內容，包括本平台如何處理在您使用網站服務時收集到的個人識別資料。本政策不適用於本平台以外的相關連結網站，也不適用於非本平台所委託或參與管理的人員。
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">02.</span>{" "}
              個人資料的蒐集、處理及利用方式
            </h2>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>{" "}
                  蒐集之目的
                </h3>
                <p>
                  本平台的蒐集目的在於進行客戶管理、會員管理、行銷、教學服務提供、契約與類似契約義務之履行、網路購物及其他電子商務服務、統計調查與分析等。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>{" "}
                  蒐集之個人資料類別
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>識別類（C001）：</strong>
                    如姓名、地址、電話號碼、電子郵件等。
                  </li>
                  <li>
                    <strong>特徵類（C011）：</strong>
                    如年齡、性別、出生年月日等。
                  </li>
                  <li>
                    <strong>社會情況類（C038）：</strong>
                    如職業、學歷等（針對教師會員）。
                  </li>
                  <li>
                    <strong>財務細節類（C081）：</strong>
                    如信用卡號碼等（僅經由第三方金流處理，本平台不直接儲存）。
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>{" "}
                  利用期間、地區及對象
                </h3>
                <p>
                  <strong>期間：</strong>
                  自您同意成為會員之日起至本平台停止服務、您終止會員資格或您請求刪除資料為止。
                  <br />
                  <strong>地區：</strong>中華民國境內及本平台伺服器所在地。
                  <br />
                  <strong>對象：</strong>
                  本平台、合作金流服務商、物流服務商、或依法有權機關。
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">03.</span>{" "}
              資料之保護與安全
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                本平台主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，採取嚴格的保護措施保護您的個人資料。只有經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
              </p>
              <p>
                如因業務需要有必要委託其他單位提供服務時，本平台亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">04.</span>{" "}
              外部連結與共用政策
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                <strong>外部連結：</strong>
                本平台的網頁提供其他網站的網路連結，您也可經由本平台所提供的連結，點選進入其他網站。但該連結網站不適用本平台的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
              </p>
              <p>
                <strong>與第三人共用：</strong>
                本平台絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">05.</span>{" "}
              Cookie 之使用
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                為了提供您最佳的服務，本平台會在您的電腦中放置並取用我們的
                Cookie，若您不願接受 Cookie
                的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕
                Cookie 的寫入，但也因此可能會導致網站某些功能無法正常執行。
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="text-sky-500 mr-3 text-lg font-light">06.</span>{" "}
              當事人權利行使
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                依據個資法第三條規定，您就本平台保有您之個人資料得行使以下權利：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>查詢或請求閱覽。</li>
                <li>請求製給複製本。</li>
                <li>請求補充或更正。</li>
                <li>請求停止蒐集、處理或利用。</li>
                <li>請求刪除。</li>
              </ul>
              <div className="text-sm bg-blue-50 dark:bg-slate-800/50 p-4 rounded-lg border-l-4 border-sky-500 text-slate-700 dark:text-slate-300 mt-4">
                <strong>注意：</strong>
                若您申請刪除其個人資料，可能會導致無法繼續使用本平台部分或全部服務（例如：無法登入、無法查詢歷史課程紀錄等）。
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section
            id="section-7"
            className="scroll-mt-28 border-t border-slate-200 dark:border-slate-700 pt-8"
          >
            <div className="flex items-start">
              <span className="material-symbols-outlined text-slate-400 mr-3 mt-1">
                mail
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  聯絡我們
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-2 text-justify">
                  若您對本隱私權政策有任何疑問，或欲行使您的個人資料權利，歡迎透過以下方式與我們聯繫：
                </p>
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg inline-block">
                  <p className="font-medium text-slate-900 dark:text-white">
                    TimeCarve 刻時 客服中心
                  </p>
                  <a
                    href="mailto:support@timecarve.com"
                    className="text-sky-500 dark:text-sky-400 mt-1 block hover:underline"
                  >
                    Email: support@timecarve.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
