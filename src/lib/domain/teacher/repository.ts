import { TeacherProfile, TeacherEducation } from "./entity";

export interface TeacherRepository {
  getProfile(userId: string): Promise<TeacherProfile | null>;
  updateProfile(userId: string, profile: Partial<TeacherProfile>): Promise<void>;
  
  // Education management
  addEducation(userId: string, education: Omit<TeacherEducation, "id" | "teacherId">): Promise<TeacherEducation | null>;
  deleteEducation(id: string): Promise<void>;
}
