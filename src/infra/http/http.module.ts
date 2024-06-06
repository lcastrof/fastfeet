import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { CreateRecipientUseCase } from "@/domain/delivery/application/use-cases/create-recipient";
import { DeleteDeliverymanUseCase } from "@/domain/delivery/application/use-cases/delete-deliveryman";
import { DeleteRecipientUseCase } from "@/domain/delivery/application/use-cases/delete-recipient";
import { EditDeliverymanUseCase } from "@/domain/delivery/application/use-cases/edit-deliveryman";
import { EditRecipientUseCase } from "@/domain/delivery/application/use-cases/edit-recipient";
import { GetDeliverymanByIdUseCase } from "@/domain/delivery/application/use-cases/get-deliveryman-by-id";
import { GetRecipientByIdUseCase } from "@/domain/delivery/application/use-cases/get-recipient-by-id";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymenController } from "./controllers/deliverymen.controller";
import { RecipientsController } from "./controllers/recipients.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [DeliverymenController, RecipientsController, AuthController],
  providers: [
    CreateDeliverymanUseCase,
    GetDeliverymanByIdUseCase,
    DeleteDeliverymanUseCase,
    EditDeliverymanUseCase,
    CreateRecipientUseCase,
    GetRecipientByIdUseCase,
    DeleteRecipientUseCase,
    EditRecipientUseCase,
  ],
})
export class HttpModule {}
