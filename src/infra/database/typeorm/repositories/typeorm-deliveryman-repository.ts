import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { User } from "../entities/user.entity";
import { TypeormDeliverymanMapper } from "../mappers/typeorm-deliveryman-mapper";

@Injectable()
export class TypeormDeliverymanRepository
  extends Repository<User>
  implements DeliverymanRepository
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async saveDeliveryman(deliveryman: Deliveryman): Promise<void> {
    const data = TypeormDeliverymanMapper.toPersistence(deliveryman);

    await this.save(data);
  }

  async deleteDeliveryman(id: number): Promise<void> {
    await this.delete(id);
  }

  async findByEmail(email: string): Promise<Deliveryman | null> {
    const user = await this.findOneBy({ email });

    if (!user) {
      return null;
    }

    return TypeormDeliverymanMapper.toDomain(user);
  }

  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const user = await this.findOne({
      where: { cpf },
      relations: ["permissions"],
    });

    if (!user) {
      return null;
    }

    return TypeormDeliverymanMapper.toDomain(user);
  }

  async createDeliveryman(deliveryman: Deliveryman) {
    const data = TypeormDeliverymanMapper.toPersistence(deliveryman);

    await this.save(data);
  }

  async findById(id: number) {
    const user = await this.findOneBy({ id });

    if (!user) {
      return null;
    }

    return TypeormDeliverymanMapper.toDomain(user);
  }
}
