import { DeliveryStatusRepository } from "@/domain/delivery/application/repositories/delivery-status-repository";
import { DeliveryStatus } from "@/domain/delivery/enterprise/entities/delivery-status";

export class InMemoryDeliveryStatusRepository
  implements DeliveryStatusRepository
{
  public deliveryStatuses = [];

  async findById(id: string): Promise<DeliveryStatus> {
    const deliveryStatus = this.deliveryStatuses.find(
      (deliveryStatus) => deliveryStatus.id.toString() === id,
    );

    if (!deliveryStatus) {
      return null;
    }

    return deliveryStatus;
  }

  async create(deliveryStatus) {
    this.deliveryStatuses.push(deliveryStatus);
  }

  async save(deliveryStatus: DeliveryStatus): Promise<void> {
    const index = this.deliveryStatuses.findIndex(
      (item) => item.id.toString() === deliveryStatus.id.toString(),
    );

    this.deliveryStatuses[index] = deliveryStatus;
  }

  async delete(id: string): Promise<void> {
    this.deliveryStatuses = this.deliveryStatuses.filter(
      (status) => status.id.toString() !== id,
    );
  }
}
