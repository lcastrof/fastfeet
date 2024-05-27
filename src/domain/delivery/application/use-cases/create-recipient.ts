import { Either, right } from "@/core/either";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

interface CreateRecipientRequest {
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  latitude: number;
  longitude: number;
}

type CreateRecipientResponse = Either<null, { recipient: Recipient }>;

export class CreateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(
    data: CreateRecipientRequest,
  ): Promise<CreateRecipientResponse> {
    const recipient = Recipient.create({
      ...data,
    });
    await this.recipientRepository.create(recipient);

    return right({ recipient });
  }
}
