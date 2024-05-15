import { Module } from "@nestjs/common";
import { TypeOrmRootModuleConfig } from "./typeorm/config";

@Module({
  imports: [TypeOrmRootModuleConfig],
  providers: [],
})
export class DatabaseModule {}
