import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttachments1717457404962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE attachments (
                id SERIAL PRIMARY KEY,
                delivery_id INTEGER NOT NULL,
                title VARCHAR(100) NOT NULL,
                link VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                FOREIGN KEY (delivery_id) REFERENCES deliveries(id)
            );
        `);

    await queryRunner.query(`
            ALTER TABLE deliveries
            ADD COLUMN attachment_id INTEGER,
            ADD FOREIGN KEY (attachment_id) REFERENCES attachments(id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE deliveries DROP COLUMN attachment_id;`,
    );
    await queryRunner.query(`DROP TABLE attachments;`);
  }
}
