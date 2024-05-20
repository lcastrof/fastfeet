import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Status } from "@/core/enums/status";

export interface DeliveryProps {
  status: Status;
  photo: string;
  recipientId: UniqueEntityID;
  deliverymanId: UniqueEntityID;
  postedAt?: Date;
  retrievedAt?: Date;
  deliveredAt?: Date;
  returnedAt?: Date;
}

export class Delivery extends Entity<DeliveryProps> {
  get status() {
    return this.props.status;
  }

  get photo() {
    return this.props.photo;
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

  get retrievedAt() {
    return this.props.retrievedAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  get returnedAt() {
    return this.props.returnedAt;
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(props, id);

    return delivery;
  }
}
