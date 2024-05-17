import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: CreateDeliverymanUseCase;

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

    const { deliveryman } = await sut.execute(request);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);
    expect(inMemoryDeliverymanRepository.deliverymen[0].id).toEqual(
      deliveryman.id,
    );
  });
});
