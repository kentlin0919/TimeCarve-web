import { TeacherExperience, CreateTeacherExperienceDTO, UpdateTeacherExperienceDTO } from './experience';

export interface TeacherExperienceRepository {
  getExperience(teacherId: string): Promise<TeacherExperience[]>;
  addExperience(teacherId: string, experience: CreateTeacherExperienceDTO): Promise<TeacherExperience>;
  updateExperience(id: string, experience: UpdateTeacherExperienceDTO): Promise<TeacherExperience>;
  deleteExperience(id: string): Promise<void>;
}
