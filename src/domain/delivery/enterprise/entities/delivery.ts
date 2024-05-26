import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Status } from "@/core/enums/status";
import { Attachment } from "./attachment";
import { DeliveryStatus } from "./delivery-status";

export interface DeliveryProps {
  recipientId: UniqueEntityID;
  status?: DeliveryStatus;
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

  set status(status: DeliveryStatus) {
    this.props.status = status;
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(
      {
        ...props,
        status:
          props.status || DeliveryStatus.create({ title: Status.NOT_STARTED }),
      },
      id,
    );

    return delivery;
  }
}
