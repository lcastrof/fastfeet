import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";

interface CreateDeliverymanRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

interface CreateDeliverymanResponse {
  deliveryman: Deliveryman;
}

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

    return {
      deliveryman,
    };
  }
}
