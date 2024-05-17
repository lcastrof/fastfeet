import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";

interface DeleteDeliverymanRequest {
  id: string;
}

export class DeleteDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({ id }: DeleteDeliverymanRequest): Promise<void> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    if (!deliveryman) {
      throw new Error("Deliveryman not found");
    }

    await this.deliverymanRepository.delete(id);
  }
}
