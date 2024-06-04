import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository";
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Delivery as TypeOrmDeliveryEntity } from "../entities/delivery.entity";
import { TypeormDeliveryMapper } from "../mappers/typeorm-delivery-mapper";

@Injectable()
export class TypeormDeliveryRepository
  extends Repository<TypeOrmDeliveryEntity>
  implements DeliveryRepository
{
  constructor(
    @InjectRepository(TypeOrmDeliveryEntity)
    private deliveryRepository: Repository<TypeOrmDeliveryEntity>,
  ) {
    super(
      deliveryRepository.target,
      deliveryRepository.manager,
      deliveryRepository.queryRunner,
    );
  }

  async findById(id: string): Promise<Delivery> {
    const delivery = await this.findOneBy({ id: Number(id) });

    if (!delivery) {
      return null;
    }

    return TypeormDeliveryMapper.toDomain(delivery);
  }

  async findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<PaginatedResponse<Delivery>> {
    const deliveries = await this.find({
      where: { deliverymanId: Number(deliverymanId) },
      take: params.itemsPerPage,
      skip: (params.page - 1) * params.itemsPerPage,
    });

    return {
      data: deliveries.map(TypeormDeliveryMapper.toDomain),
      meta: {
        totalItems: deliveries.length,
        totalPages: Math.ceil(deliveries.length / params.itemsPerPage),
        currentPage: params.page,
      },
    };
  }

  async createDelivery(delivery: Delivery): Promise<void> {
    const data = TypeormDeliveryMapper.toPersistence(delivery);

    const createdDelivery = this.create(data);

    await this.save(createdDelivery);
  }

  async saveDelivery(delivery: Delivery): Promise<void> {
    const data = TypeormDeliveryMapper.toPersistence(delivery);

    await this.save(data);
  }

  async deleteDelivery(id: string): Promise<void> {
    await this.delete({ id: Number(id) });
  }
}
