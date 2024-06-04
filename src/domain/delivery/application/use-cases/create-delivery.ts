import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { StatusEnum } from "@/core/enums/status";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { Status } from "../../enterprise/entities/value-objects/status";

interface CreateDeliveryRequest {
  recipientId: string;
}

type CreateDeliveryResponse = Either<null, { delivery: Delivery }>;

export class CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({
    recipientId,
  }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const delivery = Delivery.create({
      recipientId: new UniqueEntityID(recipientId),
      status: Status.create(StatusEnum.NOT_STARTED),
    });
    await this.deliveryRepository.createDelivery(delivery);

    return right({ delivery });
  }
}
