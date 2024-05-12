import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmRootModuleConfig } from "./typeorm/config";

@Module({
  imports: [TypeOrmRootModuleConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
