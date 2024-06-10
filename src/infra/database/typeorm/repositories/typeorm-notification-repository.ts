import { NotificationRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification as TypeOrmNotificationEntity } from "../entities/notification.entity";
import { TypeormNotificationMapper } from "../mappers/typeorm-notification-mapper";

@Injectable()
export class TypeormNotificationRepository
  extends Repository<TypeOrmNotificationEntity>
  implements NotificationRepository
{
  constructor(
    @InjectRepository(TypeOrmNotificationEntity)
    private notificationRepository: Repository<TypeOrmNotificationEntity>,
  ) {
    super(
      notificationRepository.target,
      notificationRepository.manager,
      notificationRepository.queryRunner,
    );
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.notificationRepository.findOneBy({
      id: Number(id),
    });

    if (!notification) {
      return null;
    }

    return TypeormNotificationMapper.toDomain(notification);
  }

  async createNotification(notification: Notification): Promise<void> {
    await this.notificationRepository.save(
      TypeormNotificationMapper.toPersistence(notification),
    );
  }

  async saveNotification(notification: Notification): Promise<void> {
    const data = TypeormNotificationMapper.toPersistence(notification);

    await this.notificationRepository.save(data);
  }
}
