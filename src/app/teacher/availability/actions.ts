"use server";

import { createClient } from "@/lib/supabase/server";
import { SupabaseAvailabilityRepository } from "@/lib/infrastructure/teacher/SupabaseAvailabilityRepository";
import { SaveTeacherAvailabilityUseCase } from "@/lib/application/teacher/SaveTeacherAvailabilityUseCase";
import { GetTeacherAvailabilityUseCase } from "@/lib/application/teacher/GetTeacherAvailabilityUseCase";
import { TeacherAvailabilityWeekly, TeacherAvailabilityOverride } from "@/lib/domain/teacher/AvailabilityRepository";
import { revalidatePath } from "next/cache";

// Initializing Repository and Use Cases
// In a real DI container this would be cleaner, but for Server Actions we instantiate per request or globally if stateless
const getRepo = async () => {
    const supabase = await createClient();
    return new SupabaseAvailabilityRepository(supabase);
};

export async function getTeacherAvailability(teacherId: string, startDate: string, endDate: string) {
    const repo = await getRepo();
    const useCase = new GetTeacherAvailabilityUseCase(repo);
    return await useCase.execute(teacherId, startDate, endDate);
}

export async function saveWeeklyAvailability(teacherId: string, availability: Omit<TeacherAvailabilityWeekly, "id">[]) {
    const repo = await getRepo();
    const useCase = new SaveTeacherAvailabilityUseCase(repo);
    try {
        await useCase.executeWeekly(teacherId, availability);
        revalidatePath("/teacher/availability");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function saveOverrides(teacherId: string, date: string, overrides: Omit<TeacherAvailabilityOverride, "id">[]) {
    const repo = await getRepo();
    const useCase = new SaveTeacherAvailabilityUseCase(repo);
    try {
        await useCase.executeOverrides(teacherId, date, overrides);
        revalidatePath("/teacher/availability");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteOverride(overrideId: string) {
    const repo = await getRepo();
    const useCase = new SaveTeacherAvailabilityUseCase(repo);
    try {
        await useCase.deleteOverride(overrideId);
        revalidatePath("/teacher/availability");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Helper to get recurring settings specifically (bypassing the merged view if needed for the settings form)
export async function getWeeklySettings(teacherId: string) {
  const repo = await getRepo();
  return await repo.getWeeklyAvailability(teacherId);
}
