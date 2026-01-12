import { NotificationRepository } from "@/lib/domain/notification/repository";
import { Notification } from "@/lib/domain/notification/entity";

export class GetMyNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(userId: string): Promise<Notification[]> {
    return this.notificationRepository.getNotifications(userId);
  }
}
