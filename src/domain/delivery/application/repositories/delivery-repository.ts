import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export abstract class DeliveryRepository {
  abstract findById(id: string): Promise<Delivery | null>;
  abstract findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<PaginatedResponse<Delivery>>;
  abstract createDelivery(delivery: Delivery): Promise<void>;
  abstract saveDelivery(delivery: Delivery): Promise<void>;
  abstract deleteDelivery(id: string): Promise<void>;
}
