import { Booking } from "@/lib/domain/booking/entity";
import { BookingRepository } from "@/lib/domain/booking/repository";

export class CreateBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(
    booking: Omit<Booking, "id" | "status" | "studentName" | "studentEmail" | "courseTitle">
  ): Promise<Booking> {
    // We could add validation here, e.g., checking availability again,
    // ensuring start time < end time, etc.
    // For now, simple pass-through.
    return await this.bookingRepository.createBooking(booking);
  }
}
