import { DomainEvents } from "@/core/events/domain-events";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { InMemoryAttachmentRepository } from "./in-memory-attachment-repository";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public deliveries: Delivery[] = [];

  constructor(private attachmentRepository: InMemoryAttachmentRepository) {}

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

  async createDelivery(delivery: Delivery): Promise<void> {
    this.deliveries.push(delivery);
  }

  async saveDelivery(delivery: Delivery): Promise<void> {
    const oldDeliveryIndex = this.deliveries.findIndex(
      (item) => item.id.toString() === delivery.id.toString(),
    );

    DomainEvents.dispatchEventsForAggregate(delivery.id);

    this.deliveries[oldDeliveryIndex] = delivery;
  }

  async deleteDelivery(id: string): Promise<void> {
    this.deliveries = this.deliveries.filter(
      (delivery) => delivery.id.toString() !== id,
    );

    this.attachmentRepository.deleteByDeliveryId(id);
  }
}
