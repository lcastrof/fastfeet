import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface DeliveryProps {
  status: string;
  photo: string;
  recipientId: UniqueEntityID;
  deliverymanId: UniqueEntityID;
  postedAt?: Date;
  retrievedAt?: Date;
  deliveredAt?: Date;
  returnedAt?: Date;
}

export class Delivery extends Entity<DeliveryProps> {
  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(props, id);

    return delivery;
  }
}
