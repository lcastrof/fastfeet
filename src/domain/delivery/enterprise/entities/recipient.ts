import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface RecipientProps {
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  latitude: number;
  longitude: number;
}

export class Recipient extends Entity<RecipientProps> {
  get cep() {
    return this.props.cep;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get complement() {
    return this.props.complement;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  static create(props: RecipientProps, id: UniqueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
