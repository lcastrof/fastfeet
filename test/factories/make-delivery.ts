import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/delivery/enterprise/entities/delivery";
import { Status } from "@/domain/delivery/enterprise/entities/value-objects/status";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID,
) {
  const delivery = Delivery.create(
    {
      status: Status.create(StatusEnum.NOT_STARTED),
      deliverymanId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      product: "Test product",
      ...override,
    },
    id,
  );

  return delivery;
}
