import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymanController } from "./controllers/deliveryman.controller";
import { GetDeliverymanByIdUseCase } from "@/domain/delivery/application/use-cases/get-deliveryman-by-id";

@Module({
  imports: [DatabaseModule],
  controllers: [DeliverymanController, AuthController],
  providers: [CreateDeliverymanUseCase, GetDeliverymanByIdUseCase],
})
export class HttpModule {}
