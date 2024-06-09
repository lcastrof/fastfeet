import { Either, left, right } from "@/core/either";
import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PaginatedResponse } from "@/core/repositories/pagination";
import { Injectable } from "@nestjs/common";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface ListDeliveriesNearbyDeliverymanRequest {
  deliverymanId: string;
  maxDistance: number;
  page: number;
  itemsPerPage: number;
}

type ListDeliveriesNearbyDeliverymanResponse = Either<
  ResourceNotFoundError,
  PaginatedResponse<Delivery>
>;

@Injectable()
export class ListDeliveriesNearbyDeliverymanUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly deliverymanRepository: DeliverymanRepository,
  ) {}

  async execute({
    deliverymanId,
    page,
    itemsPerPage,
    maxDistance,
  }: ListDeliveriesNearbyDeliverymanRequest): Promise<ListDeliveriesNearbyDeliverymanResponse> {
    const deliveryman =
      await this.deliverymanRepository.findById(deliverymanId);

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    const { data, meta } = await this.deliveryRepository.findManyNearby({
      latitude: deliveryman.latitude,
      longitude: deliveryman.longitude,
      pagination: {
        page,
        itemsPerPage,
      },
      status: StatusEnum.WAITING,
      maxDistance,
    });

    return right({ data, meta });
  }
}
