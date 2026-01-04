"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/components/providers/ModalContext";
import { useStudentCourseDetail } from "../../courses/useStudentTeacherCourses";
import { supabase } from "@/lib/supabase";

export default function StudentBookingCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showModal } = useModal();
  const courseId = searchParams.get("courseId") || "";
  const hoursParam = Number(searchParams.get("hours")) || 1;
  const [hours, setHours] = useState(Math.max(1, hoursParam));
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { course, context, loading, error } = useStudentCourseDetail(courseId);

  useEffect(() => {
    setHours(Math.max(1, hoursParam));
  }, [hoursParam]);

  const totalPrice = useMemo(() => {
    if (!course?.price) return 0;
    return course.price * hours;
  }, [course?.price, hours]);

  const handleConfirm = async () => {
    if (!course || !context || !date || !time) return;

    const [startHour, startMinute] = time.split(":").map(Number);
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start);
    end.setHours(start.getHours() + hours);

    const endHour = String(end.getHours()).padStart(2, "0");
    const endMinute = String(end.getMinutes()).padStart(2, "0");
    const endTime = `${endHour}:${endMinute}`;

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("bookings").insert({
        student_id: context.studentId,
        course_id: course.id,
        teacher_id: context.teacherId,
        booking_date: date,
        start_time: `${String(startHour).padStart(2, "0")}:${String(
          startMinute
        ).padStart(2, "0")}`,
        end_time: endTime,
        status: "pending",
        notes: notes.trim() || null,
      });

      if (insertError) {
        throw insertError;
      }

      showModal({
        title: "預約已送出",
        description: `已送出 ${course.title} 的預約申請，時間為 ${date} ${time}。`,
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
      <div className="container mx-auto max-w-5xl p-6 md:p-10">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
          缺少課程資訊，請返回課程列表重新選擇。
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl p-6 md:p-10 text-center text-slate-500">
        正在載入預約資訊...
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="container mx-auto max-w-5xl p-6 md:p-10">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
          {error || "找不到課程資訊。"}
        </div>
        <Link
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold mt-6"
          href="/student/courses"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          返回課程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            預約確認
          </h1>
          <p className="text-text-sub">請確認課程資訊並選擇希望的上課時間。</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold"
          href={`/student/courses/${course.id}`}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          返回課程詳情
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              課程資訊
            </h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">menu_book</span>
                <span className="font-semibold">{course.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                <span>
                  {context?.teacherName || "指導老師"} {context?.teacherTitle ? `• ${context.teacherTitle}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                <span>
                  {hours} 小時 • 每小時 NT$ {course.price?.toLocaleString() || 0}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                {course.desc || "請依照老師建議的進度安排學習。"}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              選擇上課時間
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  日期
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  時段
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                備註給老師
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                rows={3}
                placeholder="例如：希望加強哪一段內容"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              費用明細
            </h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>課程時數</span>
                <span className="font-semibold">{hours} 小時</span>
              </div>
              <div className="flex justify-between">
                <span>單價</span>
                <span className="font-semibold">NT$ {course.price?.toLocaleString() || 0}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between text-slate-800 dark:text-white font-bold">
                <span>總金額</span>
                <span>NT$ {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
              disabled={!date || !time || submitting}
              onClick={handleConfirm}
              type="button"
            >
              {submitting ? "送出中..." : "確認送出"}
            </button>
            <p className="mt-3 text-xs text-slate-400">
              送出後需等待老師確認。{notes ? "備註已加入申請內容。" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
