import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { DeliveryStatusRepository } from "../repositories/delivery-status-repository";

interface ChangeDeliveryStatusRequest {
  deliveryId: string;
  deliveryStatusId: string;
}

type ChangeDeliveryStatusResponse = Either<ResourceNotFoundError, void>;

export class ChangeDeliveryStatusUseCase {
  constructor(
    private readonly deliveryStatusRepository: DeliveryStatusRepository,
    private readonly deliveryRepository: DeliveryRepository,
  ) {}

  async execute({
    deliveryId,
    deliveryStatusId,
  }: ChangeDeliveryStatusRequest): Promise<ChangeDeliveryStatusResponse> {
    const deliveryStatus =
      await this.deliveryStatusRepository.findById(deliveryStatusId);

    if (!deliveryStatus) {
      return left(new ResourceNotFoundError());
    }

    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    delivery.status = deliveryStatus;

    await this.deliveryRepository.save(delivery);

    return right(null);
  }
}
