import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers/user.controller";
import { TypeOrmRootModuleConfig } from "./typeorm/config";
import { User } from "./typeorm/entities/user.entity";

@Module({
  imports: [TypeOrmRootModuleConfig, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
