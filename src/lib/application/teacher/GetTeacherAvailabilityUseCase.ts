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
      const dayOverrides = overrides.filter(o => o.date === dateString);

      if (dayOverrides.length > 0) {
        const isUnavailable = dayOverrides.some(o => o.isUnavailable);

        if (isUnavailable) {
          // Day is fully blocked
          result.push({
            date: dateString,
            dayOfWeek,
            slots: [],
            isUnavailable: true,
          });
        } else {
          // Collect all slots for this day
          const slots = dayOverrides
            .filter(o => o.startTime && o.endTime)
            .map(o => ({ start: o.startTime!, end: o.endTime! }));

          result.push({
            date: dateString,
            dayOfWeek,
            slots,
            isUnavailable: false,
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
