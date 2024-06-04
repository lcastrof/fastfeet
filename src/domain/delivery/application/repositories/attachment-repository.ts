import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";

export abstract class AttachmentRepository {
  abstract findByDeliveryId(id: string): Promise<Attachment> | null;
  abstract createAttachment(attachment: Attachment): Promise<void>;
  abstract deleteByDeliveryId(id: string): Promise<void>;
}
