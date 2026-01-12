import { TeacherProfile, TeacherEducation } from "./entity";

export interface StudentBasicInfo {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TeacherRepository {
  getProfile(userId: string): Promise<TeacherProfile | null>;
  updateProfile(userId: string, profile: Partial<TeacherProfile>): Promise<void>;
  
  // Education
  getEducationStatuses(): Promise<{ id: number; label: string }[]>;
  addEducation(userId: string, education: Omit<TeacherEducation, "id" | "teacherId">): Promise<TeacherEducation | null>;
  deleteEducation(id: string): Promise<void>;

  // Students
  getStudents(teacherId: string): Promise<StudentBasicInfo[]>;
}
