import { Entity } from "@/core/entities/entity";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";

interface DeliverymanProps {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  cpf: Cpf;
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  get cpf() {
    return this.props.cpf;
  }

  static create(props: DeliverymanProps) {
    const deliveryman = new Deliveryman(props);

    return deliveryman;
  }
}
