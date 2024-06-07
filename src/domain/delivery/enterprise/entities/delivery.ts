import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { DeliveryStatusChangeEvent } from "../events/delivery-status-change-event";
import { Attachment } from "./attachment";
import { Status } from "./value-objects/status";

export interface DeliveryProps {
  recipientId: UniqueEntityID;
  status: Status;
  product: string;
  deliverymanId?: UniqueEntityID;
  attachment?: Attachment;
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

  get deliverymanId() {
    return this.props.deliverymanId;
  }

  get postedAt() {
    return this.props.postedAt;
  }

  get attachment() {
    return this.props.attachment;
  }

  get retrievedAt() {
    return this.props.retrievedAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  get returnedAt() {
    return this.props.returnedAt;
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
