import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface CreateDeliverymanRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  latitude: number;
  longitude: number;
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
  }: CreateDeliverymanRequest): Promise<void> {
    const deliveryman = Deliveryman.create({
      name,
      email,
      cpf: new Cpf(cpf),
      password,
      latitude,
      longitude,
    });
    await this.deliverymanRepository.create(deliveryman);
  }
}
