import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TYPE: z.string(),
  PORT: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
