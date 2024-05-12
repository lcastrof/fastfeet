import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmRootModuleConfig = TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fastfeet",
  password: "docker",
  database: "fastfeet",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
});
