import { Booking } from "@/lib/domain/booking/entity";
import { BookingRepository } from "@/lib/domain/booking/repository";
import { supabase as defaultClient } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseBookingRepository implements BookingRepository {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || defaultClient;
  }

  async getBookings(teacherId: string, startDate: string, endDate: string): Promise<Booking[]> {
    const { data, error } = await this.client
      .from("bookings")
      .select(`
        *,
        student:student_info (
          user:user_info (
            name,
            email
          )
        ),
        course:courses (
          title
        )
      `)
      .eq("teacher_id", teacherId)
      // .eq("status", "confirmed") // Removed filter to show all bookings in calendar for now
      .neq("status", "cancelled")
      .neq("status", "rejected")
      .gte("booking_date", startDate)
      .lte("booking_date", endDate);

    if (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      teacherId: item.teacher_id,
      studentId: item.student_id,
      courseId: item.course_id,
      bookingDate: item.booking_date,
      startTime: item.start_time,
      endTime: item.end_time,
      status: item.status,
      studentName: item.student?.user?.name || "Unknown",
      studentEmail: item.student?.user?.email || "",
      courseTitle: item.course?.title || "",
    }));

  }

  async createBooking(booking: Omit<Booking, "id" | "status" | "studentName" | "studentEmail" | "courseTitle">): Promise<Booking> {
    const { data, error } = await this.client
      .from("bookings")
      .insert({
        teacher_id: booking.teacherId,
        student_id: booking.studentId,
        course_id: booking.courseId,
        booking_date: booking.bookingDate,
        start_time: booking.startTime,
        end_time: booking.endTime,
        status: "pending",
        notes: booking.notes,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      throw error;
    }

    return {
      id: data.id,
      teacherId: data.teacher_id,
      studentId: data.student_id,
      courseId: data.course_id,
      bookingDate: data.booking_date,
      startTime: data.start_time,
      endTime: data.end_time,
      status: data.status,
      notes: data.notes,
    };
  }
}
