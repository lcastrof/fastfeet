import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export interface DeliveryRepository {
  findById(id: string): Promise<Delivery> | null;
  findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<PaginatedResponse<Delivery>>;
  create(delivery: Delivery): Promise<void>;
  save(delivery: Delivery): Promise<void>;
  delete(id: string): Promise<void>;
}
