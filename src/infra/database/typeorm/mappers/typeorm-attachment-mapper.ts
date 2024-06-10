import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";
import { Attachment as TypeormAttachmentEntity } from "../entities/attachment.entity";

export class TypeormAttachmentMapper {
  static toDomain(raw: TypeormAttachmentEntity): Attachment {
    return Attachment.create(
      {
        deliveryId: new UniqueEntityID(raw.id.toString()),
        link: raw.link,
        title: raw.title,
      },
      new UniqueEntityID(raw.id.toString()),
    );
  }

  static toPersistence(attachment: Attachment): TypeormAttachmentEntity {
    const data = new TypeormAttachmentEntity();
    data.id = attachment.id.toValue();
    data.link = attachment.link;
    data.title = attachment.title;
    data.deliveryId = attachment.deliveryId
      ? Number(attachment.deliveryId.toValue())
      : undefined;

    return data;
  }
}
