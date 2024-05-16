import { Entity } from "@/core/entities/entity";

interface DeliveryProps {
  status: string;
  postedAt: Date;
  retrievedAt: Date;
  deliveredAt: Date;
  returnedAt: Date;
  photo: string;
  recipientId: string;
  deliverymanId: string;
}

export class Delivery extends Entity<DeliveryProps> {}
