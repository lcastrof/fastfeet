import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

export interface DeliveryStatusProps {
  title: string;
}

export class DeliveryStatus extends Entity<DeliveryStatusProps> {
  get title() {
    return this.props.title;
  }

  static create(props: DeliveryStatusProps, id?: UniqueEntityID) {
    const deliveryStatus = new DeliveryStatus(props, id);

    return deliveryStatus;
  }
}
