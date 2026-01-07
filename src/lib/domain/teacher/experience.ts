export interface TeacherExperience {
  id: string;
  teacher_id: string;
  title: string;
  organization: string;
  start_date: string; // ISO date string YYYY-MM-DD
  end_date: string | null; // ISO date string YYYY-MM-DD, null means Present
  description: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateTeacherExperienceDTO = Omit<TeacherExperience, 'id' | 'created_at' | 'updated_at' | 'teacher_id'>;
export type UpdateTeacherExperienceDTO = Partial<CreateTeacherExperienceDTO>;
