import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Course } from '@/lib/domain/course/entity';
import { SupabaseCourseRepository } from '@/lib/infrastructure/course/SupabaseCourseRepository';

export function useStudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const supabase = createClient();

        // 1. Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("尚未登入");

        // 2. Get student info to find bound teacher
        const { data: studentInfo, error: studentError } = await supabase
          .from('student_info')
          .select('teacher_code')
          .eq('id', user.id)
          .single();

        if (studentError) throw new Error("找不到學生資料");
        if (!studentInfo.teacher_code) throw new Error("尚未綁定老師");

        // 3. Get teacher info to get teacher_id
        const { data: teacherInfo, error: teacherError } = await supabase
          .from('teacher_info')
          .select('id')
          .eq('teacher_code', studentInfo.teacher_code)
          .single();

        if (teacherError || !teacherInfo) throw new Error("找不到綁定的老師資料");

        // 4. Get courses using Repository
        const courseRepo = new SupabaseCourseRepository();
        const teacherCourses = await courseRepo.getTeacherCourses(teacherInfo.id);

        setCourses(teacherCourses.filter(c => c.isActive)); // Only show active courses

      } catch (err: any) {
        console.error(err);
        setError(err.message || "載入課程失敗");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
