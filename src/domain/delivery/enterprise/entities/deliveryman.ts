import { Entity } from "@/core/entities/entity";
import { Cpf } from "./value-objects/cpf";

interface DeliverymanProps {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  cpf: Cpf;
}

export class Deliveryman extends Entity<DeliverymanProps> {
  static create(props: DeliverymanProps) {
    const deliveryman = new Deliveryman(props);

    return deliveryman;
  }
}
