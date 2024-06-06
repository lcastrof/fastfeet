import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Injectable } from "@nestjs/common";
import { Email } from "../../enterprise/entities/value-objects/email";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

export interface EditRecipientRequest {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

type EditRecipientResponse = Either<
  ResourceNotFoundError | InvalidEmailError | EmailAlreadyExistsError,
  null
>;

@Injectable()
export class EditRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute({
    id,
    ...props
  }: EditRecipientRequest): Promise<EditRecipientResponse> {
    const recipient = await this.recipientRepository.findById(id);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    if (!Email.validate(props.email)) {
      return left(new InvalidEmailError());
    }

    const recipientWithEmail = await this.recipientRepository.findByEmail(
      props.email,
    );

    if (recipientWithEmail && props.email !== recipient.email.value) {
      return left(new EmailAlreadyExistsError());
    }

    Object.assign(recipient, {
      ...props,
      updatedAt: new Date(),
      email: Email.create(props.email),
    });

    await this.recipientRepository.saveRecipient(recipient);

    return right(null);
  }
}
