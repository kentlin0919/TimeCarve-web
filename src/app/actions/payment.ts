'use server'

import { createClient } from "@/lib/supabase/server";

export type PaymentRecord = {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  price: number;
  student_name: string;
  student_email: string;
  student_avatar_url: string | null;
  course_title: string;
  is_overdue: boolean;
};

export type PaymentSummary = {
  total_projected: number;
  total_received: number;
  pending_count: number;
  overdue_count: number;
  overdue_amount: number;
};

export async function getTeacherPayments(
  year: number,
  month: number,
  searchQuery?: string
): Promise<{ records: PaymentRecord[]; summary: PaymentSummary }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  // Calculate start and end date for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of month

  const startStr = startDate.toISOString().split("T")[0]; // YYYY-MM-DD
  const endStr = endDate.toISOString().split("T")[0];

  let query = supabase
    .from("bookings")
    .select(`
      id,
      booking_date,
      start_time,
      end_time,
      booking_statuses(status_key),
      course:courses(title, price),
      student:student_info(
        user:user_info(name, email, avatar_url)
      )
    `)
    .eq("teacher_id", user.id)
    .gte("booking_date", startStr)
    .lte("booking_date", endStr);

  const { data: bookings, error } = await query;

  if (error) {
    console.error("Error fetching payments detailed:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to fetch payments: ${error.message} (Details: ${error.details || 'none'}, Hint: ${error.hint || 'none'})`);
  }

  const now = new Date();
  
  const records: PaymentRecord[] = [];
  let summary: PaymentSummary = {
    total_projected: 0,
    total_received: 0,
    pending_count: 0,
    overdue_count: 0,
    overdue_amount: 0,
  };

  for (const booking of bookings || []) {
    // @ts-ignore
    const course = booking.course as { title: string; price: number } | null;
    // @ts-ignore
    const studentUser = booking.student?.user as { name: string; email: string; avatar_url: string | null } | null;
    // @ts-ignore
    const statusKey = booking.booking_statuses?.status_key as string || 'pending';
    
    // Filter by search query if present
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = studentUser?.name.toLowerCase().includes(q);
      const matchCourse = course?.title.toLowerCase().includes(q);
      if (!matchName && !matchCourse) continue;
    }

    const price = course?.price || 0;
    // Map status_key to our frontend status (assuming they match roughly or we map them)
    // Common keys: 'pending', 'confirmed', 'completed', 'cancelled'
    const status = statusKey;

    const isPaid = status === 'completed' || status === 'confirmed';
    const isPending = status === 'pending';
    
    // Calculate Overdue
    const bookingEndDateTimeStr = `${booking.booking_date}T${booking.end_time}`;
    const bookingEndDate = new Date(bookingEndDateTimeStr);
    
    const isOverdue = isPending && bookingEndDate < now;

    records.push({
      id: booking.id,
      booking_date: booking.booking_date,
      start_time: booking.start_time,
      end_time: booking.end_time,
      status: status,
      price,
      student_name: studentUser?.name || "Unknown",
      student_email: studentUser?.email || "",
      student_avatar_url: studentUser?.avatar_url || null,
      course_title: course?.title || "Unknown Course",
      is_overdue: isOverdue,
    });

    // Update Summary
    summary.total_projected += price;
    if (isPaid) {
      summary.total_received += price;
    }
    if (isPending) {
        summary.pending_count += 1;
    }
    if (isOverdue) {
        summary.overdue_count += 1;
        summary.overdue_amount += price;
    }
  }

  // Sort by date desc
  records.sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime());

  return { records, summary };
}
