import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { CreateRecipientUseCase } from "@/domain/delivery/application/use-cases/create-recipient";
import { DeleteRecipientUseCase } from "@/domain/delivery/application/use-cases/delete-recipient";
import { EditRecipientUseCase } from "@/domain/delivery/application/use-cases/edit-recipient";
import { EmailAlreadyExistsError } from "@/domain/delivery/application/use-cases/errors/email-already-exists-error";
import { InvalidCpfError } from "@/domain/delivery/application/use-cases/errors/invalid-cpf-error";
import { InvalidEmailError } from "@/domain/delivery/application/use-cases/errors/invalid-email-error";
import { GetRecipientByIdUseCase } from "@/domain/delivery/application/use-cases/get-recipient-by-id";
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
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";

const createRecipientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string(),
  zipCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

const editRecipientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string(),
  zipCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

type CreateRecipientDto = z.infer<typeof createRecipientBodySchema>;
type EditRecipientDto = z.infer<typeof editRecipientBodySchema>;

@Controller("/recipients")
@Roles(Role.Admin)
export class RecipientsController {
  constructor(
    private createRecipient: CreateRecipientUseCase,
    private deleteRecipient: DeleteRecipientUseCase,
    private getRecipientById: GetRecipientByIdUseCase,
    private editRecipient: EditRecipientUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createRecipientBodySchema))
  async create(@Body() recipient: CreateRecipientDto) {
    const res = await this.createRecipient.execute(recipient);

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

      throw new InternalServerErrorException();
    }

    return res.value;
  }

  // TODO - Fazer presenter
  @Get("/:id")
  @HttpCode(200)
  async findById(@Param("id") id: string) {
    const res = await this.getRecipientById.execute({ id });

    if (res.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Recipient not found");
      }

      throw new InternalServerErrorException();
    }

    return res.value;
  }

  @Delete("/:id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const res = await this.deleteRecipient.execute({ id });

    if (res?.isLeft()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Recipient not found");
      }

      throw new InternalServerErrorException();
    }

    return;
  }

  @Put("/:id")
  @HttpCode(200)
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(editRecipientBodySchema))
    recipient: EditRecipientDto,
  ) {
    const res = await this.editRecipient.execute({
      id,
      ...recipient,
    });

    if (res.isLeft()) {
      if (res.value instanceof InvalidEmailError) {
        throw new BadRequestException("Invalid Email");
      }

      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException("Recipient not found");
      }

      if (res.value instanceof EmailAlreadyExistsError) {
        throw new BadRequestException("Email already in use");
      }

      throw new InternalServerErrorException();
    }
  }
}
