import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { ChangeDeliverymanPasswordUseCase } from "@/domain/delivery/application/use-cases/change-deliveryman-password";
import { CreateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/create-deliveryman";
import { DeleteDeliverymanUseCase } from "@/domain/delivery/application/use-cases/delete-deliveryman";
import { EditDeliverymanUseCase } from "@/domain/delivery/application/use-cases/edit-deliveryman";
import { CPFAlreadyExistsError } from "@/domain/delivery/application/use-cases/errors/cpf-already-exists-error";
import { EmailAlreadyExistsError } from "@/domain/delivery/application/use-cases/errors/email-already-exists-error";
import { InvalidCpfError } from "@/domain/delivery/application/use-cases/errors/invalid-cpf-error";
import { InvalidEmailError } from "@/domain/delivery/application/use-cases/errors/invalid-email-error";
import { GetDeliverymanByIdUseCase } from "@/domain/delivery/application/use-cases/get-deliveryman-by-id";
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
  Put,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { DeliverymanPresenter } from "../presenters/deliveryman-presenter";

const createDeliverymanBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().length(11),
  password: z.string().min(6),
  latitude: z.number(),
  longitude: z.number(),
});

const editDeliverymanBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().length(11),
  latitude: z.number(),
  longitude: z.number(),
});

type CreateDeliverymanDto = z.infer<typeof createDeliverymanBodySchema>;
type EditDeliverymanDto = z.infer<typeof editDeliverymanBodySchema>;

@Controller("/deliverymen")
@Roles(Role.Admin)
export class DeliverymenController {
  constructor(
    private createDeliveryman: CreateDeliverymanUseCase,
    private getDeliverymanById: GetDeliverymanByIdUseCase,
    private deleteDeliveryman: DeleteDeliverymanUseCase,
    private editDeliveryman: EditDeliverymanUseCase,
    private changeDeliverymanPassword: ChangeDeliverymanPasswordUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDeliverymanBodySchema))
  async create(@Body() deliveryman: CreateDeliverymanDto) {
    const res = await this.createDeliveryman.execute(deliveryman);

    if (res.isLeft()) {
      if (res.value instanceof InvalidCpfError) {
        throw new BadRequestException("Invalid CPF");
      }

      if (res.value instanceof InvalidEmailError) {
        throw new BadRequestException("Invalid Email");
      }

      if (res.value instanceof EmailAlreadyExistsError) {
        throw new BadRequestException("Email already in use");
      }

      if (res.value instanceof CPFAlreadyExistsError) {
        throw new BadRequestException("CPF already in use");
      }

      throw new InternalServerErrorException();
    }
  }

  @Get("/:id")
  @HttpCode(200)
  async findById(@Param("id") id: string) {
    const res = await this.getDeliverymanById.execute({ id });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Deliveryman not found");
      }

      throw new InternalServerErrorException();
    }

    return {
      deliveryman: DeliverymanPresenter.toHTTP(res.value.deliveryman),
    };
  }

  @Delete("/:id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const res = await this.deleteDeliveryman.execute({ id });

    if (res?.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Deliveryman not found");
      }

      throw new InternalServerErrorException();
    }

    return;
  }

  @Put("/:id")
  @HttpCode(200)
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(editDeliverymanBodySchema))
    deliveryman: EditDeliverymanDto,
  ) {
    const res = await this.editDeliveryman.execute({
      id,
      ...deliveryman,
    });

    if (res.isLeft()) {
      if (res.value instanceof InvalidCpfError) {
        throw new BadRequestException("Invalid CPF");
      }

      if (res.value instanceof InvalidEmailError) {
        throw new BadRequestException("Invalid Email");
      }

      if (res.value instanceof EmailAlreadyExistsError) {
        throw new BadRequestException("Email already in use");
      }

      if (res.value instanceof CPFAlreadyExistsError) {
        throw new BadRequestException("CPF already in use");
      }

      throw new InternalServerErrorException();
    }
  }

  @Patch("/:id/change-password")
  @HttpCode(200)
  async changePassword(
    @Param("id") id: string,
    @Body("password") password: string,
  ) {
    const res = await this.changeDeliverymanPassword.execute({
      deliverymanId: id,
      password,
    });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Deliveryman not found");
      }

      throw new InternalServerErrorException();
    }
  }
}
