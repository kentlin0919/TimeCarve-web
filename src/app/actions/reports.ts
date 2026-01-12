'use server';

import { createClient } from "@/lib/supabase/server";
import { SupabaseReportRepository } from "@/lib/infrastructure/reports/SupabaseReportRepository";
import { TransactionFilter } from "@/lib/domain/reports/ReportRepository";

async function getRepository() {
  const supabase = await createClient();
  return new SupabaseReportRepository(supabase);
}

export async function getReportStats(startDateStr: string, endDateStr: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const repo = new SupabaseReportRepository(supabase);
  return repo.getStats(user.id, new Date(startDateStr), new Date(endDateStr));
}

export async function getRevenueTrends(range: '6_months' | 'year') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const repo = new SupabaseReportRepository(supabase);
  return repo.getRevenueTrends(user.id, range);
}

export async function getCourseRevenueDistribution() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const repo = new SupabaseReportRepository(supabase);
  return repo.getCourseRevenueDistribution(user.id);
}

export async function getTransactionList(filter: TransactionFilter) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const repo = new SupabaseReportRepository(supabase);
  return repo.getTransactions(user.id, filter);
}
