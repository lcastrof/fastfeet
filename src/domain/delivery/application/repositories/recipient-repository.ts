import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export interface RecipientRepository {
  findById(id: string): Promise<Recipient> | null;
  create(recipient: Recipient): Promise<void>;
  delete(id: string): Promise<void>;
}
