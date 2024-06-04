import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";
import { Email } from "@/domain/delivery/enterprise/entities/value-objects/email";
import { Recipient as TypeormRecipientEntity } from "../entities/recipient.entity";

export class TypeormRecipientMapper {
  static toDomain(raw: TypeormRecipientEntity): Recipient {
    return Recipient.create(
      {
        name: raw.name,
        email: Email.create(raw.email),
        city: raw.city,
        complement: raw.complement,
        neighborhood: raw.neighborhood,
        number: raw.number,
        state: raw.state,
        street: raw.street,
        zipCode: raw.zipCode,
        latitude: raw.latitude,
        longitude: raw.longitude,
      },
      new UniqueEntityID(raw.id.toString()),
    );
  }

  static toPersistence(recipient: Recipient): TypeormRecipientEntity {
    const data = new TypeormRecipientEntity();
    data.name = recipient.name;
    data.email = recipient.email.value;
    data.city = recipient.city;
    data.complement = recipient.complement;
    data.neighborhood = recipient.neighborhood;
    data.number = recipient.number;
    data.state = recipient.state;
    data.street = recipient.street;
    data.zipCode = recipient.zipCode;
    data.latitude = recipient.latitude;
    data.longitude = recipient.longitude;

    return data;
  }
}
