import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository";
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attachment as TypeOrmAttachmentEntity } from "../entities/attachment.entity";
import { TypeormAttachmentMapper } from "../mappers/typeorm-attachment-mapper";

@Injectable()
export class TypeormAttachmentRepository
  extends Repository<TypeOrmAttachmentEntity>
  implements AttachmentRepository
{
  constructor(
    @InjectRepository(TypeOrmAttachmentEntity)
    private attachmentRepository: Repository<TypeOrmAttachmentEntity>,
  ) {
    super(
      attachmentRepository.target,
      attachmentRepository.manager,
      attachmentRepository.queryRunner,
    );
  }

  async findByDeliveryId(id: string): Promise<Attachment> {
    const attachment = await this.findOneBy({ deliveryId: Number(id) });

    if (!attachment) {
      return null;
    }

    return TypeormAttachmentMapper.toDomain(attachment);
  }

  async createAttachment(attachment: Attachment): Promise<void> {
    const data = TypeormAttachmentMapper.toPersistence(attachment);

    const createdAttachment = this.create(data);

    await this.save(createdAttachment);
  }

  async deleteByDeliveryId(id: string): Promise<void> {
    await this.delete({ deliveryId: Number(id) });
  }
}
