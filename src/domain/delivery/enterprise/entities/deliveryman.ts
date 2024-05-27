import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Email } from "./value-objects/email";

export interface DeliverymanProps {
  name: string;
  email: Email;
  password: string;
  latitude: number;
  longitude: number;
  cpf: Cpf;
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email: Email) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get latitude() {
    return this.props.latitude;
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude;
  }

  get cpf() {
    return this.props.cpf;
  }

  set cpf(cpf: Cpf) {
    this.props.cpf = cpf;
  }

  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    const deliveryman = new Deliveryman(props, id);

    return deliveryman;
  }
}
