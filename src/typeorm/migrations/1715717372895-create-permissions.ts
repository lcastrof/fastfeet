import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissions1715717372895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "permissions" (
                "id" SERIAL PRIMARY KEY,
                "code" VARCHAR NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);
    await queryRunner.query(`
            INSERT INTO permissions (code) VALUES ('admin');
            INSERT INTO permissions (code) VALUES ('deliveryman');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
