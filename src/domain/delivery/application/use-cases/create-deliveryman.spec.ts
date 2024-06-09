import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let fakeHasher: FakeHasher;
let sut: CreateDeliverymanUseCase;

describe("Create Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
    );
  });

  it("should be able to create a deliveryman", async () => {
    const request = {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
      cpf: "12345678909",
      password: "password",
      latitude: 0,
      longitude: 0,
    };

    const result = await sut.execute(request);

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);
    expect(inMemoryDeliverymanRepository.deliverymen[0].name).toBe(
      request.name,
    );
  });

  it("should not be able to create a deliveryman with an invalid email or cpf", async () => {
    const request = {
      id: "1",
      name: "John Doe",
      email: "john@doe",
      cpf: "12345678909",
      password: "password",
      latitude: 0,
      longitude: 0,
    };

    const result = await sut.execute(request);

    expect(result.isLeft()).toBe(true);

    const request2 = {
      ...request,
      email: "john@doe.com",
      cpf: "1234567890",
    };

    const result2 = await sut.execute(request2);

    expect(result2.isLeft()).toBe(true);
  });

  it("should hash deliveryman password upon registration", async () => {
    const request = {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
      cpf: "12345678909",
      password: "password",
      latitude: 0,
      longitude: 0,
    };

    await sut.execute(request);

    expect(inMemoryDeliverymanRepository.deliverymen[0].password).not.toEqual(
      request.password,
    );

    expect(inMemoryDeliverymanRepository.deliverymen[0].password).toContain(
      "-hashed",
    );
  });
});
