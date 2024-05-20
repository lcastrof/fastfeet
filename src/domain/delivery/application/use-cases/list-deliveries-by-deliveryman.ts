import { PaginatedResponse } from "@/core/repositories/pagination";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";

interface ListDeliveriesByDeliverymanRequest {
  deliverymanId: string;
  page: number;
  itemsPerPage: number;
}

interface ListDeliveriesByDeliverymanResponse
  extends PaginatedResponse<Delivery> {}

export class ListDeliveriesByDeliverymanUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({
    deliverymanId,
    page,
    itemsPerPage,
  }: ListDeliveriesByDeliverymanRequest): Promise<ListDeliveriesByDeliverymanResponse> {
    const { data, meta } =
      await this.deliveryRepository.findManyByDeliverymanId(deliverymanId, {
        page,
        itemsPerPage: itemsPerPage,
      });

    return {
      data,
      meta,
    };
  }
}
