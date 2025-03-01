import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Permission } from "./permission.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  @Unique(["cpf"])
  cpf: string;

  @Column({ name: "password_hashed" })
  passwordHashed: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable({
    name: "users_permissions",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "permission_id" },
  })
  permissions: Permission[];

  @Column({
    default: new Date(),
  })
  created_at: Date;

  @Column({
    default: new Date(),
  })
  updated_at: Date;
}
