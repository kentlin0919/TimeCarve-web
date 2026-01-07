import { AvailabilityRepository, TeacherAvailabilityWeekly, TeacherAvailabilityOverride } from "@/lib/domain/teacher/AvailabilityRepository";

export class SaveTeacherAvailabilityUseCase {
  constructor(private availabilityRepo: AvailabilityRepository) {}

  async executeWeekly(teacherId: string, availability: Omit<TeacherAvailabilityWeekly, "id">[]): Promise<void> {
    // Validate inputs if necessary (e.g., endTime > startTime)
    for (const slot of availability) {
      if (slot.startTime >= slot.endTime) {
        throw new Error(`Invalid time slot for day ${slot.dayOfWeek}: Start time must be before end time.`);
      }
    }
    await this.availabilityRepo.saveWeeklyAvailability(teacherId, availability);
  }

  async executeOverrides(teacherId: string, date: string, overrides: Omit<TeacherAvailabilityOverride, "id">[]): Promise<void> {
    for (const ov of overrides) {
      if (ov.startTime && ov.endTime && ov.startTime >= ov.endTime) {
         throw new Error("Invalid override time slot: Start time must be before end time.");
      }
    }
    await this.availabilityRepo.saveOverrides(teacherId, date, overrides);
  }

  async deleteOverride(overrideId: string): Promise<void> {
    await this.availabilityRepo.deleteOverride(overrideId);
  }
}
