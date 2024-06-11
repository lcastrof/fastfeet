import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    default: new Date(),
  })
  created_at?: Date;

  @Column({
    name: "updated_at",
  })
  updatedAt?: Date;
}
