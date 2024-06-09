import { DomainEvents } from "@/core/events/domain-events";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { InMemoryAttachmentRepository } from "./in-memory-attachment-repository";
import { InMemoryRecipientRepository } from "./in-memory-recipient-repository";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public deliveries: Delivery[] = [];

  constructor(
    private attachmentRepository: InMemoryAttachmentRepository,
    private recipientRepository: InMemoryRecipientRepository,
  ) {}

  async findById(id: string): Promise<Delivery | null> {
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
      (delivery) => delivery.deliverymanId?.toString() === deliverymanId,
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

  async findManyNearby({
    latitude,
    longitude,
    maxDistance,
    pagination,
    status,
  }: {
    latitude: number;
    longitude: number;
    maxDistance: number;
    pagination: PaginationParams;
    status: string;
  }): Promise<PaginatedResponse<Delivery>> {
    const recipientsNearbyIds = this.recipientRepository.recipients
      .filter((recipient) => {
        return (
          Math.sqrt(
            Math.pow(recipient.latitude - latitude, 2) +
              Math.pow(recipient.longitude - longitude, 2),
          ) <= maxDistance
        );
      })
      .map((recipient) => recipient.id.toValue());

    const deliveries = this.deliveries.filter(
      (delivery) =>
        recipientsNearbyIds.includes(delivery.recipientId.toValue()) &&
        delivery.status.value === status,
    );

    const paginatedDeliveries = deliveries.slice(
      (pagination.page - 1) * pagination.itemsPerPage,
      pagination.page * pagination.itemsPerPage,
    );

    return {
      data: paginatedDeliveries,
      meta: {
        totalItems: deliveries.length,
        totalPages: Math.ceil(deliveries.length / pagination.itemsPerPage),
        currentPage: pagination.page,
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
