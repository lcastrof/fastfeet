import { StatusEnum } from "@/core/enums/status";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attachment } from "./attachment.entity";
import { Recipient } from "./recipient.entity";
import { User } from "./user.entity";

@Entity("deliveries")
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @ManyToOne(() => Recipient)
  @JoinColumn({
    name: "recipient_id",
    referencedColumnName: "id",
  })
  recipient: Recipient;

  @Column({
    name: "recipient_id",
  })
  recipientId: number;

  @OneToOne(() => Attachment)
  @JoinColumn({
    name: "attachment_id",
    referencedColumnName: "id",
  })
  attachment?: Attachment;

  @Column({
    name: "attachment_id",
  })
  attachmentId?: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({
    name: "deliveryman_id",
    referencedColumnName: "id",
  })
  deliveryman: Deliveryman;

  @Column({
    name: "deliveryman_id",
  })
  deliverymanId?: number;

  @Column({
    name: "retrieved_at",
  })
  retrievedAt?: Date;

  @Column({
    name: "posted_at",
  })
  postedAt?: Date;

  @Column({
    name: "delivered_at",
  })
  deliveredAt?: Date;

  @Column({
    name: "returned_at",
  })
  returnedAt?: Date;

  @Column()
  status: StatusEnum;

  @Column({
    default: new Date(),
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    default: new Date(),
    name: "updated_at",
  })
  updatedAt: Date;
}
