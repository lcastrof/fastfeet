import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Cpf } from "./value-objects/cpf";
import { Email } from "./value-objects/email";

interface AdministratorProps {
  name: string;
  email: Email;
  password: string;
  cpf: Cpf;
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get cpf() {
    return this.props.cpf;
  }

  static create(props: AdministratorProps, id?: UniqueEntityID) {
    const administrator = new Administrator(props, id);

    return administrator;
  }
}
