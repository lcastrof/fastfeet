import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Email } from "./value-objects/email";

export interface RecipientProps {
  name: string;
  email: Email;
  zipCode: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Recipient extends Entity<RecipientProps> {
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

  get zipCode() {
    return this.props.zipCode;
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode;
  }

  get street() {
    return this.props.street;
  }

  set street(street: string) {
    this.props.street = street;
  }

  get number() {
    return this.props.number;
  }

  set number(number: number) {
    this.props.number = number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  get city() {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get state() {
    return this.props.state;
  }

  set state(state: string) {
    this.props.state = state;
  }

  get complement() {
    return this.props.complement;
  }

  set complement(complement: string) {
    this.props.complement = complement;
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

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
