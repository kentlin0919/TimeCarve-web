"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/components/providers/ModalContext";
import { useStudentCourseDetail } from "../../courses/useStudentTeacherCourses";
import { supabase } from "@/lib/supabase";

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper to get first day of month (0 = Sunday)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const TIME_SLOTS = {
  morning: ["09:00", "10:00", "11:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00", "17:00"],
};

export default function StudentBookingCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showModal } = useModal();
  const courseId = searchParams.get("courseId") || "";
  const hoursParam = Number(searchParams.get("hours")) || 1;
  const [hours, setHours] = useState(Math.max(1, hoursParam));
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Calendar State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { course, context, loading, error } = useStudentCourseDetail(courseId);

  useEffect(() => {
    setHours(Math.max(1, hoursParam));
  }, [hoursParam]);

  // Calendar calculations
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    // Empty slots for days before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [daysInMonth, firstDayOfMonth]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const checkDate = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return checkDate < todayStart;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const totalPrice = useMemo(() => {
    if (!course?.price) return 0;
    return course.price * hours;
  }, [course?.price, hours]);

  // Format selected date for display
  const formattedSelectedDate = selectedDate
    ? `${selectedDate.getFullYear()}年 ${
        selectedDate.getMonth() + 1
      }月 ${selectedDate.getDate()}日 (${weekDays[selectedDate.getDay()]})`
    : null;

  // Calculate end time
  const endTime = useMemo(() => {
    if (!selectedTime) return null;
    const [h, m] = selectedTime.split(":").map(Number);
    const endH = h + hours;
    return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }, [selectedTime, hours]);

  const handleConfirm = async () => {
    if (!course || !context || !selectedDate || !selectedTime || !endTime)
      return;

    const dateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("bookings").insert({
        student_id: context.studentId,
        course_id: course.id,
        teacher_id: context.teacherId,
        booking_date: dateStr,
        start_time: selectedTime,
        end_time: endTime,
        status: "pending",
        notes: notes.trim() || null,
      });

      if (insertError) throw insertError;

      showModal({
        title: "預約已送出",
        description: `已送出 ${course.title} 的預約申請，時間為 ${formattedSelectedDate} ${selectedTime}。`,
        confirmText: "查看預約",
        onConfirm: () => router.push("/student/bookings"),
      });
    } catch (err) {
      console.error("Error creating booking:", err);
      showModal({
        title: "送出失敗",
        description: "預約送出失敗，請稍後再試。",
        confirmText: "確定",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!courseId) {
    return (
      <div className="container mx-auto max-w-6xl p-6 md:p-10">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
          缺少課程資訊，請返回課程列表重新選擇。
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl p-6 md:p-10 text-center text-slate-500">
        <div className="animate-pulse">正在載入預約資訊...</div>
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="container mx-auto max-w-6xl p-6 md:p-10">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
          {error || "找不到課程資訊。"}
        </div>
        <Link
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold mt-6"
          href="/student/courses"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          返回課程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-6 md:p-10 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <Link
              href="/student/courses"
              className="hover:text-primary transition-colors"
            >
              課程列表
            </Link>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="text-slate-800 dark:text-white">預約課程</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
            預約新課程
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            選擇合適的時間，開始您的學習之旅。請注意，預約後如需取消請提早 24
            小時告知。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Course Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-primary">
                menu_book
              </span>
            </div>
            <div className="flex gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">
                  menu_book
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    person
                  </span>
                  授課教師：{context?.teacherName || "待定"}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                    {hours} 小時
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300 border border-amber-100 dark:border-amber-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      payments
                    </span>
                    NT$ {course.price?.toLocaleString() || 0}/hr
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/student/courses"
              className="text-sm text-slate-400 hover:text-primary font-bold transition-colors underline decoration-2 underline-offset-4 relative z-10"
            >
              變更課程
            </Link>
          </div>

          {/* Step 1: Calendar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <span className="flex items-center justify-center size-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold shadow-md">
                  1
                </span>
                選擇日期
              </h2>
              <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-600 text-slate-500 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                <span className="font-bold text-slate-800 dark:text-white px-4 text-sm">
                  {currentYear}年 {monthNames[currentMonth]}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-600 text-slate-500 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Week Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {weekDays.map((day) => (
                  <span
                    key={day}
                    className="text-xs font-bold text-slate-400 py-2"
                  >
                    {day}
                  </span>
                ))}
              </div>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return (
                      <div key={`empty-${idx}`} className="aspect-square" />
                    );
                  }
                  const past = isPast(day);
                  const selected = isSelected(day);
                  const todayMark = isToday(day);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={past}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                        past
                          ? "text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed"
                          : selected
                          ? "bg-primary text-white font-bold ring-4 ring-primary/20 shadow-lg scale-105"
                          : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5"
                      }`}
                    >
                      <span
                        className={selected ? "text-lg" : "text-sm font-medium"}
                      >
                        {day}
                      </span>
                      {todayMark && (
                        <span
                          className={`text-[10px] font-normal ${
                            selected ? "opacity-80" : "text-primary"
                          }`}
                        >
                          今日
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  可預約
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  不可選
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-primary box-border" />
                  已選取
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Time Slots */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <span className="flex items-center justify-center size-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold shadow-md">
                  2
                </span>
                選擇時段
                {formattedSelectedDate && (
                  <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full ml-2">
                    {formattedSelectedDate}
                  </span>
                )}
              </h2>
            </div>
            <div className="p-6">
              {!selectedDate ? (
                <div className="text-center py-8 text-slate-400">
                  <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">
                    calendar_today
                  </span>
                  <p>請先選擇日期</p>
                </div>
              ) : (
                <>
                  {/* Morning */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-amber-500 text-[20px]">
                        wb_sunny
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        上午時段
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.morning.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeClick(time)}
                          className={`border rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                            selectedTime === time
                              ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Afternoon */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-orange-500 text-[20px]">
                        sunny
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        下午時段
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.afternoon.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeClick(time)}
                          className={`border rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                            selectedTime === time
                              ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Confirmation */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 z-20">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-2 bg-gradient-to-r from-primary to-teal-400 w-full" />

              {/* Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    預約確認
                  </h2>
                  {selectedDate && selectedTime ? (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wide">
                      Ready
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wide">
                      待選擇
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  請確認右側詳情後送出預約申請。
                </p>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col gap-6">
                <div className="space-y-5 relative">
                  {/* Dashed line connector */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-slate-200 dark:border-slate-700" />

                  {/* Date */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        calendar_today
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        預約日期 Date
                      </p>
                      <p className="text-slate-800 dark:text-white font-bold text-base">
                        {formattedSelectedDate || "尚未選擇"}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        schedule
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        預約時間 Time
                      </p>
                      <p className="text-slate-800 dark:text-white font-bold text-base">
                        {selectedTime && endTime
                          ? `${selectedTime} - ${endTime}`
                          : "尚未選擇"}
                      </p>
                      {selectedTime && (
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            timelapse
                          </span>
                          時長：{hours * 60} 分鐘
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Teacher */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        person
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        指導教師 Teacher
                      </p>
                      <p className="text-slate-800 dark:text-white font-bold text-base">
                        {context?.teacherName || "待定"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        payments
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        費用 Price
                      </p>
                      <p className="text-slate-800 dark:text-white font-bold text-base">
                        NT$ {totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-5 border-t border-slate-100 dark:border-slate-700">
                  <label
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block flex items-center gap-1"
                    htmlFor="note"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      edit_note
                    </span>
                    備註事項 (選填)
                  </label>
                  <textarea
                    id="note"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-sm focus:ring-primary focus:border-primary resize-none p-3 placeholder:text-slate-400 transition-shadow focus:shadow-md"
                    placeholder="想加強的部分，例如：某章節內容..."
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime || submitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark text-white dark:text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? "送出中..." : "確認預約"}</span>
                    {!submitting && (
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-3">
                    點擊確認即表示您同意課程預約規則與取消政策
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
