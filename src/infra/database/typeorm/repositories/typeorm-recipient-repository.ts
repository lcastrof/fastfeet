import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipient as TypeOrmRecipientEntity } from "../entities/recipient.entity";
import { TypeormRecipientMapper } from "../mappers/typeorm-recipient-mapper";

@Injectable()
export class TypeormRecipientRepository
  extends Repository<TypeOrmRecipientEntity>
  implements RecipientRepository
{
  constructor(
    @InjectRepository(TypeOrmRecipientEntity)
    private recipientRepository: Repository<TypeOrmRecipientEntity>,
  ) {
    super(
      recipientRepository.target,
      recipientRepository.manager,
      recipientRepository.queryRunner,
    );
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.findOneBy({ id: Number(id) });

    if (!recipient) {
      return null;
    }

    return TypeormRecipientMapper.toDomain(recipient);
  }

  async createRecipient(Recipient: Recipient) {
    const data = TypeormRecipientMapper.toPersistence(Recipient);

    await this.save(data);
  }

  async deleteRecipient(id: string): Promise<void> {
    await this.delete({ id: Number(id) });
  }
}
