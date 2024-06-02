import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../database/typeorm/entities/user.entity";
import { TypeormDeliverymanRepository } from "../database/typeorm/repositories/typeorm-deliveryman-repository";
import { AuthController } from "./controllers/auth.controller";
import { DeliverymanController } from "./controllers/deliveryman.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [DeliverymanController, AuthController],
  providers: [
    CreateDeliverymanUseCase,
    {
      provide: DeliverymanRepository,
      useClass: TypeormDeliverymanRepository,
    },
  ],
})
export class HttpModule {}
