import { Env } from "@/infra/env";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { DataSource, DataSourceOptions } from "typeorm";

const data: Env = dotenv.parse(fs.readFileSync(`.env`));

export const config: DataSourceOptions = {
  type: "postgres",
  url: data.DATABASE_URL,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: false,
};

export default new DataSource(config);
