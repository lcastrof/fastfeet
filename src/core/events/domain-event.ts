import { UniqueEntityID } from "../entities/value-objects/unique-entity-id";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
