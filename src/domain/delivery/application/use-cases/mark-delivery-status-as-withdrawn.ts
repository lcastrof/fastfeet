import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Status } from "../../enterprise/entities/value-objects/status";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { InvalidDeliverymanIdError } from "./errors/invalid-deliveryman-id-error";
import { InvalidStatusError } from "./errors/invalid-status-error";

interface MarkDeliveryStatusAsWithdrawnRequest {
  deliveryId: string;
  status: StatusEnum.WITHDRAWN;
  deliverymanId: string;
}

type MarkDeliveryStatusAsWithdrawnResponse = Either<
  ResourceNotFoundError | InvalidStatusError,
  null
>;

@Injectable()
export class MarkDeliveryStatusAsWithdrawnUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly deliverymanRepository: DeliverymanRepository,
  ) {}

  async execute({
    deliveryId,
    deliverymanId,
    status,
  }: MarkDeliveryStatusAsWithdrawnRequest): Promise<MarkDeliveryStatusAsWithdrawnResponse> {
    if (!Status.validate(status)) {
      return left(new InvalidStatusError());
    }

    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    const deliveryman =
      await this.deliverymanRepository.findById(deliverymanId);

    if (!deliveryman) {
      return left(new InvalidDeliverymanIdError());
    }

    delivery.status = Status.create(status);
    delivery.deliverymanId = new UniqueEntityID(deliverymanId);
    delivery.retrievedAt = new Date();

    await this.deliveryRepository.saveDelivery(delivery);

    return right(null);
  }
}
