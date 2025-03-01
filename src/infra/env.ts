import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TYPE: z.string(),
  PORT: z.coerce.number(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  CLOUDFARE_ACCOUNT_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;
