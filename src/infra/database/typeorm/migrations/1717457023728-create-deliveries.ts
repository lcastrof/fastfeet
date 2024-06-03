import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeliveries1717457023728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE deliveryStatus AS ENUM ('NOT_STARTED', 'WITHDRAWN', 'WAITING', 'DELIVERED', 'RETURNED');
            CREATE TABLE deliveries (
                id SERIAL PRIMARY KEY,
                recipient_id INTEGER REFERENCES recipients(id) NOT NULL,
                deliveryman_id INTEGER REFERENCES users(id),
                product VARCHAR(100) NOT NULL,
                status deliveryStatus NOT NULL,
                retrieved_at TIMESTAMP,
                posted_at TIMESTAMP,
                delivered_at TIMESTAMP,
                returned_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE deliveries;`);
    await queryRunner.query(`DROP TYPE deliveryStatus;`);
  }
}
