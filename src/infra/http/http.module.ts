import { AuthenticateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/authenticate-deliveryman";
import { ChangeDeliverymanPasswordUseCase } from "@/domain/delivery/application/use-cases/change-deliveryman-password";
import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery";
import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { CreateRecipientUseCase } from "@/domain/delivery/application/use-cases/create-recipient";
import { DeleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/delete-delivery";
import { DeleteDeliverymanUseCase } from "@/domain/delivery/application/use-cases/delete-deliveryman";
import { DeleteRecipientUseCase } from "@/domain/delivery/application/use-cases/delete-recipient";
import { EditDeliverymanUseCase } from "@/domain/delivery/application/use-cases/edit-deliveryman";
import { EditRecipientUseCase } from "@/domain/delivery/application/use-cases/edit-recipient";
import { ChangeDeliveryStatusFactory } from "@/domain/delivery/application/use-cases/factories/change-delivery-status-factory";
import { GetDeliverymanByIdUseCase } from "@/domain/delivery/application/use-cases/get-deliveryman-by-id";
import { GetRecipientByIdUseCase } from "@/domain/delivery/application/use-cases/get-recipient-by-id";
import { ListDeliveriesByDeliverymanUseCase } from "@/domain/delivery/application/use-cases/list-deliveries-by-deliveryman";
import { ListDeliveriesNearbyDeliverymanUseCase } from "@/domain/delivery/application/use-cases/list-deliveries-nearby-deliveryman";
import { MarkDeliveryStatusAsDeliveredUseCase } from "@/domain/delivery/application/use-cases/mark-delivery-status-as-delivered";
import { MarkDeliveryStatusAsReturnedUseCase } from "@/domain/delivery/application/use-cases/mark-delivery-status-as-returned";
import { MarkDeliveryStatusAsWaitingUseCase } from "@/domain/delivery/application/use-cases/mark-delivery-status-as-waiting";
import { MarkDeliveryStatusAsWithdrawnUseCase } from "@/domain/delivery/application/use-cases/mark-delivery-status-as-withdrawn";
import { Module } from "@nestjs/common";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { AttachmentsController } from "./controllers/attachments.controller";
import { AuthController } from "./controllers/auth.controller";
import { DeliveriesController } from "./controllers/deliveries.controller";
import { DeliverymenController } from "./controllers/deliverymen.controller";
import { RecipientsController } from "./controllers/recipients.controller";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    DeliverymenController,
    RecipientsController,
    AuthController,
    DeliveriesController,
    AttachmentsController,
  ],
  providers: [
    CreateDeliverymanUseCase,
    GetDeliverymanByIdUseCase,
    DeleteDeliverymanUseCase,
    EditDeliverymanUseCase,
    CreateRecipientUseCase,
    GetRecipientByIdUseCase,
    DeleteRecipientUseCase,
    EditRecipientUseCase,
    ListDeliveriesByDeliverymanUseCase,
    CreateDeliveryUseCase,
    DeleteDeliveryUseCase,
    MarkDeliveryStatusAsDeliveredUseCase,
    MarkDeliveryStatusAsReturnedUseCase,
    MarkDeliveryStatusAsWaitingUseCase,
    MarkDeliveryStatusAsWithdrawnUseCase,
    ChangeDeliveryStatusFactory,
    ChangeDeliverymanPasswordUseCase,
    ListDeliveriesNearbyDeliverymanUseCase,
    AuthenticateDeliverymanUseCase,
  ],
})
export class HttpModule {}
