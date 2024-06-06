import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Injectable } from "@nestjs/common";

interface DeleteDeliverymanRequest {
  id: string;
}

type DeleteDeliverymanResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    id,
  }: DeleteDeliverymanRequest): Promise<DeleteDeliverymanResponse> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    await this.deliverymanRepository.deleteDeliveryman(id);

    return right(null);
  }
}
