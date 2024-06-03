import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entities/recipient";
import { Email } from "@/domain/delivery/enterprise/entities/value-objects/email";
import { faker } from "@faker-js/faker";

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      email: Email.create(faker.internet.email()),
      zipCode: faker.location.zipCode(),
      street: faker.location.street(),
      number: faker.number.int(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
      complement: faker.location.secondaryAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  );

  return recipient;
}
