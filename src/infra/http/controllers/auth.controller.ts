import { AuthenticateDeliverymanUseCase } from "@/domain/delivery/application/use-cases/authenticate-deliveryman";
import { WrongCredentialsError } from "@/domain/delivery/application/use-cases/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";

const createSessionBodySchema = z.object({
  cpf: z.string().length(11),
  password: z.string().min(6),
});

type CreateSessionDTO = z.infer<typeof createSessionBodySchema>;

@Controller("/sessions")
export class AuthController {
  constructor(
    private authenticateDeliveryman: AuthenticateDeliverymanUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(createSessionBodySchema))
  async create(@Body() { cpf, password }: CreateSessionDTO) {
    const result = await this.authenticateDeliveryman.execute({
      cpf,
      password,
    });

    if (result.isLeft()) {
      if (result.value instanceof WrongCredentialsError) {
        return new UnauthorizedException(result.value.message);
      }

      return new InternalServerErrorException(result.value);
    }

    return {
      accessToken: result.value.accessToken,
    };
  }
}
