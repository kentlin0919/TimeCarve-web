'use server'

import { GetTeacherStudentsUseCase } from "@/lib/application/teacher/GetTeacherStudentsUseCase";
import { SupabaseTeacherRepository } from "@/lib/infrastructure/teacher/SupabaseTeacherRepository";
import { createClient } from "@/lib/supabase/server";

export async function getTeacherStudents() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const teacherRepo = new SupabaseTeacherRepository(supabase);
  const useCase = new GetTeacherStudentsUseCase(teacherRepo);

  return await useCase.execute(user.id);
}
