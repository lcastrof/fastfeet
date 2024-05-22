import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";

export interface AttachmentRepository {
  findByDeliveryId(id: string): Promise<Attachment> | null;
  create(attachment: Attachment): Promise<void>;
  deleteByDeliveryId(id: string): Promise<void>;
}
