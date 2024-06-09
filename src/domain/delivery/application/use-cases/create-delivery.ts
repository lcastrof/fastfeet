import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { Injectable } from "@nestjs/common";
import { Status } from "../../enterprise/entities/value-objects/status";
import { RecipientRepository } from "../repositories/recipient-repository";

interface CreateDeliveryRequest {
  recipientId: string;
  product: string;
}

type CreateDeliveryResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly recipientRepository: RecipientRepository,
  ) {}

  async execute({
    recipientId,
    product,
  }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    const delivery = Delivery.create({
      recipientId: new UniqueEntityID(recipientId),
      status: Status.create(StatusEnum.NOT_STARTED),
      product: product,
    });

    await this.deliveryRepository.createDelivery(delivery);

    return right(null);
  }
}
