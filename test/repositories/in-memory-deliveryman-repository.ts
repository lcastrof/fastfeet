import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public deliverymen: Deliveryman[] = [];

  async create(deliveryman: Deliveryman): Promise<Deliveryman> {
    this.deliverymen.push(deliveryman);
    return deliveryman;
  }

  async findById(id: string): Promise<Deliveryman> {
    return this.deliverymen.find(
      (deliveryman) => deliveryman.id === new UniqueEntityID(id),
    );
  }

  async delete(id: string): Promise<void> {
    this.deliverymen = this.deliverymen.filter(
      (deliveryman) => deliveryman.id !== new UniqueEntityID(id),
    );
  }
}
