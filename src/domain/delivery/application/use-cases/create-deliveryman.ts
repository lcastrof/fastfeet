import { Either, left, right } from "@/core/either";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Email } from "../../enterprise/entities/value-objects/email";
import { InvalidCpfError } from "./errors/invalid-cpf-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

interface CreateDeliverymanRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

type CreateDeliverymanResponse = Either<
  InvalidCpfError | InvalidEmailError,
  { deliveryman: Deliveryman }
>;

export class CreateDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    name,
    email,
    cpf,
    password,
    latitude,
    longitude,
  }: CreateDeliverymanRequest): Promise<CreateDeliverymanResponse> {
    const isEmailValid = Email.validate(email);
    const isCpfValid = Cpf.validate(cpf);

    if (!isEmailValid) {
      return left(new InvalidEmailError());
    }

    if (!isCpfValid) {
      return left(new InvalidCpfError());
    }

    const deliveryman = Deliveryman.create({
      name,
      email: Email.create(email),
      cpf: Cpf.create(cpf),
      password,
      latitude,
      longitude,
    });
    await this.deliverymanRepository.create(deliveryman);

    return right({ deliveryman });
  }
}
