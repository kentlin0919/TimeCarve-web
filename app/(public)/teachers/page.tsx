"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type PublicTeacherProfile = {
  teacher_code: string;
  name: string | null;
  avatar_url: string | null;
  title: string | null;
  bio: string | null;
  experience_years: number | null;
  base_price: number | null;
  specialties: string[] | null;
  philosophy_items: {
    title: string;
    description: string;
    icon: string;
  }[] | null;
  educations: {
    school_name: string | null;
    department: string | null;
    degree: string | null;
    degree_level: string | null;
    study_year: number | null;
    start_year: number | null;
    end_year: number | null;
  }[] | null;
};

const portfolioItems = [
  {
    title: "前牙美學修復",
    description: "全瓷冠形態雕刻與染色",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwgPOMKrp6Qoq0TlCmMh8jxktAmptu4Shci6qtOmZK4ln1UlEX7Qi05pZAV0TlPhIESCGZBqrRpYm64jycUZn87CYjpBnjjCtVUygSKIoBpV9qnrLkx2OMt59-ZioGmFLYovQBgqEsQmSQmxShjf2Wbw7LLmcRgUB-zMWKy0j-znq2jKi1yrgDB1jdiRSVcb9SU43RjQFQ5L_Kp7_IgZL9hNgQfiQkpHIie7nkMUsJnH8IqbnGZDjgtD_LuzM7fVwjhFzo6djP020")',
  },
  {
    title: "精密蠟型堆築",
    description: "後牙咬合面功能重建",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlNxVP5acES4Vx8j4JUlRqn1zwtcf48PythdeBHsjwonpbXDvRp5w7SPjgeaYt7Zq3kWzuLs2MV7dVpY55pT0FhJUssCAY2WZ9G3o66iHm9utnbHl8kWB2rIeKRHX0YQIgoQXgqSZ3VzKdgSGe0_ZdoAduDz8ndjFQzL7JFcmYLETmmLGrTj1fKZHYu3BykMjDtoehWwvAxu5JcdhFnKoZd3ojRTD2oyrb_VIE48xr8mHtr-oI56nZa_csheUyS5GLAlc9rSkihF4")',
  },
  {
    title: "石膏模型分析",
    description: "教學示範標準模型",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqmKAPKzgxTHrkRXHuuSttu1eMiiX0pShdly6ouHLFivvniWPhkny8f61Ts2e-78v1ZPZxHiGF6xO9VoEE_w1NlMOURC9uMZ24vXnR_7jvC12icZbRpv_4sZXtvRzcslbWDNInp27Tea0L0oYSUXIbaPeBJK1zlEmPxQar65qOsEydSk8Vm9UpcQuWcYOJ-gPhaE_9jAqaNb10NbiHVNnVlc-RZnhoLwNiRtwoXgXaBhDd2lIHvhAfJQNqhD53qUizEWBOt6HH-HU")',
  },
];

const reviewItems = [
  {
    name: "陳小美",
    role: "牙體技術系學生",
    content:
      "林老師的教學非常細膩，特別是對於形態細節的講解，讓我從完全不懂到能夠獨立完成一顆漂亮的蠟型。",
    avatar:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArwDfIG3eNWXW-Q3Eraz8JkUZDSOXHvJjncBnjMy5dqw8ntlGAltEJ7KgHljbchP5oIlAHnZil615mMyfpkk7jhBmVgPagAs9BrKvqwj7gbr6RSI9K_DQdwNVKmGxXciDwB90BBEmkyxmiSZdb3Mg-MlOv3HxuuAxO9fNEnR5gR1uAnYmQuSuwOC8NybjgB3__sUVNYxnQ7AJwu1eIk98uyr5ICe93ymw7-Y8uGGBx1GWlQJTxbX_j2hhE-rpKd2Re3xlWV7IBd28")',
  },
  {
    name: "張志豪",
    role: "在職牙技師",
    content:
      "工作幾年後遇到瓶頸，來找老師進修前牙美學。老師的幾何解構法讓我對形態有了全新的認識。",
    avatar:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBE6YwUj1wlZxV5_2UWGK4_gsqPubpKkXWnt0avhPGO1aQHiplLNGrFt4lNbDd5_9YLc_r4xb1qCX-yQST0-Ps3qc78ry1tWTFZjNR22352KZdOfa1y8PmklGx0pRvT1i1h_0FrsiZpg8zDvNqynW7lA4DP09yEf9g0nfBdIwhjMD2JJ57dkRbs67-mPc2p9rpAf6PKCQiYUNkqgEspfC7yEhBwEvrvwgSgIc_EKRQGJ5CzSe0RJ9TKFc1AUdKm0Xqe5aJBf-F4x24")',
  },
];

function TeachersContent() {
  const searchParams = useSearchParams();
  const teacherCode = useMemo(
    () => searchParams.get("teacher_code")?.trim() || "",
    [searchParams]
  );
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<PublicTeacherProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherCode) {
      setProfile(null);
      setError(null);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase.rpc(
        "get_public_teacher_profile",
        { code: teacherCode }
      );

      if (fetchError) {
        console.error(fetchError);
        setProfile(null);
        setError("找不到公開頁面");
      } else {
        const result = Array.isArray(data)
          ? data[0]
          : (data as PublicTeacherProfile | null);
        if (!result) {
          setProfile(null);
          setError("找不到公開頁面");
        } else {
          setProfile(result as PublicTeacherProfile);
          setError(null);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [teacherCode]);

  if (!teacherCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark text-[#111618] dark:text-[#f0f3f4]">
        <div className="max-w-md rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15262d] p-8 text-center shadow-soft">
          <h1 className="text-xl font-bold">請提供教師代碼</h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            使用 `?teacher_code=XXXX` 來查看公開個人頁面。
          </p>
        </div>
      </div>
    );
  }

  if (loading && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark text-[#111618] dark:text-[#f0f3f4]">
        <div className="max-w-md rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15262d] p-8 text-center shadow-soft">
          <h1 className="text-xl font-bold">載入中</h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            正在取得老師資訊...
          </p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark text-[#111618] dark:text-[#f0f3f4]">
        <div className="max-w-md rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15262d] p-8 text-center shadow-soft">
          <h1 className="text-xl font-bold">找不到公開頁面</h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            請確認教師代碼正確，或該老師尚未開啟公開頁面。
          </p>
        </div>
      </div>
    );
  }

  const name = profile.name || "未命名老師";
  const title = profile.title || "專業講師";
  const bio =
    profile.bio || "這位老師尚未填寫個人簡介，歡迎透過預約諮詢了解更多。";
  const avatarUrl =
    profile.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=EEF2FF&color=1F2937&size=500`;
  const specialties = profile.specialties || [];
  const experienceYears = profile.experience_years ?? 0;
  const philosophyItems = profile.philosophy_items || [];
  const hasPhilosophyItems = philosophyItems.length > 0;
  const educations = profile.educations || [];
  const primaryEducation = educations[0];
  const degreeLabel =
    primaryEducation?.degree_level ||
    primaryEducation?.degree ||
    null;
  const studyYearLabel =
    primaryEducation?.study_year != null
      ? `大學 ${primaryEducation.study_year} 年級`
      : null;
  const educationSummary = primaryEducation
    ? [
        primaryEducation.school_name,
        primaryEducation.department,
        degreeLabel,
        studyYearLabel,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark text-[#111618] dark:text-[#f0f3f4] font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#101d22]/80 backdrop-blur-lg transition-all">
        <div className="mx-auto flex h-20 max-w-[1024px] items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.svg"
                alt="TimeCarve Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#111618] dark:text-white">
              TimeCarve 刻時
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
              href="#"
            >
              首頁
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a
              className="text-sm font-medium text-primary dark:text-primary transition-colors relative group"
              href="#"
            >
              師資介紹
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all"></span>
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
              href="#portfolio"
            >
              精選作品
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
              href="#reviews"
            >
              學員評價
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-white text-sm font-bold shadow-glow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
              <span className="truncate">預約諮詢</span>
            </button>
          </div>
          <button className="md:hidden flex items-center justify-center text-[#111618] dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white dark:bg-[#15262d] border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-[1024px] mx-auto px-6 sm:px-10 py-3">
            <nav className="flex text-sm font-medium text-gray-500 dark:text-gray-400 space-x-2">
              <a className="hover:text-primary transition-colors" href="#">
                首頁
              </a>
              <span>/</span>
              <a className="hover:text-primary transition-colors" href="#">
                師資團隊
              </a>
              <span>/</span>
              <span className="text-primary font-semibold">{name}</span>
            </nav>
          </div>
        </div>

        <div className="flex flex-col max-w-[1024px] w-full px-6 sm:px-10">
          <section className="py-12 sm:py-20 relative overflow-visible">
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-5 relative group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 relative z-10 bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                  ></div>
                </div>
                <div className="absolute -top-5 -left-5 w-full h-full border-2 border-primary/20 rounded-2xl -z-0"></div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-6 pt-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="material-symbols-outlined text-sm">
                      verified
                    </span>
                    Senior Instructor
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black text-[#111618] dark:text-white tracking-tight mb-2">
                    {name}
                  </h1>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    {title}
                  </p>
                  {educationSummary && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {educationSummary}
                    </p>
                  )}
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  {specialties.length > 0 ? (
                    specialties.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-gray-100 dark:bg-[#1a2c32] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="px-4 py-1.5 bg-gray-100 dark:bg-[#1a2c32] text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                      #專業技能待補充
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 pt-4 mt-auto">
                  <button className="flex h-12 flex-1 sm:flex-none sm:min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-white text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300">
                    預約課程諮詢
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                  <div className="flex gap-2">
                    <a
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors"
                      href="#"
                    >
                      <span className="material-symbols-outlined">share</span>
                    </a>
                    <a
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-colors"
                      href={`?teacher_code=${encodeURIComponent(
                        profile.teacher_code
                      )}`}
                    >
                      <span className="material-symbols-outlined">link</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#1a2c32] rounded-2xl">
              <span className="text-3xl font-black text-primary">
                {experienceYears}+
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                年臨床經驗
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#1a2c32] rounded-2xl">
              <span className="text-3xl font-black text-primary">--</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                指導學生
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#1a2c32] rounded-2xl">
              <span className="text-3xl font-black text-primary">--</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                課程滿意度
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#1a2c32] rounded-2xl">
              <span className="text-3xl font-black text-primary">--</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                專題講座
              </span>
            </div>
          </section>

          {hasPhilosophyItems && (
            <section className="py-16 sm:py-24" id="philosophy">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3 max-w-2xl">
                  <span className="text-primary font-bold tracking-wider text-xs uppercase">
                    Philosophy
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#111618] dark:text-white tracking-tight">
                    我的教學理念
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 font-light">
                    {bio}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {philosophyItems.map((item) => (
                    <div
                      key={item.title}
                      className="group flex flex-col gap-5 rounded-2xl bg-white dark:bg-[#1a2c32] p-8 shadow-soft border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-3xl">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#111618] dark:text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section
            className="py-16 sm:py-24 border-t border-gray-100 dark:border-gray-800"
            id="portfolio"
          >
            <div className="flex items-end justify-between pb-10">
              <div className="flex flex-col gap-2">
                <span className="text-primary font-bold tracking-wider text-xs uppercase">
                  Selected Works
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#111618] dark:text-white tracking-tight">
                  精選雕刻作品
                </h2>
              </div>
              <a
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-gray-600 hover:text-primary hover:bg-primary/5 transition-all text-sm font-bold"
                href="#"
              >
                更多作品
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div
                  key={item.title}
                  className="group cursor-pointer flex flex-col gap-4"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-lg transition-all duration-500">
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: item.image }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-bold">查看詳情</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#111618] dark:text-white text-lg font-bold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className="py-16 bg-primary/5 rounded-3xl mb-16 px-8 sm:px-12"
            id="reviews"
          >
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-wider text-xs uppercase">
                Reviews
              </span>
              <h2 className="text-3xl font-black text-[#111618] dark:text-white mt-2">
                學員真實回饋
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviewItems.map((review) => (
                <div
                  key={review.name}
                  className="bg-white dark:bg-[#15262d] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative"
                >
                  <span className="absolute top-6 right-6 text-6xl text-primary/10 font-serif leading-none">
                    "
                  </span>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center"
                      style={{ backgroundImage: review.avatar }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-[#111618] dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                    <div className="ml-auto flex text-yellow-400 text-sm">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className="material-symbols-outlined filled"
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="py-16 border-t border-gray-100 dark:border-gray-800 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="flex flex-col gap-6 max-w-sm">
                <div className="flex items-center gap-2 text-[#111618] dark:text-white">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    dentistry
                  </span>
                  <h2 className="text-xl font-bold">TimeCarve 刻時</h2>
                </div>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  致力於提升台灣牙體技術美學，透過系統化的教學，讓每一位技師都能成為牙齒的藝術家。
                </p>
                <div className="flex gap-4">
                  <a
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                    href="#"
                  >
                    <span className="material-symbols-outlined">share</span>
                  </a>
                  <a
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                    href="#"
                  >
                    <span className="material-symbols-outlined">tag</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 sm:gap-20">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                    快速連結
                  </h3>
                  <a
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                    href="#"
                  >
                    關於我們
                  </a>
                  <a
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                    href="#"
                  >
                    師資介紹
                  </a>
                  <a
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                    href="#portfolio"
                  >
                    精選作品
                  </a>
                  <a
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                    href="#"
                  >
                    聯絡我們
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                    聯絡方式
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-base">
                      mail
                    </span>
                    contact@timecarve.com
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-base">
                      call
                    </span>
                    02-1234-5678
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-base">
                      location_on
                    </span>
                    台北市信義區
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
              © 2024 TimeCarve. All rights reserved.
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function TeachersPublicPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark text-[#111618] dark:text-[#f0f3f4]">
          <div className="max-w-md rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15262d] p-8 text-center shadow-soft">
            <h1 className="text-xl font-bold">載入中</h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              正在初始化頁面...
            </p>
          </div>
        </div>
      }
    >
      <TeachersContent />
    </Suspense>
  );
}
