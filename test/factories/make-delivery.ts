import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Status } from "@/core/enums/status";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/delivery/enterprise/entities/delivery";
import { DeliveryStatus } from "@/domain/delivery/enterprise/entities/delivery-status";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID,
) {
  const delivery = Delivery.create(
    {
      status: DeliveryStatus.create({ title: Status.NOT_STARTED }),
      deliverymanId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return delivery;
}
