import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Status } from "@/core/enums/status";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/delivery/enterprise/entities/delivery";
import { faker } from "@faker-js/faker";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID,
) {
  const delivery = Delivery.create(
    {
      status: faker.helpers.enumValue(Status),
      deliverymanId: new UniqueEntityID(),
      photo: faker.image.url(),
      recipientId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return delivery;
}
