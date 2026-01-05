import { AvailabilityRepository, TeacherAvailabilityWeekly, TeacherAvailabilityOverride } from "@/lib/domain/teacher/AvailabilityRepository";
import { BookingRepository, Booking } from "@/lib/domain/booking/repository";

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export class GetAvailableSlotsUseCase {
  constructor(
    private availabilityRepository: AvailabilityRepository,
    private bookingRepository: BookingRepository
  ) {}

  async execute(
    teacherId: string,
    startDate: Date,
    endDate: Date,
    durationMinutes: number
  ): Promise<TimeSlot[]> {
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    const [weeklyAvailability, overrides, bookings] = await Promise.all([
      this.availabilityRepository.getWeeklyAvailability(teacherId),
      this.availabilityRepository.getOverrides(teacherId, startStr, endStr),
      this.bookingRepository.getBookings(teacherId, startStr, endStr),
    ]);

    const availableSlots: TimeSlot[] = [];
    const current = new Date(startDate);
    
    // Normalize time part?
    // We treat dates as YYYY-MM-DD, iterate day by day.
    
    while (current <= endDate) {
      const dateStr = current.toISOString().split("T")[0];
      const dayOfWeek = current.getDay(); // 0 is Sunday

      // 1. Determine Availability for this day
      let start: string | null = null;
      let end: string | null = null;

      const override = overrides.find((o) => o.date === dateStr);
      if (override) {
        if (!override.isUnavailable && override.startTime && override.endTime) {
          start = override.startTime;
          end = override.endTime;
        }
        // If unavailable, start/end remain null
      } else {
        const weekly = weeklyAvailability.find((w) => w.dayOfWeek === dayOfWeek);
        if (weekly) {
          start = weekly.startTime;
          end = weekly.endTime;
        }
      }

      if (start && end) {
        // 2. Generate slots
        const slots = this.generateSlots(dateStr, start, end, durationMinutes);
        
        // 3. Filter overlapping bookings
        const dayBookings = bookings.filter((b) => b.bookingDate === dateStr);
        
        for (const slot of slots) {
          if (!this.isOverlapping(slot, dayBookings)) {
            availableSlots.push(slot);
          }
        }
      }

      // Next day
      current.setDate(current.getDate() + 1);
    }

    return availableSlots;
  }

  private generateSlots(date: string, start: string, end: string, duration: number): TimeSlot[] {
    const slots: TimeSlot[] = [];
    
    // Helper to convert time string to minutes
    const toMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };
    
    // Helper to convert minutes to time string HH:mm
    const toTimeStr = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    let currentMins = toMinutes(start);
    const endMins = toMinutes(end);

    while (currentMins + duration <= endMins) {
      slots.push({
        date,
        startTime: toTimeStr(currentMins),
        endTime: toTimeStr(currentMins + duration),
      });
      currentMins += duration; // No buffer time for now? Or add buffer?
      // Requirement didn't specify buffer.
    }

    return slots;
  }

  private isOverlapping(slot: TimeSlot, bookings: Booking[]): boolean {
    const toMinutes = (time: string) => {
      const parts = time.split(":"); // might be HH:MM:SS or HH:MM
      const h = parseInt(parts[0]);
      const m = parseInt(parts[1]);
      return h * 60 + m;
    };

    const slotStart = toMinutes(slot.startTime);
    const slotEnd = toMinutes(slot.endTime);

    return bookings.some((booking) => {
      const bStart = toMinutes(booking.startTime);
      const bEnd = toMinutes(booking.endTime);

      // Overlap logic: (StartA < EndB) and (EndA > StartB)
      return slotStart < bEnd && slotEnd > bStart;
    });
  }
}
