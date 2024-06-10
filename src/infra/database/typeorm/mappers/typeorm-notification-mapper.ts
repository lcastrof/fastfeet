import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Notification as TypeormNotificationEntity } from "../entities/notification.entity";

export class TypeormNotificationMapper {
  static toDomain(raw: TypeormNotificationEntity): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId.toString()),
        readAt: raw.readAt,
      },
      new UniqueEntityID(raw.id.toString()),
    );
  }

  static toPersistence(notification: Notification): TypeormNotificationEntity {
    const data = new TypeormNotificationEntity();
    if (Number.isInteger(Number(notification.id))) {
      data.id = Number(notification.id.toValue());
    }
    data.title = notification.title;
    data.content = notification.content;
    data.recipientId = Number(notification.recipientId.toValue());
    data.readAt = notification.readAt;

    return data;
  }
}
