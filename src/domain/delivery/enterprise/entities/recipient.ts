import { Entity } from "@/core/entities/entity";

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
  static create(props: RecipientProps) {
    const recipient = new Recipient(props);

    return recipient;
  }
}
