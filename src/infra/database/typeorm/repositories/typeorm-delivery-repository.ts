import {
  PaginatedResponse,
  PaginationParams,
} from "@/core/repositories/pagination";
import {
  DeliveryRepository,
  DeliverySearchParams,
} from "@/domain/delivery/application/repositories/delivery-repository";
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

  async findById(id: string): Promise<Delivery | null> {
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
    const [deliveries, count] = await this.findAndCount({
      where: { deliverymanId: Number(deliverymanId) },
      take: params.itemsPerPage,
      skip: (params.page - 1) * params.itemsPerPage,
    });

    return {
      data: deliveries.map(TypeormDeliveryMapper.toDomain),
      meta: {
        totalItems: count,
        totalPages: count / params.itemsPerPage,
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
  }: DeliverySearchParams) {
    const rawQuery = `
      SELECT del.recipient_id as "recipientId", del.id, del.status, del.deliveryman_id as "deliverymanId", del.created_at as "createdAt", del.updated_at as "updatedAt", rec.*
      FROM deliveries del
      INNER JOIN recipients rec ON rec.id = del.recipient_id
      WHERE del.status = $1
      AND earth_distance(
        ll_to_earth($2, $3),
        ll_to_earth(rec.latitude, rec.longitude)
      ) <= $4
      LIMIT $5
      OFFSET $6
    `;

    const deliveries = await this.query(rawQuery, [
      status,
      latitude,
      longitude,
      maxDistance,
      pagination.itemsPerPage,
      (pagination.page - 1) * pagination.itemsPerPage,
    ]);

    return {
      data: deliveries.map(TypeormDeliveryMapper.toDomain),
      meta: {
        totalItems: deliveries.length,
        totalPages: Math.ceil(deliveries.length / pagination.itemsPerPage),
        currentPage: pagination.page,
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
