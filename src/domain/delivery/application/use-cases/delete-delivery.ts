import { Either, left } from "@/core/either";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteDeliveryRequest {
  id: string;
}

type DeleteDeliveryResponse = Either<ResourceNotFoundError, void>;

export class DeleteDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({
    id,
  }: DeleteDeliveryRequest): Promise<DeleteDeliveryResponse> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    await this.deliveryRepository.delete(id);
  }
}
