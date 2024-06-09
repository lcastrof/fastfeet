import { Either, left, right } from "@/core/either";
import { DeliverymanRepository } from "@/domain/delivery/application/repositories/deliveryman-repository";
import { Injectable } from "@nestjs/common";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateDeliverymanRequest {
  cpf: string;
  password: string;
}

type AuthenticateDeliverymanResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(
    private readonly deliverymanRepository: DeliverymanRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliverymanRequest): Promise<AuthenticateDeliverymanResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf);

    if (!deliveryman) {
      return left(new WrongCredentialsError());
    }

    const isPasswordCorrect = await this.hashComparer.compare(
      password,
      deliveryman.password,
    );

    if (!isPasswordCorrect) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryman.id.toString(),
    });

    return right({ accessToken });
  }
}
