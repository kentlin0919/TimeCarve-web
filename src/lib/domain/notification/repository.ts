import { Notification, NotificationType } from './entity';

export interface NotificationRepository {
  getNotifications(userId: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  createNotification(userId: string, type: NotificationType, title: string, content: string, data?: Record<string, any>): Promise<void>;
}
