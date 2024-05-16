import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface CreateDeliverymanRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export class CreateDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    name,
    email,
    cpf,
    password,
  }: CreateDeliverymanRequest): Promise<void> {
    const deliveryman = new Deliveryman({
      name,
      email,
      cpf: new Cpf(cpf),
      password,
    });
    await this.deliverymanRepository.create(deliveryman);
  }
}
