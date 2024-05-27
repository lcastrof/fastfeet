import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Email } from "../../enterprise/entities/value-objects/email";
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

    deliveryman.name = name;
    deliveryman.email = Email.create(email);
    deliveryman.cpf = Cpf.create(cpf);
    deliveryman.latitude = latitude;
    deliveryman.longitude = longitude;

    await this.deliverymanRepository.save(deliveryman);

    return right(null);
  }
}
