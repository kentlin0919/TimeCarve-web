import { AvailabilityRepository, TeacherAvailabilityWeekly, TeacherAvailabilityOverride } from "@/lib/domain/teacher/AvailabilityRepository";

export interface DateAvailability {
  date: string; // YYYY-MM-DD
  dayOfWeek: number;
  slots: { start: string; end: string }[];
  isUnavailable: boolean; // Explicitly marked as unavailable for the whole day
}

export class GetTeacherAvailabilityUseCase {
  constructor(private availabilityRepo: AvailabilityRepository) {}

  /**
   * Calculates the availability for a specific date range.
   * Merges weekly patterns with specific date overrides.
   */
  async execute(teacherId: string, startDate: string, endDate: string): Promise<DateAvailability[]> {
    const weeklyAvailability = await this.availabilityRepo.getWeeklyAvailability(teacherId);
    const overrides = await this.availabilityRepo.getOverrides(teacherId, startDate, endDate);

    const result: DateAvailability[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Loop through each day in the range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0]; // YYYY-MM-DD
      const dayOfWeek = d.getDay(); // 0-6

      // 1. Check for overrides first
      const override = overrides.find(o => o.date === dateString);

      if (override) {
        if (override.isUnavailable) {
          // Day is fully blocked
          result.push({
            date: dateString,
            dayOfWeek,
            slots: [],
            isUnavailable: true,
          });
        } else if (override.startTime && override.endTime) {
          // Distinct hours for this day
          result.push({
            date: dateString,
            dayOfWeek,
            slots: [{ start: override.startTime, end: override.endTime }],
            isUnavailable: false,
          });
        } else {
            // Override exists but no specific time and not unavailable? 
            // Treat as unavailable or use default logic? 
            // Assuming if isUnavailable is false but no times, strictly implies "no slots defined but available" which might mean full day?
            // For safety, if no times are set in override, we treat it as no slots.
             result.push({
                date: dateString,
                dayOfWeek,
                slots: [],
                isUnavailable: false, // Techincally not marked "unavailable" but has no slots
            });
        }
      } else {
        // 2. No override, check weekly availability
        const weeklySlots = weeklyAvailability.filter(w => w.dayOfWeek === dayOfWeek);
        
        if (weeklySlots.length > 0) {
          result.push({
            date: dateString,
            dayOfWeek,
            slots: weeklySlots.map(s => ({ start: s.startTime, end: s.endTime })),
            isUnavailable: false,
          });
        } else {
          // No weekly rule for this day
          result.push({
            date: dateString,
            dayOfWeek,
            slots: [],
            isUnavailable: false, // Just empty
          });
        }
      }
    }

    return result;
  }
}
