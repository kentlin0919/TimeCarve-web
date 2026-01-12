import { NotificationRepository } from "@/lib/domain/notification/repository";
import { NotificationType } from "@/lib/domain/notification/entity";

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(userId: string, type: NotificationType, title: string, content: string, data?: Record<string, any>): Promise<void> {
    return this.notificationRepository.createNotification(userId, type, title, content, data);
  }
}
