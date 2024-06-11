import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Permission } from "@/domain/delivery/enterprise/entities/permission";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Email } from "@/domain/delivery/enterprise/entities/value-objects/email";
import { User } from "../entities/user.entity";

export class TypeormDeliverymanMapper {
  static toDomain(raw: User): Deliveryman {
    return Deliveryman.create(
      {
        name: raw.name,
        email: Email.create(raw.email),
        password: raw.passwordHashed,
        latitude: raw.latitude,
        longitude: raw.longitude,
        cpf: Cpf.create(raw.cpf),
        permissions: raw.permissions?.map((permission) =>
          Permission.create(
            { code: permission.code },
            new UniqueEntityID(permission.id.toString()),
          ),
        ),
      },
      new UniqueEntityID(raw.id.toString()),
    );
  }

  static toPersistence(deliveryman: Deliveryman): User {
    const user = new User();
    if (Number.isInteger(Number(deliveryman.id))) {
      user.id = Number(deliveryman.id.toValue());
    }
    user.name = deliveryman.name;
    user.email = deliveryman.email.value;
    user.passwordHashed = deliveryman.password;
    user.latitude = deliveryman.latitude;
    user.longitude = deliveryman.longitude;
    user.cpf = deliveryman.cpf.value;
    user.permissions = deliveryman.permissions.map((permission) => ({
      id: Number(permission.id.toValue()),
      code: permission.code,
    }));

    return user;
  }
}
