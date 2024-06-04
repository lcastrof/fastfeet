import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attachment } from "../database/typeorm/entities/attachment.entity";
import { Delivery } from "../database/typeorm/entities/delivery.entity";
import { Permission } from "../database/typeorm/entities/permisison.entity";
import { Recipient } from "../database/typeorm/entities/recipient.entity";
import { User } from "../database/typeorm/entities/user.entity";
import { TypeormAttachmentRepository } from "../database/typeorm/repositories/typeorm-attachment-repository";
import { TypeormDeliveryRepository } from "../database/typeorm/repositories/typeorm-delivery-repository";
import { TypeormDeliverymanRepository } from "../database/typeorm/repositories/typeorm-deliveryman-repository";
import { TypeormRecipientRepository } from "../database/typeorm/repositories/typeorm-recipient-repository";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymanController } from "./controllers/deliveryman.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Attachment]),
    TypeOrmModule.forFeature([Delivery]),
    TypeOrmModule.forFeature([Recipient]),
  ],
  controllers: [DeliverymanController, AuthController],
  providers: [
    CreateDeliverymanUseCase,
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
  ],
})
export class HttpModule {}
