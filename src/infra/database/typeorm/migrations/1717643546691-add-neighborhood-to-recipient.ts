import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNeighborhoodToRecipient1717643546691
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE recipients ADD COLUMN neighborhood VARCHAR(100) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE recipients DROP COLUMN neighborhood`);
  }
}
