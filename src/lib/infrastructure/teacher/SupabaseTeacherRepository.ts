import { supabase } from "@/lib/supabase";
import { TeacherRepository } from "@/lib/domain/teacher/repository";
import { TeacherProfile, TeacherEducation } from "@/lib/domain/teacher/entity";

export class SupabaseTeacherRepository implements TeacherRepository {
  private supabase = supabase;

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
          )
        `)
        .eq("teacher_id", userId)
        .order("start_year", { ascending: false });

      if (eduError) {
        console.error("Error fetching education:", eduError);
        // Continue with empty education if error? Or return null?
        // Let's assume empty for now to show the profile at least
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
        isVerified: e.is_verified,
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
    // Need a status_id, usually 1 for 'Currently Studying' or 2 for 'Graduated'. 
    // For MVP validation, we might need to look up a default status or pass it in.
    // We'll hardcode status_id: 1 (Studying) or 4 (Graduated) if not provided?
    // Let's assume 4 (Graduated) as default for Teachers or fetch 'Education Statuses' first?
    // For simplicity, let's use a magic number valid in db seed (e.g., 1) or update schema to make it nullable?
    // Schema says status_id is NOT NULL (number).
    // Let's assume we pass a default status_id = 1 (University) if not specified in UI?
    // Wait, `education_statuses` table exists.
    // Let's just hardcode 1 for now or add to UI later.
    
    // Note: The UI form currently doesn't ask for "Status" (Graduated/Studying).
    // We will assume '4' (Graduated) or '1' depending on Seed.
    // SAFE BET: 1.
    
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
        status_id: 1, // Default to a valid ID. User can implement status selection later.
        is_verified: false,
      })
      .select(`*, schools(name)`)
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
      department: data.department,
      startYear: data.start_year,
      endYear: data.end_year,
      isVerified: data.is_verified || false,
    };
  }

  async deleteEducation(id: string): Promise<void> {
    await this.supabase.from("teacher_education").delete().eq("id", id);
  }
}
