import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Delivery } from "../entities/delivery";
import { DeliveryStatus } from "../entities/value-objects/status";

interface DeliveryStatusChangeEventProps {
  status: DeliveryStatus;
  delivery: Delivery;
}

export class DeliveryStatusChangeEvent implements DomainEvent {
  ocurredAt: Date;
  public status: DeliveryStatus;
  public delivery: Delivery;

  constructor({ status, delivery }: DeliveryStatusChangeEventProps) {
    this.status = status;
    this.delivery = delivery;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.status.id;
  }
}
