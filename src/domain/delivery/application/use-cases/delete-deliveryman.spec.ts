import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { DeleteDeliverymanUseCase } from "./delete-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: DeleteDeliverymanUseCase;
describe("Delete Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to delete a deliveryman", async () => {
    const deliveryman = Deliveryman.create({
      name: "John Doe",
      email: "john@doe.com",
      cpf: new Cpf("12345678909"),
      password: "password",
      latitude: 0,
      longitude: 0,
    });

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);

    await sut.execute({
      id: deliveryman.id.toString(),
    });

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(0);
  });
});
