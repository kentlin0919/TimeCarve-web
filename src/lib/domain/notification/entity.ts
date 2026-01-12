export type NotificationType = 'SYSTEM' | 'BOOKING' | 'ANNOUNCEMENT';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  data?: Record<string, any> | null;
  isRead: boolean;
  createdAt: Date;
}
