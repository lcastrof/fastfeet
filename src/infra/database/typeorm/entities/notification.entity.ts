import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "recipient_id", referencedColumnName: "id" })
  recipient: User;

  @Column({
    name: "recipient_id",
  })
  recipientId: number;

  @Column({
    default: new Date(),
    name: "read_at",
  })
  readAt?: Date;

  @Column({
    default: new Date(),
    name: "created_at",
  })
  createdAt: Date;
}
