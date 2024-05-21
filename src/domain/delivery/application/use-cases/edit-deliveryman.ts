import { Either, left, right } from "@/core/either";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { InvalidCpfError } from "./errors/invalid-cpf-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

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

    if (!Cpf.validate(cpf)) {
      return left(new InvalidCpfError());
    }

    deliveryman.name = name;
    deliveryman.email = email;
    deliveryman.cpf = new Cpf(cpf);
    deliveryman.latitude = latitude;
    deliveryman.longitude = longitude;

    await this.deliverymanRepository.save(deliveryman);

    return right(null);
  }
}
