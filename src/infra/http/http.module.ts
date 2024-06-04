import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymanController } from "./controllers/deliveryman.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [DeliverymanController, AuthController],
  providers: [CreateDeliverymanUseCase],
})
export class HttpModule {}
