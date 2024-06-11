import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Permission } from "@/domain/delivery/enterprise/entities/permission";
import { Permission as TypeormPermissionEntity } from "../entities/permission.entity";
export class TypeormPermissionMapper {
  static toDomain(raw: TypeormPermissionEntity): Permission {
    const permission = Permission.create(
      {
        code: raw.code,
      },
      new UniqueEntityID(raw.id.toString()),
    );

    return permission;
  }

  static toPersistence(permission: Permission): TypeormPermissionEntity {
    const data = new TypeormPermissionEntity();
    data.code = permission.code;

    if (Number.isInteger(Number(permission.id))) {
      data.id = Number(permission.id.toValue());
    }

    if (permission.updatedAt) {
      data.updatedAt = permission.updatedAt;
    }

    return data;
  }
}
