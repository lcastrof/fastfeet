import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

interface GetDeliverymanByIdRequest {
  id: string;
}

interface GetDeliverymanByIdResponse {
  deliveryman: Deliveryman | null;
}

export class GetDeliverymanByIdUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({
    id,
  }: GetDeliverymanByIdRequest): Promise<GetDeliverymanByIdResponse> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    return {
      deliveryman,
    };
  }
}
