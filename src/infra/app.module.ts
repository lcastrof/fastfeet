import { AuthModule } from "@/infra/auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { envSchema } from "./env";
import { HttpModule } from "./http/http.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    RolesModule,
    HttpModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
