'use server'

import { SupabaseTeacherRepository } from "@/lib/infrastructure/teacher/SupabaseTeacherRepository";
import { createClient } from "@/lib/supabase/server";

export async function getTeacherProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const repo = new SupabaseTeacherRepository(supabase);
  return await repo.getProfile(user.id);
}
