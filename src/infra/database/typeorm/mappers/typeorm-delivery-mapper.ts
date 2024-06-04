import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { Status } from "@/domain/delivery/enterprise/entities/value-objects/status";
import { Delivery as TypeormDeliveryEntity } from "../entities/delivery.entity";

export class TypeormDeliveryMapper {
  static toDomain(raw: TypeormDeliveryEntity): Delivery {
    return Delivery.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId.toString()),
        status: Status.create(raw.status),
        deliverymanId: raw.deliverymanId
          ? new UniqueEntityID(raw.deliverymanId.toString())
          : null,
        attachment: raw.attachment
          ? Attachment.create({
              deliveryId: new UniqueEntityID(raw.id.toString()),
              link: raw.attachment.link,
              title: raw.attachment.title,
            })
          : null,
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
    data.attachmentId = delivery.attachment
      ? Number(delivery.attachment.id.toValue())
      : null;
    data.deliverymanId = delivery.deliverymanId
      ? Number(delivery.deliverymanId.toValue())
      : null;
    data.deliveredAt = delivery.deliveredAt;
    data.postedAt = delivery.postedAt;
    data.recipientId = Number(delivery.recipientId.toValue());
    data.retrievedAt = delivery.retrievedAt;
    data.returnedAt = delivery.returnedAt;
    data.status = delivery.status.value;

    return data;
  }
}
