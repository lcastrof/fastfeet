import { NotificationRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    return (
      this.notifications.find(
        (notification) => notification.id.toString() === id,
      ) || null
    );
  }

  async createNotification(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async saveNotification(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    );

    this.notifications[index] = notification;
  }
}
