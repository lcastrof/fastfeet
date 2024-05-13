import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmRootModuleConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: configService.get("DATABASE_TYPE"),
    url: configService.get("DATABASE_URL"),
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
});
