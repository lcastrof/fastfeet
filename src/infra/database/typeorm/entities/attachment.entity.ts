import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Delivery } from "./delivery.entity";

@Entity("attachments")
export class Attachment {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @OneToOne(() => Delivery)
  @JoinColumn({
    name: "delivery_id",
    referencedColumnName: "id",
  })
  delivery?: Delivery;

  @Column({
    name: "delivery_id",
  })
  deliveryId?: number;

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
