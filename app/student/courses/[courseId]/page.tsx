"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStudentCourseDetail } from "../useStudentTeacherCourses";

const HERO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHpcmx5FN0ieyK-KUTHlzpCr7Aj8wyk3XwCcfO9sBG40Fan-DY44DtRxhLT6rnswES6q6B0xREgxnk1ImkFwzDG1AjLCEp0il-_ttTxQZAjLL4AmXamRYBu2Zh6v2QyEZ0GyVpujs4Zkwv3aEJLnYJezfNy4L9DxmcDC3Z5QoMc3eQbRTwtSxoYieRI_nfI5E5ysjpEjZueHWnjExK4sfPdXovbW73WmDh1wuhV8s2zmYq5qKDODTOCJw_efYco-8WOO4DyDdedxA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo",
];

const DEFAULT_OUTCOMES = [
  "熟練操作咬合器與面弓轉移技術",
  "掌握前牙美觀排列黃金比例與微笑曲線",
  "理解並實作兩側平衡咬合之排牙原則",
  "具備獨立完成牙齦解剖形態雕刻之能力",
  "提升國考術科排牙速度與精確度",
];

const getHeroImage = (courseId: string) => {
  let hash = 0;
  for (let i = 0; i < courseId.length; i += 1) {
    hash = (hash + courseId.charCodeAt(i) * (i + 1)) % HERO_IMAGES.length;
  }
  return HERO_IMAGES[hash];
};

export default function StudentCourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = typeof params.courseId === "string" ? params.courseId : "";
  const { course, context, loading, error } = useStudentCourseDetail(courseId);
  const [selectedHours, setSelectedHours] = useState(1);

  useEffect(() => {
    if (!course) return;
    const baseHours = Math.max(1, Math.ceil((course.durationMinutes || 60) / 60));
    setSelectedHours(baseHours);
  }, [course]);

  const heroImage = useMemo(() => getHeroImage(courseId), [courseId]);

  const totalPrice = useMemo(() => {
    if (!course?.price) return 0;
    return course.price * selectedHours;
  }, [course?.price, selectedHours]);

  const listPrice = useMemo(() => {
    if (!totalPrice) return 0;
    return Math.round(totalPrice * 1.1);
  }, [totalPrice]);

  const outcomes = useMemo(() => {
    if (course?.tags && course.tags.length > 0) {
      return course.tags.slice(0, 5).map((tag) => tag.text);
    }
    return DEFAULT_OUTCOMES;
  }, [course?.tags]);

  const sections = course?.sections || [];

  const handleBooking = () => {
    if (!course) return;
    router.push(
      `/student/booking/create?courseId=${encodeURIComponent(course.id)}&hours=${selectedHours}`
    );
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
        <div className="container mx-auto max-w-6xl p-6 md:p-10 text-center text-slate-500">
          正在載入課程內容...
        </div>
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
        <div className="container mx-auto max-w-6xl p-6 md:p-10">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
            {error || "找不到課程內容。"}
          </div>
          <Link
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold mt-6"
            href="/student/courses"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            返回課程列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
      <div className="md:hidden flex items-center justify-between p-4 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary-dark">
            <span className="material-symbols-outlined text-[20px]">dentistry</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">牙雕家教</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="container mx-auto max-w-6xl p-4 md:p-8 lg:p-10 pb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Link
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold"
            href="/student/courses"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            返回課程列表
          </Link>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
              分享
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              收藏
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold px-3 py-1 rounded-full">
                  課程詳情
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">school</span>
                  {course.courseType}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white leading-tight mb-6">
                {course.title}
              </h1>
              <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url("${heroImage}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button className="absolute inset-0 flex items-center justify-center group/play">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40 group-hover/play:bg-white/30 transition-all transform group-hover/play:scale-110">
                    <span className="material-symbols-outlined text-white text-[40px] pl-1">play_arrow</span>
                  </div>
                </button>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                課程介紹
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                {course.content || course.desc || "尚未提供詳細課程介紹。"}
              </p>
            </section>

            <section className="bg-white dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                預期學習成果
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outcomes.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-slate-800 dark:bg-slate-200 rounded-full"></span>
                  詳細教案內容
                </h2>
                <span className="text-sm text-slate-500 font-medium">
                  共 {sections.length || 0} 個單元
                </span>
              </div>

              {sections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-6 text-slate-500 dark:text-slate-400">
                  尚未設定詳細教案內容。
                </div>
              ) : (
                <div className="relative pl-2">
                  {sections.map((section, index) => {
                    const isLast = index === sections.length - 1;
                    const order = String(index + 1).padStart(2, "0");
                    const sectionKey = section.id || `${course.id}-section-${index}`;

                    return (
                      <div
                        className={`relative pl-10 ${isLast ? "" : "pb-10"} before:content-[''] before:absolute before:top-8 before:bottom-0 before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700`}
                        key={sectionKey}
                      >
                        <div className="absolute left-0 top-0 bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-600 rounded-full size-10 flex items-center justify-center z-10 shadow-sm">
                          <span className="font-bold text-slate-500 dark:text-slate-400 text-sm">
                            {order}
                          </span>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                            {section.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                            {section.duration && (
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                {Math.round(section.duration / 60)} 小時
                              </span>
                            )}
                            {section.isFree && (
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                免費試看
                              </span>
                            )}
                          </div>
                          {section.content && (
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                              {section.content}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-card border border-slate-200 dark:border-slate-700 sticky top-24 z-20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">課程總費用</span>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-bold">
                  名額開放中
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-secondary">
                  NT$ {totalPrice.toLocaleString()}
                </span>
                {listPrice > totalPrice && (
                  <span className="text-sm text-slate-400 font-medium line-through">
                    NT$ {listPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 block">
                  選擇上課時數方案
                </label>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    className="size-8 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:text-secondary transition-colors"
                    onClick={() => setSelectedHours((prev) => Math.max(1, prev - 1))}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <div className="flex-1 text-center bg-white dark:bg-slate-700 border border-secondary dark:border-secondary/50 rounded-lg py-1.5 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/5"></div>
                    <span className="text-lg font-black text-secondary">{selectedHours} 小時</span>
                  </div>
                  <button
                    className="size-8 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:text-secondary transition-colors"
                    onClick={() => setSelectedHours((prev) => Math.min(40, prev + 1))}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">
                  {course.price ? `每小時 NT$ ${course.price.toLocaleString()}` : "課程費用將於確認後提供"}
                </p>
              </div>
              <button
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-secondary dark:hover:bg-secondary/90 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-secondary/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mb-4"
                onClick={handleBooking}
                type="button"
              >
                立即預約
                <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
              </button>
              <div className="text-center">
                <a
                  className="text-xs font-bold text-slate-500 hover:text-secondary underline decoration-2 decoration-slate-200 hover:decoration-secondary underline-offset-4 transition-colors"
                  href="#"
                >
                  查看退費政策
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">授課講師</h3>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex gap-4 items-start">
                <div
                  className="size-14 rounded-full bg-cover bg-center flex-shrink-0 border-2 border-white dark:border-slate-600 shadow-sm"
                  style={{
                    backgroundImage: context?.teacherAvatarUrl
                      ? `url(${context.teacherAvatarUrl})`
                      : "linear-gradient(135deg, #cbd5f5 0%, #93c5fd 100%)",
                  }}
                ></div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg">
                    {context?.teacherName || "指導老師"}
                  </h4>
                  <p className="text-xs font-bold text-secondary mb-2">
                    {context?.teacherTitle || "專任講師"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                    由專屬老師親自帶領，根據學員狀況調整節奏，協助穩定完成目標。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">學員評價</h3>
                <a className="text-xs font-bold text-primary hover:text-primary-dark" href="#">
                  查看全部
                </a>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span className="material-symbols-outlined text-[16px]" key={`star-${index}`}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    "老師會依照我的進度調整練習節奏，操作步驟變得更清楚，準備考試更有方向。"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200"></div>
                    <span className="text-xs font-bold text-slate-500">學員回饋</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span className="material-symbols-outlined text-[16px]" key={`full-star-${index}`}>
                        star
                      </span>
                    ))}
                    <span className="material-symbols-outlined text-[16px]">star_half</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    "課程節奏剛好，搭配練習時數規劃，準備起來更有效率。"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200"></div>
                    <span className="text-xs font-bold text-slate-500">學員回饋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-6 z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500">總費用</span>
          <span className="text-xl font-black text-secondary">NT$ {totalPrice.toLocaleString()}</span>
        </div>
        <button
          className="bg-slate-900 dark:bg-secondary text-white px-8 py-3 rounded-xl font-bold shadow-lg"
          onClick={handleBooking}
          type="button"
        >
          立即預約
        </button>
      </div>
    </div>
  );
}
