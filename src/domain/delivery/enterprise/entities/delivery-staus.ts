import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface DeliveryStatusProps {
  title: string;
}

export class DeliveryStatus extends Entity<DeliveryStatusProps> {
  get title() {
    return this.props.title;
  }

  static create(props: DeliveryStatusProps, id?: UniqueEntityID) {
    const deliverystatus = new DeliveryStatus(props, id);

    return deliverystatus;
  }
}
