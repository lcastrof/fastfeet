import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { NotificationRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRootModuleConfig } from "./typeorm/config";
import { Attachment } from "./typeorm/entities/attachment.entity";
import { Delivery } from "./typeorm/entities/delivery.entity";
import { Notification } from "./typeorm/entities/notification.entity";
import { Permission } from "./typeorm/entities/permisison.entity";
import { Recipient } from "./typeorm/entities/recipient.entity";
import { User } from "./typeorm/entities/user.entity";
import { TypeormAttachmentRepository } from "./typeorm/repositories/typeorm-attachment-repository";
import { TypeormDeliveryRepository } from "./typeorm/repositories/typeorm-delivery-repository";
import { TypeormDeliverymanRepository } from "./typeorm/repositories/typeorm-deliveryman-repository";
import { TypeormNotificationRepository } from "./typeorm/repositories/typeorm-notification-repository";
import { TypeormRecipientRepository } from "./typeorm/repositories/typeorm-recipient-repository";

@Module({
  imports: [
    TypeOrmRootModuleConfig,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Attachment]),
    TypeOrmModule.forFeature([Delivery]),
    TypeOrmModule.forFeature([Recipient]),
    TypeOrmModule.forFeature([Notification]),
  ],
  providers: [
    {
      provide: DeliverymanRepository,
      useClass: TypeormDeliverymanRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: TypeormAttachmentRepository,
    },
    {
      provide: DeliveryRepository,
      useClass: TypeormDeliveryRepository,
    },
    {
      provide: RecipientRepository,
      useClass: TypeormRecipientRepository,
    },
    {
      provide: NotificationRepository,
      useClass: TypeormNotificationRepository,
    },
  ],
  exports: [
    DeliverymanRepository,
    AttachmentRepository,
    DeliveryRepository,
    RecipientRepository,
    NotificationRepository,
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
