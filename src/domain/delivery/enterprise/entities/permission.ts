import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/value-objects/unique-entity-id";

interface PermissionProps {
  code: string;
  updatedAt?: Date;
}

export class Permission extends Entity<PermissionProps> {
  get code() {
    return this.props.code;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  static create(props: PermissionProps, id?: UniqueEntityID) {
    const permission = new Permission(props, id);

    return permission;
  }
}
