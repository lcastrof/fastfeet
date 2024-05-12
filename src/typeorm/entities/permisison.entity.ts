import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
