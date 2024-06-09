import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { DeliveryStatusChangeEvent } from "../events/delivery-status-change-event";
import { Status } from "./value-objects/status";

export interface DeliveryProps {
  recipientId: UniqueEntityID;
  status: Status;
  product: string;
  deliverymanId?: UniqueEntityID;
  attachmentId?: UniqueEntityID;
  postedAt?: Date;
  retrievedAt?: Date;
  deliveredAt?: Date;
  returnedAt?: Date;
}

export class Delivery extends AggregateRoot<DeliveryProps> {
  get status() {
    return this.props.status;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId(): UniqueEntityID | undefined {
    return this.props.deliverymanId;
  }

  set deliverymanId(deliverymanId: UniqueEntityID) {
    this.props.deliverymanId = deliverymanId;
  }

  get postedAt() {
    return this.props.postedAt;
  }

  get attachmentId(): UniqueEntityID | undefined {
    return this.props.attachmentId;
  }

  set attachmentId(attachmentId: UniqueEntityID) {
    this.props.attachmentId = attachmentId;
  }

  get retrievedAt(): Date | undefined {
    return this.props.retrievedAt;
  }

  set retrievedAt(retrievedAt: Date) {
    this.props.retrievedAt = retrievedAt;
  }

  get deliveredAt(): Date | undefined {
    return this.props.deliveredAt;
  }

  set deliveredAt(deliveredAt: Date) {
    this.props.deliveredAt = deliveredAt;
  }

  get returnedAt(): Date | undefined {
    return this.props.returnedAt;
  }

  set returnedAt(returnedAt: Date) {
    this.props.returnedAt = returnedAt;
  }

  get product() {
    return this.props.product;
  }

  set status(status: Status) {
    this.props.status = status;

    this.addDomainEvent(
      new DeliveryStatusChangeEvent({
        status,
        delivery: this,
      }),
    );
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(
      {
        ...props,
        status: props.status || Status.create(StatusEnum.NOT_STARTED),
      },
      id,
    );

    return delivery;
  }
}
