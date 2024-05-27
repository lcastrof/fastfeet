import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: CreateDeliverymanUseCase;

// TOD0 - Testar RBAC (Role Based Access Control) no teste de integração posteriormente
describe("Create Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new CreateDeliverymanUseCase(inMemoryDeliverymanRepository);
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
});
