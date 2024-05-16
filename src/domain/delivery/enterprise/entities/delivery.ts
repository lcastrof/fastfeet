import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface DeliveryProps {
  status: string;
  postedAt: Date;
  retrievedAt: Date;
  deliveredAt: Date;
  returnedAt: Date;
  photo: string;
  recipientId: UniqueEntityID;
  deliverymanId: UniqueEntityID;
}

export class Delivery extends Entity<DeliveryProps> {}
