import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public deliveries: Delivery[] = [];

  async findById(id: string): Promise<Delivery> {
    const delivery = this.deliveries.find(
      (delivery) => delivery.id.toString() === id,
    );

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<PaginatedResponse<Delivery>> {
    console.log(deliverymanId);
    const deliveries = this.deliveries.filter(
      (delivery) => delivery.deliverymanId.toString() === deliverymanId,
    );

    const paginatedDeliveries = deliveries.slice(
      (params.page - 1) * params.itemsPerPage,
      params.page * params.itemsPerPage,
    );

    return {
      data: paginatedDeliveries,
      meta: {
        totalItems: deliveries.length,
        totalPages: Math.ceil(deliveries.length / params.itemsPerPage),
        currentPage: params.page,
      },
    };
  }

  async create(delivery: Delivery): Promise<void> {
    this.deliveries.push(delivery);
  }

  async save(delivery: Delivery): Promise<void> {
    const index = this.deliveries.findIndex(
      (item) => item.id.toString() === delivery.id.toString(),
    );

    this.deliveries[index] = delivery;
  }

  async delete(id: string): Promise<void> {
    this.deliveries = this.deliveries.filter(
      (delivery) => delivery.id.toString() !== id,
    );
  }
}
