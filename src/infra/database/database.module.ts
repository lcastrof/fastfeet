import { Module } from "@nestjs/common";
import { TypeOrmRootModuleConfig } from "./typeorm/config";

// TODO - Implement Custom Repositories and put them in the providers and exports array
// so that they can be injected into services when this module is imported
@Module({
  imports: [TypeOrmRootModuleConfig],
  providers: [],
})
export class DatabaseModule {}
