import { StatusEnum } from "@/core/enums/status";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { ChangeDeliveryStatusUseCase } from "@/domain/delivery/application/use-cases/change-delivery-status";
import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery";
import { DeleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/delete-delivery";
import { InvalidStatusError } from "@/domain/delivery/application/use-cases/errors/invalid-status-error";
import { ListDeliveriesByDeliverymanUseCase } from "@/domain/delivery/application/use-cases/list-deliveries-by-deliveryman";
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
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";

const createDeliveryBodySchema = z.object({
  recipientId: z.number(),
  product: z.string(),
});

const changeDeliveryStatusBodySchema = z.object({
  status: z.nativeEnum(StatusEnum),
});

const listDeliveriesByDeliveryManIdQuerySchema = z.object({
  page: z.coerce.number(),
  itemsPerPage: z.coerce.number(),
});

type CreateDeliveryDto = z.infer<typeof createDeliveryBodySchema>;
type ChangeDeliveryStatusDto = z.infer<typeof changeDeliveryStatusBodySchema>;
type ListDeliveriesByDeliveryManIdQuery = z.infer<
  typeof listDeliveriesByDeliveryManIdQuerySchema
>;

@Controller("/deliveries")
@Roles(Role.Admin)
export class DeliveriesController {
  constructor(
    private createDelivery: CreateDeliveryUseCase,
    private listDeliveriesByDeliveryManId: ListDeliveriesByDeliverymanUseCase,
    private deleteDelivery: DeleteDeliveryUseCase,
    private changeDeliveryStatus: ChangeDeliveryStatusUseCase,
  ) {}

  @Post()
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

    return res.value;
  }

  @Get("/deliveryman/:id")
  @HttpCode(200)
  async findByDeliverymanId(
    @Param("id") id: string,
    @Query(new ZodValidationPipe(listDeliveriesByDeliveryManIdQuerySchema))
    { page, itemsPerPage }: ListDeliveriesByDeliveryManIdQuery,
  ) {
    const res = await this.listDeliveriesByDeliveryManId.execute({
      deliverymanId: id,
      page,
      itemsPerPage,
    });

    if (res.isLeft()) {
      throw new InternalServerErrorException();
    }

    return res.value;
  }

  @Delete("/:id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const res = await this.deleteDelivery.execute({ id });

    if (res?.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Delivery not found");
      }

      throw new InternalServerErrorException();
    }

    return;
  }

  @Put("/:id/change-status")
  @HttpCode(200)
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(changeDeliveryStatusBodySchema))
    { status }: ChangeDeliveryStatusDto,
  ) {
    const res = await this.changeDeliveryStatus.execute({
      deliveryId: id,
      status,
    });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Delivery not found");
      }

      if (res.value instanceof InvalidStatusError) {
        throw new BadRequestException(
          `Invalid Status, must be one of: ${Object.values(StatusEnum).join(", ")}`,
        );
      }

      throw new InternalServerErrorException();
    }
  }
}
