import { Entity } from "@/core/entities/entity";
import { Cpf } from "./value-objects/cpf";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface AdministratorProps {
  name: string;
  email: string;
  password: string;
  cpf: Cpf;
}

export class Administrator extends Entity<AdministratorProps> {
  static create(props: AdministratorProps, id?: UniqueEntityID) {
    const administrator = new Administrator(props, id);

    return administrator;
  }
}
