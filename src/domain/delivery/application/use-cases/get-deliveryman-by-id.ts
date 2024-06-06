import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Injectable } from "@nestjs/common";

interface GetDeliverymanByIdRequest {
  id: string;
}

type GetDeliverymanByIdResponse = Either<
  ResourceNotFoundError,
  { deliveryman: Deliveryman }
>;

@Injectable()
export class GetDeliverymanByIdUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    id,
  }: GetDeliverymanByIdRequest): Promise<GetDeliverymanByIdResponse> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    return right({ deliveryman });
  }
}
