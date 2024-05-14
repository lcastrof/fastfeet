import { Role } from "@/enums/role.enum";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { Roles } from "@/roles/roles.decorator";
import { User } from "@/typeorm/entities/user.entity";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { z } from "zod";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().length(11),
  password: z.string().min(6),
});

type CreateUserDto = z.infer<typeof createUserBodySchema>;

@Controller("/users")
@Roles(Role.Admin)
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async create(@Body() user: CreateUserDto) {
    const { password, ...rest } = user;

    const passwordHashed = await hash(password, 8);

    const userObj = {
      ...rest,
      passwordHashed,
    };
    const usr = this.userRepository.create(userObj);
    return this.userRepository.save(usr);
  }
}
