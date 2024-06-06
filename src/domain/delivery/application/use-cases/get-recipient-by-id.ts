import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";
import { Injectable } from "@nestjs/common";

interface GetRecipientByIdRequest {
  id: string;
}

type GetRecipientByIdResponse = Either<
  ResourceNotFoundError,
  { recipient: Recipient }
>;

@Injectable()
export class GetRecipientByIdUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: GetRecipientByIdRequest): Promise<GetRecipientByIdResponse> {
    const recipient = await this.recipientRepository.findById(id);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    return right({ recipient });
  }
}
