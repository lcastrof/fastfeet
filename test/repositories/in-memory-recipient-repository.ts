import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
  public recipients = [];

  async findById(id: string): Promise<Recipient> {
    const recipient = this.recipients.find(
      (recipient) => recipient.id.toString() === id,
    );

    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async create(recipient) {
    this.recipients.push(recipient);
  }

  async save(recipient: Recipient): Promise<void> {
    const index = this.recipients.findIndex(
      (item) => item.id.toString() === recipient.id.toString(),
    );

    this.recipients[index] = recipient;
  }

  async delete(id: string): Promise<void> {
    this.recipients = this.recipients.filter(
      (status) => status.id.toString() !== id,
    );
  }
}
