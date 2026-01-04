export interface TeacherEducation {
  id: string;
  teacherId: string;
  schoolName: string; // school_id -> schools.name (joined)
  schoolId: string;
  degree: string | null;
  degreeLevel?: string | null;
  department: string | null;
  studyYear?: number | null;
  startYear: number | null;
  endYear: number | null;
  isVerified: boolean;
}

export interface TeacherProfile {
  id: string; // user_info.id
  email: string; // user_info.email
  name: string; // user_info.name
  phone: string | null; // user_info.phone
  avatarUrl: string | null; // user_info.avatar_url
  
  // Teacher Info specific
  teacherCode: string;
  title: string | null;
  bio: string | null;
  experienceYears: number | null;
  basePrice: number | null;
  specialties: string[];
  philosophyItems?: {
    title: string;
    description: string;
    icon: string;
  }[];
  isPublic: boolean;
  
  // Settings
  googleCalendarEnabled: boolean;
  lineNotifyEnabled: boolean;
  
  // Relations
  educations: TeacherEducation[];
}
