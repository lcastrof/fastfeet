import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Permission } from "./permisison.entity";

// TODO - Mover entities para pasta de infra quando criada
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
