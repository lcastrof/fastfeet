import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersPermissions1715717522181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
         CREATE TABLE IF NOT EXISTS "users_permissions" (
                user_id INT,
                permission_id INT,
                PRIMARY KEY (user_id, permission_id),
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                CONSTRAINT fk_permission
                    FOREIGN KEY(permission_id)
                    REFERENCES permissions(id)
                    ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE "users_permissions"`);
  }
}
