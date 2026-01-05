'use server'

import { GetAvailableSlotsUseCase } from "@/lib/application/booking/GetAvailableSlotsUseCase";
import { CreateBookingUseCase } from "@/lib/application/booking/CreateBookingUseCase";
import { SupabaseAvailabilityRepository } from "@/lib/infrastructure/teacher/SupabaseAvailabilityRepository";
import { SupabaseBookingRepository } from "@/lib/infrastructure/booking/SupabaseBookingRepository";
import { createClient } from "@/lib/supabase/server";

export async function getAvailableSlots(
    teacherId: string, 
    startDate: Date, 
    endDate: Date,
    durationMinutes: number
) {
    const supabase = await createClient();
    const availRepo = new SupabaseAvailabilityRepository(supabase);
    const bookingRepo = new SupabaseBookingRepository(supabase);
    const useCase = new GetAvailableSlotsUseCase(availRepo, bookingRepo);
    
    return await useCase.execute(teacherId, startDate, endDate, durationMinutes);
}

export async function getTeacherBookings(
    startDate: Date,
    endDate: Date
) {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    const bookingRepo = new SupabaseBookingRepository(supabase);
    
    // Format dates to YYYY-MM-DD string as expected by repository
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    
    
    return await bookingRepo.getBookings(user.id, startStr, endStr);
}

export async function createBooking(
    bookingData: {
        teacherId: string;
        studentId: string;
        courseId: string;
        bookingDate: string;
        startTime: string;
        endTime: string;
        notes?: string | null;
    }
) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    // Verify student is booking for themselves
    if (user.id !== bookingData.studentId) {
        // Option: allow admin/teacher to book for others?
        // strict rule: student must match auth user
        throw new Error("Unauthorized booking attempt");
    }

    const bookingRepo = new SupabaseBookingRepository(supabase);
    const useCase = new CreateBookingUseCase(bookingRepo);

    return await useCase.execute(bookingData);
}
