import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Injectable } from "@nestjs/common";
import { Email } from "../../enterprise/entities/value-objects/email";
import { CPFAlreadyExistsError } from "./errors/cpf-already-exists-error";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { InvalidCpfError } from "./errors/invalid-cpf-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

interface EditDeliverymanRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

type EditDeliverymanResponse = Either<
  ResourceNotFoundError | InvalidCpfError,
  void
>;

@Injectable()
export class EditDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    id,
    name,
    email,
    cpf,
    latitude,
    longitude,
  }: EditDeliverymanRequest): Promise<EditDeliverymanResponse> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    if (!Email.validate(email)) {
      return left(new InvalidEmailError());
    }

    if (!Cpf.validate(cpf)) {
      return left(new InvalidCpfError());
    }

    if (email !== deliveryman.email.value) {
      const isEmailAlreadyInUse =
        await this.deliverymanRepository.findByEmail(email);

      if (isEmailAlreadyInUse) {
        return left(new EmailAlreadyExistsError());
      }
    }

    if (cpf !== deliveryman.cpf.value) {
      const isCpfAlreadyInUse = await this.deliverymanRepository.findByCpf(cpf);

      if (isCpfAlreadyInUse) {
        return left(new CPFAlreadyExistsError());
      }
    }

    deliveryman.name = name;
    deliveryman.email = Email.create(email);
    deliveryman.cpf = Cpf.create(cpf);
    deliveryman.latitude = latitude;
    deliveryman.longitude = longitude;

    await this.deliverymanRepository.saveDeliveryman(deliveryman);

    return right(null);
  }
}
