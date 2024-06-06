import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export abstract class RecipientRepository {
  abstract findById(id: string): Promise<Recipient | null>;
  abstract createRecipient(recipient: Recipient): Promise<void>;
  abstract deleteRecipient(id: string): Promise<void>;
}
