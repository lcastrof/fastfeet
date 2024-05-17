import {
  Deliveryman,
  DeliverymanProps,
} from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";

export function makeDeliveryman(override?: Partial<DeliverymanProps>) {
  const deliveryman = Deliveryman.create({
    name: "John Doe",
    email: "john@doe.com",
    cpf: new Cpf("12345678909"),
    password: "password",
    latitude: 0,
    longitude: 0,
    ...override,
  });

  return deliveryman;
}
