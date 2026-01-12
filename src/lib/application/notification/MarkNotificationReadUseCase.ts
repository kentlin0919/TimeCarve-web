import { NotificationRepository } from "@/lib/domain/notification/repository";

export class MarkNotificationReadUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(id: string): Promise<void> {
    return this.notificationRepository.markAsRead(id);
  }
}
