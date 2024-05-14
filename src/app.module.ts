import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { envSchema } from "./env";
import { RolesModule } from "./roles/roles.module";
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
    AuthModule,
    RolesModule,
  ],
  controllers: [UserController, AuthController],
  providers: [],
})
export class AppModule {}
