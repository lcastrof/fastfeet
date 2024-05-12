import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permisison.entity";
import { User } from "./user.entity";

@Entity("users_permissions")
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Permission, {
    cascade: true,
  })
  permission: Permission;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
