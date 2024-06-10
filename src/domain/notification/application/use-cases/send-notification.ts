import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { NotificationRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Injectable } from "@nestjs/common";

interface SendNotificationRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationResponse = Either<null, { notification: Notification }>;

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });
    await this.notificationRepository.createNotification(notification);

    return right({ notification });
  }
}
