import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface PermissionProps {
  code: string;
}

export class Permission extends Entity<PermissionProps> {
  get code() {
    return this.props.code;
  }

  static create(props: PermissionProps, id?: UniqueEntityID) {
    const permission = new Permission(props, id);

    return permission;
  }
}
