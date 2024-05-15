import { User } from "@/infra/database/typeorm/entities/user.entity";
import { Role } from "@/infra/enums/role.enum";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // TODO - Try to inject the User repository by interface instead of the concrete class
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new Error(
        "User context not found in request where a role is required",
      );
    }

    const userWithPermissions = await this.userRepository.findOne({
      where: { id: req.user.sub },
      relations: ["permissions"],
    });

    return this.matchRoles(requiredRoles, userWithPermissions);
  }

  private matchRoles(requiredRoles: Role[], user: User): boolean {
    if (!user) {
      return false;
    }

    const userRoles = user.permissions.map((permission) => permission.code);

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
