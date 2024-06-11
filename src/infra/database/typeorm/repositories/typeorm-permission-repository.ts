import { PermissionRepository } from "@/domain/delivery/application/repositories/permission-repository";
import { Permission } from "@/domain/delivery/enterprise/entities/permission";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission as TypeOrmPermissionEntity } from "../entities/permission.entity";
import { TypeormPermissionMapper } from "../mappers/typeorm-permission-mapper";

@Injectable()
export class TypeormPermissionRepository
  extends Repository<TypeOrmPermissionEntity>
  implements PermissionRepository
{
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<TypeOrmPermissionEntity>,
  ) {
    super(
      permissionRepository.target,
      permissionRepository.manager,
      permissionRepository.queryRunner,
    );
  }

  async findByCode(code: string): Promise<Permission | null> {
    const permission = await this.findOneBy({ code });

    if (!permission) {
      return null;
    }

    return TypeormPermissionMapper.toDomain(permission);
  }
}
