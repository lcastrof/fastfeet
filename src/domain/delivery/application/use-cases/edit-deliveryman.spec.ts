import { makeDeliveryman } from "test/factories/make-deliveryman";
import { InMemoryDeliverymanRepository } from "test/repositories/in-memory-deliveryman-repository";
import { Cpf } from "../../enterprise/entities/value-objects/cpf";
import { EditDeliverymanUseCase } from "./edit-deliveryman";

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository;
let sut: EditDeliverymanUseCase;
describe("Edit Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new EditDeliverymanUseCase(inMemoryDeliverymanRepository);
  });

  it("should be able to edit a deliveryman", async () => {
    const deliveryman = makeDeliveryman();

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);

    const editedDeliveryman = {
      id: deliveryman.id.toString(),
      name: "John Doe",
      email: "john@doe.com",
      cpf: "12345678909",
      latitude: 0,
      longitude: 0,
    };

    await sut.execute(editedDeliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);
    expect(inMemoryDeliverymanRepository.deliverymen[0]).toMatchObject(
      expect.objectContaining({
        name: editedDeliveryman.name,
        email: editedDeliveryman.email,
        cpf: new Cpf(editedDeliveryman.cpf),
        latitude: editedDeliveryman.latitude,
        longitude: editedDeliveryman.longitude,
      }),
    );
  });

  it("should not be able to edit a deliveryman that does not exist", async () => {
    const deliveryman = makeDeliveryman();

    await inMemoryDeliverymanRepository.create(deliveryman);

    expect(inMemoryDeliverymanRepository.deliverymen).toHaveLength(1);

    expect(
      sut.execute({
        id: "2",
        name: "John Doe",
        email: "john@doe.com",
        cpf: "12345678909",
        latitude: 0,
        longitude: 0,
      }),
    ).rejects.toThrowError("Deliveryman not found");
  });
});
