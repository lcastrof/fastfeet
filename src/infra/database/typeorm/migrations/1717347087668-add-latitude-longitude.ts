import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatitudeLongitude1717347087668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN latitude DECIMAL(10, 8),
            ADD COLUMN longitude DECIMAL(11, 8);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN latitude,
            DROP COLUMN longitude;
        `);
  }
}
