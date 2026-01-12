'use server'

import { SupabaseBookingRepository } from "@/lib/infrastructure/booking/SupabaseBookingRepository";
import { createClient } from "@/lib/supabase/server";

export async function getAdminBookingStats(startDate: Date, endDate: Date) {
  const supabase = await createClient();

  // 1. Verify Admin
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    throw new Error("Unauthorized");
  }

  const { data: userInfo, error: userInfoError } = await supabase
    .from("user_info")
    .select("identity_id")
    .eq("id", authUser.id)
    .single();

  if (userInfoError || !userInfo || userInfo.identity_id !== 1) {
    throw new Error("Unauthorized: Admin access required");
  }

  // 2. Fetch Data
  const bookingRepo = new SupabaseBookingRepository(supabase);
  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  const bookings = await bookingRepo.getAllBookings(startStr, endStr);

  // 3. Process Data
  let totalRevenue = 0;
  let totalProjectedRevenue = 0;
  let totalBookings = bookings.length;

  const teacherStatsMap = new Map<string, {
    teacherId: string;
    teacherName: string;
    bookingsCount: number;
    pendingRevenue: number;
    receivedRevenue: number;
    projectedRevenue: number;
  }>();

  for (const booking of bookings) {
    const price = booking.coursePrice || 0;
    
    // Summary
    totalProjectedRevenue += price;
    if (booking.status === 'confirmed' || booking.status === 'completed') {
      totalRevenue += price;
    }

    // Per Teacher
    if (!teacherStatsMap.has(booking.teacherId)) {
      teacherStatsMap.set(booking.teacherId, {
        teacherId: booking.teacherId,
        teacherName: booking.teacherName || "Unknown",
        bookingsCount: 0,
        pendingRevenue: 0,
        receivedRevenue: 0,
        projectedRevenue: 0,
      });
    }

    const teacherStat = teacherStatsMap.get(booking.teacherId)!;
    teacherStat.bookingsCount += 1;
    teacherStat.projectedRevenue += price;

    if (booking.status === 'pending') {
      teacherStat.pendingRevenue += price;
    } else if (booking.status === 'confirmed' || booking.status === 'completed') {
      teacherStat.receivedRevenue += price;
    }
  }

  return {
    summary: {
      totalBookings,
      totalRevenue, // Received
      totalProjectedRevenue,
    },
    byTeacher: Array.from(teacherStatsMap.values()).sort((a, b) => b.projectedRevenue - a.projectedRevenue),
  };
}
