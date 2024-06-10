import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1718062902957
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE notifications (
            id SERIAL PRIMARY KEY,
            recipient_id INTEGER REFERENCES users(id) NOT NULL, 
            content TEXT NOT NULL,
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            read_at TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE notifications;`);
  }
}
