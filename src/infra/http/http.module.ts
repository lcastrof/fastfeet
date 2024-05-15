import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../database/typeorm/entities/user.entity";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
})
export class HttpModule {}
