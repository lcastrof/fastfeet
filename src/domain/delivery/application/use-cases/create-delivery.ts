import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { DeliveryStatus } from "../../enterprise/entities/delivery-status";

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
      status: DeliveryStatus.create({ title: "test" }),
    });
    await this.deliveryRepository.create(delivery);

    return right({ delivery });
  }
}
