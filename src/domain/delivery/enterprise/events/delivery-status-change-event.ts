import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { DeliveryStatus } from "../entities/delivery-status";

export class DeliveryStatusChangeEvent implements DomainEvent {
  ocurredAt: Date;
  public status: DeliveryStatus;

  constructor(status: DeliveryStatus) {
    this.status = status;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.status.id;
  }
}
