import { TeacherRepository, StudentBasicInfo } from "@/lib/domain/teacher/repository";

export class GetTeacherStudentsUseCase {
  constructor(private teacherRepository: TeacherRepository) {}

  async execute(teacherId: string): Promise<StudentBasicInfo[]> {
    return await this.teacherRepository.getStudents(teacherId);
  }
}
