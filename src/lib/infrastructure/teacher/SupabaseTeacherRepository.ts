import { supabase as defaultClient } from "@/lib/supabase";
import { TeacherRepository } from "@/lib/domain/teacher/repository";
import { TeacherProfile, TeacherEducation } from "@/lib/domain/teacher/entity";
import { TeacherExperience } from "@/lib/domain/teacher/experience";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseTeacherRepository implements TeacherRepository {
  private supabase: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.supabase = client || defaultClient;
  }

  async getEducationStatuses(): Promise<{ id: number; label: string }[]> {
    const { data, error } = await this.supabase
      .from("education_statuses")
      .select("id, label_zh")
      .order("id");

    if (error) {
      console.error("Error fetching education statuses:", error);
      return [];
    }

    return data.map((s: any) => ({
      id: s.id,
      label: s.label_zh,
    }));
  }

  async getProfile(userId: string): Promise<TeacherProfile | null> {
    try {
      // 1. Fetch Teacher Info & User Info
      const { data: teacherData, error: teacherError } = await this.supabase
        .from("teacher_info")
        .select(`
          *,
          user_info!inner (
            email,
            name,
            phone,
            avatar_url
          )
        `)
        .eq("id", userId)
        .single();

      if (teacherError) {
        console.error("Error fetching teacher profile:", teacherError);
        return null;
      }

      // 2. Fetch Education
      const { data: educationData, error: eduError } = await this.supabase
        .from("teacher_education")
        .select(`
          *,
          schools (
            name
          ),
          education_statuses (
            label_zh
          )
        `)
        .eq("teacher_id", userId)
        .order("start_year", { ascending: false });

      // 3. Fetch Experience
      const { data: experienceData, error: expError } = await this.supabase
        .from("teacher_experience")
        .select("*")
        .eq("teacher_id", userId)
        .order("end_date", { ascending: false, nullsFirst: true })
        .order("start_date", { ascending: false });

      if (eduError) {
        console.error("Error fetching education:", eduError);
      }

      const educations: TeacherEducation[] = (educationData || []).map((e: any) => ({
        id: e.id,
        teacherId: e.teacher_id,
        schoolName: e.schools?.name || "Unknown School",
        schoolId: e.school_id,
        degree: e.degree,
        degreeLevel: e.degree_level,
        department: e.department,
        studyYear: e.study_year,
        startYear: e.start_year,
        endYear: e.end_year,
        statusId: e.status_id,
        statusLabel: e.education_statuses?.label_zh,
        isVerified: e.is_verified,
      }));

      const experiences: TeacherExperience[] = (experienceData || []).map((e: any) => ({
        id: e.id,
        teacher_id: e.teacher_id,
        title: e.title,
        organization: e.organization,
        start_date: e.start_date,
        end_date: e.end_date,
        description: e.description,
        is_current: e.is_current || false,
        created_at: e.created_at,
        updated_at: e.updated_at,
      }));

      const userInfo = teacherData.user_info as any;

      return {
        id: teacherData.id,
        email: userInfo.email,
        name: userInfo.name,
        phone: userInfo.phone,
        avatarUrl: userInfo.avatar_url,
        
        teacherCode: teacherData.teacher_code,
        title: teacherData.title,
        bio: teacherData.bio,
        experienceYears: teacherData.experience_years,
        basePrice: teacherData.base_price,
        specialties: teacherData.specialties || [],
        philosophyItems: (teacherData.philosophy_items as any) || [],
        philosophySubtitle: teacherData.philosophy_subtitle,
        isPublic: teacherData.is_public || false,
        
        googleCalendarEnabled: teacherData.google_calendar_enabled || false,
        lineNotifyEnabled: teacherData.line_notify_enabled || false,
        
        educations,
        experiences,
      };
    } catch (error) {
      console.error("Unexpected error in getProfile:", error);
      return null;
    }
  }

  async updateProfile(userId: string, profile: Partial<TeacherProfile>): Promise<void> {
    // Separate updates for user_info and teacher_info
    const userInfoUpdates: any = {};
    const teacherInfoUpdates: any = {};

    if (profile.name !== undefined) userInfoUpdates.name = profile.name;
    if (profile.phone !== undefined) userInfoUpdates.phone = profile.phone;
    if (profile.avatarUrl !== undefined) userInfoUpdates.avatar_url = profile.avatarUrl;

    if (profile.title !== undefined) teacherInfoUpdates.title = profile.title;
    if (profile.bio !== undefined) teacherInfoUpdates.bio = profile.bio;
    if (profile.experienceYears !== undefined) teacherInfoUpdates.experience_years = profile.experienceYears;
    if (profile.basePrice !== undefined) teacherInfoUpdates.base_price = profile.basePrice;
    if (profile.specialties !== undefined) teacherInfoUpdates.specialties = profile.specialties;
    if (profile.philosophyItems !== undefined) teacherInfoUpdates.philosophy_items = profile.philosophyItems;
    if (profile.philosophySubtitle !== undefined) teacherInfoUpdates.philosophy_subtitle = profile.philosophySubtitle;
    if (profile.isPublic !== undefined) teacherInfoUpdates.is_public = profile.isPublic;
    if (profile.googleCalendarEnabled !== undefined) teacherInfoUpdates.google_calendar_enabled = profile.googleCalendarEnabled;
    if (profile.lineNotifyEnabled !== undefined) teacherInfoUpdates.line_notify_enabled = profile.lineNotifyEnabled;

    // Execute updates in parallel
    const promises = [];

    if (Object.keys(userInfoUpdates).length > 0) {
      promises.push(
        this.supabase.from("user_info").update(userInfoUpdates).eq("id", userId)
      );
    }

    if (Object.keys(teacherInfoUpdates).length > 0) {
      promises.push(
        this.supabase.from("teacher_info").update(teacherInfoUpdates).eq("id", userId)
      );
    }

    await Promise.all(promises);
  }

  async addEducation(userId: string, education: Omit<TeacherEducation, "id" | "teacherId">): Promise<TeacherEducation | null> {
    const { data, error } = await this.supabase
      .from("teacher_education")
      .insert({
        teacher_id: userId,
        school_id: education.schoolId,
        degree: education.degree,
        degree_level: education.degreeLevel,
        department: education.department,
        start_year: education.startYear,
        end_year: education.endYear,
        status_id: education.statusId,
        is_verified: false,
      })
      .select(`
        *, 
        schools(name),
        education_statuses(label_zh)
      `)
      .single();

    if (error) {
      console.error("Error adding education:", error);
      return null;
    }

    return {
      id: data.id,
      teacherId: data.teacher_id,
      schoolName: data.schools?.name || "Unknown",
      schoolId: data.school_id,
      degree: data.degree,
      degreeLevel: data.degree_level,
      department: data.department,
      studyYear: data.study_year,
      startYear: data.start_year,
      endYear: data.end_year,
      statusId: data.status_id,
      statusLabel: data.education_statuses?.label_zh,
      isVerified: data.is_verified || false,
    };
  }

  async deleteEducation(id: string): Promise<void> {
    await this.supabase.from("teacher_education").delete().eq("id", id);
  }
}
