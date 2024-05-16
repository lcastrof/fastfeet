import { Entity } from "@/core/entities/entity";
import { Cpf } from "./value-objects/cpf";

interface DeliverymanProps {
  name: string;
  email: string;
  password: string;
  cpf: Cpf;
}

export class Deliveryman extends Entity<DeliverymanProps> {}
