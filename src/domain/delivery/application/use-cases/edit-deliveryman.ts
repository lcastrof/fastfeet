import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";

interface EditDeliverymanRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

interface EditDeliverymanResponse {}

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
      throw new Error("Deliveryman not found");
    }

    if (!Cpf.validate(cpf)) {
      throw new Error("Invalid CPF");
    }

    deliveryman.name = name;
    deliveryman.email = email;
    deliveryman.cpf = new Cpf(cpf);
    deliveryman.latitude = latitude;
    deliveryman.longitude = longitude;

    await this.deliverymanRepository.save(deliveryman);

    return {};
  }
}
