import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Injectable } from "@nestjs/common";

interface DeleteRecipientRequest {
  id: string;
}

type DeleteRecipientResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: DeleteRecipientRequest): Promise<DeleteRecipientResponse> {
    const recipient = await this.recipientRepository.findById(id);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    await this.recipientRepository.deleteRecipient(id);

    return right(null);
  }
}
