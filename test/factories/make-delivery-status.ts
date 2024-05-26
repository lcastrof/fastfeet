import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Status } from "@/core/enums/status";
import {
  DeliveryStatus,
  DeliveryStatusProps,
} from "@/domain/delivery/enterprise/entities/delivery-status";

export function makeDeliveryStatus(
  override: Partial<DeliveryStatusProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryStatus = DeliveryStatus.create(
    {
      title: Status.NOT_STARTED,
      ...override,
    },
    id,
  );

  return deliveryStatus;
}
