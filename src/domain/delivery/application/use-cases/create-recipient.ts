import { Either, left, right } from "@/core/either";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";
import { Injectable } from "@nestjs/common";
import { Email } from "../../enterprise/entities/value-objects/email";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

interface CreateRecipientRequest {
  name: string;
  email: string;
  zipCode: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  latitude: number;
  longitude: number;
}

type CreateRecipientResponse = Either<
  InvalidEmailError | EmailAlreadyExistsError,
  { recipient: Recipient }
>;

@Injectable()
export class CreateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(
    data: CreateRecipientRequest,
  ): Promise<CreateRecipientResponse> {
    if (!Email.validate(data.email)) {
      return left(new InvalidEmailError());
    }

    const recipientWithEmail = await this.recipientRepository.findByEmail(
      data.email,
    );

    if (recipientWithEmail) {
      return left(new EmailAlreadyExistsError());
    }

    const recipient = Recipient.create({
      ...data,
      email: Email.create(data.email),
    });
    await this.recipientRepository.createRecipient(recipient);

    return right({ recipient });
  }
}
