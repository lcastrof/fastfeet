import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { AuthenticateDeliverymanUseCase } from "./authenticate-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateDeliverymanUseCase;

describe("Authenticate Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it("should be able to authenticate a deliveryman", async () => {
    const deliveryman = makeDeliveryman({
      cpf: Cpf.create("12345678909"),
      password: await fakeHasher.hash("123456"),
    });

    inMemoryDeliverymanRepository.deliverymen.push(deliveryman);

    const request = {
      cpf: deliveryman.cpf.value,
      password: "123456",
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
