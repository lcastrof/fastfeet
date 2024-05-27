import { Either, right } from "@/core/either";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Email } from "../../enterprise/entities/value-objects/email";

interface CreateDeliverymanRequest {
  name: string;
  email: Email;
  password: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

type CreateDeliverymanResponse = Either<null, { deliveryman: Deliveryman }>;

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
    const deliveryman = Deliveryman.create({
      name,
      email,
      cpf: new Cpf(cpf),
      password,
      latitude,
      longitude,
    });
    await this.deliverymanRepository.create(deliveryman);

    return right({ deliveryman });
  }
}
