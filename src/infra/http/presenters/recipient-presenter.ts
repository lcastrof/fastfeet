import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      id: Number(recipient.id.toValue()),
      name: recipient.name,
      email: recipient.email.value,
      city: recipient.city,
      state: recipient.state,
      neighborhood: recipient.neighborhood,
      street: recipient.street,
      number: recipient.number,
      latitude: recipient.latitude,
      longitude: recipient.longitude,
    };
  }
}
