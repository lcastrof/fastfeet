import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Status } from "../../enterprise/entities/value-objects/status";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { InvalidStatusError } from "./errors/invalid-status-error";

interface ChangeDeliveryStatusRequest {
  deliveryId: string;
  status: string;
}

type ChangeDeliveryStatusResponse = Either<ResourceNotFoundError, null>;

export class ChangeDeliveryStatusUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    status,
  }: ChangeDeliveryStatusRequest): Promise<ChangeDeliveryStatusResponse> {
    if (!Status.validate(status)) {
      return left(new InvalidStatusError());
    }

    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    delivery.status = Status.create(status);

    await this.deliveryRepository.save(delivery);

    return right(null);
  }
}
