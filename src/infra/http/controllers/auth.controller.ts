import { Public } from "@/infra/auth/public";
import { User } from "@/infra/database/typeorm/entities/user.entity";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { z } from "zod";

const createSessionBodySchema = z.object({
  cpf: z.string().length(11),
  password: z.string().min(6),
});

type CreateSessionDTO = z.infer<typeof createSessionBodySchema>;

@Controller("/sessions")
export class AuthController {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(createSessionBodySchema))
  async create(@Body() { cpf, password }: CreateSessionDTO) {
    const user = await this.userRepository.findOneBy({ cpf });

    if (!user) {
      throw new UnauthorizedException("User credentials do not match");
    }

    const isPasswordValid = await compare(password, user.passwordHashed);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials do not match");
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
