"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStudentCourses } from "./useStudentCourses";

export default function StudentCoursesPage() {
  const router = useRouter();
  const { courses, loading, error } = useStudentCourses();
  const [selectedHours, setSelectedHours] = useState<{ [key: string]: number }>(
    {}
  );

  const handleHourChange = (courseId: string, delta: number) => {
    setSelectedHours((prev) => {
      const current = prev[courseId] || 1; // Default 1 hour
      const next = Math.max(1, current + delta);
      return { ...prev, [courseId]: next };
    });
  };

  const handleBook = (courseId: string) => {
    const hours = selectedHours[courseId] || 1;
    router.push(`/student/booking/create?courseId=${courseId}&hours=${hours}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full bg-slate-50 dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-slate-50 dark:bg-background-dark p-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 mb-4">
          <p className="font-bold">發生錯誤</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:underline"
        >
          重試
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary-dark">
            <span className="material-symbols-outlined text-[20px]">
              dentistry
            </span>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">
            牙雕家教
          </span>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="container mx-auto max-w-[1280px] p-6 md:p-10 flex flex-col gap-8 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-display font-black leading-tight tracking-tight mb-2">
              課程方案選擇
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl">
              探索您的專屬課程，靈活選擇適合您的學習時數。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>
                篩選課程
              </button>
            </div>
            <div className="relative group">
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  sort
                </span>
                排序方式
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">
              menu_book
            </span>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
              老師目前沒有開設課程
            </p>
            <p className="text-sm mt-2">
              請耐心等待老師建立課程，或聯繫您的老師了解更多資訊。
            </p>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const currentHours = selectedHours[course.id] || 1;
            const totalPrice = (course.price || 0) * currentHours;

            // Placeholder images rotation
            const placeHolderImages = [
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBHpcmx5FN0ieyK-KUTHlzpCr7Aj8wyk3XwCcfO9sBG40Fan-DY44DtRxhLT6rnswES6q6B0xREgxnk1ImkFwzDG1AjLCEp0il-_ttTxQZAjLL4AmXamRYBu2Zh6v2QyEZ0GyVpujs4Zkwv3aEJLnYJezfNy4L9DxmcDC3Z5QoMc3eQbRTwtSxoYieRI_nfI5E5ysjpEjZueHWnjExK4sfPdXovbW73WmDh1wuhV8s2zmYq5qKDODTOCJw_efYco-8WOO4DyDdedxA",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo",
            ];
            const bgImage = placeHolderImages[index % placeHolderImages.length];

            return (
              <div
                key={course.id}
                className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden group flex flex-col h-full hover:border-primary/50 dark:hover:border-primary/50 trans-all"
              >
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={bgImage}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {course.courseType === "online" ? "線上課程" : "實體課程"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-2xl font-bold leading-tight shadow-black drop-shadow-md mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          schedule
                        </span>{" "}
                        {course.durationMinutes
                          ? `${course.durationMinutes} 分鐘/堂`
                          : "彈性時間"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-6 flex-1">
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {course.desc || "暫無課程描述"}
                    </p>

                    {/* Tags Preview */}
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {course.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md"
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Hour Selection */}
                    <div className="pt-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">
                        選擇預約時數
                      </label>
                      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => handleHourChange(course.id, -1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-primary active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined">
                            remove
                          </span>
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-lg font-black text-slate-800 dark:text-white">
                            {currentHours}
                          </span>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">
                            小時
                          </span>
                        </div>
                        <button
                          onClick={() => handleHourChange(course.id, 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-primary active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-bold uppercase">
                        預估費用
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary-dark dark:text-primary">
                          {course.price
                            ? `NT$ ${totalPrice.toLocaleString()}`
                            : "洽詢"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook(course.id)}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all flex items-center gap-2 group-hover:scale-105"
                    >
                      立即預約
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Keep this generic */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-display font-bold mb-4">
                需要客製化課程？
              </h2>
              <p className="text-indigo-100 text-lg">
                如果您有特殊的學習需求，歡迎直接與老師聯繫討論。
              </p>
            </div>
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 flex-shrink-0">
              <span className="material-symbols-outlined">chat</span>
              聯繫老師
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
