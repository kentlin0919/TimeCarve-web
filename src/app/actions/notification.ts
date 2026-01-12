'use server'

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { SupabaseNotificationRepository } from "@/lib/infrastructure/notification/SupabaseNotificationRepository";
import { GetMyNotificationsUseCase } from "@/lib/application/notification/GetMyNotificationsUseCase";
import { MarkNotificationReadUseCase } from "@/lib/application/notification/MarkNotificationReadUseCase";
import { SendNotificationUseCase } from "@/lib/application/notification/SendNotificationUseCase";
import { NotificationType } from "@/lib/domain/notification/entity";

export async function getMyNotifications() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized");

  const repo = new SupabaseNotificationRepository(supabase);
  const useCase = new GetMyNotificationsUseCase(repo);
  const notifications = await useCase.execute(user.id);
  
  // Serialize dates
  return notifications.map(n => ({
    ...n,
    createdAt: n.createdAt.toISOString()
  }));
}

export async function markNotificationAsRead(id: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized");

  const repo = new SupabaseNotificationRepository(supabase);
  const useCase = new MarkNotificationReadUseCase(repo);
  await useCase.execute(id);
}

export async function sendNotification(
  targetUserId: string,
  type: NotificationType,
  title: string,
  content: string,
  data?: any
) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized");

  // Use Admin Client to send (bypass Insert RLS)
  const adminSupabase = createAdminClient();
  const repo = new SupabaseNotificationRepository(adminSupabase);
  const useCase = new SendNotificationUseCase(repo);
  
  await useCase.execute(targetUserId, type, title, content, data);
}
