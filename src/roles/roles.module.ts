import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/user.entity";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RolesModule {}
