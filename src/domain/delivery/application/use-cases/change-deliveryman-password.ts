import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

interface ChangeDeliverymanPasswordRequest {
  deliverymanId: string;
  password: string;
}

type ChangeDeliverymanPasswordResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class ChangeDeliverymanPasswordUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    deliverymanId,
    password,
  }: ChangeDeliverymanPasswordRequest): Promise<ChangeDeliverymanPasswordResponse> {
    const deliveryman =
      await this.deliverymanRepository.findById(deliverymanId);

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    const newHashedPassword = await hash(password, 8);
    deliveryman.password = newHashedPassword;
    await this.deliverymanRepository.saveDeliveryman(deliveryman);

    return right(null);
  }
}
