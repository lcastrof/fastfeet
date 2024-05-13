import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers/user.controller";
import { envSchema } from "./env";
import { TypeOrmRootModuleConfig } from "./typeorm/config";
import { User } from "./typeorm/entities/user.entity";

@Module({
  imports: [
    TypeOrmRootModuleConfig,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
