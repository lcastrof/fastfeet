import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { DeleteDeliverymanUseCase } from "@/domain/delivery/application/use-cases/delete-deliveryman";
import { GetDeliverymanByIdUseCase } from "@/domain/delivery/application/use-cases/get-deliveryman-by-id";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymanController } from "./controllers/deliveryman.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [DeliverymanController, AuthController],
  providers: [
    CreateDeliverymanUseCase,
    GetDeliverymanByIdUseCase,
    DeleteDeliverymanUseCase,
  ],
})
export class HttpModule {}
