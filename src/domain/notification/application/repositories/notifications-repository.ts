import { Notification } from "../../enterprise/entities/notification";

export abstract class NotificationRepository {
  abstract findById(id: string): Promise<Notification | null>;
  abstract createNotification(notification: Notification): Promise<void>;
  abstract saveNotification(notification: Notification): Promise<void>;
}
