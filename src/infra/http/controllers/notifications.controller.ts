import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { Role } from "@/infra/enums/role.enum";
import { Roles } from "@/infra/roles/roles.decorator";
import {
  BadRequestException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
} from "@nestjs/common";

@Controller("/notifications")
@Roles(Role.Admin)
export class NotificationsController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch("/:id/read")
  @HttpCode(204)
  async changePassword(
    @Param("id") id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const res = await this.readNotification.execute({
      notificationId: id,
      recipientId: user.sub.toString(),
    });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException(res.value.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
