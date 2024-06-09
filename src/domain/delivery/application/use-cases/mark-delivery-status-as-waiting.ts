import { Either, left, right } from "@/core/either";
import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Status } from "../../enterprise/entities/value-objects/status";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { InvalidStatusError } from "./errors/invalid-status-error";

interface MarkDeliveryStatusAsWaitingRequest {
  deliveryId: string;
  status: StatusEnum.WAITING;
}

type MarkDeliveryStatusAsWaitingResponse = Either<
  ResourceNotFoundError | InvalidStatusError,
  null
>;

@Injectable()
export class MarkDeliveryStatusAsWaitingUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    status,
  }: MarkDeliveryStatusAsWaitingRequest): Promise<MarkDeliveryStatusAsWaitingResponse> {
    if (!Status.validate(status)) {
      return left(new InvalidStatusError());
    }

    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    delivery.status = Status.create(status);

    await this.deliveryRepository.saveDelivery(delivery);

    return right(null);
  }
}
