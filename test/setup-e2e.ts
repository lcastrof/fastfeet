import { randomUUID } from "crypto";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set, please set it before running tests",
  );
}

function generateUniqueDatabaseUrl(schemaId: string) {
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

beforeAll(async () => {
  const schemaId = `test_${randomUUID()}`;

  process.env.DATABASE_URL = generateUniqueDatabaseUrl(schemaId);
});

afterAll(() => {});
