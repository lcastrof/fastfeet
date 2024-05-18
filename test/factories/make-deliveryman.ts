import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import {
  Deliveryman,
  DeliverymanProps,
} from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { faker } from "@faker-js/faker";
import { generateValidCpf } from "test/utils/generate-valid-cpf";

export function makeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryman = Deliveryman.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: new Cpf(generateValidCpf()),
      password: faker.internet.password({ length: 8 }),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  );

  return deliveryman;
}
