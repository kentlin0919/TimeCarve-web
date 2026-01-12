import { Notification } from '@/lib/domain/notification/entity';

export type NotificationDisplay = Omit<Notification, 'createdAt'> & {
  createdAt: string;
};
