import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository";
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public attachments: Attachment[] = [];

  async findByDeliveryId(deliveryId: string): Promise<Attachment | null> {
    const attachment = this.attachments.find(
      (attachment) => attachment.deliveryId.toString() === deliveryId,
    );

    if (!attachment) {
      return null;
    }

    return attachment;
  }
  async createAttachment(attachment: Attachment): Promise<void> {
    this.attachments.push(attachment);
  }
  async deleteByDeliveryId(deliveryId: string): Promise<void> {
    this.attachments = this.attachments.filter(
      (attachment) => attachment.deliveryId.toString() !== deliveryId,
    );
  }
  async findById(id: string): Promise<Attachment | null> {
    const attachment = this.attachments.find(
      (attachment) => attachment.id.toString() === id,
    );

    if (!attachment) {
      return null;
    }

    return attachment;
  }
}
