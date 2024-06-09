import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdmin1715717936473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO users (name, email, cpf, password_hashed)
            VALUES ('admin', 'admin@admin.com', '53335329074', '$2a$08$KbxX7PqLkRM..PE7sFobSOilcjbr6J74/U9uNRXjKjpO0skEHKB0W');
        `);

    await queryRunner.query(`
            INSERT INTO users_permissions (user_id, permission_id)
            VALUES (1, 1);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE id = 1`);
  }
}
