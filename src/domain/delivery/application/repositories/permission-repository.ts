import { Permission } from "@/domain/delivery/enterprise/entities/permission";

export abstract class PermissionRepository {
  abstract findByCode(code: string): Promise<Permission | null>;
}
