import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Deliveryman } from "@/domain/delivery/enterprise/entities/deliveryman";
import { Cpf } from "@/domain/delivery/enterprise/entities/value-objects/cpf";
import { Injectable } from "@nestjs/common";
import { Email } from "../../enterprise/entities/value-objects/email";
import { HashGenerator } from "../cryptography/hash-generator";
import { PermissionRepository } from "../repositories/permission-repository";
import { CPFAlreadyExistsError } from "./errors/cpf-already-exists-error";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { InvalidCpfError } from "./errors/invalid-cpf-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

interface CreateDeliverymanRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  latitude: number;
  longitude: number;
}

type CreateDeliverymanResponse = Either<
  | InvalidCpfError
  | InvalidEmailError
  | EmailAlreadyExistsError
  | CPFAlreadyExistsError,
  null
>;

@Injectable()
export class CreateDeliverymanUseCase {
  constructor(
    private readonly deliverymanRepository: DeliverymanRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    cpf,
    password,
    latitude,
    longitude,
  }: CreateDeliverymanRequest): Promise<CreateDeliverymanResponse> {
    const isEmailValid = Email.validate(email);
    const isCpfValid = Cpf.validate(cpf);

    if (!isEmailValid) {
      return left(new InvalidEmailError());
    }

    if (!isCpfValid) {
      return left(new InvalidCpfError());
    }

    const isEmailInUse = await this.deliverymanRepository.findByEmail(email);

    if (isEmailInUse) {
      return left(new EmailAlreadyExistsError());
    }

    const isCpfInUse = await this.deliverymanRepository.findByCpf(cpf);

    if (isCpfInUse) {
      return left(new CPFAlreadyExistsError());
    }

    const permission =
      await this.permissionRepository.findByCode("deliveryman");

    if (!permission) {
      throw new ResourceNotFoundError("Permission not found");
    }

    const deliveryman = Deliveryman.create({
      name,
      email: Email.create(email),
      cpf: Cpf.create(cpf),
      password: await this.hashGenerator.hash(password),
      permissions: [permission],
      latitude,
      longitude,
    });
    await this.deliverymanRepository.createDeliveryman(deliveryman);

    return right(null);
  }
}
