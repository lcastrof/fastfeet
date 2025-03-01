import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { Status } from "@/domain/delivery/enterprise/entities/value-objects/status";
import { Delivery as TypeormDeliveryEntity } from "../entities/delivery.entity";

export class TypeormDeliveryMapper {
  static toDomain(raw: TypeormDeliveryEntity): Delivery {
    return Delivery.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId.toString()),
        status: Status.create(raw.status),
        product: raw.product,
        deliverymanId: raw.deliverymanId
          ? new UniqueEntityID(raw.deliverymanId.toString())
          : undefined,
        attachmentId: raw.attachmentId
          ? new UniqueEntityID(raw.attachmentId.toString())
          : undefined,
        deliveredAt: raw.deliveredAt,
        postedAt: raw.postedAt,
        retrievedAt: raw.retrievedAt,
        returnedAt: raw.returnedAt,
      },
      new UniqueEntityID(raw.id.toString()),
    );
  }

  static toPersistence(delivery: Delivery): TypeormDeliveryEntity {
    const data = new TypeormDeliveryEntity();
    if (Number.isInteger(Number(delivery.id))) {
      data.id = Number(delivery.id.toValue());
    }
    data.attachmentId = delivery.attachmentId
      ? delivery.attachmentId.toValue()
      : undefined;
    data.deliverymanId = delivery.deliverymanId
      ? Number(delivery.deliverymanId.toValue())
      : undefined;
    data.deliveredAt = delivery.deliveredAt;
    data.product = delivery.product;
    data.postedAt = delivery.postedAt;
    data.recipientId = Number(delivery.recipientId.toValue());
    data.retrievedAt = delivery.retrievedAt;
    data.returnedAt = delivery.returnedAt;
    data.status = delivery.status.value;

    return data;
  }
}
