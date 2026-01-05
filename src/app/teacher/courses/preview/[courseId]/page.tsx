"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import StudentCourseDetailView from "@/app/student/courses/[courseId]/StudentCourseDetailView";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";
import { SupabaseCourseRepository } from "@/lib/infrastructure/course/SupabaseCourseRepository";
import { supabase } from "@/lib/supabase";
import { Course } from "@/lib/domain/course/entity";

export default function TeacherCoursePreviewPage() {
  const params = useParams();
  const courseId = typeof params.courseId === "string" ? params.courseId : "";
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [context, setContext] = useState<{
    teacherName?: string | null;
    teacherTitle?: string | null;
    teacherAvatarUrl?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      if (!courseId) {
        setError("找不到課程內容。");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const authRepo = new SupabaseAuthRepository();
        const courseRepo = new SupabaseCourseRepository();
        const user = await authRepo.getUser();

        if (!user) {
          setError("無法取得使用者資訊。");
          return;
        }

        const data = await courseRepo.getCourse(courseId);
        if (!data || data.teacherId !== user.id) {
          setError("找不到此課程或您沒有權限預覽。");
          return;
        }

        const { data: teacherInfo, error: teacherError } = await supabase
          .from("teacher_info")
          .select("title, user_info(name, avatar_url)")
          .eq("id", user.id)
          .maybeSingle();

        if (teacherError) {
          console.error("Error fetching teacher info:", teacherError);
        }

        setCourse(data);
        setContext({
          teacherName: teacherInfo?.user_info?.name || user.name,
          teacherTitle: teacherInfo?.title || null,
          teacherAvatarUrl: teacherInfo?.user_info?.avatar_url || null,
        });
        const baseHours = Math.max(1, Math.ceil((data.durationMinutes || 60) / 60));
        setSelectedHours(baseHours);
      } catch (err: any) {
        console.error("Error loading preview:", err);
        setError("載入預覽失敗，請稍後再試。");
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [courseId]);

  const errorMessage = useMemo(() => error, [error]);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
        <div className="container mx-auto max-w-6xl p-6 md:p-10 text-center text-slate-500">
          正在載入學生預覽...
        </div>
      </div>
    );
  }

  if (!course || errorMessage) {
    return (
      <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
        <div className="container mx-auto max-w-6xl p-6 md:p-10">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
            {errorMessage || "找不到課程內容。"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <StudentCourseDetailView
      course={course}
      context={context}
      selectedHours={selectedHours}
      onHoursChange={setSelectedHours}
      backHref="/teacher/courses"
      backLabel="返回課程列表"
      hideActions
    />
  );
}
