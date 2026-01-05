import { AvailabilityRepository, TeacherAvailabilityWeekly, TeacherAvailabilityOverride } from "@/lib/domain/teacher/AvailabilityRepository";
import { supabase as defaultClient } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAvailabilityRepository implements AvailabilityRepository {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || defaultClient;
  }

  async getWeeklyAvailability(teacherId: string): Promise<TeacherAvailabilityWeekly[]> {
    const { data, error } = await this.client
      .from("teacher_availability_weekly")
      .select("*")
      .eq("teacher_id", teacherId);

    if (error) {
      console.error("Error fetching weekly availability:", error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      teacherId: item.teacher_id,
      dayOfWeek: item.day_of_week,
      startTime: item.start_time,
      endTime: item.end_time,
    }));
  }

  async getOverrides(teacherId: string, startDate: string, endDate: string): Promise<TeacherAvailabilityOverride[]> {
    const { data, error } = await this.client
      .from("teacher_availability_overrides")
      .select("*")
      .eq("teacher_id", teacherId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) {
      console.error("Error fetching availability overrides:", error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      teacherId: item.teacher_id,
      date: item.date,
      startTime: item.start_time,
      endTime: item.end_time,
      isUnavailable: item.is_unavailable || false,
    }));
  }
}
