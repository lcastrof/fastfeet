import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery";
import { DeleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/delete-delivery";
import { InvalidAttachmentIdError } from "@/domain/delivery/application/use-cases/errors/invalid-attachment-id-error";
import { InvalidDeliverymanIdError } from "@/domain/delivery/application/use-cases/errors/invalid-deliveryman-id-error";
import { InvalidStatusError } from "@/domain/delivery/application/use-cases/errors/invalid-status-error";
import { UnauthorizedDeliverymanError } from "@/domain/delivery/application/use-cases/errors/unauthorized-deliveryman-error";
import { ChangeDeliveryStatusFactory } from "@/domain/delivery/application/use-cases/factories/change-delivery-status-factory";
import { ListDeliveriesByDeliverymanUseCase } from "@/domain/delivery/application/use-cases/list-deliveries-by-deliveryman";
import { ListDeliveriesNearbyDeliverymanUseCase } from "@/domain/delivery/application/use-cases/list-deliveries-nearby-deliveryman";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { Role } from "@/infra/enums/role.enum";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { Roles } from "@/infra/roles/roles.decorator";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { DeliveryPresenter } from "../presenters/delivery-presenter";

const createDeliveryBodySchema = z.object({
  recipientId: z.number(),
  product: z.string(),
});

const changeDeliveryStatusToDeliveredBodySchema = z.object({
  status: z.literal(StatusEnum.DELIVERED),
  attachmentId: z.coerce.string(),
});

const changeDeliveryStatusToReturnedBodySchema = z.object({
  status: z.literal(StatusEnum.RETURNED),
});

const changeDeliveryStatusToWaitingBodySchema = z.object({
  status: z.literal(StatusEnum.WAITING),
});

const changeDeliveryStatusToWithdrawnBodySchema = z.object({
  status: z.literal(StatusEnum.WITHDRAWN),
  deliverymanId: z.coerce.string(),
});

const changeDeliveryStatusBodySchema = z.discriminatedUnion("status", [
  changeDeliveryStatusToDeliveredBodySchema,
  changeDeliveryStatusToReturnedBodySchema,
  changeDeliveryStatusToWaitingBodySchema,
  changeDeliveryStatusToWithdrawnBodySchema,
]);

const listDeliveriesByDeliveryManIdQuerySchema = z.object({
  page: z.coerce.number(),
  itemsPerPage: z.coerce.number(),
});

const listDeliveriesNearbyDeliverymanQuerySchema = z.object({
  page: z.coerce.number(),
  itemsPerPage: z.coerce.number(),
  maxDistance: z.coerce.number().optional().default(400),
});

type CreateDeliveryDto = z.infer<typeof createDeliveryBodySchema>;
type ChangeDeliveryStatusDto = z.infer<typeof changeDeliveryStatusBodySchema>;
type ListDeliveriesByDeliveryManIdQuery = z.infer<
  typeof listDeliveriesByDeliveryManIdQuerySchema
>;
type ListDeliveriesNearbyDeliverymanQuery = z.infer<
  typeof listDeliveriesNearbyDeliverymanQuerySchema
>;

@Controller("/deliveries")
export class DeliveriesController {
  constructor(
    private createDelivery: CreateDeliveryUseCase,
    private listDeliveriesByDeliveryManId: ListDeliveriesByDeliverymanUseCase,
    private deleteDelivery: DeleteDeliveryUseCase,
    private changeDeliveryStatusFactory: ChangeDeliveryStatusFactory,
    private listDeliveriesNearbyDeliveryman: ListDeliveriesNearbyDeliverymanUseCase,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDeliveryBodySchema))
  async create(@Body() delivery: CreateDeliveryDto) {
    const res = await this.createDelivery.execute({
      recipientId: delivery.recipientId.toString(),
      product: delivery.product,
    });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Recipient not found");
      }

      throw new InternalServerErrorException();
    }
  }

  @Get("/deliveryman/:id")
  @Roles(Role.Deliveryman, Role.Admin)
  @HttpCode(200)
  async findByDeliverymanId(
    @Param("id") id: string,
    @Query(new ZodValidationPipe(listDeliveriesByDeliveryManIdQuerySchema))
    { page, itemsPerPage }: ListDeliveriesByDeliveryManIdQuery,
    @CurrentUser() user: UserPayload,
  ) {
    if (Number(id) !== user.sub && !user.permissions.includes(Role.Admin)) {
      throw new UnauthorizedException("You can only see your own deliveries");
    }

    const res = await this.listDeliveriesByDeliveryManId.execute({
      deliverymanId: id,
      page,
      itemsPerPage,
    });

    if (res.isLeft()) {
      throw new InternalServerErrorException();
    }

    return {
      deliveries: res.value.data.map(DeliveryPresenter.toHTTP),
      meta: res.value.meta,
    };
  }

  @Get("/deliveryman/:id/nearby")
  @Roles(Role.Deliveryman, Role.Admin)
  @HttpCode(200)
  async findNearbyByDeliverymanId(
    @Param("id") id: string,
    @Query(new ZodValidationPipe(listDeliveriesNearbyDeliverymanQuerySchema))
    { page, itemsPerPage, maxDistance }: ListDeliveriesNearbyDeliverymanQuery,
    @CurrentUser() user: UserPayload,
  ) {
    if (Number(id) !== user.sub && !user.permissions.includes(Role.Admin)) {
      throw new UnauthorizedException(
        "You can only see the deliveries near you",
      );
    }

    const res = await this.listDeliveriesNearbyDeliveryman.execute({
      deliverymanId: id,
      maxDistance,
      page,
      itemsPerPage,
    });

    if (res.isLeft()) {
      throw new InternalServerErrorException();
    }

    return {
      deliveries: res.value.data.map(DeliveryPresenter.toHTTP),
      meta: res.value.meta,
    };
  }

  @Delete("/:id")
  @Roles(Role.Admin)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const res = await this.deleteDelivery.execute({ id });

    if (res?.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException(res.value.message);
      }

      throw new InternalServerErrorException();
    }

    return;
  }

  // TODO - Add constraints to prevent invalid status transitions and check if the body is valid
  @Patch("/:id/change-status")
  @Roles(Role.Admin)
  @HttpCode(200)
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(changeDeliveryStatusBodySchema))
    body: ChangeDeliveryStatusDto,
    @CurrentUser() user: UserPayload,
  ) {
    // TODO - remove any
    const request = {
      deliveryId: id,
      deliverymanId: user.sub,
      ...body,
    } as any;
    if (body.status === StatusEnum.DELIVERED) {
      request.deliverymanId = user.sub;
    }
    const res: any = await this.changeDeliveryStatusFactory
      .getChangeDeliveryStatusUseCase(body.status)
      .execute(request);

    if (res.isLeft()) {
      const error = res.value;

      switch (error.constructor) {
        case InvalidStatusError:
          throw new BadRequestException(
            `Invalid Status, must be one of: ${Object.values(StatusEnum).join(", ")}`,
          );
        case InvalidDeliverymanIdError:
          throw new BadRequestException(error.message);
        case InvalidAttachmentIdError:
          throw new BadRequestException(error.message);
        case UnauthorizedDeliverymanError:
          throw new UnauthorizedException(
            "A deliveryman can only mark a delivery as delivered if it is assigned to him",
          );
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
