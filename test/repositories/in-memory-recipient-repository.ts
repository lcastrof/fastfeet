import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
  public recipients: Recipient[] = [];

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.recipients.find(
      (recipient) => recipient.id.toString() === id,
    );

    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = this.recipients.find(
      (recipient) => recipient.email.value === email,
    );

    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async createRecipient(recipient) {
    this.recipients.push(recipient);
  }

  async saveRecipient(recipient: Recipient): Promise<void> {
    const index = this.recipients.findIndex(
      (item) => item.id.toString() === recipient.id.toString(),
    );

    this.recipients[index] = recipient;
  }

  async deleteRecipient(id: string): Promise<void> {
    this.recipients = this.recipients.filter(
      (status) => status.id.toString() !== id,
    );
  }
}
